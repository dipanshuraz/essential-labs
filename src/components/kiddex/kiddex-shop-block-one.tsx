import Image from "next/image";
import Link from "next/link";
import { AddToCart } from "@/components/add-to-cart";
import { DUMMY_PRODUCT_IMAGE, formatMoney } from "@/lib/format";

export type ShopBlockProduct = {
  id: string;
  name: string;
  slug: string;
  priceCents: number;
  image: string | null;
  categoryName: string;
  stock: number;
};

export function ShopBlockOne({ product }: { product: ShopBlockProduct }) {
  return (
    <div className="shop-block-one">
      <div className="inner-box">
        <div className="image-box">
          <ul className="option-list clearfix">
            <li>
              <Link href={`/product/${product.slug}`} className="lightbox-image">
                <i className="far fa-eye" />
              </Link>
            </li>
            <li>
              <Link href="/cart">
                <i className="far fa-shopping-bag" />
              </Link>
            </li>
          </ul>
          <figure className="image relative min-h-[260px] w-full overflow-hidden">
            <Image
              src={product.image ?? DUMMY_PRODUCT_IMAGE}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </figure>
        </div>
        <div className="lower-content">
          <span className="text">{product.categoryName}</span>
          <ul className="rating centred">
            {[1, 2, 3, 4, 5].map((i) => (
              <li key={i}>
                <i className="icon-10" />
              </li>
            ))}
            <li>
              <span>(5)</span>
            </li>
          </ul>
          <h4>
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h4>
          <div className="price">{formatMoney(product.priceCents)}</div>
          <div className="btn-box">
            <AddToCart
              productId={product.id}
              disabled={product.stock < 1}
              className="theme-btn btn-one"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
