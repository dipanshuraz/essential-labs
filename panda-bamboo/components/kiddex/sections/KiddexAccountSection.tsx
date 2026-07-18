"use client";

import Link from "next/link";
import Image from "next/image";
import { useShop } from "@/components/shop/ShopProvider";
import { asset } from "@/lib/assets";
import { formatPrice } from "@/lib/catalog";
import { productDetailsHref } from "@/lib/kiddex-links";
import { ACCOUNT_HISTORY } from "@/lib/kiddex-home-content";
import { useState } from "react";

const TABS = [
  { id: "tab-1", label: "Personal Information" },
  { id: "tab-2", label: "Billing and Payments" },
  { id: "tab-3", label: "Oder History" },
  { id: "tab-4", label: "Wishlist" },
] as const;

export function KiddexAccountSection() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("tab-1");
  const { getWishlistProducts } = useShop();
  const wishlistItems = getWishlistProducts();

  return (
    <section className="account-section pb_120">
      <div className="large-container">
        <div className="sec-title centred mb_60">
          <h2>
            User <span>Account</span>
          </h2>
        </div>
        <div className="inner-container">
          <div className="tabs-box">
            <div className="account-info">
              <div className="upper-box centred mb_40">
                <figure className="image-box">
                  <img src={asset("resource/account-1.png")} alt="" />
                </figure>
                <h4>Ridoy Rock</h4>
                <a href="mailto:rodiyrock@gmail.com">rodiyrock@gmail.com</a>
              </div>
              <ul className="tab-btns tab-buttons clearfix">
                {TABS.map((tab) => (
                  <li
                    key={tab.id}
                    className={`tab-btn${activeTab === tab.id ? " active-btn" : ""}`}
                    data-tab={`#${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setActiveTab(tab.id);
                    }}
                    role="tab"
                    tabIndex={0}
                  >
                    {tab.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tabs-content">
              <div className={`tab${activeTab === "tab-1" ? " active-tab" : ""}`} id="tab-1">
                <div className="personal-info">
                  <h3>Personal Information</h3>
                  <p>
                    Manage your personal information, including phone numbers and email adress where
                    you can be contacted
                  </p>
                  <div className="row clearfix">
                    {[
                      { label: "Name", value: "Ridoy Rock" },
                      { label: "Date of Birth", value: "02 July 2000" },
                      { label: "Address", value: "Dhaka, Bangladesh" },
                      { label: "Email", value: "ridoyrock@gmail.com", href: true },
                    ].map((field) => (
                      <div key={field.label} className="col-xl-3 col-lg-6 col-md-12 single-column">
                        <div className="single-item">
                          <h6>{field.label}</h6>
                          <span>
                            {"href" in field ? (
                              <a href="mailto:ridoyrock@gmail.com">{field.value}</a>
                            ) : (
                              field.value
                            )}
                          </span>
                          <button type="button">Edit</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={`tab${activeTab === "tab-2" ? " active-tab" : ""}`} id="tab-2">
                <h3>Billing and Payments</h3>
                <div className="payment-option">
                  <div className="bank-payment">
                    <div className="check-box mb_12">
                      <input className="check" type="radio" id="account-bank" name="account-payment" defaultChecked />
                      <label htmlFor="account-bank">Direct Bank Transfer</label>
                    </div>
                    <p>
                      Make your payment directly into our bank account. Please use your Order ID as
                      payment reference.
                    </p>
                  </div>
                  <ul className="other-payment">
                    <li>
                      <div className="check-box mb_12">
                        <input className="check" type="radio" id="account-cod" name="account-payment" />
                        <label htmlFor="account-cod">Cash on Delivery</label>
                      </div>
                    </li>
                    <li>
                      <div className="check-box mb_12">
                        <input className="check" type="radio" id="account-card" name="account-payment" />
                        <label htmlFor="account-card">Credit/Debit Cards or Paypal</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`tab${activeTab === "tab-3" ? " active-tab" : ""}`} id="tab-3">
                <h3>Oder History</h3>
                <div className="history-box">
                  {ACCOUNT_HISTORY.map((row) => (
                    <div key={row.orderId} className="single-history">
                      <div className="product-box">
                        <figure className="image-box">
                          <img src={asset(row.image)} alt="" />
                        </figure>
                        <div className="product-info">
                          <h6>
                            <Link href="/shop-details">{row.name}</Link>
                          </h6>
                          <span>{row.orderId}</span>
                          <h4>{row.price}</h4>
                        </div>
                      </div>
                      <span className="text">{row.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`tab${activeTab === "tab-4" ? " active-tab" : ""}`} id="tab-4">
                <h3>Wishlist</h3>
                {wishlistItems.length === 0 ? (
                  <p>
                    No Wishlist.{" "}
                    <Link href="/wishlist">View wishlist page</Link>
                  </p>
                ) : (
                  <div className="history-box">
                    {wishlistItems.map((product) => (
                      <div key={product.id} className="single-history">
                        <div className="product-box">
                          <figure className="image-box">
                            <Image src={asset(product.image)} alt={product.name} width={64} height={64} />
                          </figure>
                          <div className="product-info">
                            <h6>
                              <Link href={productDetailsHref(product.slug)}>{product.name}</Link>
                            </h6>
                            <h4>{formatPrice(product.price)}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
