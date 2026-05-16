"use client";

import { useShop } from "@/components/shop/ShopProvider";

export function KiddexCartToggle() {
  const { cartCount } = useShop();
  return (
    <div className="cart-toggle-icon cart-toggler">
      <div className="inner-box">
        <div className="icon-box">
          <i className="far fa-shopping-cart" />
        </div>
        <span>{cartCount} Item{cartCount === 1 ? "" : "s"}</span>
      </div>
    </div>
  );
}
