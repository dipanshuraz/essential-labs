"use client";

import Link from "next/link";
import { useShop } from "@/components/shop/ShopProvider";
import { formatPrice } from "@/lib/catalog";
import { productDetailsHref } from "@/lib/kiddex-links";
import { asset } from "@/lib/assets";

export function KiddexCartPopup() {
  const { getCartProducts, cartCount, cartSubtotal, removeFromCart } = useShop();
  const entries = getCartProducts();

  return (
    <div id="cart-popup" className="cart-popup">
      <div className="popup-inner">
        <button type="button" className="close-cart cart-toggler" aria-label="Close cart">
          <i className="fal fa-times" />
        </button>
        <div className="cart-inner">
          <h4 className="title-text">
            <span>{cartCount}</span>Cart Items
          </h4>
          {entries.map(({ line, product }) => (
            <div key={`${product.id}-${line.size ?? ""}`} className="single-cart-box">
              <figure className="image-box">
                <img src={asset(product.image)} alt="" />
              </figure>
              <h5>
                <Link href={productDetailsHref(product.slug)}>{product.name}</Link>
              </h5>
              <h4>
                {formatPrice(product.price)} <span>x {line.qty}</span>
              </h4>
              <button
                type="button"
                onClick={() => removeFromCart(product.id, line.size)}
                aria-label="Remove"
              >
                <i className="fal fa-times" />
              </button>
            </div>
          ))}
          <div className="text-box">
            <h5>Subtotal</h5>
            <span>{formatPrice(cartSubtotal)}</span>
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
