"use client";

import Link from "next/link";
import { useShop } from "@/components/shop/ShopProvider";
import { formatInr } from "@/lib/format";

export function AccountWishlist() {
  const { getWishlistProducts, toggleWishlist } = useShop();
  const items = getWishlistProducts();

  if (items.length === 0) {
    return (
      <div>
        <h3>Wishlist</h3>
        <p style={{ marginTop: 12 }}>No items saved yet.</p>
        <Link href="/shop" className="theme-btn btn-one" style={{ display: "inline-block", marginTop: 16 }}>
          Browse kidswear
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h3>Wishlist</h3>
      <div className="history-box">
        {items.map((item) => (
          <div key={item.id} className="single-history">
            <div className="product-box">
              <figure className="image-box">
                <img src={`/kiddex/assets/images/${item.image}`} alt="" />
              </figure>
              <div className="product-info">
                <h6>
                  <Link href={`/shop-details/${item.slug}`}>{item.name}</Link>
                </h6>
                <h4>{formatInr(item.price)}</h4>
              </div>
            </div>
            <button
              type="button"
              className="text"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--theme-color)" }}
              onClick={() => toggleWishlist(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
