import Link from "next/link";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";

const ANIM_SHAPES = [
  { className: "anim-icon-1 float-bob-y", image: "shape/shape-3.png" },
  { className: "anim-icon-2", image: "shape/shape-4.png" },
  { className: "anim-icon-3 rotate-me", image: "shape/shape-5.png" },
  { className: "anim-icon-4 rotate-me", image: "shape/shape-5.png" },
  { className: "anim-icon-5 rotate-me", image: "shape/shape-5.png" },
  { className: "anim-icon-6 rotate-me", image: "shape/shape-5.png" },
  { className: "anim-icon-7 float-bob-x", image: "shape/shape-6.png" },
  { className: "anim-icon-8", image: "shape/shape-7.png" },
  { className: "anim-icon-9 zoom-fade", image: "shape/shape-8.png" },
  { className: "anim-icon-10 float-bob-y", image: "shape/shape-9.png" },
  { className: "anim-icon-11 zoom-fade", image: "shape/shape-10.png" },
] as const;

type Props = {
  title: string;
  priceLabel: string;
  bannerImage?: string;
  sectionClass?: string;
  decorated?: boolean;
};

export function BannerSection({
  title,
  priceLabel,
  bannerImage = "banner/banner-img-1.png",
  sectionClass = "banner-section",
  decorated = true,
}: Props) {
  return (
    <section className={sectionClass}>
      <BgDiv className="pattern-layer" image={asset("shape/shape-21.png")} />
      {decorated ? (
        <div className="anim-icon">
          {ANIM_SHAPES.map((s) => (
            <BgDiv key={s.className} className={s.className} image={asset(s.image)} />
          ))}
        </div>
      ) : null}
      <div className="large-container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <div className="image-box">
              <figure className="image">
                <img src={asset(bannerImage)} alt="" />
              </figure>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content-box">
              <h2>{title}</h2>
              <h3>
                From <span>{priceLabel}</span>
              </h3>
              <div className="btn-box">
                <Link href="/shop" className="theme-btn btn-one">
                  View Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
