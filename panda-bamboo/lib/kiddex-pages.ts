import { KIDDEX_DYNAMIC_SLUGS, KIDDEX_ROUTE_ENTRIES, type KiddexRouteSlug } from "./kiddex-routes";

export type KiddexManifestEntry = {
  slug: KiddexRouteSlug;
  route: string;
};

export const KIDDEX_PAGES: KiddexManifestEntry[] = KIDDEX_ROUTE_ENTRIES.map(({ slug, route }) => ({
  slug,
  route,
}));

/** All slugs handled by the `[slug]` catch-all route. */
export const KIDDEX_SLUGS = [...KIDDEX_DYNAMIC_SLUGS];

export function getKiddexEntryBySlug(slug: string): KiddexManifestEntry | undefined {
  return KIDDEX_PAGES.find((p) => p.slug === slug);
}

export function getKiddexEntryByRoute(route: string): KiddexManifestEntry | undefined {
  return KIDDEX_PAGES.find((p) => p.route === route);
}
