"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IMG = "/kiddex/assets/images";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Registration failed");
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="page-title pt_40 pb_30">
        <div className="large-container">
          <ul className="bread-crumb clearfix">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Sign Up</li>
          </ul>
        </div>
      </section>

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
                <label htmlFor="reg-name">Name</label>
                <input
                  id="reg-name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="reg-email">Email</label>
                <input
                  id="reg-email"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="reg-password">Password (min 6)</label>
                <input
                  id="reg-password"
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              {error ? <p className="mb-3 text-center text-sm text-red-600">{error}</p> : null}
              <div className="form-group message-btn">
                <button type="submit" className="theme-btn" disabled={loading}>
                  {loading ? "Creating…" : "Sign Up"}
                  <span />
                  <span />
                  <span />
                  <span />
                </button>
              </div>
              <span className="text">or</span>
              <ul className="social-links clearfix">
                <li>
                  <a href="/register">
                    <img src={`${IMG}/icons/icon-15.png`} alt="" />
                    Continue with Google
                  </a>
                </li>
                <li>
                  <a href="/register">
                    <img src={`${IMG}/icons/icon-16.png`} alt="" />
                    Continue with Facebook
                  </a>
                </li>
              </ul>
            </form>
            <div className="other-option">
              <div className="check-box-two">
                <input className="check" type="checkbox" id="reg-remember" readOnly />
                <label htmlFor="reg-remember">Remember me</label>
              </div>
            </div>
            <div className="lower-text centred">
              <p>
                Already have an account? <Link href="/login">Login Here</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
