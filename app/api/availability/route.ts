import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const externalRes = await supabase
      .from("external_reservations")
      .select("source, summary, check_in, check_out")
      .eq("status", "confirmed");

    const reservasRes = await supabase
      .from("reservas")
      .select("check_in, check_out")
      .eq("status", "confirmed");

    const manualRes = await supabase
      .from("manual_blocks")
      .select("start_date, end_date, reason")
      .eq("active", true);

    const externalBlocked = (externalRes.data || []).map((r) => ({
      source: r.source,
      summary: r.summary || "Reserva externa",
      start: r.check_in,
      end: r.check_out,
    }));

    const stripeBlocked = (reservasRes.data || []).map((r) => ({
      source: "stripe",
      summary: "Reserva directa",
      start: r.check_in,
      end: r.check_out,
    }));

    const manualBlocked = (manualRes.data || []).map((r) => ({
      source: "manual",
      summary: r.reason || "Reserva manual",
      start: r.start_date,
      end: r.end_date,
    }));

    return Response.json({
      ok: true,
      blocked: [
        ...externalBlocked,
        ...stripeBlocked,
        ...manualBlocked,
      ],
    });
  } catch {
    return Response.json(
      { ok: false, error: "No se pudo leer la disponibilidad" },
      { status: 500 }
    );
  }
}
