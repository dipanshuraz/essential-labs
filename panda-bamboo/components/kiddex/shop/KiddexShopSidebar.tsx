"use client";

import { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SHOP_ACCORDION_GROUPS,
  SHOP_AGE_FILTERS,
  SHOP_EXTRA_CATEGORIES,
  SHOP_SIZE_FILTERS,
  SHOP_STATUS_FILTERS,
} from "@/lib/kiddex-shop-content";

type Props = {
  basePath: "/shop";
};

function fieldId(basePath: string, key: string) {
  return `${basePath.replace("/", "")}-${key}`;
}

export function KiddexShopSidebar({ basePath }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") ?? "";

  function onSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("search-field") ?? "").trim();
    const sp = new URLSearchParams(params.toString());
    if (value) sp.set("q", value);
    else sp.delete("q");
    const qs = sp.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  }

  return (
    <div className="shop-sidebar">
      <div className="search-widget sidebar-widget">
        <form onSubmit={onSearch}>
          <div className="form-group">
            <input
              type="search"
              name="search-field"
              placeholder="Search Products"
              defaultValue={q}
              required
            />
            <button type="submit">
              <i className="icon-4" />
            </button>
          </div>
        </form>
      </div>
      <div className="filter-widget sidebar-widget">
        <div className="widget-title mb_30">
          <h4>Filter by Price</h4>
        </div>
        <div className="price-range-slider">
          <div id="slider-range" className="range-bar mb_30" />
          <div className="range-box">
            <p className="range-value">
              <span>Price:</span>
              <input type="text" id="amount" readOnly defaultValue="$10 - $500" />
            </p>
            <button type="button" className="theme-btn btn-one filter-btn">
              Filter
            </button>
          </div>
        </div>
      </div>
      <div className="brand-widget sidebar-widget">
        <div className="widget-title mb_30">
          <h4>Select Age</h4>
        </div>
        <div className="widget-content">
          <ul className="category-list clearfix">
            {SHOP_AGE_FILTERS.map((label, i) => {
              const id = fieldId(basePath, `age-${i}`);
              return (
                <li key={label}>
                  <div className="check-box">
                    <input className="check" type="checkbox" id={id} />
                    <label htmlFor={id}>{label}</label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="category-widget sidebar-widget">
        <div className="widget-title mb_30">
          <h3>Product Categories</h3>
        </div>
        <div className="widget-content">
          <ul className="accordion-box">
            {SHOP_ACCORDION_GROUPS.map((group, gi) => (
              <li key={group.id} className={`accordion block${gi === 0 ? " active-block" : ""}`}>
                <div className={`acc-btn${gi === 0 ? " active" : ""}`}>
                  <div className="icon-box" />
                  {group.title}
                </div>
                <div className={`acc-content${gi === 0 ? " current" : ""}`}>
                  <ul className="category-list clearfix">
                    {group.items.map((item, ii) => {
                      const id = fieldId(basePath, `${group.id}-${ii}`);
                      return (
                        <li key={item}>
                          <div className="check-box">
                            <input className="check" type="checkbox" id={id} />
                            <label htmlFor={id}>{item}</label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
          <ul className="category-list clearfix">
            {SHOP_EXTRA_CATEGORIES.map((label, i) => {
              const id = fieldId(basePath, `extra-${i}`);
              return (
                <li key={label}>
                  <div className="check-box">
                    <input className="check" type="checkbox" id={id} />
                    <label htmlFor={id}>{label}</label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="status-widget sidebar-widget">
        <div className="widget-title mb_30">
          <h4>Product Status</h4>
        </div>
        <div className="widget-content">
          <ul className="category-list clearfix">
            {SHOP_STATUS_FILTERS.map((label, i) => {
              const id = fieldId(basePath, `status-${i}`);
              return (
                <li key={label}>
                  <div className="check-box">
                    <input className="check" type="checkbox" id={id} />
                    <label htmlFor={id}>{label}</label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="size-widget sidebar-widget">
        <div className="widget-title mb_30">
          <h4>Screen by Size</h4>
        </div>
        <div className="widget-content">
          <ul className="size-list clearfix">
            {SHOP_SIZE_FILTERS.map((size) => (
              <li key={size}>
                <button type="button">{size}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
