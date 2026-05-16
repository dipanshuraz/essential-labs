import { ABOUT_STATS } from "@/lib/kiddex-site-content";
import { asset } from "@/lib/assets";

export function KiddexAboutHero() {
  return (
    <section className="about-section pb_120">
      <div className="large-container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <div className="image-box">
              <figure className="image image-1">
                <img src={asset("resource/about-1.jpg")} alt="" />
              </figure>
              <figure className="image image-2">
                <img src={asset("resource/about-2.jpg")} alt="" />
              </figure>
              <div className="rotate-box">
                <span className="curved-circle">
                  30 Years Experience&nbsp;&nbsp;-&nbsp;&nbsp;30 Years Experience&nbsp;&nbsp;-&nbsp;&nbsp;
                </span>
                <div className="icon-box">
                  <img src={asset("icons/icon-14.png")} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content-box">
              <div className="text-box mb_35">
                <h2>We are a retail business in the Ecommerce Products and accessories for kids</h2>
                <p className="mb_20">
                  <span>Balloon</span>, with a rich legacy spanning 12 years, stands as a venerable online
                  destination for parents seeking a diverse range of high-quality toys and accessories.
                </p>
                <p>
                  All components featured in our inventory undergo rigorous quality checks to meet or exceed
                  industry standards, instilling confidence in customers regarding the reliability of their
                  purchases.
                </p>
              </div>
              <div className="inner-box">
                <div className="row clearfix">
                  {ABOUT_STATS.map((stat) => (
                    <div key={stat.label} className="col-lg-4 col-md-6 col-sm-12 funfact-block">
                      <div className="funfact-block-one">
                        <div className="count-outer">
                          <span className="odometer" data-count={stat.count}>
                            00
                          </span>
                          <span className="symble">+</span>
                        </div>
                        <p>{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
