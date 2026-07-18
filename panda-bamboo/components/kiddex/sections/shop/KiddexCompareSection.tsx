"use client";

import Link from "next/link";
import Image from "next/image";
import { useShop } from "@/components/shop/ShopProvider";
import { formatPrice, products } from "@/lib/catalog";
import { productDetailsHref } from "@/lib/kiddex-links";
import { asset } from "@/lib/assets";

const MAX_COMPARE = 3;

export function KiddexCompareSection() {
  const { getWishlistProducts } = useShop();
  const wished = getWishlistProducts();
  const items = (wished.length >= 2 ? wished : products).slice(0, MAX_COMPARE);

  return (
    <section className="cart-section pb_120">
      <div className="large-container">
        <div className="sec-title centred mb_60">
          <h2>
            Product <span>Compare</span>
          </h2>
          <p>Add items to your wishlist to compare them here, or browse the demo comparison below.</p>
        </div>
        {items.length < 2 ? (
          <p className="centred">
            Add at least two products to your wishlist to compare.{" "}
            <Link href="/shop" className="theme-btn btn-one">
              Shop now
            </Link>
          </p>
        ) : (
          <div className="table-outer">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  {items.map((product) => (
                    <th key={product.id}>
                      <Link href={productDetailsHref(product.slug)}>{product.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Image</td>
                  {items.map((product) => (
                    <td key={`${product.id}-img`}>
                      <Image src={asset(product.image)} alt={product.name} width={72} height={72} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Price</td>
                  {items.map((product) => (
                    <td key={`${product.id}-price`}>{formatPrice(product.price)}</td>
                  ))}
                </tr>
                <tr>
                  <td>Category</td>
                  {items.map((product) => (
                    <td key={`${product.id}-cat`}>{product.category}</td>
                  ))}
                </tr>
                <tr>
                  <td />
                  {items.map((product) => (
                    <td key={`${product.id}-cta`}>
                      <Link href={productDetailsHref(product.slug)} className="theme-btn btn-one">
                        View
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
