"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const IMG = "/kiddex/assets/images";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
      return;
    }
    window.location.href = callbackUrl;
  }

  return (
    <>
      <section className="page-title pt_40 pb_30">
        <div className="large-container">
          <ul className="bread-crumb clearfix">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Login</li>
          </ul>
        </div>
      </section>

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
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              {error ? <p className="mb-3 text-center text-sm text-red-600">{error}</p> : null}
              <p className="mb-4 text-center text-sm opacity-80">
                Demo: admin@pandabamboo.com / admin123
              </p>
              <div className="form-group message-btn">
                <button type="submit" className="theme-btn" disabled={loading}>
                  {loading ? "Signing in…" : "Log In"}
                </button>
              </div>
              <span className="text">or</span>
              <ul className="social-links clearfix">
                <li>
                  <a href="/login">
                    <img src={`${IMG}/icons/icon-15.png`} alt="" />
                    Continue with Google
                  </a>
                </li>
                <li>
                  <a href="/login">
                    <img src={`${IMG}/icons/icon-16.png`} alt="" />
                    Continue with Facebook
                  </a>
                </li>
              </ul>
            </form>
            <div className="other-option">
              <div className="check-box-two">
                <input className="check" type="checkbox" id="checkbox1" readOnly />
                <label htmlFor="checkbox1">Remember me</label>
              </div>
              <button type="button" className="forgot-password">
                Forget password?
              </button>
            </div>
            <div className="lower-text centred">
              <p>
                Not registered yet?{" "}
                <Link href="/register">Create an Account</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="large-container py-20 text-center">
          <p>Loading…</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
