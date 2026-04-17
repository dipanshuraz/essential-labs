"use client";

import { useState } from "react";
import { KiddexPageTitle } from "@/components/kiddex/kiddex-page-title";

const IMG = "/kiddex/assets/images";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, message }),
    });
    setStatus(res.ok ? "ok" : "err");
    if (res.ok) setMessage("");
  }

  return (
    <>
      <KiddexPageTitle
        items={[
          { href: "/", label: "Home" },
          { label: "Contact" },
        ]}
      />
      <section className="contact-info-section pb_50">
        <div className="large-container">
          <div className="sec-title centred mb_50">
            <h2>
              Contact <span>Information</span>
            </h2>
          </div>
          <div className="row clearfix">
            <div className="col-xl-3 col-lg-6 col-md-12 info-column">
              <div className="info-block-one">
                <div className="inner-box">
                  <div className="icon-box">
                    <img src={`${IMG}/icons/icon-17.png`} alt="" />
                  </div>
                  <h4>Studio</h4>
                  <p>Panda Bamboo HQ — online first</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-12 info-column">
              <div className="info-block-one">
                <div className="inner-box">
                  <div className="icon-box">
                    <img src={`${IMG}/icons/icon-18.png`} alt="" />
                  </div>
                  <h4>Shipping</h4>
                  <p>Orders ship from our US demo warehouse.</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-12 info-column">
              <div className="info-block-one">
                <div className="inner-box">
                  <div className="icon-box">
                    <img src={`${IMG}/icons/icon-19.png`} alt="" />
                  </div>
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:hello@pandabamboo.com">hello@pandabamboo.com</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-12 info-column">
              <div className="info-block-one">
                <div className="inner-box">
                  <div className="icon-box">
                    <img src={`${IMG}/icons/icon-20.png`} alt="" />
                  </div>
                  <h4>Support</h4>
                  <p>Messages are saved for the admin team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section pb_120">
        <div className="large-container">
          <div className="inner-container">
            <div className="row clearfix">
              <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                <div className="form-inner">
                  <form id="contact-form" onSubmit={onSubmit}>
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label htmlFor="c-name">Name</label>
                        <input
                          id="c-name"
                          type="text"
                          name="username"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label htmlFor="c-email">E-mail</label>
                        <input
                          id="c-email"
                          type="email"
                          name="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <label htmlFor="c-msg">Write Message *</label>
                        <textarea
                          id="c-msg"
                          name="message"
                          required
                          minLength={10}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={6}
                        />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                        <button type="submit" className="theme-btn btn-one" name="submit-form">
                          Send Message
                        </button>
                      </div>
                    </div>
                    {status === "ok" ? <p className="mt-3 text-success">Thanks — we will get back to you.</p> : null}
                    {status === "err" ? <p className="mt-3 text-danger">Could not send. Try again.</p> : null}
                  </form>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 map-column">
                <div className="map-inner">
                  <iframe
                    title="Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55945.16225505631!2d-73.90847969206546!3d40.66490264739892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1601263396347!5m2!1sen!2sbd"
                    width="100%"
                    height={500}
                    style={{ border: 0, width: "100%" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
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
