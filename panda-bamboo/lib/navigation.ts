export type NavItem = { label: string; href: string };
export type NavGroup = { label: string; href?: string; children?: NavItem[] };

export const mainNav: NavGroup[] = [
  {
    label: "Home",
    href: "/",
    children: [
      { label: "Home One", href: "/" },
      { label: "Home Two", href: "/index-2" },
      { label: "Home Three", href: "/index-3" },
      { label: "Home Four", href: "/index-4" },
      { label: "Home Five", href: "/index-5" },
    ],
  },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "Shop One", href: "/shop" },
      { label: "Shop Two", href: "/shop-2" },
      { label: "Shop Three", href: "/shop-3" },
      { label: "Shop Four", href: "/shop-4" },
      { label: "Shop Five", href: "/shop-5" },
      { label: "Shop Six", href: "/shop-6" },
    ],
  },
  {
    label: "Pages",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Account", href: "/account" },
      { label: "Login", href: "/login" },
      { label: "Signup", href: "/signup" },
      { label: "Search", href: "/search" },
      { label: "404", href: "/error" },
    ],
  },
  {
    label: "Blog",
    children: [
      { label: "Blog Grid", href: "/blog" },
      { label: "Blog Standard", href: "/blog-2" },
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
