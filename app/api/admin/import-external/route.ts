import ICAL from "ical.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function isAdmin(req: Request) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
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
    return {
      source,
      external_uid: `${source}-${vevent.uid || vevent.summary || ""}-${formatDate(
        vevent.startDate.toJSDate()
      )}`,
      summary: vevent.summary || "Reserva externa",
      check_in: formatDate(vevent.startDate.toJSDate()),
      check_out: formatDate(vevent.endDate.toJSDate()),
      status: "confirmed",
    };
  });
}

export async function POST(req: Request) {
  if (!isAdmin(req)) {
    return Response.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const airbnb = await readCalendar(process.env.AIRBNB_ICAL_URL, "airbnb");
  const booking = await readCalendar(process.env.BOOKING_ICAL_URL, "booking");

  const rows = [...airbnb, ...booking];

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
