import type { AppMode } from "@console/env";

export type ShellMeta = {
  product: string;
  role: string;
  /** Browser tab prefix, e.g. "Essential Labs Admin" */
  documentPrefix: string;
  logoLetter: string;
  /** Matches --kx-accent in @kiddex/ui for this shell */
  accentColor: string;
  faviconPath: string;
};

const META: Record<AppMode, ShellMeta> = {
  admin: {
    product: "Essential Labs",
    role: "Admin",
    documentPrefix: "Essential Labs Admin",
    logoLetter: "E",
    accentColor: "#3d8b5c",
    faviconPath: "/favicon.svg",
  },
  creators: {
    product: "Kiddex",
    role: "Affiliate",
    documentPrefix: "Kiddex Affiliate",
    logoLetter: "K",
    accentColor: "#6366f1",
    faviconPath: "/favicon-affiliate.svg",
  },
};

export function getShellMeta(mode: AppMode): ShellMeta {
  return META[mode];
}

export function formatDocumentTitle(mode: AppMode, pageTitle?: string): string {
  const { documentPrefix } = getShellMeta(mode);
  if (!pageTitle || pageTitle === documentPrefix) return documentPrefix;
  return `${pageTitle} · ${documentPrefix}`;
}

const ADMIN_PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/orders": "Order Management",
  "/customers": "Customers",
  "/coupons": "Coupon Code",
  "/categories": "Categories",
  "/transactions": "Transaction",
  "/brand": "Brand",
  "/products/new": "Add Product",
  "/products/media": "Product Media",
  "/products": "Product List",
  "/products/reviews": "Product Reviews",
  "/admin-role": "Admin role",
  "/control": "Control Authority",
};

const CREATORS_PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/marketplace": "Marketplace",
  "/affiliates": "Affiliates",
  "/transactions": "Transactions",
  "/referrals": "Referrals",
  "/reports": "Reports",
  "/payouts": "Payouts",
  "/settings/campaign": "Campaign Settings",
  "/settings/integrations": "Integrations",
  "/settings/email": "Email Settings",
  "/billing/subscriptions": "Subscriptions",
  "/influencer": "Influencer Mode",
};

export function getPageHeaderTitle(mode: AppMode, pathname: string): string {
  const map = mode === "creators" ? CREATORS_PAGE_TITLES : ADMIN_PAGE_TITLES;
  if (map[pathname]) return map[pathname];
  if (mode === "creators" && pathname.startsWith("/affiliates/")) return "Affiliate";
  return getShellMeta(mode).documentPrefix;
}

export function getBrowserPageTitle(mode: AppMode, pathname: string): string {
  const isLogin = pathname === "/login" || pathname.endsWith("/login");
  const page = isLogin ? "Sign in" : getPageHeaderTitle(mode, pathname);
  return formatDocumentTitle(mode, page);
}
