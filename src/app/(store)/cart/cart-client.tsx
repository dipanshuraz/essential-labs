"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/cart-context";
import {
  FLAT_RATE_CENTS,
  FREE_SHIPPING_THRESHOLD_CENTS,
  shippingCentsForSubtotal,
} from "@/lib/shipping";
import { DUMMY_PRODUCT_IMAGE, formatMoney } from "@/lib/format";

type PreviewItem = {
  id: string;
  name: string;
  slug: string;
  priceCents: number;
  stock: number;
  image: string | null;
};

export function CartClient() {
  const { lines, setQty, remove, totalItems } = useCart();
  const [items, setItems] = useState<PreviewItem[]>([]);

  const idsKey = useMemo(
    () =>
      lines
        .map((l) => l.productId)
        .sort()
        .join(","),
    [lines],
  );

  useEffect(() => {
    if (lines.length === 0) return;
    const params = new URLSearchParams();
    lines.forEach((l) => params.append("id", l.productId));
    fetch(`/api/cart-preview?${params.toString()}`)
      .then((r) => r.json())
      .then((d: { items: PreviewItem[] }) => setItems(d.items))
      .catch(() => setItems([]));
  }, [idsKey, lines]);

  const lineMap = useMemo(() => Object.fromEntries(lines.map((l) => [l.productId, l.quantity])), [lines]);

  const rows = useMemo(() => {
    if (lines.length === 0) return [];
    return items.map((p) => ({
      ...p,
      quantity: lineMap[p.id] ?? 0,
    }));
  }, [lines.length, items, lineMap]);

  const subtotal = rows.reduce((a, r) => a + r.priceCents * r.quantity, 0);
  const shippingCents = shippingCentsForSubtotal(subtotal);
  const grandTotal = subtotal + shippingCents;
  const toFree = Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - subtotal);
  const progressPct =
    FREE_SHIPPING_THRESHOLD_CENTS <= 0
      ? 100
      : Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD_CENTS) * 100));

  if (totalItems === 0) {
    return (
      <section className="cart-section pb_150">
        <div className="large-container">
          <div className="sec-title centred pb_30">
            <h2>
              Your <span>Cart</span>
            </h2>
          </div>
          <p className="centred mb_30">Your cart is empty.</p>
          <div className="text-center">
            <Link href="/shop" className="theme-btn btn-one">
              Continue shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-section pb_150">
      <div className="large-container">
        <div className="sec-title centred pb_30">
          <h2>
            Your <span>Cart</span>
          </h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-9 col-md-12 col-sm-12 content-side">
            {toFree > 0 ? (
              <div className="target-price mb_30">
                <p>
                  Add <span>{formatMoney(toFree)}</span> more for free shipping (on orders over{" "}
                  {formatMoney(FREE_SHIPPING_THRESHOLD_CENTS)}).
                </p>
                <div className="progress-box">
                  <div className="bar">
                    <div className="bar-inner count-bar" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>
              </div>
            ) : null}
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
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className="product-column">
                        <div className="product-box">
                          <figure className="image-box">
                            <Image
                              src={row.image ?? DUMMY_PRODUCT_IMAGE}
                              alt=""
                              width={80}
                              height={80}
                              className="object-cover"
                            />
                          </figure>
                          <h6>
                            <Link href={`/product/${row.slug}`}>{row.name}</Link>
                          </h6>
                        </div>
                      </td>
                      <td>{formatMoney(row.priceCents)}</td>
                      <td className="qty">
                        <div className="item-quantity">
                          <input
                            className="quantity-spinner"
                            type="number"
                            min={1}
                            max={row.stock}
                            value={row.quantity}
                            onChange={(e) => {
                              const n = parseInt(e.target.value, 10);
                              if (!Number.isFinite(n)) return;
                              setQty(row.id, Math.min(row.stock, Math.max(1, n)));
                            }}
                          />
                        </div>
                      </td>
                      <td>{formatMoney(row.priceCents * row.quantity)}</td>
                      <td>
                        <button type="button" className="cancel-btn" onClick={() => remove(row.id)}>
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
                <h5>{formatMoney(subtotal)}</h5>
              </div>
              <div className="shipping-cost mb_40">
                <h4>Shipping</h4>
                <p className="mb_15">
                  {shippingCents === 0
                    ? subtotal >= FREE_SHIPPING_THRESHOLD_CENTS
                      ? "Free shipping — threshold met."
                      : `Free on orders over ${formatMoney(FREE_SHIPPING_THRESHOLD_CENTS)}.`
                    : `Flat rate ${formatMoney(FLAT_RATE_CENTS)} until free-shipping threshold.`}
                </p>
                <ul className="cost-list">
                  <li>
                    <span>Delivery</span>
                    <span className="price">{shippingCents === 0 ? formatMoney(0) : formatMoney(shippingCents)}</span>
                  </li>
                </ul>
              </div>
              <div className="total-box">
                <h4>Total</h4>
                <h5>{formatMoney(grandTotal)}</h5>
              </div>
              <div className="btn-box">
                <Link href="/checkout" className="theme-btn btn-one">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="coupon-box">
          <div className="form-group">
            <input type="text" name="coupon" placeholder="Apply Coupon" readOnly />
            <button type="button" disabled>
              <i className="icon-18" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
