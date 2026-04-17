"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";

const IMG = "/kiddex/assets/images";

export function KiddexHeader() {
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const { count: wishCount } = useWishlist();
  const cartBadge = totalItems > 99 ? "99+" : String(totalItems);

  return (
    <header className="main-header header-style-two">
      <div className="header-top">
        <div className="large-container">
          <div className="top-inner">
            <ul className="info-list">
              <li>
                <i className="icon-1" />
                <span>Open Hours: Mon - Fri 8am - 6pm</span>
              </li>
              <li className="chat-toggler">
                <i className="icon-2" />
                <span>Live Chat</span>
              </li>
            </ul>
            <div className="text">
              <p>
                Panda <span className="text">❤️ Bamboo</span> — sustainable fits
              </p>
            </div>
            <div className="right-column">
              <div className="language-picker js-language-picker" data-trigger-class="btn btn--subtle">
                <form action="/" className="language-picker__form">
                  <label htmlFor="language-picker-select">Select your language</label>
                  <select name="language-picker-select" id="language-picker-select" defaultValue="english">
                    <option lang="en" value="english">
                      EN
                    </option>
                  </select>
                </form>
              </div>
              <div className="currency-box">
                <div className="icon-box">
                  <img src={`${IMG}/icons/icon-1.png`} alt="" />
                </div>
                <div className="select-box">
                  <select className="wide" defaultValue="usd">
                    <option data-display="usd" value="usd">
                      usd
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-lower p_relative">
        <div className="large-container">
          <div className="outer-box">
            <div className="search-inner">
              <form action="/shop" method="get" role="search">
                <div className="form-group">
                  <input type="search" name="q" placeholder="Search Products" />
                  <button type="submit">
                    <i className="icon-4" />
                  </button>
                </div>
              </form>
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
                    <li className="current">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="dropdown">
                      <Link href="/shop">Shop</Link>
                      <div className="megamenu">
                        <div className="row clearfix">
                          <div className="col-xl-3 column">
                            <ul>
                              <li>
                                <h5>Browse</h5>
                              </li>
                              <li>
                                <Link href="/shop">All products</Link>
                              </li>
                              <li>
                                <Link href="/shop?q=new">Search</Link>
                              </li>
                              <li>
                                <Link href="/wishlist">Wishlist</Link>
                              </li>
                            </ul>
                          </div>
                          <div className="col-xl-3 column">
                            <ul>
                              <li>
                                <h5>Checkout</h5>
                              </li>
                              <li>
                                <Link href="/cart">Cart</Link>
                              </li>
                              <li>
                                <Link href="/checkout">Checkout</Link>
                              </li>
                              <li>
                                <Link href="/account/orders">Orders</Link>
                              </li>
                            </ul>
                          </div>
                          <div className="col-xl-3 column">
                            <ul>
                              <li>
                                <h5>Info</h5>
                              </li>
                              <li>
                                <Link href="/about">About</Link>
                              </li>
                              <li>
                                <Link href="/shipping">Shipping</Link>
                              </li>
                              <li>
                                <Link href="/contact">Contact</Link>
                              </li>
                            </ul>
                          </div>
                          <div className="col-xl-3 column">
                            <ul>
                              <li>
                                <h5>Account</h5>
                              </li>
                              <li>
                                <Link href="/login">Login</Link>
                              </li>
                              <li>
                                <Link href="/register">Register</Link>
                              </li>
                              <li>
                                <Link href="/affiliate">Affiliate</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="advice-box">
                          <span className="text">Panda Bamboo</span>
                          <h3>Soft everyday layers</h3>
                          <h4>
                            <span>From</span> our shop
                          </h4>
                          <Link href="/shop" className="theme-btn btn-one">
                            Shop now
                          </Link>
                          <figure className="image-box p_absolute r_0 b_0">
                            <img src={`${IMG}/resource/ads-7.png`} alt="" />
                          </figure>
                        </div>
                      </div>
                    </li>
                    <li>
                      <Link href="/shop?tag=sale">Sale</Link>
                    </li>
                    <li className="logo-box">
                      <figure className="logo">
                        <Link href="/">
                          <img src={`${IMG}/logo.png`} alt="Panda Bamboo" />
                        </Link>
                      </figure>
                    </li>
                    <li className="dropdown">
                      <Link href="/about">Pages</Link>
                      <ul>
                        <li>
                          <Link href="/about">About Us</Link>
                        </li>
                        <li>
                          <Link href="/account/orders">My Account</Link>
                        </li>
                        <li>
                          <Link href="/login">Login</Link>
                        </li>
                        <li>
                          <Link href="/register">Register</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="menu-right-content">
              <ul className="option-list">
                <li className="category-toggle nav-toggle">
                  <span className="line line1" />
                  <span className="line line2" />
                  <span className="line line3" />
                </li>
                <li>
                  <Link href="/wishlist" title={wishCount > 0 ? `Wishlist (${wishCount})` : "Wishlist"}>
                    <i className="far fa-heart" />
                  </Link>
                </li>
                <li className="shop-cart cart-toggler">
                  <button type="button" aria-label={`Shopping bag, ${totalItems} items`}>
                    <i className="far fa-shopping-bag" />
                    {totalItems > 0 ? <span>{cartBadge}</span> : null}
                  </button>
                </li>
                <li>
                  {session?.user ? (
                    <button type="button" onClick={() => signOut({ callbackUrl: "/" })} aria-label="Sign out">
                      <i className="far fa-user" />
                    </button>
                  ) : (
                    <Link href="/login" aria-label="Log in">
                      <i className="far fa-user" />
                    </Link>
                  )}
                </li>
                {session?.user?.role === "ADMIN" ? (
                  <li>
                    <Link href="/admin" className="text-xs font-semibold">
                      Admin
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-header">
        <div className="large-container">
          <div className="outer-box">
            <div className="search-inner">
              <form action="/shop" method="get" role="search">
                <div className="form-group">
                  <input type="search" name="q" placeholder="Search Products" />
                  <button type="submit">
                    <i className="icon-4" />
                  </button>
                </div>
              </form>
            </div>
            <div className="menu-area">
              <nav className="main-menu clearfix">
                {/* Cloned by script.js from the header menu */}
              </nav>
            </div>
            <div className="menu-right-content">
              <ul className="option-list">
                <li className="category-toggle nav-toggle">
                  <span className="line line1" />
                  <span className="line line2" />
                  <span className="line line3" />
                </li>
                <li>
                  <Link href="/wishlist">
                    <i className="far fa-heart" />
                  </Link>
                </li>
                <li className="shop-cart cart-toggler">
                  <button type="button" aria-label="Shopping bag">
                    <i className="far fa-shopping-bag" />
                    {totalItems > 0 ? <span>{cartBadge}</span> : null}
                  </button>
                </li>
                <li>
                  <Link href="/login">
                    <i className="far fa-user" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
