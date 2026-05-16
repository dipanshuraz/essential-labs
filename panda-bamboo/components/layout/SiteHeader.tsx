"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "@/design-system";
import { useShop } from "@/components/shop/ShopProvider";
import { asset } from "@/lib/assets";
import { mainNav } from "@/lib/navigation";
import { cn } from "@/design-system/cn";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [headerQ, setHeaderQ] = useState("");
  const router = useRouter();
  const { cartCount, wishlistIds } = useShop();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="border-b border-border bg-ink text-white">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs sm:px-6">
          <p>Kidswear for every age · Free shipping offers on select styles</p>
          <p>
            Coupon <span className="font-semibold text-theme">WINTER15</span> — extra 15% off winterwear
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="shrink-0">
          <Image src={asset("logo.png")} alt="Kiddex" width={140} height={48} className="h-10 w-auto" priority />
        </Link>

        <form
          className="order-last hidden w-full max-w-md flex-1 gap-2 md:order-none md:flex lg:max-w-lg"
          onSubmit={(e) => {
            e.preventDefault();
            const q = headerQ.trim();
            router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
          }}
        >
          <Input
            type="search"
            value={headerQ}
            onChange={(e) => setHeaderQ(e.target.value)}
            placeholder="Search kidswear…"
            className="flex-1"
            aria-label="Search"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-theme px-4 py-2 text-sm font-semibold text-white hover:bg-theme-dark"
          >
            Search
          </button>
        </form>

        <button
          type="button"
          className="rounded-lg border border-border p-2 lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-ink" />
          <span className="mt-1 block h-0.5 w-6 bg-ink" />
          <span className="mt-1 block h-0.5 w-6 bg-ink" />
        </button>

        <nav
          className={cn(
            "w-full lg:block lg:w-auto",
            open ? "border-b border-border py-4 lg:border-0 lg:py-0" : "hidden",
          )}
        >
          <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-5">
            {mainNav.map((item) => (
              <li key={item.label} className="group relative">
                {item.href ? (
                  <Link href={item.href} className="block py-2 font-semibold text-ink hover:text-theme lg:py-0">
                    {item.label}
                  </Link>
                ) : (
                  <span className="block py-2 font-semibold text-ink lg:py-0">{item.label}</span>
                )}
                {item.children ? (
                  <ul className="lg:absolute lg:left-0 lg:top-full lg:min-w-[200px] lg:rounded-xl lg:border lg:border-border lg:bg-white lg:p-2 lg:opacity-0 lg:shadow-card lg:transition group-hover:lg:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface hover:text-theme"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/account/wishlist"
            className="hidden rounded-full border border-border px-3 py-2 text-sm font-semibold text-ink hover:border-theme sm:inline-flex"
          >
            ♥ {wishlistIds.length}
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full bg-theme-light px-4 py-2 text-sm font-semibold text-theme"
          >
            Cart · {cartCount}
          </Link>
          <Button href="/shop" size="sm" className="hidden sm:inline-flex">
            Shop
          </Button>
        </div>
      </div>
    </header>
  );
}
