import manifest from "./kiddex-manifest.json";

export type KiddexManifestEntry = {
  html: string;
  slug: string;
  route: string;
};

export const KIDDEX_PAGES = manifest as KiddexManifestEntry[];

/** Slugs with a dedicated `app/(store)/<slug>/page.tsx` — exclude from `[slug]` catch-all. */
export const RESERVED_STORE_SLUGS = [
  "login",
  "signup",
  "account",
  "shop",
  "search",
  "shop-details",
  "cart",
  "checkout",
] as const;

export const KIDDEX_SLUGS = KIDDEX_PAGES.filter(
  (p) => p.route !== "/" && !RESERVED_STORE_SLUGS.includes(p.slug as (typeof RESERVED_STORE_SLUGS)[number]),
).map((p) => p.slug);

export function getKiddexEntryBySlug(slug: string): KiddexManifestEntry | undefined {
  return KIDDEX_PAGES.find((p) => p.slug === slug);
}

export function getKiddexEntryByRoute(route: string): KiddexManifestEntry | undefined {
  return KIDDEX_PAGES.find((p) => p.route === route);
}
