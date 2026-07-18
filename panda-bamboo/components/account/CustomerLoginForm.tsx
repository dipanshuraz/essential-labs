"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CUSTOMER_LOGIN } from "@/lib/customer-auth/staticAuth";
import { useCustomerAuth } from "@/lib/customer-auth/CustomerAuthProvider";

export function CustomerLoginForm() {
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
    return <p className="centred" style={{ padding: "4rem" }}>Loading…</p>;
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
    <section className="sign-section pb_120">
      <div className="large-container">
        <div className="sec-title centred pb_30">
          <h2>
            Account <span>Login</span>
          </h2>
        </div>
        <div className="form-inner">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="shop-email">Email</label>
              <input
                id="shop-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="shop-password">Password</label>
              <input
                id="shop-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {error ? (
              <p style={{ color: "#ef4343", marginBottom: 12, textAlign: "center" }}>{error}</p>
            ) : null}
            <div className="form-group message-btn">
              <button type="submit" className="theme-btn" disabled={submitting}>
                {submitting ? "Signing in…" : "Log In"}
              </button>
            </div>
          </form>
          <p className="centred" style={{ marginTop: 16, fontSize: 14 }}>
            Demo login (no API required): <strong>{CUSTOMER_LOGIN.email}</strong> /{" "}
            <strong>{CUSTOMER_LOGIN.password}</strong>
          </p>
          <div className="lower-text centred">
            <p>
              Not registered yet? <Link href="/signup">Create an Account</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
