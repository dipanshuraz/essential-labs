import Link from "next/link";
import { KiddexPageTitle } from "@/components/kiddex/kiddex-page-title";
import { FLAT_RATE_CENTS, FREE_SHIPPING_THRESHOLD_CENTS } from "@/lib/shipping";
import { formatMoney } from "@/lib/format";

export default function ShippingPage() {
  return (
    <>
      <KiddexPageTitle
        items={[
          { href: "/", label: "Home" },
          { label: "Shipping" },
        ]}
      />
      <section className="about-section pb_120 pt_40">
        <div className="large-container">
          <div className="sec-title centred mb_50">
            <h2>
              Shipping <span>&amp; returns</span>
            </h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
              <div className="content-box text-box">
                <h3 className="mb_20">Shipping</h3>
                <p className="mb_20">
                  Standard delivery uses a flat rate of {formatMoney(FLAT_RATE_CENTS)} on orders under{" "}
                  {formatMoney(FREE_SHIPPING_THRESHOLD_CENTS)}. Orders at or above that amount qualify for free
                  shipping (demo rules in <code>src/lib/shipping.ts</code>).
                </p>
                <p className="mb_40">
                  Carrier integrations (EasyPost, Shippo, etc.) can replace these flat rates when you connect
                  production logistics.
                </p>
                <h3 className="mb_20">Returns</h3>
                <p className="mb_20">
                  Policy placeholder — e.g. 30 days, unworn items with tags. Connect Loop, Aftership, or a custom
                  returns flow when you go live.
                </p>
                <Link href="/shop" className="theme-btn btn-one">
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
