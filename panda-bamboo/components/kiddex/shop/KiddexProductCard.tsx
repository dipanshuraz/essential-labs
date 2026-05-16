"use client";

import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";
import { useShop } from "@/components/shop/ShopProvider";
import { productDetailsHref } from "@/lib/kiddex-links";
import { asset } from "@/lib/assets";

export function KiddexProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const wished = isInWishlist(product.id);

  return (
    <div className="shop-block-one" data-kiddex-product-id={product.id}>
      <div className="inner-box">
        <div className="image-box">
          {product.badge === "discount" && product.discount ? (
            <span className="discount-product-2 p_absolute l_0 t_0">{product.discount}</span>
          ) : null}
          {product.badge === "hot" ? (
            <span className="hot-product-2 p_absolute l_0 t_0">Hot</span>
          ) : null}
          <ul className="option-list clearfix">
            <li>
              <Link href={asset(product.image)} className="lightbox-image" data-fancybox="gallery">
                <i className="far fa-eye" />
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => addToCart(product.id, 1)}
                aria-label="Add to cart"
              >
                <i className="far fa-shopping-bag" />
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                style={{ color: wished ? "var(--theme-color)" : undefined }}
              >
                <i className={wished ? "fas fa-heart" : "far fa-heart"} />
              </button>
            </li>
          </ul>
          <figure className="image">
            <img src={asset(product.image)} alt={product.name} />
          </figure>
        </div>
        <div className="lower-content">
          <span className="text">{product.category}</span>
          <ul className="rating centred">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <i className="icon-10" style={i >= Math.round(product.rating ?? 4) ? { opacity: 0.25 } : undefined} />
              </li>
            ))}
            <li>
              <span>({(product.rating ?? 4.5).toFixed(1)})</span>
            </li>
          </ul>
          <h4>
            <Link href={productDetailsHref(product.slug)}>{product.name}</Link>
          </h4>
          <div className="price">
            {product.compareAt && product.compareAt > product.price ? (
              <>
                <del>{formatPrice(product.compareAt)}</del>
                {formatPrice(product.price)}
              </>
            ) : (
              formatPrice(product.price)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
