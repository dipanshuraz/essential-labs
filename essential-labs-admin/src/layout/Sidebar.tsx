import { NavLink } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  ExternalLink,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Package,
  Settings2,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Store,
  Tag,
  Ticket,
  Users,
  Wallet,
} from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getStorefrontUrl } from "@/config/storefront";

const navMain = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/orders", label: "Order Management", icon: ShoppingCart },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/coupons", label: "Coupon Code", icon: Ticket },
  { to: "/categories", label: "Categories", icon: LayoutGrid },
  { to: "/transactions", label: "Transaction", icon: Wallet },
  { to: "/brand", label: "Brand", icon: Tag },
];

const navProduct = [
  { to: "/products/new", label: "Add Products", icon: Package },
  { to: "/products/media", label: "Product Media", icon: Package },
  { to: "/products", label: "Product List", icon: ShoppingBag },
  { to: "/products/reviews", label: "Product Reviews", icon: ShoppingBag },
];

const navAdmin = [
  { to: "/admin-role", label: "Admin role", icon: Shield },
  { to: "/control", label: "Control Authority", icon: Settings2 },
];

function linkClass(isActive: boolean) {
  return `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? "bg-brand text-white shadow-sm"
      : "text-ink-muted hover:bg-black/[0.04] hover:text-ink dark:hover:bg-white/5"
  }`;
}

export function Sidebar() {
  const { logout, email } = useAuth();
  const storefront = getStorefrontUrl();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-[260px] flex-col border-r border-black/[0.06] bg-white transition-colors dark:border-white/10 dark:bg-zinc-900">
      <div className="flex h-16 items-center gap-2 border-b border-black/[0.06] px-4 dark:border-white/10">
        <div className="flex size-9 items-center justify-center rounded-xl bg-brand text-white font-bold text-sm">
          E
        </div>
        <div className="min-w-0 leading-tight">
          <span className="font-bold text-brand text-sm tracking-tight block truncate">
            Essential Labs
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
            Admin
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

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle mb-2">
            Main menu
          </p>
          <ul className="space-y-0.5">
            {navMain.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => linkClass(isActive)} end={to === "/"}>
                  <Icon className="size-[18px] shrink-0 opacity-90" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle mb-2">
            Product
          </p>
          <ul className="space-y-0.5">
            {navProduct.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => linkClass(isActive)}>
                  <Icon className="size-[18px] shrink-0 opacity-90" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle mb-2">
            Admin
          </p>
          <ul className="space-y-0.5">
            {navAdmin.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => linkClass(isActive)}>
                  <Icon className="size-[18px] shrink-0 opacity-90" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="border-t border-black/[0.06] p-3 space-y-2 dark:border-white/10">
        <div className="flex items-center gap-3 rounded-xl bg-surface-alt px-3 py-2.5 transition-colors dark:bg-zinc-800/80">
          <img
            src="https://i.pravatar.cc/80?img=12"
            alt=""
            className="size-10 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink truncate">Essential Labs</p>
            <p className="text-xs text-ink-muted truncate">{email ?? "admin"}</p>
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

export function TopHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-black/[0.06] bg-white/90 px-6 backdrop-blur transition-colors dark:border-white/10 dark:bg-zinc-900/90">
      <h1 className="text-lg font-bold text-ink shrink-0">{title}</h1>
      <div className="flex-1 max-w-xl mx-auto">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <input
            type="search"
            placeholder="Search data, users, or reports"
            className="w-full rounded-full border border-black/10 bg-surface-alt py-2.5 pl-4 pr-10 text-sm placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand/25 dark:border-white/10 dark:bg-zinc-800 dark:focus:ring-brand/40"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle">
            🔍
          </span>
        </label>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          className="rounded-full p-2.5 text-ink-muted hover:bg-black/[0.04] dark:hover:bg-white/10"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
        </button>
        <ThemeToggle />
        <button
          type="button"
          className="ml-1 rounded-full ring-2 ring-brand/20 overflow-hidden"
          aria-label="Profile"
        >
          <img src="https://i.pravatar.cc/40?img=12" alt="" className="size-9 object-cover" />
        </button>
      </div>
    </header>
  );
}
