import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Poll order status after Stripe redirect (webhook may trail by a few seconds). */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  const order = await prisma.order.findFirst({
    where: { stripeCheckoutSessionId: sessionId },
    select: {
      id: true,
      status: true,
      totalCents: true,
      email: true,
    },
  });

  if (!order) {
    return NextResponse.json({ found: false });
  }

  return NextResponse.json({
    found: true,
    orderId: order.id,
    status: order.status,
    totalCents: order.totalCents,
    email: order.email,
  });
}
