"use client";

import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { ProductDetailsBuyBox } from "@/components/kiddex/shop/ProductDetailsBuyBox";
import { ProductDetailsDescriptionStacked } from "@/components/kiddex/shop/ProductDetailsDescriptionStacked";
import { ProductDetailsDescriptionTabs } from "@/components/kiddex/shop/ProductDetailsDescriptionTabs";
import { ProductDetailsGallery } from "@/components/kiddex/shop/ProductDetailsGallery";
import { useShop } from "@/components/shop/ShopProvider";
import { getProduct, products } from "@/lib/catalog";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

export type ProductDetailsVariant = 1 | 2 | 3 | 4;

function variantConfig(variant: ProductDetailsVariant) {
  return {
    sectionClass:
      variant === 2 ? "shop-details style-two pt_70 pb_120" : "shop-details pt_70 pb_120",
    contentClass:
      variant === 3 || variant === 4
        ? "product-details-content style-two mb_80"
        : "product-details-content mb_80",
    galleryLayout: variant === 4 ? ("stacked" as const) : ("slider" as const),
    descriptionLayout: variant === 2 ? ("stacked" as const) : ("tabs" as const),
  };
}

type InnerProps = { variant: ProductDetailsVariant };

function DetailsInner({ variant }: InnerProps) {
  const params = useSearchParams();
  const slug = params.get("p") ?? products[0]?.slug ?? "";
  const product = getProduct(slug) ?? products[0];
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product?.sizes?.[0] ?? "");
  const cfg = variantConfig(variant);

  if (!product) {
    return <p className="centred pt_60">Product not found.</p>;
  }

  const wished = isInWishlist(product.id);

  return (
    <>
      <KiddexPageTitle
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]}
      />
      <section className={cfg.sectionClass}>
        <div className="large-container">
          <div className={cfg.contentClass}>
            <div className="row clearfix">
              <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                <ProductDetailsGallery layout={cfg.galleryLayout} fallbackImage={product.image} />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                <ProductDetailsBuyBox
                  product={product}
                  qty={qty}
                  size={size}
                  wished={wished}
                  onQtyChange={setQty}
                  onSizeChange={setSize}
                  onAddToCart={() => addToCart(product.id, qty, size || undefined)}
                  onToggleWishlist={() => toggleWishlist(product.id)}
                />
              </div>
            </div>
          </div>
          {cfg.descriptionLayout === "tabs" ? (
            <ProductDetailsDescriptionTabs />
          ) : (
            <ProductDetailsDescriptionStacked />
          )}
        </div>
      </section>
    </>
  );
}

type Props = { variant?: ProductDetailsVariant };

export function KiddexProductDetailsSection({ variant = 1 }: Props) {
  return (
    <Suspense fallback={<p className="centred pt_60">Loading product…</p>}>
      <DetailsInner variant={variant} />
    </Suspense>
  );
}
