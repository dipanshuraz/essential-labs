import Link from "next/link";
import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { KiddexSubscribeSection } from "@/components/kiddex/sections/KiddexSubscribeSection";
import { asset } from "@/lib/assets";

export function KiddexErrorPage() {
  return (
    <>
      <KiddexPageTitle crumbs={[{ label: "Home", href: "/" }, { label: "404" }]} />
      <section className="error-section pt_80 pb_120 centred">
        <div className="auto-container">
          <div className="content-box">
            <figure className="image-box"><img src={asset("icons/error-1.png")} alt="" /></figure>
            <h2>Oops! That Page Can Not be Found.</h2>
            <div className="btn-box">
              <Link href="/" className="theme-btn btn-one"><i className="icon-41" />Go Back</Link>
              <Link href="/" className="theme-btn btn-one">Go to Homepage</Link>
            </div>
          </div>
        </div>
      </section>
      <KiddexSubscribeSection />
    </>
  );
}
