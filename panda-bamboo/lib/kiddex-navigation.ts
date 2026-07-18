/** Kiddex theme navigation (matches Kiddex/*.html mega menus). */

export type KiddexNavLink = { label: string; href: string };

export type KiddexMegaColumn = {
  title: string;
  links: KiddexNavLink[];
};

export const KIDDEX_SHOP_CATALOG_LINKS: KiddexNavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Product Details", href: "/shop-details" },
];

export const KIDDEX_SHOP_LAYOUT_LINKS: KiddexNavLink[] = [
  { label: "Cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
  { label: "My Account", href: "/account-template" },
  { label: "Compare", href: "/compare" },
  { label: "Wishlist", href: "/wishlist" },
];

export const KIDDEX_SHOP_MEGA_COLUMNS: KiddexMegaColumn[] = [
  { title: "Catalog", links: KIDDEX_SHOP_CATALOG_LINKS },
  { title: "Shop Layout", links: KIDDEX_SHOP_LAYOUT_LINKS },
];

export const KIDDEX_PAGES_LINKS: KiddexNavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Account", href: "/account-template" },
  { label: "Login", href: "/login" },
  { label: "Signup", href: "/signup" },
  { label: "404", href: "/error" },
];

export const KIDDEX_BLOG_LINKS: KiddexNavLink[] = [
  { label: "Blog", href: "/blog" },
  { label: "Blog Details", href: "/blog-details" },
];
