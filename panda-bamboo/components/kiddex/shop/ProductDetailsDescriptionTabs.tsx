"use client";

import { asset } from "@/lib/assets";
import {
  PRODUCT_DESCRIPTION_PARAS,
  PRODUCT_FEATURES,
  PRODUCT_REVIEWS,
  PRODUCT_SPECS,
} from "@/lib/kiddex-product-details-content";
import { useState } from "react";

const TABS = [
  { id: "tab-1", label: "Description" },
  { id: "tab-2", label: "Reviews (02)" },
  { id: "tab-3", label: "Specification" },
] as const;

export function ProductDetailsDescriptionTabs() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("tab-1");

  return (
    <div className="product-discription">
      <div className="tabs-box">
        <div className="tab-btn-box">
          <ul className="tab-btns tab-buttons">
            {TABS.map((tab) => (
              <li
                key={tab.id}
                className={`tab-btn${active === tab.id ? " active-btn" : ""}`}
                data-tab={`#${tab.id}`}
                onClick={() => setActive(tab.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActive(tab.id);
                }}
                role="tab"
                tabIndex={0}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="tabs-content">
          <div className={`tab${active === "tab-1" ? " active-tab" : ""}`} id="tab-1">
            <div className="discription-content">
              {PRODUCT_DESCRIPTION_PARAS.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <h4>Features :</h4>
              <ul className="list-style-one clearfix">
                {PRODUCT_FEATURES.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`tab${active === "tab-2" ? " active-tab" : ""}`} id="tab-2">
            <div className="review-content pt_40">
              {PRODUCT_REVIEWS.map((review) => (
                <div key={review.id} className="single-review">
                  <div className="upper-box">
                    <div className="info-box">
                      <figure className="image">
                        <img src={asset(review.avatar)} alt="" />
                      </figure>
                      <div className="inner">
                        <h4>{review.author}</h4>
                        <span className="date">{review.date}</span>
                      </div>
                    </div>
                    <ul className="option-btn">
                      <li>
                        <button type="button">
                          <i className="icon-33" />
                        </button>
                        {review.likes}
                      </li>
                      <li>
                        <button type="button">
                          <i className="icon-34" />
                        </button>
                        {review.dislikes}
                      </li>
                    </ul>
                  </div>
                  <ul className="rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <li key={i}>
                        <i className="icon-10" />
                      </li>
                    ))}
                  </ul>
                  <p>{review.body}</p>
                  {review.images.length > 0 ? (
                    <ul className="image-list">
                      {review.images.map((src) => (
                        <li key={src}>
                          <img src={asset(src)} alt="" />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {"reply" in review && review.reply ? (
                    <div className="reply-review mt_30">
                      <div className="upper-box">
                        <div className="info-box">
                          <figure className="image">
                            <img src={asset(review.reply.avatar)} alt="" />
                          </figure>
                          <div className="inner">
                            <h4>{review.reply.author}</h4>
                          </div>
                        </div>
                      </div>
                      <p>{review.reply.body}</p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <div className={`tab${active === "tab-3" ? " active-tab" : ""}`} id="tab-3">
            <div className="specification-content">
              <ul className="specification-list clearfix">
                {PRODUCT_SPECS.map((row) => (
                  <li key={row.label}>
                    <strong>{row.label}</strong>
                    {row.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
