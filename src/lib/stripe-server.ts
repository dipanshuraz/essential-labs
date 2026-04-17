import Stripe from "stripe";

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export function paymentsMode(): "demo" | "stripe" {
  return process.env.STRIPE_SECRET_KEY ? "stripe" : "demo";
}
