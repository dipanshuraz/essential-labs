"use client";

import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { formatInr } from "@/lib/format";
import { asset } from "@/lib/assets";
import { productDetailsHref } from "@/lib/kiddex-links";
import { useShopOptional } from "@/components/shop/ShopProvider";
import { IconHeart } from "@/components/panda/icons";

export function PandaProductCard({ product }: { product: Product }) {
  const shop = useShopOptional();
  const href = productDetailsHref(product.slug);
  const wished = shop?.isInWishlist(product.id) ?? false;

  return (
    <article className="pl-card">
      <div className="pl-card__media">
        <Link href={href} aria-label={product.name}>
          <img src={asset(product.image)} alt={product.name} loading="lazy" />
        </Link>
        {product.discount && <span className="pl-card__tag">{product.discount}</span>}
        <button
          type="button"
          className="pl-card__wish"
          data-active={wished}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          onClick={() => shop?.toggleWishlist(product.id)}
        >
          <IconHeart fill={wished ? "currentColor" : "none"} />
        </button>
        <button
          type="button"
          className="pl-btn pl-btn--light pl-btn--block pl-card__quick"
          onClick={() => shop?.addToCart(product.id, 1, product.sizes?.[0])}
        >
          Quick Add
        </button>
      </div>

      <div className="pl-card__body">
        <span className="pl-card__cat">{product.category}</span>
        <Link href={href} className="pl-card__name">
          {product.name}
        </Link>
        <div className="pl-card__price">
          {formatInr(product.price)}
          {product.compareAt && <del>{formatInr(product.compareAt)}</del>}
          {product.discount && <span className="pl-card__off">{product.discount}</span>}
        </div>
      </div>
    </article>
  );
}
