import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Reserva - A escasos metros del mar",
              description:
                "Reserva apartamento turístico en El Campello",
            },
            unit_amount: body.amount || 10000,
          },
          quantity: 1,
        },
      ],

      success_url:
        `${process.env.NEXT_PUBLIC_SITE_URL || "https://aescasosmetrosdelmar.com"}/pago/correcto?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:
        `${process.env.NEXT_PUBLIC_SITE_URL || "https://aescasosmetrosdelmar.com"}/pago/cancelado`,

      metadata: {
        checkIn: body.checkIn || "",
        checkOut: body.checkOut || "",
        guests: String(body.guests || ""),
      },
    });

    return Response.json({
      ok: true,
      url: session.url,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: "No se pudo crear la sesión de pago",
      },
      { status: 500 }
    );
  }
}
