"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { KiddexPageTitle } from "@/components/kiddex/kiddex-page-title";
import { useWishlist } from "@/context/wishlist-context";
import { DUMMY_PRODUCT_IMAGE, formatMoney } from "@/lib/format";

type Preview = {
  id: string;
  name: string;
  slug: string;
  priceCents: number;
  image: string | null;
};

export default function WishlistPage() {
  const { ids } = useWishlist();
  const [items, setItems] = useState<Preview[]>([]);
  const idList = useMemo(() => [...ids].sort().join(","), [ids]);

  useEffect(() => {
    if (ids.size === 0) return;
    const params = new URLSearchParams();
    ids.forEach((id) => params.append("id", id));
    fetch(`/api/cart-preview?${params.toString()}`)
      .then((r) => r.json())
      .then((d: { items: Preview[] }) => setItems(d.items))
      .catch(() => setItems([]));
  }, [idList, ids]);

  if (ids.size === 0) {
    return (
      <>
        <KiddexPageTitle
          items={[
            { href: "/", label: "Home" },
            { label: "Wishlist" },
          ]}
        />
        <section className="shop-page-section pt_60 pb_120">
          <div className="large-container text-center">
            <div className="sec-title centred pb_30">
              <h2>
                Your <span>wishlist</span>
              </h2>
            </div>
            <p className="mb_30">Heart products on their detail pages to save them here.</p>
            <Link href="/shop" className="theme-btn btn-one">
              Browse shop
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <KiddexPageTitle
        items={[
          { href: "/", label: "Home" },
          { label: "Wishlist" },
        ]}
      />
      <section className="shop-page-section pt_60 pb_120">
        <div className="large-container">
          <div className="sec-title centred pb_30">
            <h2>
              Saved <span>items</span>
            </h2>
          </div>
          <div className="wrapper grid">
            <div className="shop-grid-content">
              <div className="inner-container clearfix">
                {(ids.size === 0 ? [] : items).map((p) => (
                  <div key={p.id} className="shop-block-one">
                    <div className="inner-box">
                      <div className="image-box">
                        <figure className="image relative min-h-[280px] w-full overflow-hidden">
                          <Image
                            src={p.image ?? DUMMY_PRODUCT_IMAGE}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="33vw"
                          />
                        </figure>
                      </div>
                      <div className="lower-content">
                        <h4>
                          <Link href={`/product/${p.slug}`}>{p.name}</Link>
                        </h4>
                        <div className="price">{formatMoney(p.priceCents)}</div>
                        <div className="btn-box">
                          <Link href={`/product/${p.slug}`} className="theme-btn btn-one">
                            View product
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
