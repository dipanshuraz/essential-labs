"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCustomerAuth } from "@/lib/customer-auth/CustomerAuthProvider";

export function CustomerRegisterForm() {
  const { register, isAuthed, isLoading } = useCustomerAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthed) router.replace("/account/profile");
  }, [isAuthed, isLoading, router]);

  if (isLoading || isAuthed) {
    return <p className="centred" style={{ padding: "4rem" }}>Loading…</p>;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await register({ email, password, firstName, lastName, phone });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    router.push("/account/profile");
  }

  return (
    <section className="sign-section pb_120">
      <div className="large-container">
        <div className="sec-title centred pb_30">
          <h2>
            Create <span>Account</span>
          </h2>
        </div>
        <div className="form-inner">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="reg-first">First name</label>
              <input
                id="reg-first"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                autoComplete="given-name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="reg-last">Last name</label>
              <input
                id="reg-last"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                autoComplete="family-name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="reg-phone">Phone (optional)</label>
              <input
                id="reg-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </div>
            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            {error ? (
              <p style={{ color: "#ef4343", marginBottom: 12, textAlign: "center" }}>{error}</p>
            ) : null}
            <div className="form-group message-btn">
              <button type="submit" className="theme-btn" disabled={submitting}>
                {submitting ? "Creating account…" : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="lower-text centred">
            <p>
              Already have an account? <Link href="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
