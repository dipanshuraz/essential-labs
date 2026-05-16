/** Kiddex API gateway base URL (customer auth, catalog, etc.). */
export function getGatewayBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_GATEWAY_URL ?? "http://localhost:4000";
  return url.replace(/\/$/, "");
}
