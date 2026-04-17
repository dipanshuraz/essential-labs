"use client";

import { useState } from "react";

export function NewsletterForm() {
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
    <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email for drops"
        className="min-w-0 flex-1 rounded-full border border-[#5c534d] bg-[#3d3835] px-4 py-2 text-sm text-white placeholder:text-[#9a928b]"
      />
      <button
        type="submit"
        className="rounded-full bg-[#f5a3b0] px-4 py-2 text-sm font-semibold text-[#2d2a28]"
      >
        Subscribe
      </button>
      {msg && <p className="text-xs text-[#c4bbb3] sm:w-full">{msg}</p>}
    </form>
  );
}
