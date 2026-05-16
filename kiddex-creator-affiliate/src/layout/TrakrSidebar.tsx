import { NavLink } from "react-router-dom";
import {
  BarChart3,
  ChevronRight,
  CreditCard,
  ExternalLink,
  LayoutDashboard,
  Link2,
  LogOut,
  Mail,
  Plug,
  Settings,
  ShoppingBag,
  Store,
  Users,
  Wallet,
} from "lucide-react";
import { getShellMeta } from "@console/shells/shellMeta";
import { useAuth } from "@/auth/AuthContext";
import { getStorefrontUrl } from "@/config/storefront";

import type { ComponentType } from "react";

type NavItem = { to: string; label: string; icon: ComponentType<{ className?: string }> };

const navMain: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/marketplace", label: "Marketplace", icon: Store },
  { to: "/affiliates", label: "Affiliates", icon: Users },
  { to: "/transactions", label: "Transactions", icon: Wallet },
  { to: "/referrals", label: "Referrals", icon: Link2 },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/payouts", label: "Payouts", icon: ShoppingBag },
];

const navSettings: NavItem[] = [
  { to: "/settings/campaign", label: "Campaign Settings", icon: Settings },
  { to: "/settings/integrations", label: "Integrations", icon: Plug },
  { to: "/settings/email", label: "Email Settings", icon: Mail },
];

const navBilling: NavItem[] = [
  { to: "/billing/subscriptions", label: "Subscriptions", icon: CreditCard },
];

function linkClass(isActive: boolean) {
  return `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? "bg-brand text-white shadow-sm"
      : "text-ink-muted hover:bg-black/[0.04] hover:text-ink dark:hover:bg-white/5"
  }`;
}

function NavSection({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
      <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
        {title}
      </p>
      <ul className="space-y-0.5">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink to={to} end={to === "/"} className={({ isActive }) => linkClass(isActive)}>
              <Icon className="size-[18px] shrink-0 opacity-90" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TrakrSidebar() {
  const { logout, email, displayName } = useAuth();
  const meta = getShellMeta("creators");
  const storefront = getStorefrontUrl();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-[260px] flex-col border-r border-black/[0.06] bg-white transition-colors dark:border-white/10 dark:bg-zinc-900">
      <div className="flex h-16 items-center gap-2 border-b border-black/[0.06] px-4 dark:border-white/10">
        <div className="flex size-9 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
          {meta.logoLetter}
        </div>
        <div className="min-w-0 leading-tight">
          <span className="block truncate text-sm font-bold tracking-tight text-brand">
            {meta.product}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
            {meta.role}
          </span>
        </div>
        <button
          type="button"
          className="ml-auto rounded-lg p-2 text-ink-subtle hover:bg-black/[0.04] dark:hover:bg-white/10"
          aria-label="Collapse"
        >
          <ChevronRight className="size-4 -rotate-180" />
        </button>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        <NavSection title="Main menu" items={navMain} />
        <NavSection title="Preferences" items={navSettings} />
        <NavSection title="Billing" items={navBilling} />
      </nav>

      <div className="space-y-2 border-t border-black/[0.06] p-3 dark:border-white/10">
        <div className="flex items-center gap-3 rounded-xl bg-surface-alt px-3 py-2.5 transition-colors dark:bg-zinc-800/80">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sm font-bold text-brand">
            {(displayName ?? meta.logoLetter).slice(0, 1)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{displayName ?? meta.product}</p>
            <p className="truncate text-xs text-ink-muted">{email ?? "affiliate"}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg p-2 text-ink-muted hover:bg-white hover:text-status-error dark:hover:bg-zinc-700"
            aria-label="Logout"
          >
            <LogOut className="size-4" />
          </button>
        </div>
        <a
          href={storefront}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white py-2.5 text-sm font-semibold text-brand shadow-sm transition-colors hover:bg-brand-light dark:border-white/10 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          <Store className="size-4" />
          Your Shop
          <ExternalLink className="size-3.5 opacity-70" />
        </a>
      </div>
    </aside>
  );
}
