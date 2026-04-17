"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/cart-context";
import { DUMMY_PRODUCT_IMAGE, formatMoney } from "@/lib/format";

type PreviewItem = {
  id: string;
  name: string;
  slug: string;
  priceCents: number;
  stock: number;
  image: string | null;
};

export function KiddexCartToggle() {
  const { totalItems } = useCart();
  const label = totalItems === 1 ? "1 Item" : `${totalItems} Items`;
  return (
    <div className="cart-toggle-icon cart-toggler">
      <div className="inner-box">
        <div className="icon-box">
          <i className="far fa-shopping-cart" />
        </div>
        <span>{label}</span>
      </div>
    </div>
  );
}

export function KiddexCartPopup() {
  const { lines, remove, totalItems } = useCart();
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
    return items
      .map((p) => ({
        ...p,
        quantity: lineMap[p.id] ?? 0,
      }))
      .filter((r) => r.quantity > 0);
  }, [lines.length, items, lineMap]);

  const subtotalCents = rows.reduce((a, r) => a + r.priceCents * r.quantity, 0);

  return (
    <div id="cart-popup" className="cart-popup">
      <div className="popup-inner">
        <button type="button" className="close-cart" aria-label="Close cart">
          <i className="fal fa-times" />
        </button>
        <div className="cart-inner">
          <h4 className="title-text">
            <span>{totalItems}</span>
            Cart Items
          </h4>
          {rows.length === 0 && totalItems === 0 ? (
            <p className="p-3 text-center">Your cart is empty.</p>
          ) : rows.length === 0 ? (
            <p className="p-3 text-center text-sm opacity-80">Loading…</p>
          ) : (
            rows.map((line) => (
              <div key={line.id} className="single-cart-box">
                <figure className="image-box">
                  <Image
                    src={line.image ?? DUMMY_PRODUCT_IMAGE}
                    alt=""
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] object-cover"
                  />
                </figure>
                <h5>
                  <Link href={`/product/${line.slug}`}>{line.name}</Link>
                </h5>
                <h4>
                  {formatMoney(line.priceCents)} <span>x {line.quantity}</span>
                </h4>
                <button type="button" onClick={() => remove(line.id)} aria-label="Remove">
                  <i className="fal fa-times" />
                </button>
              </div>
            ))
          )}
          <div className="text-box">
            <h5>Subtotal</h5>
            <span>{formatMoney(subtotalCents)}</span>
          </div>
          <div className="btn-box">
            <Link href="/cart" className="theme-btn btn-one">
              View Cart
            </Link>
            <Link href="/checkout" className="theme-btn btn-one">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
