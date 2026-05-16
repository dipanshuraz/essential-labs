import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { CONTACT_INFO } from "@/lib/kiddex-site-content";
import { asset } from "@/lib/assets";

export function KiddexContactPage() {
  return (
    <>
      <KiddexPageTitle crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <section className="contact-info-section pb_50">
        <div className="large-container">
          <div className="sec-title centred mb_50">
            <h2>Contact <span>Information</span></h2>
          </div>
          <div className="row clearfix">
            {CONTACT_INFO.map((info) => (
              <div key={info.title} className="col-xl-3 col-lg-6 col-md-12 info-column">
                <div className="info-block-one">
                  <div className="inner-box">
                    <div className="icon-box"><img src={asset(info.icon)} alt="" /></div>
                    <h4>{info.title}</h4>
                    <p>
                      {info.lines.map((line, i) => {
                        if ("mailto" in info && info.mailto && i > 0) {
                          return (
                            <span key={line}>
                              <br />
                              <a href={`mailto:${line}`}>{line}</a>
                            </span>
                          );
                        }
                        if ("phoneIndex" in info && i === info.phoneIndex) {
                          return (
                            <span key={line}>
                              <br />
                              <a href={`tel:${line.replace(/\D/g, "")}`}>{line}</a>
                            </span>
                          );
                        }
                        return (
                          <span key={line}>
                            {i > 0 ? <br /> : null}
                            {line}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="contact-section pb_120">
        <div className="large-container">
          <div className="inner-container">
            <div className="row clearfix">
              <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                <div className="form-inner">
                  <form method="post" action="#" id="contact-form">
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label>Name</label>
                        <input type="text" name="username" required />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label>E-mail</label>
                        <input type="email" name="email" required />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label>Phone</label>
                        <input type="text" name="phone" required />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label>Subject</label>
                        <input type="text" name="subject" required />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <label>Write Message *</label>
                        <textarea name="message" />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                        <button type="submit" className="theme-btn btn-one" name="submit-form">Send Message</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 map-column">
                <div className="map-inner">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55945.16225505631!2d-73.90847969206546!3d40.66490264739892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1601263396347!5m2!1sen!2sbd"
                    width="100%"
                    height="500"
                    style={{ border: 0, width: "100%" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Store location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
