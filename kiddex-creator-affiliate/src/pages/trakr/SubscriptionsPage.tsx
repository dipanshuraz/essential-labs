import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink dark:text-zinc-100">Subscriptions</h1>
        <p className="mt-1 text-sm text-ink-muted">Manage billing, seats, and your Kiddex Affiliate plan.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="trakr-card p-6">
          <p className="text-sm font-semibold text-primary">Current plan</p>
          <h2 className="mt-2 text-2xl font-bold text-ink dark:text-zinc-100">Pro trial</h2>
          <p className="mt-1 text-sm text-ink-muted">1,320 credits remaining · renews monthly.</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            {["Unlimited affiliates", "Custom subdomain", "Priority support"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="size-4 text-status-success" />
                {t}
              </li>
            ))}
          </ul>
          <button type="button" className="btn-primary mt-6 w-full sm:w-auto">
            Upgrade or change plan
          </button>
        </div>
        <div className="trakr-card p-6">
          <h3 className="font-semibold text-ink dark:text-zinc-100">Invoices</h3>
          <p className="mt-1 text-sm text-ink-muted">No invoices yet—connect billing in production.</p>
          <div className="mt-4 rounded-xl border border-dashed border-sidebar-border bg-surface-muted p-8 text-center text-sm text-ink-subtle dark:border-white/10 dark:bg-zinc-800/40">
            Demo mode — Stripe portal not wired.
          </div>
        </div>
      </div>

      <p className="text-sm text-ink-muted">
        Questions?{" "}
        <Link to="/settings/email" className="font-medium text-primary hover:underline">
          Email settings
        </Link>{" "}
        or contact Kiddex support.
      </p>
    </div>
  );
}
