"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Cart" },
];

export function SiteHeader() {
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const { count: wishCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 border-b border-[#f0e6de] bg-[#fffdfb]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          href="/"
          className="font-semibold tracking-tight text-[#2d2a28] transition hover:text-[#c45c6a]"
        >
          Panda <span className="text-[#e85d75]">❤️</span> Bamboo
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#5c534d] transition hover:text-[#c45c6a]"
            >
              {item.label}
            </Link>
          ))}
          {session?.user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className="text-sm font-medium text-[#2d5a4a] transition hover:underline"
            >
              Admin
            </Link>
          )}
          {(session?.user?.role === "AFFILIATE" || session?.user?.role === "ADMIN") && (
            <Link
              href="/affiliate"
              className="text-sm font-medium text-[#2d5a4a] transition hover:underline"
            >
              Affiliate
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/wishlist"
            className="hidden text-sm text-[#5c534d] hover:text-[#c45c6a] sm:inline"
            aria-label={`Wishlist, ${wishCount} items`}
          >
            ♥
            {wishCount > 0 && (
              <span className="ml-0.5 text-xs text-[#e85d75]">({wishCount})</span>
            )}
          </Link>
          {session?.user && (
            <Link
              href="/account/orders"
              className="hidden text-sm font-medium text-[#5c534d] hover:text-[#c45c6a] md:inline"
            >
              Orders
            </Link>
          )}
          <Link
            href="/cart"
            className="relative rounded-full border border-[#eadfd6] bg-white px-3 py-1.5 text-sm font-medium text-[#2d2a28] shadow-sm transition hover:border-[#c45c6a]/40"
          >
            Bag
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e85d75] px-1 text-xs text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
          {session?.user ? (
            <div className="flex items-center gap-2">
              <span className="hidden max-w-[140px] truncate text-xs text-[#7a716b] sm:inline">
                {session.user.email}
              </span>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full bg-[#2d2a28] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#c45c6a]"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="rounded-full px-3 py-1.5 text-xs font-medium text-[#5c534d] hover:text-[#c45c6a]"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[#e85d75] px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-[#d14d66]"
              >
                Join
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-4 border-t border-[#f5ebe3] px-4 py-2 md:hidden">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-xs font-medium text-[#5c534d]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
