import Link from "next/link";
import { BRANDS_STYLE_TWO } from "@/lib/kiddex-site-content";
import { asset } from "@/lib/assets";

export function KiddexBrandsStyleTwo() {
  return (
    <section className="brands-style-two centred pt_110 pb_100">
      <div className="pattern-layer">
        <div className="pattern-2" style={{ backgroundImage: `url(${asset("shape/shape-70.png")})` }} />
        <div className="pattern-1" style={{ backgroundImage: `url(${asset("shape/shape-1.png")})` }} />
      </div>
      <div className="large-container">
        <div className="sec-title mb_50">
          <h2>Shop by <span>Brands</span></h2>
        </div>
        <div className="row clearfix">
          {BRANDS_STYLE_TWO.map((brand) => (
            <div key={brand.img} className="col-lg-2 col-md-6 col-sm-12 brands-block">
              <div className="brands-block-two">
                <div className="inner-box">
                  <figure className="logo-box">
                    <Link href="/shop"><img src={asset(brand.img)} alt="" /></Link>
                  </figure>
                  <h6><Link href="/shop">Big sale {brand.sale}</Link></h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
