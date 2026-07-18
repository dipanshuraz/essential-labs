import Link from "next/link";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";
import { categories } from "@/lib/catalog";

const SHAPES = [
  "shape/shape-11.png",
  "shape/shape-12.png",
  "shape/shape-13.png",
  "shape/shape-14.png",
  "shape/shape-15.png",
  "shape/shape-16.png",
] as const;

export function CategorySection() {
  return (
    <section className="category-section centred pt_120 pb_85">
      <BgDiv className="pattern-layer" image={asset("shape/shape-18.png")} />
      <div className="shape-box">
        <BgDiv className="shape-1" image={asset("shape/shape-17.png")} />
        <BgDiv className="shape-2 zoom-fade" image={asset("shape/shape-6.png")} />
      </div>
      <div className="large-container">
        <div className="category-carousel owl-carousel owl-theme owl-dots-none owl-nav-none">
          {categories.map((c, i) => (
            <div key={c.name} className="category-block-one">
              <div className="inner-box">
                <div className="image-box">
                  <BgDiv className="shape" image={asset(SHAPES[i % SHAPES.length])} />
                  <figure className="image">
                    <img src={asset(c.image)} alt={c.name} />
                  </figure>
                </div>
                <h4>
                  <Link href={`/shop?category=${encodeURIComponent(c.name)}`}>{c.name}</Link>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
