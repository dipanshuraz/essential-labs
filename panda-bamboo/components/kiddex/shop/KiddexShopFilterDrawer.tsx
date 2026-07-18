"use client";

import { SHOP_AGE_FILTERS } from "@/lib/kiddex-shop-content";

/** shop-3.html horizontal filter panel (shop-filter-content). */
export function KiddexShopFilterDrawer() {
  return (
    <div className="shop-sidebar style-two shop-filter-content pt_40 pb_40 pl_30 pr_30">
      <div className="filter-close-icon">
        <a href="#">
          <i className="far fa-times" />
        </a>
      </div>
      <div className="table-outer">
        <table className="sidebar-table">
          <tbody>
            <tr>
              <td>
                <div className="filter-widget">
                  <div className="widget-title">
                    <h4>Filter by Price</h4>
                  </div>
                  <div className="price-range-slider">
                    <div id="slider-range" className="range-bar mb_30" />
                    <div className="range-box">
                      <p className="range-value">
                        <span>Price:</span>
                        <input type="text" id="amount" readOnly defaultValue="$10 - $500" />
                      </p>
                      <button type="button" className="theme-btn filter-btn">
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="brand-widget">
                  <div className="widget-title mb_30">
                    <h4>Select Age</h4>
                  </div>
                  <div className="widget-content">
                    <ul className="category-list clearfix">
                      {SHOP_AGE_FILTERS.slice(0, 6).map((label, i) => (
                        <li key={label}>
                          <div className="check-box">
                            <input className="check" type="checkbox" id={`shop3-age-${i}`} />
                            <label htmlFor={`shop3-age-${i}`}>{label}</label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
