import ICAL from "ical.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function isCronAuthorized(req: Request) {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${process.env.CRON_SECRET}`;
}

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function overlapsOrTouches(a: any, b: any) {
  return a.source === b.source && a.check_in < b.check_out && a.check_out > b.check_in;
}

function normalizeEvents(events: any[]) {
  const sorted = events.sort((a, b) =>
    `${a.source}-${a.check_in}`.localeCompare(`${b.source}-${b.check_in}`)
  );

  const merged: any[] = [];

  for (const event of sorted) {
    const last = merged[merged.length - 1];

    if (last && overlapsOrTouches(last, event)) {
      last.check_in = last.check_in < event.check_in ? last.check_in : event.check_in;
      last.check_out = last.check_out > event.check_out ? last.check_out : event.check_out;
      last.summary = last.summary || event.summary;
      last.external_uid = `${last.source}-${last.check_in}-${last.check_out}`;
    } else {
      merged.push({ ...event });
    }
  }

  return merged;
}

async function readCalendar(url?: string, source = "unknown") {
  if (!url) return [];

  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();

  const jcal = ICAL.parse(text);
  const comp = new ICAL.Component(jcal);
  const events = comp.getAllSubcomponents("vevent");

  return events.map((event) => {
    const vevent = new ICAL.Event(event);
    const checkIn = formatDate(vevent.startDate.toJSDate());
    const checkOut = formatDate(vevent.endDate.toJSDate());

    return {
      source,
      external_uid: `${source}-${checkIn}-${checkOut}`,
      summary: vevent.summary || "Reserva externa",
      check_in: checkIn,
      check_out: checkOut,
      status: "confirmed",
    };
  });
}

export async function GET(req: Request) {
  if (!isCronAuthorized(req)) {
    return Response.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const airbnb = await readCalendar(process.env.AIRBNB_ICAL_URL, "airbnb");
  const booking = await readCalendar(process.env.BOOKING_ICAL_URL, "booking");

  const rows = normalizeEvents([...airbnb, ...booking]);

  await supabase.from("external_reservations").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  if (!rows.length) {
    return Response.json({ ok: true, imported: 0 });
  }

  const { error } = await supabase
    .from("external_reservations")
    .upsert(rows, { onConflict: "external_uid" });

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({
    ok: true,
    imported: rows.length,
  });
}
