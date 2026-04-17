import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe-server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const stripe = getStripe();
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");

  if (!stripe || !whSecret || !sig) {
    return NextResponse.json({ error: "Misconfigured" }, { status: 400 });
  }

  const buf = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, whSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    if (!orderId || session.payment_status !== "paid") {
      return NextResponse.json({ received: true });
    }

    try {
      await prisma.$transaction(async (tx) => {
        const dup = await tx.processedStripeEvent.findUnique({
          where: { eventId: event.id },
        });
        if (dup) return;

        await tx.processedStripeEvent.create({
          data: { eventId: event.id },
        });

        const order = await tx.order.findUnique({
          where: { id: orderId },
          include: { items: true },
        });

        if (!order || order.status !== "PENDING") return;
        if (order.stripeCheckoutSessionId && order.stripeCheckoutSessionId !== session.id) {
          return;
        }

        const paid = session.amount_total;
        if (paid != null && paid !== order.totalCents) {
          console.error("Stripe amount mismatch", { orderId, paid, db: order.totalCents });
          return;
        }

        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          });
        }

        await tx.order.update({
          where: { id: orderId },
          data: { status: "PAID" },
        });
      });
    } catch (e) {
      console.error("Stripe webhook handler error", e);
      return NextResponse.json({ error: "Handler failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
