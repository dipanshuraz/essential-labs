import { NavLink } from "react-router-dom";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  Link2,
  LogOut,
  Mail,
  Plug,
  Settings,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
  Wallet,
} from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import { Badge } from "@/components/ui/Badge";
import { useSidebarStore } from "@/stores/useSidebarStore";

import type { ComponentType } from "react";

type NavItem = { to: string; label: string; icon: ComponentType<{ className?: string }>; badge?: string };

const dashboardItems: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/marketplace", label: "Marketplace", icon: Store },
  { to: "/affiliates", label: "Affiliates", icon: Users },
  { to: "/transactions", label: "Transactions", icon: Wallet, badge: "New" },
  { to: "/referrals", label: "Referrals", icon: Link2 },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/payouts", label: "Payouts", icon: ShoppingBag },
];

const prefItems: NavItem[] = [
  { to: "/settings/campaign", label: "Campaign Settings", icon: Settings },
  { to: "/settings/integrations", label: "Integrations", icon: Plug },
  { to: "/settings/email", label: "Email Settings", icon: Mail, badge: "New" },
];

const billingItems: NavItem[] = [{ to: "/billing/subscriptions", label: "Subscriptions", icon: CreditCard }];

function navClass(active: boolean, collapsed: boolean) {
  const base = collapsed
    ? "relative group flex items-center justify-center rounded-lg px-2 py-2.5 text-sm font-medium transition-colors"
    : "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors";
  const state = active
    ? "bg-white text-primary shadow-sm dark:bg-zinc-800 dark:text-primary"
    : "text-ink-muted hover:bg-white/60 hover:text-ink dark:hover:bg-zinc-800/80";
  return `${base} ${state}`;
}

function NavGroup({ title, items, collapsed }: { title: string; items: NavItem[]; collapsed: boolean }) {
  return (
    <div>
      <p
        className={`mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle transition-opacity ${
          collapsed ? "sr-only" : "px-3"
        }`}
      >
        {title}
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === "/"}
              title={collapsed ? item.label : undefined}
              aria-label={collapsed ? item.label : undefined}
              className={({ isActive }) => navClass(isActive, collapsed)}
            >
              <item.icon className="size-[18px] shrink-0 opacity-90" />
              {!collapsed ? (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge ? <Badge variant="new">{item.badge}</Badge> : null}
                  <ChevronRight className="size-4 opacity-0 transition-opacity group-hover:opacity-40" />
                </>
              ) : item.badge ? (
                <span className="absolute right-1 top-1 size-1.5 rounded-full bg-status-info" aria-hidden />
              ) : null}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TrakrSidebar() {
  const { logout, email, displayName } = useAuth();
  const collapsed = useSidebarStore((s) => s.collapsed);
  const toggle = useSidebarStore((s) => s.toggle);

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 ease-out dark:border-white/10 dark:bg-zinc-900 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      <div className="flex h-14 shrink-0 items-center border-b border-sidebar-border px-2 dark:border-white/10">
        {collapsed ? (
          <div className="flex w-full flex-col items-center gap-1 py-1.5">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              K
            </div>
            <button
              type="button"
              onClick={toggle}
              className="rounded-lg p-1 text-ink-subtle hover:bg-black/5 dark:hover:bg-white/10"
              aria-expanded={false}
              aria-label="Expand sidebar"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between gap-2 pl-1 pr-0">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                K
              </div>
              <span className="truncate font-bold tracking-tight text-ink dark:text-zinc-100">Kiddex Affiliate</span>
            </div>
            <button
              type="button"
              onClick={toggle}
              className="shrink-0 rounded-lg p-1.5 text-ink-subtle hover:bg-black/5 dark:hover:bg-white/10"
              aria-expanded
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="size-4" />
            </button>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto overflow-x-hidden px-2 py-4 md:px-3">
        <NavGroup title="Dashboard" items={dashboardItems} collapsed={collapsed} />
        <NavGroup title="Preferences" items={prefItems} collapsed={collapsed} />
        <NavGroup title="Billing" items={billingItems} collapsed={collapsed} />
      </nav>

      <div className="border-t border-sidebar-border p-2 md:p-3 dark:border-white/10">
        {!collapsed ? (
          <div className="rounded-xl border border-sidebar-border bg-white p-3 shadow-sm dark:border-white/10 dark:bg-zinc-800/80">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-ink">Upgrade to Pro</span>
              <Badge variant="primary">Pro</Badge>
            </div>
            <p className="mt-2 text-xs text-ink-muted">1,320 Credit left</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-muted">
              <div className="h-full w-[72%] rounded-full bg-primary" />
            </div>
            <button type="button" className="btn-primary mt-3 w-full text-xs !py-2">
              Upgrade Plan
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              title="Upgrade to Pro"
              className="flex size-10 items-center justify-center rounded-xl border border-sidebar-border bg-white text-primary shadow-sm dark:border-white/10 dark:bg-zinc-800"
            >
              <Sparkles className="size-4" />
            </button>
          </div>
        )}

        <div
          className={`mt-3 flex items-center rounded-xl border border-sidebar-border bg-white dark:border-white/10 dark:bg-zinc-800/80 ${
            collapsed ? "flex-col gap-2 px-2 py-3" : "gap-3 px-3 py-2.5"
          }`}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
            {(displayName ?? "K").slice(0, 1)}
          </div>
          {!collapsed ? (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{displayName ?? "Kathryn Murphy"}</p>
                <p className="truncate text-xs text-ink-muted">{email ?? ""}</p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg p-2 text-ink-muted hover:bg-surface-muted dark:hover:bg-zinc-700"
                aria-label="Logout"
              >
                <LogOut className="size-4" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={logout}
              className="rounded-lg p-2 text-ink-muted hover:bg-surface-muted dark:hover:bg-zinc-700"
              aria-label="Logout"
            >
              <LogOut className="size-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
