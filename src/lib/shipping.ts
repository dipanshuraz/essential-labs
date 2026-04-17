/** Flat-rate + free threshold (USD cents). Tune for your brand. */
export const FREE_SHIPPING_THRESHOLD_CENTS = 75_00;
export const FLAT_RATE_CENTS = 5_99;

export function shippingCentsForSubtotal(subtotalCents: number): number {
  if (subtotalCents <= 0) return 0;
  if (subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS) return 0;
  return FLAT_RATE_CENTS;
}
