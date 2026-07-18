import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";
import { AGE_CATEGORIES } from "@/lib/kiddex-home-content";

export function CategoryStyleTwoSection() {
  return (
    <section className="category-style-two centred pt_100">
      <div className="large-container">
        <div className="category-carousel owl-carousel owl-theme owl-dots-none owl-nav-none">
          {AGE_CATEGORIES.map((cat) => (
            <div key={cat.label} className="category-block-two">
              <div className="inner-box">
                <BgDiv className="shape" image={asset(cat.shape)} />
                <h4>{cat.label}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
