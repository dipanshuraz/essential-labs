/** Format amounts in INR for storefront demo. */
export function formatInr(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}
