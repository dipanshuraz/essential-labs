import Link from "next/link";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";

type Props = {
  title?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function KiddexCtaBandSection({
  title = "Super Discount on First Purchase",
  ctaHref = "/shop",
  ctaLabel = "View Shop",
}: Props) {
  return (
    <section className="cta-section centred">
      <div className="large-container">
        <div className="inner-container">
          <BgDiv className="shape" image={asset("shape/shape-56.png")} />
          <div className="image-layer">
            <figure className="image image-1">
              <img src={asset("resource/cta-5.png")} alt="" />
            </figure>
            <figure className="image image-2 p_absolute t_10 r_30">
              <img src={asset("resource/cta-4.png")} alt="" />
            </figure>
          </div>
          <div className="text-box">
            <h2>{title}</h2>
            <Link href={ctaHref} className="theme-btn btn-one">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
