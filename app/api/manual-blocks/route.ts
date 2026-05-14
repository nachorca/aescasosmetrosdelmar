import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("manual_blocks")
    .select("*")
    .eq("active", true)
    .order("start_date", { ascending: true });

  if (error) {
    return Response.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json({
    ok: true,
    blocks: data || [],
  });
}

export async function POST(req: Request) {
  const auth = req.headers.get("x-admin-password");

  if (!auth || auth !== process.env.ADMIN_PASSWORD) {
    return Response.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();

  if (!body.start_date || !body.end_date) {
    return Response.json(
      { ok: false, error: "Faltan fechas" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("manual_blocks")
    .insert({
      start_date: body.start_date,
      end_date: body.end_date,
      reason: body.reason || "Bloqueo manual",
      active: true,
    })
    .select()
    .single();

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, block: data });
}
