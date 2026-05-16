"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";
import { useShop } from "@/components/shop/ShopProvider";
import { asset } from "@/lib/assets";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { cn } from "../cn";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [added, setAdded] = useState(false);
  const wished = isInWishlist(product.id);

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-surface p-6">
        {product.discount ? (
          <Badge tone="sale" className="absolute left-3 top-3 z-10">
            {product.discount}
          </Badge>
        ) : null}
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-lg shadow",
            wished ? "text-theme" : "text-muted hover:text-theme",
          )}
        >
          {wished ? "♥" : "♡"}
        </button>
        <Link href={`/shop-details/${product.slug}`}>
          <Image
            src={asset(product.image)}
            alt={product.name}
            width={320}
            height={320}
            className="mx-auto h-full w-full object-contain transition group-hover:scale-105"
          />
        </Link>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">{product.category}</p>
        <h3 className="mt-2 line-clamp-2 text-base font-bold text-ink">
          <Link href={`/shop-details/${product.slug}`} className="hover:text-theme">
            {product.name}
          </Link>
        </h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-theme">{formatPrice(product.price)}</span>
          {product.compareAt ? (
            <span className="text-sm text-muted line-through">{formatPrice(product.compareAt)}</span>
          ) : null}
        </div>
        <Button
          className="mt-4 w-full"
          size="sm"
          onClick={() => {
            addToCart(product.id, 1);
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
          }}
        >
          {added ? "Added!" : "Add to Cart"}
        </Button>
      </div>
    </article>
  );
}
