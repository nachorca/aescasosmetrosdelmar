import Stripe from "stripe";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("Metadata recibida:", session.metadata);

    const { error } = await supabase.from("reservas").insert({
      stripe_session_id: session.id,
      payment_status: session.payment_status,
      check_in: session.metadata?.checkIn || null,
      check_out: session.metadata?.checkOut || null,
      guests: Number(session.metadata?.guests || 2),
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email,
      customer_name: session.customer_details?.name,
    });

    if (error) {
      console.error("Error guardando reserva:", error);
    } else {
      console.log("Reserva guardada:", session.id);
    }
  }

  return Response.json({ received: true });
}
