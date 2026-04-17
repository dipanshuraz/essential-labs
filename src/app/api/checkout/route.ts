import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { buildCartTotals } from "@/lib/build-order-from-cart";
import { prisma } from "@/lib/prisma";
import { AFFILIATE_COOKIE } from "@/lib/format";

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

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { email, items, shipping } = parsed.data;
  if (items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const session = await auth();
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

  try {
    const order = await prisma.$transaction(async (tx) => {
      const built = await buildCartTotals(tx, items, affiliateId, commissionPercent);

      const shippingPayload = {
        ...shipping,
        subtotalCents: built.subtotalCents,
        shippingCents: built.shippingCents,
      };

      const order = await tx.order.create({
        data: {
          userId: session?.user?.id ?? null,
          email,
          status: "PAID",
          totalCents: built.totalCents,
          affiliateId: built.affiliateId,
          affiliateCommissionCents: built.affiliateCommissionCents,
          shippingJson: JSON.stringify(shippingPayload),
          paymentProvider: "demo",
          items: {
            create: built.lineData.map((l) => ({
              productId: l.productId,
              quantity: l.quantity,
              priceCents: l.priceCents,
            })),
          },
        },
      });

      for (const line of items) {
        await tx.product.update({
          where: { id: line.productId },
          data: { stock: { decrement: line.quantity } },
        });
      }

      return order;
    });

    return NextResponse.json({ ok: true, orderId: order.id });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Checkout failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
