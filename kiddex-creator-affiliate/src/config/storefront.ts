/** Panda Bamboo storefront when running kiddex-apps locally. */
export function getStorefrontUrl(): string {
  const raw = import.meta.env.VITE_STOREFRONT_URL as string | undefined;
  if (raw?.trim()) return raw.replace(/\/$/, "");
  return "http://localhost:3000";
}
