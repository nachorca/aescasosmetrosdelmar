import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function overlaps(startA: string, endA: string, startB: string, endB: string) {
  return startA < endB && endA > startB;
}

export async function checkAvailability(checkIn: string, checkOut: string) {
  const reservasRes = await supabase
    .from("reservas")
    .select("check_in, check_out")
    .eq("status", "confirmed");

  const blocksRes = await supabase
    .from("manual_blocks")
    .select("start_date, end_date")
    .eq("active", true);

  const reservas = reservasRes.data || [];
  const blocks = blocksRes.data || [];

  for (const r of reservas) {
    if (overlaps(checkIn, checkOut, r.check_in, r.check_out)) {
      return { available: false, reason: "Fechas ocupadas por otra reserva" };
    }
  }

  for (const b of blocks) {
    if (overlaps(checkIn, checkOut, b.start_date, b.end_date)) {
      return { available: false, reason: "Fechas bloqueadas manualmente" };
    }
  }

  return { available: true };
}
