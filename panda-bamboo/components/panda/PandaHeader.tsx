"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useShopOptional } from "@/components/shop/ShopProvider";
import { PANDA_NAV } from "@/lib/panda-content";
import { IconBag, IconClose, IconMenu, IconSearch, IconUser } from "@/components/panda/icons";

export function PandaHeader() {
  const shop = useShopOptional();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const cartCount = shop?.cartCount ?? 0;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setOpen(false);
  }

  return (
    <header className="pl-header">
      <div className="pl-container pl-header__inner">
        <Link href="/" className="pl-logo" aria-label="Panda Loves Bamboo home">
          <span className="pl-logo__mark" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c2 0 3.4 1.2 3.9 3.1C18.3 5.6 20 7 20 9.5c0 3.3-3.6 6-8 9-4.4-3-8-5.7-8-9C4 7 5.7 5.6 8.1 6.1 8.6 4.2 10 3 12 3Z" />
            </svg>
          </span>
          Panda&nbsp;Loves&nbsp;Bamboo
        </Link>

        <nav className="pl-nav" aria-label="Primary">
          {PANDA_NAV.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="pl-header__actions">
          <form
            onSubmit={submitSearch}
            role="search"
            style={{ display: "contents" }}
            aria-label="Search products"
          >
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search"
              style={{
                height: 44,
                width: 0,
                opacity: 0,
                position: "absolute",
                pointerEvents: "none",
              }}
            />
            <button className="pl-icon-btn" aria-label="Search" type="submit">
              <IconSearch />
            </button>
          </form>
          <Link href="/account" className="pl-icon-btn" aria-label="Account">
            <IconUser />
          </Link>
          <Link href="/cart" className="pl-icon-btn" aria-label="Cart">
            <IconBag />
            {cartCount > 0 && <span className="pl-badge">{cartCount}</span>}
          </Link>
          <button
            className="pl-icon-btn pl-burger"
            aria-label="Open menu"
            type="button"
            onClick={() => setOpen(true)}
          >
            <IconMenu />
          </button>
        </div>
      </div>

      <div className="pl-drawer" data-open={open}>
        <div className="pl-drawer__scrim" onClick={() => setOpen(false)} />
        <div className="pl-drawer__panel">
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}
          >
            <span className="pl-logo" style={{ fontSize: 18 }}>
              Panda Loves Bamboo
            </span>
            <button className="pl-icon-btn" aria-label="Close menu" type="button" onClick={() => setOpen(false)}>
              <IconClose />
            </button>
          </div>
          {PANDA_NAV.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/account" onClick={() => setOpen(false)}>
            Account
          </Link>
          <Link href="/cart" onClick={() => setOpen(false)}>
            Cart{cartCount > 0 ? ` (${cartCount})` : ""}
          </Link>
        </div>
      </div>
    </header>
  );
}
