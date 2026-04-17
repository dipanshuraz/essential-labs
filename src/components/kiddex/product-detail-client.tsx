"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AddToCart } from "@/components/add-to-cart";
import { WishlistButton } from "@/components/wishlist-button";
import { DUMMY_PRODUCT_IMAGE, formatMoney } from "@/lib/format";
import { ShopBlockOne, type ShopBlockProduct } from "@/components/kiddex/kiddex-shop-block-one";

const ICON = "/kiddex/assets/images/icons/icon-13.png";

type Props = {
  productId: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  stock: number;
  categoryName: string;
  images: string[];
  related: ShopBlockProduct[];
};

export function ProductDetailClient({
  productId,
  slug,
  name,
  description,
  priceCents,
  stock,
  categoryName,
  images,
  related,
}: Props) {
  const [active, setActive] = useState(0);
  const mainSrc = images[active] ?? images[0] ?? DUMMY_PRODUCT_IMAGE;

  return (
    <>
      <section className="shop-details style-two pt_70 pb_120">
        <div className="large-container">
          <div className="product-details-content mb_80">
            <div className="row clearfix">
              <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                <div className="image-inner">
                    <div className="image-box">
                      <figure className="image relative aspect-[4/5] w-full overflow-hidden bg-[#f7f2ed]">
                        <a href={mainSrc} className="lightbox-image" data-fancybox="gallery">
                          <Image src={mainSrc} alt={name} fill className="object-cover" priority sizes="50vw" />
                        </a>
                      </figure>
                    </div>
                    {images.length > 1 ? (
                      <div className="slider-pager mt-3">
                        <ul className="thumb-box flex flex-wrap gap-2">
                          {images.map((src, i) => (
                            <li key={`${i}-${src}`}>
                              <button
                                type="button"
                                className={i === active ? "active border-0 bg-transparent p-0" : "border-0 bg-transparent p-0 opacity-70"}
                                onClick={() => setActive(i)}
                              >
                                <figure className="relative h-16 w-14 overflow-hidden">
                                  <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                                </figure>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                <div className="content-box ml_30">
                  <span className="upper-text">{categoryName}</span>
                  <h2>{name}</h2>
                  <h3>{formatMoney(priceCents)}</h3>
                  <ul className="rating pb_10">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i}>
                        <i className="icon-10" />
                      </li>
                    ))}
                    <li>
                      <span>(5.0)</span>
                    </li>
                  </ul>
                  <div className="text-box mb_30">
                    {description.split("\n\n").map((para, idx) => (
                      <p key={idx} className="mb_20">
                        {para}
                      </p>
                    ))}
                  </div>
                  <ul className="discription-box mb_30 clearfix">
                    <li>
                      <strong>SKU :</strong>#{slug.slice(0, 8).toUpperCase()}
                    </li>
                    <li>
                      <strong>Category :</strong>
                      {categoryName}
                    </li>
                    <li>
                      <strong>Availability :</strong>
                      <span className="product-stock">
                        {stock > 0 ? (
                          <>
                            <img src={ICON} alt="" /> In Stock ({stock})
                          </>
                        ) : (
                          " Out of stock"
                        )}
                      </span>
                    </li>
                  </ul>
                  <div className="addto-cart-box mb_40">
                    <ul className="clearfix">
                      <li className="cart-btn">
                        <AddToCart
                          productId={productId}
                          disabled={stock < 1}
                          className="theme-btn btn-one"
                        />
                      </li>
                      <li>
                        <Link href="/shop">
                          <i className="far fa-reply" />
                        </Link>
                      </li>
                      <li className="like-btn">
                        <WishlistButton
                          productId={productId}
                          className="border-0 bg-transparent p-2 text-2xl leading-none"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="related-product centred pb_90">
          <div className="large-container">
            <div className="sec-title mb_50">
              <h2>
                Related <span>Products</span>
              </h2>
            </div>
            <div className="inner-container clearfix">
              {related.map((p) => (
                <ShopBlockOne key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
