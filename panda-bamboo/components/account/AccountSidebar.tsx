"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCustomerAuth } from "@/lib/customer-auth/CustomerAuthProvider";
import { ACCOUNT_SIDEBAR } from "@/lib/account/nav";

export function AccountSidebar() {
  const pathname = usePathname();
  const { user, logout } = useCustomerAuth();
  const initial = user?.firstName?.slice(0, 1) ?? "K";

  let lastSection = "";

  return (
    <aside className="kx-account__sidebar">
      <div className="kx-account__card kx-account__profile-chip">
        <div className="kx-account__avatar">{initial}</div>
        <div>
          <div style={{ fontWeight: 600 }}>Hello,</div>
          <div style={{ fontSize: "0.8rem", color: "var(--kx-muted)" }}>
            {user?.firstName} {user?.lastName}
          </div>
        </div>
      </div>

      <nav className="kx-account__card">
        {ACCOUNT_SIDEBAR.map((item) => {
          const showSection = item.section && item.section !== lastSection;
          if (item.section) lastSection = item.section;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <div key={`${item.section}-${item.label}`}>
              {showSection ? <div className="kx-account__section-label">{item.section}</div> : null}
              <Link
                href={item.href}
                className={`kx-account__nav-item${active ? " is-active" : ""}`}
              >
                <span>{item.label}</span>
                {item.badge ? <span style={{ color: "#21c45d", fontWeight: 600 }}>{item.badge}</span> : null}
              </Link>
            </div>
          );
        })}
        <button
          type="button"
          className="kx-account__nav-item"
          style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
          onClick={logout}
        >
          Logout
        </button>
      </nav>

      <div className="kx-account__card" style={{ padding: "0.75rem 1rem", fontSize: "0.75rem", color: "var(--kx-muted)" }}>
        <strong>Frequently visited:</strong>
        <div style={{ marginTop: 6 }}>
          <Link href="/account/orders" style={{ color: "var(--kx-theme)" }}>
            Track Order
          </Link>
          {" · "}
          <Link href="/contact" style={{ color: "var(--kx-theme)" }}>
            Help Center
          </Link>
        </div>
      </div>
    </aside>
  );
}
