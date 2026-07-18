"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CUSTOMER_LOGIN } from "@/lib/customer-auth/staticAuth";
import { useCustomerAuth } from "@/lib/customer-auth/CustomerAuthProvider";
import { asset } from "@/lib/assets";

export function KiddexLoginForm() {
  const { login, isAuthed, isLoading } = useCustomerAuth();
  const router = useRouter();
  const search = useSearchParams();
  const from = search.get("from") ?? "/account/profile";

  const [email, setEmail] = useState<string>(CUSTOMER_LOGIN.email);
  const [password, setPassword] = useState<string>(CUSTOMER_LOGIN.password);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthed) {
      router.replace(from.startsWith("/") ? from : "/account/profile");
    }
  }, [isAuthed, isLoading, from, router]);

  if (isLoading || isAuthed) {
    return <p className="centred">Loading…</p>;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    router.push(from.startsWith("/") ? from : "/account/profile");
  }

  return (
    <div className="form-inner">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="kiddex-login-email">Email</label>
          <input
            id="kiddex-login-email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="kiddex-login-password">Password</label>
          <input
            id="kiddex-login-password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        {error ? <p className="centred" style={{ color: "#ef4343", marginBottom: 12 }}>{error}</p> : null}
        <div className="form-group message-btn">
          <button type="submit" className="theme-btn" disabled={submitting}>
            {submitting ? "Signing in…" : "Log In"}
          </button>
        </div>
        <span className="text">or</span>
        <ul className="social-links clearfix">
          <li>
            <Link href="/login">
              <img src={asset("icons/icon-15.png")} alt="" />
              Continue with Google
            </Link>
          </li>
          <li>
            <Link href="/login">
              <img src={asset("icons/icon-16.png")} alt="" />
              Continue with Facebook
            </Link>
          </li>
        </ul>
      </form>
      <div className="other-option">
        <div className="check-box-two">
          <input className="check" type="checkbox" id="kiddex-login-remember" />
          <label htmlFor="kiddex-login-remember">Remember me</label>
        </div>
        <button type="button" className="forgot-password">
          Forget password?
        </button>
      </div>
      <p className="centred" style={{ marginTop: 16, fontSize: 14 }}>
        Demo login: <strong>{CUSTOMER_LOGIN.email}</strong> / <strong>{CUSTOMER_LOGIN.password}</strong>
      </p>
      <div className="lower-text centred">
        <p>
          Not registered yet? <Link href="/signup">Create an Account</Link>
        </p>
      </div>
    </div>
  );
}
