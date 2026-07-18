/** Canonical storefront routes (React pages — no static HTML). */
export const KIDDEX_ROUTE_ENTRIES = [
  { slug: "home", route: "/" },
  { slug: "about", route: "/about" },
  /** Template account UI — `/account` is the live customer hub (profile, orders, …). */
  { slug: "account-template", route: "/account-template" },
  { slug: "blog", route: "/blog" },
  { slug: "blog-details", route: "/blog-details" },
  { slug: "cart", route: "/cart" },
  { slug: "checkout", route: "/checkout" },
  { slug: "order-confirmation", route: "/order-confirmation" },
  { slug: "compare", route: "/compare" },
  { slug: "contact", route: "/contact" },
  { slug: "error", route: "/error" },
  { slug: "login", route: "/login" },
  { slug: "shop", route: "/shop" },
  { slug: "shop-details", route: "/shop-details" },
  { slug: "signup", route: "/signup" },
  { slug: "wishlist", route: "/wishlist" },
] as const;

export type KiddexRouteSlug = (typeof KIDDEX_ROUTE_ENTRIES)[number]["slug"];

/** Slugs served by `app/(store)/[slug]/page.tsx` (everything except home). */
export const KIDDEX_DYNAMIC_SLUGS = KIDDEX_ROUTE_ENTRIES.filter((e) => e.slug !== "home").map(
  (e) => e.slug,
);

/** Legacy `.html` URLs → extensionless (permanent redirects). */
export const KIDDEX_LEGACY_HTML_REDIRECTS = KIDDEX_ROUTE_ENTRIES.flatMap(({ slug, route }) => {
  const htmlFiles =
    slug === "home"
      ? ["index.html"]
      : slug === "account-template"
        ? ["account.html"]
        : [`${slug}.html`];
  return htmlFiles.flatMap((file) => {
    const entries: { source: string; destination: string; permanent: true }[] = [
      { source: `/kiddex/${file}`, destination: route, permanent: true },
    ];
    if (file !== "index.html") {
      entries.push({ source: `/${file}`, destination: route, permanent: true });
    }
    return entries;
  });
});
