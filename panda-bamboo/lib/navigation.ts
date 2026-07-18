export type NavItem = { label: string; href: string };
export type NavGroup = { label: string; href?: string; children?: NavItem[] };

export const mainNav: NavGroup[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "Shop", href: "/shop" },
      { label: "Product Details", href: "/shop-details" },
      { label: "Cart", href: "/cart" },
      { label: "Checkout", href: "/checkout" },
      { label: "Compare", href: "/compare" },
      { label: "Wishlist", href: "/wishlist" },
    ],
  },
  {
    label: "Pages",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Account", href: "/account-template" },
      { label: "Login", href: "/login" },
      { label: "Signup", href: "/signup" },
      { label: "404", href: "/error" },
    ],
  },
  {
    label: "Blog",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Blog Details", href: "/blog-details" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerResources: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Shop", href: "/shop" },
  { label: "Cart", href: "/cart" },
  { label: "Brands", href: "/shop" },
  { label: "Mobile App", href: "/contact" },
];

export const footerSupport: NavItem[] = [
  { label: "Reviews", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Return Policy", href: "/contact" },
  { label: "Online Support", href: "/contact" },
  { label: "Money Back", href: "/contact" },
];

/** Storefront path segments for tests and tooling (no `.html`). */
export const storeSlugs = [
  "about",
  "account-template",
  "blog",
  "blog-details",
  "cart",
  "checkout",
  "order-confirmation",
  "compare",
  "contact",
  "error",
  "login",
  "shop",
  "shop-details",
  "signup",
  "wishlist",
] as const;
