import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { STATIC_LOGIN } from "@/config/staticAuth";
import { getStorefrontUrl } from "@/config/storefront";

function sanitizeReturnTo(state: unknown, fallback = "/"): string {
  const from = (state as { from?: string } | null)?.from ?? fallback;
  if (typeof from !== "string" || !from.startsWith("/") || from.startsWith("//")) return fallback;
  if (from === "/login" || from.startsWith("/login?") || from.startsWith("/login/"))
    return fallback;
  return from;
}

export function LoginPage() {
  const { login, isAuthed } = useAuth();
  const loc = useLocation();
  const from = sanitizeReturnTo(loc.state);
  const storefront = getStorefrontUrl();

  const [email, setEmail] = useState<string>(STATIC_LOGIN.email);
  const [password, setPassword] = useState<string>(STATIC_LOGIN.password);
  const [error, setError] = useState<string | null>(null);

  if (isAuthed) return <Navigate to={from} replace />;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!login(email, password)) setError("Invalid email or password.");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-brand-muted p-6 transition-colors dark:bg-zinc-950">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md rounded-2xl border border-black/5 bg-white p-8 shadow-lift transition-colors dark:border-white/10 dark:bg-zinc-900 dark:shadow-none dark:ring-1 dark:ring-white/5">
        <div className="mb-1 flex items-center gap-3 text-brand">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
            E
          </span>
          <div>
            <div className="text-lg font-bold leading-tight tracking-tight text-ink dark:text-zinc-100">
              Essential Labs
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              Admin
            </div>
          </div>
        </div>
        <p className="mb-6 text-sm text-ink-muted">Essential Labs Admin — static demo login</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-muted">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-field !mt-0"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-muted">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-field !mt-0"
              autoComplete="current-password"
            />
          </div>
          {error ? <p className="text-sm text-status-error">{error}</p> : null}
          <button
            type="submit"
            className="w-full rounded-xl bg-brand py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Sign in
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-ink-subtle">
          Demo:{" "}
          <code className="rounded bg-surface-alt px-1 dark:bg-zinc-800">
            {STATIC_LOGIN.email} / {STATIC_LOGIN.password}
          </code>
        </p>
        <p className="mt-4 text-center">
          <a
            href={storefront}
            className="text-sm font-medium text-brand hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            ← Back to storefront
          </a>
        </p>
      </div>
    </div>
  );
}
