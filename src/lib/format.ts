export function formatMoney(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function parseImages(json: string): string[] {
  try {
    const v = JSON.parse(json) as unknown;
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** Kiddex pack asset used when a product has no image URL in the database. */
export const DUMMY_PRODUCT_IMAGE = "/kiddex/assets/images/shop/shop-14.png";

export const AFFILIATE_COOKIE = "pb_ref";
