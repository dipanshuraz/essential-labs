"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useShop } from "@/components/shop/ShopProvider";
import { formatPrice } from "@/lib/catalog";
import { productDetailsHref } from "@/lib/kiddex-links";
import { asset } from "@/lib/assets";

export function KiddexCartSection() {
  const router = useRouter();
  const { getCartProducts, cartSubtotal, updateCartQty, removeFromCart, cartCount } = useShop();
  const entries = getCartProducts();

  return (
    <section className="cart-section pb_150">
      <div className="large-container">
        <div className="sec-title centred pb_30">
          <h2>
            Your <span>Cart</span>
          </h2>
        </div>
        {entries.length === 0 ? (
          <p className="centred">
            Your cart is empty.{" "}
            <Link href="/shop" className="theme-btn btn-one">
              Continue shopping
            </Link>
          </p>
        ) : (
          <div className="row clearfix">
            <div className="col-lg-9 col-md-12 col-sm-12 content-side">
              <div className="table-outer mb_30">
                <table className="cart-table">
                  <thead className="cart-header">
                    <tr>
                      <th>product</th>
                      <th>price</th>
                      <th>quantity</th>
                      <th>total</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map(({ line, product }) => (
                      <tr key={`${product.id}-${line.size ?? ""}`}>
                        <td className="product-column">
                          <div className="product-box">
                            <figure className="image-box">
                              <img src={asset(product.image)} alt="" />
                            </figure>
                            <h6>
                              <Link href={productDetailsHref(product.slug)}>{product.name}</Link>
                            </h6>
                          </div>
                        </td>
                        <td>{formatPrice(product.price)}</td>
                        <td className="qty">
                          <div className="item-quantity">
                            <input
                              className="quantity-spinner"
                              type="number"
                              min={1}
                              value={line.qty}
                              onChange={(e) =>
                                updateCartQty(product.id, line.size, Math.max(1, Number(e.target.value) || 1))
                              }
                              name="quantity"
                            />
                          </div>
                        </td>
                        <td>{formatPrice(product.price * line.qty)}</td>
                        <td>
                          <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => removeFromCart(product.id, line.size)}
                          >
                            <i className="far fa-times" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 sidebar-side">
              <div className="total-cart mb_30">
                <div className="title-box">
                  <h4>Subtotal</h4>
                  <h5>{formatPrice(cartSubtotal)}</h5>
                </div>
                <div className="total-box">
                  <h4>Total ({cartCount} items)</h4>
                  <h5>{formatPrice(cartSubtotal)}</h5>
                </div>
                <div className="btn-box">
                  <button type="button" className="theme-btn btn-one" onClick={() => router.push("/checkout")}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
