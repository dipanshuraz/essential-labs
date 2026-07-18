"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useShop } from "@/components/shop/ShopProvider";
import { formatPrice } from "@/lib/catalog";
import { asset } from "@/lib/assets";

export function KiddexCheckoutSection() {
  const router = useRouter();
  const { getCartProducts, cartSubtotal, clearCart } = useShop();
  const entries = getCartProducts();
  const [placed, setPlaced] = useState(false);
  const [payment, setPayment] = useState("bank");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPlaced(true);
    clearCart();
    window.setTimeout(() => router.push("/order-confirmation"), 1200);
  }

  if (entries.length === 0 && !placed) {
    return (
      <section className="checkout-section pb_150">
        <div className="large-container centred">
          <p>Your cart is empty.</p>
          <Link href="/shop" className="theme-btn btn-one">
            Shop kidswear
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-section pb_150">
      <div className="large-container">
        <div className="sec-title centred pb_30">
          <h2>
            The <span>Checkout</span>
          </h2>
        </div>
        {placed ? (
          <p className="centred">Order placed! Confirming your order…</p>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="row clearfix">
              <div className="col-lg-8 col-md-12 col-sm-12 billing-column">
                <div className="billing-content mr_30">
                  <h3>Billing Details</h3>
                  <div className="form-inner">
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-6 col-sm-12 field-column">
                        <div className="form-group">
                          <label>
                            First Name<span>*</span>
                          </label>
                          <input type="text" name="fname" required defaultValue="Demo" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 field-column">
                        <div className="form-group">
                          <label>
                            Last Name<span>*</span>
                          </label>
                          <input type="text" name="lname" required defaultValue="Shopper" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 field-column">
                        <div className="form-group">
                          <label>
                            Email Address<span>*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            defaultValue="shopper@kiddex.com"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 field-column">
                        <div className="form-group">
                          <label>
                            Phone Number<span>*</span>
                          </label>
                          <input type="text" name="phone" required defaultValue="9123456780" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 field-column">
                        <div className="form-group">
                          <label>
                            Address<span>*</span>
                          </label>
                          <input type="text" name="address" required defaultValue="12 MG Road" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 field-column">
                        <div className="form-group">
                          <label>
                            Town / City<span>*</span>
                          </label>
                          <input type="text" name="city" required defaultValue="Mumbai" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 field-column">
                        <div className="form-group">
                          <label>
                            Postcode / ZIP<span>*</span>
                          </label>
                          <input type="text" name="zip" required defaultValue="400001" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="other-address">
                    <h3>Shipping Address</h3>
                    <div className="check-box-two">
                      <input className="check" type="checkbox" id="ship-diff" />
                      <label htmlFor="ship-diff">Ship to a different address</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 order-column">
                <div className="order-box">
                  <h3>Order Summary</h3>
                  <div className="order-info">
                    <div className="title-box">
                      <span className="text">Product</span>
                      <span className="text">total</span>
                    </div>
                    <div className="order-product">
                      {entries.map(({ line, product }) => (
                        <div key={`${product.id}-${line.size ?? ""}`} className="single-item">
                          <div className="product-box">
                            <figure className="image-box">
                              <img src={asset(product.image)} alt="" />
                            </figure>
                            <h6>{product.name}</h6>
                          </div>
                          <h4>{formatPrice(product.price * line.qty)}</h4>
                        </div>
                      ))}
                    </div>
                    <ul className="cost-box">
                      <li>
                        <h4>
                          <span>Subtotal</span>
                        </h4>
                        <h4>{formatPrice(cartSubtotal)}</h4>
                      </li>
                      <li>
                        <h4>
                          <span>Free Shipping</span>
                        </h4>
                        <h4>
                          <span>{formatPrice(0)}</span>
                        </h4>
                      </li>
                    </ul>
                    <div className="total-box">
                      <h4>
                        <span>Total</span>
                      </h4>
                      <h4>{formatPrice(cartSubtotal)}</h4>
                    </div>
                    <div className="payment-option">
                      <div className="bank-payment">
                        <div className="check-box mb_12">
                          <input
                            className="check"
                            type="radio"
                            id="pay-bank"
                            name="payment"
                            checked={payment === "bank"}
                            onChange={() => setPayment("bank")}
                          />
                          <label htmlFor="pay-bank">Direct Bank Transfer</label>
                        </div>
                        <p>
                          Make your payment directly into our bank account. Please use your Order ID
                          as payment reference.
                        </p>
                      </div>
                      <ul className="other-payment">
                        <li>
                          <div className="check-box mb_12">
                            <input
                              className="check"
                              type="radio"
                              id="pay-cod"
                              name="payment"
                              checked={payment === "cod"}
                              onChange={() => setPayment("cod")}
                            />
                            <label htmlFor="pay-cod">Cash on Delivery</label>
                          </div>
                        </li>
                        <li>
                          <div className="check-box mb_12">
                            <input
                              className="check"
                              type="radio"
                              id="pay-card"
                              name="payment"
                              checked={payment === "card"}
                              onChange={() => setPayment("card")}
                            />
                            <label htmlFor="pay-card">Credit/Debit Cards or UPI</label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="btn-box pt_30">
                      <button type="submit" className="theme-btn btn-one">
                        Make Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
