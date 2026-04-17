import { NextResponse } from "next/server";
import { paymentsMode } from "@/lib/stripe-server";

export async function GET() {
  const mode = paymentsMode();
  return NextResponse.json({
    mode,
    stripeEnabled: mode === "stripe",
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? null,
  });
}
