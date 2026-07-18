"use client";

import Link from "next/link";
import { asset } from "@/lib/assets";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";

type Props = {
  product: Product;
  qty: number;
  size: string;
  wished: boolean;
  showColor?: boolean;
  showExtendedMeta?: boolean;
  onQtyChange: (qty: number) => void;
  onSizeChange: (size: string) => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
};

export function ProductDetailsBuyBox({
  product,
  qty,
  size,
  wished,
  showColor = true,
  showExtendedMeta = true,
  onQtyChange,
  onSizeChange,
  onAddToCart,
  onToggleWishlist,
}: Props) {
  const colorPrefix = product.id.replace(/\W/g, "");

  return (
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
          Premium kidswear from the Kiddex demo catalog. Sizes and colours shown for checkout flows.
        </p>
        {product.ageGroup ? <p>This would help you choose the right fit for {product.ageGroup}.</p> : null}
      </div>
      <ul className="discription-box mb_30 clearfix">
        {showExtendedMeta ? (
          <>
            <li>
              <strong>Brand :</strong>Kiddex
            </li>
            <li>
              <strong>Product SKU :</strong>#{product.id}
            </li>
          </>
        ) : (
          <li>
            <strong>SKU :</strong>
            {product.id}
          </li>
        )}
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
      {showColor ? (
        <div className="color-box mb_30">
          <h6>
            Color<span>*</span>
          </h6>
          <ul className="color-list">
            {[1, 2, 3, 4].map((n, i) => (
              <li key={n}>
                <div className="check-box">
                  <input
                    className="check"
                    type="radio"
                    id={`${colorPrefix}-color${n}`}
                    name={`${colorPrefix}-color`}
                    defaultChecked={i === 0}
                  />
                  <label htmlFor={`${colorPrefix}-color${n}`} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
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
                  onClick={() => onSizeChange(s)}
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
              onChange={(e) => onQtyChange(Math.max(1, Number(e.target.value) || 1))}
              name="quantity"
            />
          </li>
          <li className="cart-btn">
            <button type="button" className="theme-btn btn-one" onClick={onAddToCart}>
              Add To Cart
            </button>
          </li>
          {showExtendedMeta ? (
            <li>
              <Link href="/shop">
                <i className="far fa-reply" />
              </Link>
            </li>
          ) : null}
          <li className="like-btn">
            <button type="button" onClick={onToggleWishlist}>
              <i className={wished ? "fas fa-heart" : "far fa-heart"} />
            </button>
          </li>
        </ul>
      </div>
      {showExtendedMeta ? (
        <ul className="other-option clearfix">
          <li>
            <strong>Seller :</strong>Daniel Macron
          </li>
          <li>
            <strong>Tag :</strong>
            <Link href="/blog-details">Best sellers</Link>, <Link href="/blog-details">New Arrivals</Link>,{" "}
            <Link href="/blog-details">On Sale</Link>
          </li>
          <li className="social-links">
            <strong>Share :</strong>
            <Link href="/shop-details">
              <i className="icon-14" />
            </Link>
            <Link href="/shop-details">
              <i className="icon-15" />
            </Link>
            <Link href="/shop-details">
              <i className="icon-16" />
            </Link>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
