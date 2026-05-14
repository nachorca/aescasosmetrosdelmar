import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function isAdmin(req: Request) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

export async function POST(req: Request) {
  if (!isAdmin(req)) {
    return Response.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();

  const table =
    body.source === "external"
      ? "external_reservations"
      : body.source === "manual"
      ? "manual_blocks"
      : "reservas";

  const { error } = await supabase
    .from(table)
    .update({
      checkin_status: body.checkin_status,
      cleaning_status: body.cleaning_status,
    })
    .eq("id", body.id);

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
