import ICAL from "ical.js";

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
      summary: vevent.summary || "Reservado",
      start: formatDate(vevent.startDate.toJSDate()),
      end: formatDate(vevent.endDate.toJSDate()),
    };
  });
}

export async function GET() {
  try {
    const airbnb = await readCalendar(process.env.AIRBNB_ICAL_URL, "airbnb");
    const booking = await readCalendar(process.env.BOOKING_ICAL_URL, "booking");

    return Response.json({
      ok: true,
      blocked: [...airbnb, ...booking],
    });
  } catch (error) {
    return Response.json(
      { ok: false, error: "No se pudo leer la disponibilidad" },
      { status: 500 }
    );
  }
}
