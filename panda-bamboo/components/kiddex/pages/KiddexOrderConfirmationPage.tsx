import Link from "next/link";
import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { KiddexSubscribeSection } from "@/components/kiddex/sections/KiddexSubscribeSection";
import { asset } from "@/lib/assets";

export function KiddexOrderConfirmationPage() {
  return (
    <>
      <KiddexPageTitle
        crumbs={[{ label: "Home", href: "/" }, { label: "Order Confirmed" }]}
      />
      <section className="error-section pt_80 pb_120 centred">
        <div className="auto-container">
          <div className="content-box">
            <figure className="image-box">
              <img src={asset("icons/icon-7.png")} alt="" />
            </figure>
            <h2>Thank You! Your Order is Confirmed.</h2>
            <p className="pt_15">
              We&apos;ve received your order and sent a confirmation to your email. You can track its
              progress anytime from your account.
            </p>
            <div className="btn-box pt_30">
              <Link href="/account/orders" className="theme-btn btn-one">
                View My Orders
              </Link>
              <Link href="/shop" className="theme-btn btn-one">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
      <KiddexSubscribeSection />
    </>
  );
}
