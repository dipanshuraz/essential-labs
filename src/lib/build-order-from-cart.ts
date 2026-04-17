import type { PrismaClient } from "@/generated/prisma/client";
import { shippingCentsForSubtotal } from "@/lib/shipping";

export type CartLineInput = { productId: string; quantity: number };

export type BuiltCart = {
  lineData: {
    productId: string;
    quantity: number;
    priceCents: number;
    name: string;
  }[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  affiliateId: string | null;
  affiliateCommissionCents: number | null;
};

export async function buildCartTotals(
  tx: Pick<PrismaClient, "product">,
  items: CartLineInput[],
  affiliateId: string | null,
  commissionPercent: number,
): Promise<BuiltCart> {
  const productIds = items.map((i) => i.productId);
  const products = await tx.product.findMany({
    where: { id: { in: productIds } },
  });
  const byId = Object.fromEntries(products.map((p) => [p.id, p]));

  let subtotalCents = 0;
  const lineData: BuiltCart["lineData"] = [];

  for (const line of items) {
    const p = byId[line.productId];
    if (!p) throw new Error("Product not found");
    if (p.stock < line.quantity) throw new Error(`Insufficient stock for ${p.name}`);
    subtotalCents += p.priceCents * line.quantity;
    lineData.push({
      productId: p.id,
      quantity: line.quantity,
      priceCents: p.priceCents,
      name: p.name,
    });
  }

  const shippingCents = shippingCentsForSubtotal(subtotalCents);
  const totalCents = subtotalCents + shippingCents;

  const affiliateCommissionCents =
    affiliateId && commissionPercent > 0
      ? Math.round((totalCents * commissionPercent) / 100)
      : null;

  return {
    lineData,
    subtotalCents,
    shippingCents,
    totalCents,
    affiliateId,
    affiliateCommissionCents,
  };
}
