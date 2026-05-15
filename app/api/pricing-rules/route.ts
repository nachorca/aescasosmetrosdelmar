import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function isAdmin(req: Request) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  const { data, error } = await supabase
    .from("pricing_rules")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, rules: data });
}

export async function POST(req: Request) {
  if (!isAdmin(req)) {
    return Response.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();

  const { data, error } = await supabase
    .from("pricing_rules")
    .update({
      weekly_discount: Number(body.weekly_discount || 0),
      monthly_discount: Number(body.monthly_discount || 0),
      updated_at: new Date().toISOString(),
    })
    .neq("id", "00000000-0000-0000-0000-000000000000")
    .select()
    .single();

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, rules: data });
}
