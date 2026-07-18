"use client";

import Link from "next/link";
import { useState } from "react";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";

const TABS = ["3d Toys", "Toys for Boys", "Metal Toy", "Teddy Doll", "Stickers"] as const;

type Props = { products: Product[] };

export function CollectionSection({ products }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const slice = products.slice(0, 4);

  return (
    <section className="collection-section pt_80 pb_120">
      <div className="shape-layer">
        <BgDiv className="shape-1 float-bob-y" image={asset("shape/shape-28.png")} />
        <BgDiv className="shape-2 rotate-me" image={asset("shape/shape-29.png")} />
        <BgDiv className="shape-3 float-bob-y" image={asset("shape/shape-30.png")} />
      </div>
      <div className="large-container">
        <div className="sec-title mb_50">
          <h2>
            Select from <span>Collection</span>
          </h2>
          <Link href="/shop">View All</Link>
        </div>
        <div className="tabs-box">
          <div className="tab-btn-box">
            <ul className="tab-btns tab-buttons">
              {TABS.map((label, i) => (
                <li
                  key={label}
                  className={`tab-btn${i === activeTab ? " active-btn" : ""}`}
                  onClick={() => setActiveTab(i)}
                  onKeyDown={(e) => e.key === "Enter" && setActiveTab(i)}
                  role="tab"
                  tabIndex={0}
                  aria-selected={i === activeTab}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <div className="tabs-content centred">
            <div className="tab active-tab">
              <div className="row clearfix">
                {slice.map((p) => (
                  <div key={p.id} className="col-lg-3 col-md-6 col-sm-12 collection-block">
                    <div className="collection-block-one">
                      <div className="inner-box">
                        <div className="image-box">
                          <figure className="image">
                            <img src={asset(p.image)} alt={p.name} />
                          </figure>
                          <div className="reaction-btn">
                            <button type="button">
                              <i className="far fa-heart" />
                            </button>
                          </div>
                        </div>
                        <div className="lower-content">
                          <span className="text">{p.category}</span>
                          <h4>
                            <Link href={`/shop-details?product=${p.id}`}>{p.name}</Link>
                          </h4>
                          <h5>{formatPrice(p.price)}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
