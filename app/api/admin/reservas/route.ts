import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const auth = req.headers.get("x-admin-password");

  if (!auth || auth !== process.env.ADMIN_PASSWORD) {
    return Response.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("reservas")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, reservas: data || [] });
}
