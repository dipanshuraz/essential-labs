"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCustomerAuth } from "@/lib/customer-auth/CustomerAuthProvider";
import { asset } from "@/lib/assets";

export function KiddexSignupForm() {
  const { register, isAuthed, isLoading } = useCustomerAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthed) router.replace("/account/profile");
  }, [isAuthed, isLoading, router]);

  if (isLoading || isAuthed) {
    return <p className="centred">Loading…</p>;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const parts = name.trim().split(/\s+/);
    const firstName = parts[0] ?? "";
    const lastName = parts.slice(1).join(" ") || firstName;
    const result = await register({ email, password, firstName, lastName, phone });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    router.push("/account/profile");
  }

  return (
    <div className="form-inner">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="kiddex-signup-name">Name</label>
          <input
            id="kiddex-signup-name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="kiddex-signup-email">Email</label>
          <input
            id="kiddex-signup-email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="kiddex-signup-phone">Phone</label>
          <input
            id="kiddex-signup-phone"
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="kiddex-signup-password">Password</label>
          <input
            id="kiddex-signup-password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        {error ? <p className="centred" style={{ color: "#ef4343", marginBottom: 12 }}>{error}</p> : null}
        <div className="form-group message-btn">
          <button type="submit" className="theme-btn" disabled={submitting}>
            {submitting ? "Creating account…" : "Sign Up"}
          </button>
        </div>
        <span className="text">or</span>
        <ul className="social-links clearfix">
          <li>
            <Link href="/signup">
              <img src={asset("icons/icon-15.png")} alt="" />
              Continue with Google
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <img src={asset("icons/icon-16.png")} alt="" />
              Continue with Facebook
            </Link>
          </li>
        </ul>
      </form>
      <div className="other-option">
        <div className="check-box-two">
          <input className="check" type="checkbox" id="kiddex-signup-remember" />
          <label htmlFor="kiddex-signup-remember">Remember me</label>
        </div>
      </div>
      <div className="lower-text centred">
        <p>
          Already have an account? <Link href="/login">Login Here</Link>
        </p>
      </div>
    </div>
  );
}
