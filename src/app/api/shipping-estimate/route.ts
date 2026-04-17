import { NextResponse } from "next/server";
import {
  FLAT_RATE_CENTS,
  FREE_SHIPPING_THRESHOLD_CENTS,
  shippingCentsForSubtotal,
} from "@/lib/shipping";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("subtotalCents");
  const subtotalCents = raw ? parseInt(raw, 10) : 0;
  if (!Number.isFinite(subtotalCents) || subtotalCents < 0) {
    return NextResponse.json({ error: "Invalid subtotal" }, { status: 400 });
  }
  const shippingCents = shippingCentsForSubtotal(subtotalCents);
  return NextResponse.json({
    subtotalCents,
    shippingCents,
    totalCents: subtotalCents + shippingCents,
    freeShippingThresholdCents: FREE_SHIPPING_THRESHOLD_CENTS,
    flatRateCents: FLAT_RATE_CENTS,
  });
}
