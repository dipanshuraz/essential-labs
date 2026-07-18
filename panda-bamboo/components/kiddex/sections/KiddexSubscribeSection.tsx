import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";

export function KiddexSubscribeSection({ className = "subscribe-section" }: { className?: string }) {
  return (
    <section className={className}>
      <BgDiv className="pattern-layer" image={asset("shape/shape-32.png")} />
      <div className="large-container">
        <div className="inner-container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content-box">
                <h2>
                  Subscribe to our <span>newsletter</span>
                </h2>
                <p>Get the latest kidswear deals and new arrivals in your inbox.</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 form-column">
              <form action="#" method="post">
                <div className="form-group">
                  <input type="email" name="email" placeholder="Enter your email" required />
                  <button type="submit" className="theme-btn btn-one">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
