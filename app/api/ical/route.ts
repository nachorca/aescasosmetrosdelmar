import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function formatDate(date: string) {
  return date.replace(/-/g, "");
}

export async function GET() {
  const reservasRes = await supabase
    .from("reservas")
    .select("*")
    .eq("status", "confirmed");

  const blocksRes = await supabase
    .from("manual_blocks")
    .select("*")
    .eq("active", true);

  const reservas = reservasRes.data || [];
  const blocks = blocksRes.data || [];

  let ical = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//A escasos metros del mar//ES
CALSCALE:GREGORIAN
`;

  reservas.forEach((r) => {
    ical += `
BEGIN:VEVENT
UID:${r.id}
DTSTART;VALUE=DATE:${formatDate(r.check_in)}
DTEND;VALUE=DATE:${formatDate(r.check_out)}
SUMMARY:Reserva confirmada
END:VEVENT
`;
  });

  blocks.forEach((b) => {
    ical += `
BEGIN:VEVENT
UID:${b.id}
DTSTART;VALUE=DATE:${formatDate(b.start_date)}
DTEND;VALUE=DATE:${formatDate(b.end_date)}
SUMMARY:${b.reason || "Bloqueo manual"}
END:VEVENT
`;
  });

  ical += `
END:VCALENDAR
`;

  return new Response(ical, {
    headers: {
      "Content-Type": "text/calendar",
    },
  });
}
