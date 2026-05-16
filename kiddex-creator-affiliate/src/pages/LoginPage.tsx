import { useState, type FormEvent } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { STATIC_LOGIN } from "@/config/staticAuth";
import { getStorefrontUrl } from "@/config/storefront";

function sanitizeReturnTo(state: unknown, fallback = "/"): string {
  const from = (state as { from?: string } | null)?.from ?? fallback;
  if (typeof from !== "string" || !from.startsWith("/") || from.startsWith("//")) return fallback;
  if (from === "/login" || from.startsWith("/login?") || from.startsWith("/login/")) return fallback;
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

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!login(email, password)) setError("Invalid email or password.");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-surface-muted p-6 transition-colors dark:bg-zinc-950">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md rounded-2xl border border-sidebar-border bg-white p-8 shadow-card transition-colors dark:border-white/10 dark:bg-zinc-900 dark:shadow-none dark:ring-1 dark:ring-white/5">
        <div className="mb-1 flex items-center gap-3 text-primary">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            K
          </span>
          <div>
            <div className="text-lg font-bold leading-tight tracking-tight text-ink dark:text-zinc-100">
              Kiddex Affiliate
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              Program manager
            </div>
          </div>
        </div>
        <p className="mb-2 mt-3 text-sm text-ink-muted">
          Demo login is pre-filled. Use this shell to explore the Trakr-style affiliate dashboard.
        </p>
        <p className="mb-6 rounded-lg bg-primary/10 px-2 py-1.5 text-center text-xs text-ink-subtle dark:bg-primary/20">
          <code className="text-ink dark:text-zinc-200">{STATIC_LOGIN.email}</code> ·{" "}
          <code className="text-ink dark:text-zinc-200">{STATIC_LOGIN.password}</code>
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="cr-email" className="mb-1 block text-xs font-medium text-ink-muted">
              Email
            </label>
            <input
              id="cr-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-field !mt-0"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="cr-pass" className="mb-1 block text-xs font-medium text-ink-muted">
              Password
            </label>
            <input
              id="cr-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-field !mt-0"
              autoComplete="current-password"
            />
          </div>
          {error ? <p className="text-sm text-status-error">{error}</p> : null}
          <button type="submit" className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
            Sign in
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-ink-subtle">
          <a href={storefront} className="font-medium text-primary hover:underline" target="_blank" rel="noreferrer">
            Visit storefront
          </a>
        </p>
      </div>
    </div>
  );
}
