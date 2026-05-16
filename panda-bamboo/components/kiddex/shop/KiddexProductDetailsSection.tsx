"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { KiddexProductCard } from "@/components/kiddex/shop/KiddexProductCard";
import { useShop } from "@/components/shop/ShopProvider";
import { asset } from "@/lib/assets";
import { formatPrice, getProduct, products } from "@/lib/catalog";

function DetailsInner() {
  const params = useSearchParams();
  const slug = params.get("p") ?? products[0]?.slug ?? "";
  const product = getProduct(slug) ?? products[0];
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const wished = isInWishlist(product.id);

  if (!product) {
    return <p className="centred pt_60">Product not found.</p>;
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <KiddexPageTitle
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]}
      />
      <section className="shop-details pt_70 pb_120">
        <div className="large-container">
          <div className="product-details-content mb_80">
            <div className="row clearfix">
              <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                <figure className="image">
                  <img src={asset(product.image)} alt={product.name} />
                </figure>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                <div className="content-box ml_30">
                  <span className="upper-text">{product.category}</span>
                  <h2>{product.name}</h2>
                  <h3>
                    {formatPrice(product.price)}
                    {product.compareAt && product.compareAt > product.price ? (
                      <del>{formatPrice(product.compareAt)}</del>
                    ) : null}
                  </h3>
                  <ul className="rating pb_10">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <li key={i}>
                        <i
                          className="icon-10"
                          style={i >= Math.round(product.rating ?? 4) ? { opacity: 0.25 } : undefined}
                        />
                      </li>
                    ))}
                    <li>
                      <span>({(product.rating ?? 4.5).toFixed(1)})</span>
                    </li>
                  </ul>
                  <div className="text-box mb_30">
                    <p>
                      Premium kidswear from the Kiddex demo catalog. Sizes and colours shown for E2E checkout
                      flows.
                    </p>
                    {product.ageGroup ? <p>Age group: {product.ageGroup}</p> : null}
                  </div>
                  <ul className="discription-box mb_30 clearfix">
                    <li>
                      <strong>SKU :</strong>
                      {product.id}
                    </li>
                    <li>
                      <strong>Category :</strong>
                      {product.category}
                    </li>
                    <li>
                      <strong>Availability :</strong>
                      <span className="product-stock">
                        <img src={asset("icons/icon-13.png")} alt="" /> In Stock
                      </span>
                    </li>
                  </ul>
                  {product.sizes && product.sizes.length > 0 ? (
                    <div className="size-box mb_30">
                      <h6>
                        Size<span>*</span>
                      </h6>
                      <ul className="size-list clearfix">
                        {product.sizes.map((s) => (
                          <li key={s}>
                            <button
                              type="button"
                              className={size === s ? "theme-btn btn-one" : ""}
                              onClick={() => setSize(s)}
                            >
                              {s}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <div className="addto-cart-box mb_40">
                    <ul className="clearfix">
                      <li className="item-quantity">
                        <input
                          className="quantity-spinner"
                          type="number"
                          min={1}
                          value={qty}
                          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                          name="quantity"
                        />
                      </li>
                      <li className="cart-btn">
                        <button
                          type="button"
                          className="theme-btn btn-one"
                          onClick={() => addToCart(product.id, qty, size || undefined)}
                        >
                          Add To Cart
                        </button>
                      </li>
                      <li className="like-btn">
                        <button type="button" onClick={() => toggleWishlist(product.id)}>
                          <i className={wished ? "fas fa-heart" : "far fa-heart"} />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {related.length > 0 ? (
            <div className="related-product centred pt_60">
              <div className="sec-title mb_50">
                <h2>
                  Related <span>products</span>
                </h2>
              </div>
              <div className="inner-container clearfix">
                {related.map((p) => (
                  <KiddexProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          ) : null}
          <p className="centred mt_30">
            <Link href="/shop" className="theme-btn btn-one">
              Back to shop
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export function KiddexProductDetailsSection() {
  return (
    <Suspense fallback={<p className="centred pt_60">Loading product…</p>}>
      <DetailsInner />
    </Suspense>
  );
}
