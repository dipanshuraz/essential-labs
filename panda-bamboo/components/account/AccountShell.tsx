"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useCustomerAuth } from "@/lib/customer-auth/CustomerAuthProvider";
import { AccountSidebar } from "./AccountSidebar";
import "./account.css";

export function AccountShell({ children }: { children: ReactNode }) {
  const { isAuthed, user, logout } = useCustomerAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthed) router.replace(`/login?from=${encodeURIComponent(pathname)}`);
  }, [isAuthed, pathname, router]);

  if (!isAuthed || !user) {
    return (
      <div className="kx-account" style={{ padding: "4rem", textAlign: "center" }}>
        Redirecting to login…
      </div>
    );
  }

  return (
    <div className="kx-account">
      <header className="kx-account__top">
        <Link href="/" className="kx-account__logo">
          KID<span>DEX</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/shop" className="kx-account__shop-link">
            Continue shopping
          </Link>
          <button type="button" className="kx-account__btn kx-account__btn--outline" onClick={logout}>
            Logout
          </button>
        </div>
      </header>
      <div className="kx-account__layout">
        <AccountSidebar />
        <main className="kx-account__main">{children}</main>
      </div>
    </div>
  );
}
