"use client";

import { useState } from "react";

export function PandaNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="pl-section pl-section--tight">
      <div className="pl-container">
        <div className="pl-band">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span className="pl-eyebrow">The Journal</span>
            <h2 className="pl-h2">Join the family</h2>
            <p className="pl-lead">
              Early access to new drops, slow-living notes, and 10% off your first order.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setDone(true);
            }}
          >
            <div className="pl-field">
              <input
                className="pl-input"
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button type="submit" className="pl-btn pl-btn--primary">
                Subscribe
              </button>
            </div>
            {done && (
              <p className="pl-muted" style={{ marginTop: 14, fontSize: 14 }}>
                Thank you — welcome to Panda Loves Bamboo.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
