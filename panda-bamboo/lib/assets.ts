/** Template images live under public/kiddex/assets (no HTML). */
const BASE = "/kiddex/assets";

export function asset(path: string): string {
  const clean = path.replace(/^\//, "");
  if (clean.startsWith("images/")) return `${BASE}/${clean}`;
  return `${BASE}/images/${clean}`;
}
