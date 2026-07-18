import Link from "next/link";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";
import { POPULAR_BRANDS } from "@/lib/kiddex-home-content";
import type { ReactNode } from "react";

type Props = {
  sectionClass?: string;
  title?: ReactNode;
};

export function BrandsLogoSection({
  sectionClass = "brands-section centred",
  title = (
    <>
      Popular <span>Kids Brands</span>
    </>
  ),
}: Props) {
  return (
    <section className={sectionClass}>
      <div className="pattern-layer">
        <BgDiv className="pattern-1 float-bob-x" image={asset("shape/shape-20.png")} />
        <BgDiv className="pattern-2 float-bob-x" image={asset("shape/shape-26.png")} />
      </div>
      <div className="large-container">
        <div className="sec-title mb_50">
          <h2>{title}</h2>
        </div>
        <div className="brands-list">
          {POPULAR_BRANDS.map((src) => (
            <figure key={src} className="brands-block-one">
              <Link href="/">
                <img src={asset(src)} alt="" />
              </Link>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
