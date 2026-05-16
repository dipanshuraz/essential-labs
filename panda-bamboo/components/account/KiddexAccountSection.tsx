"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useCustomerAuth } from "@/lib/customer-auth/CustomerAuthProvider";

export type AccountTabId = "profile" | "payments" | "orders" | "wishlist";

const TABS: { id: AccountTabId; label: string; href: string }[] = [
  { id: "profile", label: "Personal Information", href: "/account/profile" },
  { id: "payments", label: "Billing and Payments", href: "/account/payments" },
  { id: "orders", label: "Order History", href: "/account/orders" },
  { id: "wishlist", label: "Wishlist", href: "/account/wishlist" },
];

const EXTRA_LINKS = [
  { label: "Coupons", href: "/account/coupons" },
  { label: "Kiddex Coins", href: "/account/rewards" },
  { label: "Kiddex Plus", href: "/account/plus" },
  { label: "Saved Cards", href: "/account/cards" },
  { label: "Addresses", href: "/account/addresses" },
  { label: "Notifications", href: "/account/notifications" },
];

function tabFromPath(pathname: string): AccountTabId {
  if (pathname.startsWith("/account/orders")) return "orders";
  if (pathname.startsWith("/account/payments") || pathname.startsWith("/account/cards")) return "payments";
  if (pathname.startsWith("/account/wishlist")) return "wishlist";
  return "profile";
}

export function KiddexAccountSection({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useCustomerAuth();
  const active = tabFromPath(pathname);
  const displayName = user ? `${user.firstName} ${user.lastName}` : "Guest";

  return (
    <section className="account-section pb_120">
      <div className="large-container">
        <div className="sec-title centred mb_60">
          <h2>
            User <span>Account</span>
          </h2>
        </div>
        <div className="inner-container">
          <div className="tabs-box">
            <div className="account-info">
              <div className="upper-box centred mb_40">
                <figure className="image-box">
                  <img src="/kiddex/assets/images/resource/account-1.png" alt="" />
                </figure>
                <h4>{displayName}</h4>
                <a href={`mailto:${user?.email ?? ""}`}>{user?.email}</a>
              </div>
              <ul className="tab-btns tab-buttons clearfix">
                {TABS.map((tab) => (
                  <li key={tab.id} className={`tab-btn${active === tab.id ? " active-btn" : ""}`}>
                    <Link href={tab.href}>{tab.label}</Link>
                  </li>
                ))}
              </ul>
              <ul className="tab-btns tab-buttons clearfix" style={{ marginTop: 12 }}>
                {EXTRA_LINKS.map((link) => (
                  <li
                    key={link.href}
                    className={`tab-btn${pathname === link.href || pathname.startsWith(`${link.href}/`) ? " active-btn" : ""}`}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
                <li className="tab-btn">
                  <button
                    type="button"
                    onClick={() => {
                      void logout().then(() => router.push("/login"));
                    }}
                    style={{ background: "none", border: "none", padding: 0, font: "inherit", cursor: "pointer" }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            <div className="tabs-content">
              <div className="tab active-tab">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
