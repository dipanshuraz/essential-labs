"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useShop } from "@/components/shop/ShopProvider";
import { formatPrice } from "@/lib/catalog";
import { productDetailsHref } from "@/lib/kiddex-links";
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COUNTRIES,
  SHIPPING_OPTIONS,
} from "@/lib/kiddex-cart-content";
import { asset } from "@/lib/assets";

export function KiddexCartSection() {
  const router = useRouter();
  const { getCartProducts, cartSubtotal, updateCartQty, removeFromCart } = useShop();
  const entries = getCartProducts();

  const [shippingId, setShippingId] = useState<string>(SHIPPING_OPTIONS[0].id);
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState<string>(SHIPPING_COUNTRIES[0]);

  const shippingCost = useMemo(() => {
    return SHIPPING_OPTIONS.find((o) => o.id === shippingId)?.price ?? 0;
  }, [shippingId]);

  const total = cartSubtotal + shippingCost;

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingPercent = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <section className="cart-section pb_150">
      <div className="large-container">
        <div className="sec-title centred pb_30">
          <h2>
            Your <span>Cart</span>
          </h2>
        </div>
        {entries.length === 0 ? (
          <p className="centred">
            Your cart is empty.{" "}
            <Link href="/shop" className="theme-btn btn-one">
              Continue shopping
            </Link>
          </p>
        ) : (
          <>
            <div className="row clearfix">
              <div className="col-lg-9 col-md-12 col-sm-12 content-side">
                <div className="target-price mb_30">
                  <p>
                    {amountToFreeShipping > 0 ? (
                      <>
                        Add <span>{formatPrice(amountToFreeShipping)}</span> to cart and get free shiping
                      </>
                    ) : (
                      <>
                        You qualify for <span>free shipping</span>
                      </>
                    )}
                  </p>
                  <div className="progress-box">
                    <div className="bar">
                      <div
                        className="bar-inner count-bar"
                        data-percent={`${freeShippingPercent}%`}
                        style={{ width: `${freeShippingPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="table-outer mb_30">
                  <table className="cart-table">
                    <thead className="cart-header">
                      <tr>
                        <th>product</th>
                        <th>price</th>
                        <th>quantity</th>
                        <th>total</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map(({ line, product }) => (
                        <tr key={`${product.id}-${line.size ?? ""}`}>
                          <td className="product-column">
                            <div className="product-box">
                              <figure className="image-box">
                                <img src={asset(product.image)} alt={product.name} />
                              </figure>
                              <h6>
                                <Link href={productDetailsHref(product.slug)}>{product.name}</Link>
                              </h6>
                            </div>
                          </td>
                          <td>{formatPrice(product.price)}</td>
                          <td className="qty">
                            <div className="item-quantity">
                              <input
                                className="quantity-spinner"
                                type="number"
                                min={1}
                                value={line.qty}
                                onChange={(e) =>
                                  updateCartQty(
                                    product.id,
                                    line.size,
                                    Math.max(1, Number(e.target.value) || 1),
                                  )
                                }
                                name="quantity"
                              />
                            </div>
                          </td>
                          <td>{formatPrice(product.price * line.qty)}</td>
                          <td>
                            <button
                              type="button"
                              className="cancel-btn"
                              onClick={() => removeFromCart(product.id, line.size)}
                              aria-label="Remove item"
                            >
                              <i className="far fa-times" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 sidebar-side">
                <div className="total-cart mb_30">
                  <div className="title-box">
                    <h4>Subtotal</h4>
                    <h5>{formatPrice(cartSubtotal)}</h5>
                  </div>
                  <div className="shipping-cost mb_40">
                    <h4>Shipping</h4>
                    <ul className="cost-list">
                      {SHIPPING_OPTIONS.map((option) => (
                        <li key={option.id}>
                          <div className="check-box">
                            <input
                              className="check"
                              type="radio"
                              id={option.id}
                              name="cart-shipping"
                              checked={shippingId === option.id}
                              onChange={() => setShippingId(option.id)}
                            />
                            <label htmlFor={option.id}>{option.label}</label>
                          </div>
                          <span className="price">+{formatPrice(option.price)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="shipping-calculator">
                    <h4>Calculate Shipping</h4>
                    <div className="form-group">
                      <div className="select-box">
                        <select
                          className="wide"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          {SHIPPING_COUNTRIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="zip"
                        placeholder="Postcode / ZIP"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <button className="theme-btn btn-one" type="button">
                        Update Cart
                      </button>
                    </div>
                  </div>
                  <div className="total-box">
                    <h4>Total</h4>
                    <h5>{formatPrice(total)}</h5>
                  </div>
                  <div className="btn-box">
                    <button
                      type="button"
                      className="theme-btn btn-one"
                      onClick={() => router.push("/checkout")}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="coupon-box">
              <div className="form-group">
                <input type="text" name="coupon" placeholder="Apply Coupon" />
                <button type="button" aria-label="Apply coupon">
                  <i className="icon-18" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
