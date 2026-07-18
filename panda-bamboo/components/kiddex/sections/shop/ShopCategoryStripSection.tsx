import Link from "next/link";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";
import { categories } from "@/lib/catalog";

const SHAPES = ["shape/shape-11.png", "shape/shape-12.png", "shape/shape-13.png", "shape/shape-14.png"] as const;

/** category-style-three strip (shop-4.html). */
export function ShopCategoryStripSection() {
  return (
    <section className="category-style-three centred pt_0">
      <div className="large-container">
        <div className="row clearfix">
          {categories.slice(0, 4).map((c, i) => (
            <div key={c.name} className="col-lg-3 col-md-6 col-sm-12 category-block">
              <div className="category-block-two">
                <div className="inner-box">
                  <BgDiv className="shape" image={asset(SHAPES[i % SHAPES.length])} />
                  <figure className="image">
                    <img src={asset(c.image)} alt={c.name} />
                  </figure>
                  <h4>
                    <Link href={`/shop?category=${encodeURIComponent(c.name)}`}>{c.name}</Link>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
