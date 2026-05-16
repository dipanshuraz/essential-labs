import Link from "next/link";
import { asset } from "@/lib/assets";

export function KiddexBlogCta() {
  return (
    <div className="cta-section mt_35 mb_35 pb_60">
      <div className="inner-container">
        <div className="shape" style={{ backgroundImage: `url(${asset("shape/shape-56.png")})` }} />
        <div className="image-layer">
          <figure className="image image-1"><img src={asset("resource/cta-5.png")} alt="" /></figure>
        </div>
        <div className="text-box">
          <h2>Super Discount on First Purchase</h2>
          <Link href="/shop" className="theme-btn btn-one">View Shop</Link>
        </div>
      </div>
    </div>
  );
}
