"use client";

import Link from "next/link";
import Image from "next/image";
import { useShop } from "@/components/shop/ShopProvider";
import { formatPrice } from "@/lib/catalog";
import { productDetailsHref } from "@/lib/kiddex-links";
import { asset } from "@/lib/assets";

export function KiddexWishlistSection() {
  const { getWishlistProducts, toggleWishlist, addToCart } = useShop();
  const items = getWishlistProducts();

  return (
    <section className="account-section pb_120">
      <div className="large-container">
        <div className="sec-title centred mb_60">
          <h2>
            My <span>Wishlist</span>
          </h2>
        </div>
        {items.length === 0 ? (
          <p className="centred">
            No items in your wishlist.{" "}
            <Link href="/shop" className="theme-btn btn-one">
              Browse shop
            </Link>
          </p>
        ) : (
          <div className="history-box">
            {items.map((product) => (
              <div key={product.id} className="single-history">
                <div className="product-box">
                  <figure className="image-box">
                    <Image
                      src={asset(product.image)}
                      alt={product.name}
                      width={80}
                      height={80}
                    />
                  </figure>
                  <div className="product-info">
                    <h6>
                      <Link href={productDetailsHref(product.slug)}>{product.name}</Link>
                    </h6>
                    <h4>{formatPrice(product.price)}</h4>
                  </div>
                </div>
                <div className="btn-box">
                  <button type="button" className="theme-btn btn-one" onClick={() => addToCart(product.id, 1)}>
                    Add to cart
                  </button>
                  <button type="button" onClick={() => toggleWishlist(product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
