import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { buildCartTotals } from "@/lib/build-order-from-cart";
import { AFFILIATE_COOKIE } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe-server";

const bodySchema = z.object({
  email: z.string().email(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
    }),
  ),
  shipping: z.object({
    name: z.string().min(1),
    line1: z.string().min(1),
    city: z.string().min(1),
    postal: z.string().min(1),
    country: z.string().min(1),
  }),
});

function originFromRequest(req: Request) {
  const env = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (env) return env;
  const u = new URL(req.url);
  return `${u.protocol}//${u.host}`;
}

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  }

  const json = await req.json();
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { email, items, shipping } = parsed.data;
  if (items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const authSession = await auth();
  const cookieStore = await cookies();
  const refCode = cookieStore.get(AFFILIATE_COOKIE)?.value;

  let affiliateId: string | null = null;
  let commissionPercent = 0;
  if (refCode) {
    const aff = await prisma.affiliateProfile.findFirst({
      where: { code: refCode, active: true },
    });
    if (aff) {
      affiliateId = aff.id;
      commissionPercent = aff.commissionPercent;
    }
  }

  let built: Awaited<ReturnType<typeof buildCartTotals>>;

  const order = await prisma.$transaction(async (tx) => {
    built = await buildCartTotals(tx, items, affiliateId, commissionPercent);
    const shippingPayload = {
      ...shipping,
      subtotalCents: built.subtotalCents,
      shippingCents: built.shippingCents,
    };

    return tx.order.create({
      data: {
        userId: authSession?.user?.id ?? null,
        email,
        status: "PENDING",
        totalCents: built.totalCents,
        affiliateId: built.affiliateId,
        affiliateCommissionCents: built.affiliateCommissionCents,
        shippingJson: JSON.stringify(shippingPayload),
        paymentProvider: "stripe",
        items: {
          create: built.lineData.map((l) => ({
            productId: l.productId,
            quantity: l.quantity,
            priceCents: l.priceCents,
          })),
        },
      },
    });
  });

  const lineItems = built!.lineData.map((l) => ({
    price_data: {
      currency: "usd",
      product_data: { name: l.name },
      unit_amount: l.priceCents,
    },
    quantity: l.quantity,
  }));

  if (built!.shippingCents > 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Shipping" },
        unit_amount: built!.shippingCents,
      },
      quantity: 1,
    });
  }

  const base = originFromRequest(req);

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${base}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/checkout`,
    customer_email: email,
    metadata: { orderId: order.id },
    payment_intent_data: {
      metadata: { orderId: order.id },
    },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { stripeCheckoutSessionId: checkoutSession.id },
  });

  if (!checkoutSession.url) {
    return NextResponse.json({ error: "No checkout URL" }, { status: 500 });
  }

  return NextResponse.json({ url: checkoutSession.url, orderId: order.id });
}
