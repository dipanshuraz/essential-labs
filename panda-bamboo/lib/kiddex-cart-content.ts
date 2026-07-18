/** Cart page static copy (theme cart.html). */

export const FREE_SHIPPING_THRESHOLD = 89.99;

export const SHIPPING_OPTIONS = [
  { id: "cart-ship-free", label: "Free Shipping", price: 0 },
  { id: "cart-ship-flat", label: "Flat Rate", price: 10 },
  { id: "cart-ship-local", label: "Local Delivery", price: 20 },
] as const;

export const SHIPPING_COUNTRIES = [
  "Select Country",
  "Australia",
  "Belgium",
  "Canada",
  "China",
  "France",
  "Germany",
  "Malaysia",
  "Mexico",
  "Russia",
  "Switzerland",
  "Turkey",
  "United Kingdom",
] as const;
