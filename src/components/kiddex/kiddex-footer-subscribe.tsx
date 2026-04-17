"use client";

import { useState } from "react";

export function KiddexFooterSubscribe() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setMsg(res.ok ? "Thanks — you are on the list." : "Could not subscribe.");
    if (res.ok) setEmail("");
  }

  return (
    <div className="widget-content">
      <p>Stay informed about new drops, restocks, and offers.</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">
            <i className="icon-18" />
          </button>
        </div>
      </form>
      {msg ? <p className="mt-2 text-sm opacity-90">{msg}</p> : null}
    </div>
  );
}
