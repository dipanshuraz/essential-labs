"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useShop } from "@/components/shop/ShopProvider";
import { asset } from "@/lib/assets";
import { mainNav } from "@/lib/navigation";

function HeaderSearch({ action = "/" }: { action?: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <div className="search-box">
      <form action={action} onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="search"
            name="search-field"
            placeholder="Search Products"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            required
          />
          <button type="submit">
            <i className="icon-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

function HeaderOptions() {
  const { cartCount, wishlistIds } = useShop();

  return (
    <ul className="option-list">
      <li className="category-toggle nav-toggle">
        <span className="line line1" />
        <span className="line line2" />
        <span className="line line3" />
      </li>
      <li>
        <Link href="/account/wishlist" aria-label="Wishlist">
          <i className="far fa-heart" />
          {wishlistIds.length > 0 ? <span className="kiddex-badge">{wishlistIds.length}</span> : null}
        </Link>
      </li>
      <li className="shop-cart cart-toggler">
        <button type="button">
          <i className="far fa-shopping-bag" />
          <span>{cartCount}</span>
        </button>
      </li>
      <li>
        <Link href="/login">
          <i className="far fa-user" />
        </Link>
      </li>
    </ul>
  );
}

export function KiddexHeader() {
  return (
    <header className="main-header header-style-one">
      <div className="header-top">
        <div className="large-container">
          <div className="top-inner">
            <ul className="info-list">
              <li>
                <i className="icon-1" />
                <span>Kidswear · Mon – Fri 8am – 6pm</span>
              </li>
              <li className="chat-toggler">
                <i className="icon-2" />
                <span>Live Chat</span>
              </li>
            </ul>
            <div className="text">
              <p>
                Supper Value Deals — <span>Save more with coupons WINTER15</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="header-lower p_relative">
        <div className="shape" style={{ backgroundImage: `url(${asset("shape/shape-1.png")})` }} />
        <div className="large-container">
          <div className="outer-box">
            <figure className="logo-box">
              <Link href="/">
                <Image src={asset("logo.png")} alt="Kiddex" width={140} height={48} priority />
              </Link>
            </figure>
            <div className="support-box">
              <div className="icon-box">
                <i className="icon-2" />
              </div>
              <div className="inner">
                <h3>
                  <a href="tel:912345678">91 2345 678</a>
                </h3>
                <span>Call out Hotline 24/7</span>
              </div>
            </div>
            <div className="menu-area">
              <div className="mobile-nav-toggler">
                <i className="icon-bar" />
                <i className="icon-bar" />
                <i className="icon-bar" />
              </div>
              <nav className="main-menu navbar-expand-md navbar-light clearfix">
                <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                  <ul className="navigation clearfix">
                    {mainNav.map((item) => (
                      <li key={item.label} className={item.children ? "dropdown" : undefined}>
                        {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
                        {item.children ? (
                          <ul>
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link href={child.href}>{child.label}</Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
            <div className="menu-right-content">
              <HeaderSearch />
              <HeaderOptions />
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-header">
        <div className="large-container">
          <div className="outer-box">
            <figure className="logo-box">
              <Link href="/">
                <Image src={asset("logo.png")} alt="Kiddex" width={120} height={40} />
              </Link>
            </figure>
            <div className="menu-area">
              <nav className="main-menu clearfix" />
            </div>
            <div className="menu-right-content">
              <HeaderSearch />
              <HeaderOptions />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
