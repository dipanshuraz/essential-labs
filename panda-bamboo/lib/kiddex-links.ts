export function productDetailsHref(slug: string): string {
  return `/shop-details?p=${encodeURIComponent(slug)}`;
}
