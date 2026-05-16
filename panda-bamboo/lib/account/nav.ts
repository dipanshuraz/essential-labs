export type AccountNavItem = {
  href: string;
  label: string;
  section?: string;
  badge?: string;
};

export const ACCOUNT_QUICK_MENU: AccountNavItem[] = [
  { href: "/account/profile", label: "My Profile" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/coupons", label: "Coupons" },
  { href: "/account/rewards", label: "Kiddex Coins" },
  { href: "/account/plus", label: "Kiddex Plus Zone" },
  { href: "/account/payments", label: "Saved Cards & Wallet" },
  { href: "/account/addresses", label: "Saved Addresses" },
  { href: "/account/wishlist", label: "Wishlist" },
  { href: "/account/gift-cards", label: "Gift Cards" },
  { href: "/account/notifications", label: "Notifications" },
];

export const ACCOUNT_SIDEBAR: AccountNavItem[] = [
  { href: "/account/orders", label: "My Orders", section: "MY ORDERS" },
  { href: "/account/profile", label: "Profile Information", section: "ACCOUNT SETTINGS" },
  { href: "/account/addresses", label: "Manage Addresses", section: "ACCOUNT SETTINGS" },
  { href: "/account/profile", label: "PAN Card Information", section: "ACCOUNT SETTINGS" },
  { href: "/account/gift-cards", label: "Gift Cards", section: "PAYMENTS", badge: "$0" },
  { href: "/account/payments", label: "Saved UPI", section: "PAYMENTS" },
  { href: "/account/cards", label: "Saved Cards", section: "PAYMENTS" },
  { href: "/account/coupons", label: "My Coupons", section: "MY STUFF" },
  { href: "/account/reviews", label: "My Reviews & Ratings", section: "MY STUFF" },
  { href: "/account/notifications", label: "All Notifications", section: "MY STUFF" },
  { href: "/account/wishlist", label: "My Wishlist", section: "MY STUFF" },
];
