import { useState } from "react";

export function CampaignSettingsPage() {
  const [autoApprove, setAutoApprove] = useState(true);
  const [commissionTab, setCommissionTab] = useState<"pct" | "flat">("pct");
  const [settingsTab, setSettingsTab] = useState<"program" | "portal" | "other">("program");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink dark:text-zinc-100">Settings</h1>
        <p className="mt-1 text-sm text-ink-muted">Campaign details, portal branding, and program rules.</p>
      </div>

      <div className="flex flex-wrap justify-end gap-1 rounded-xl border border-sidebar-border bg-white p-1 dark:border-white/10 dark:bg-zinc-900">
        {(
          [
            ["program", "Affiliate program Details"],
            ["portal", "Affiliate Portal"],
            ["other", "Others"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setSettingsTab(key)}
            className={`rounded-lg px-3 py-2 text-xs font-semibold ${
              settingsTab === key ? "bg-primary text-white shadow-sm" : "text-ink-muted hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="trakr-card space-y-5 p-6">
        <h2 className="font-semibold text-ink dark:text-zinc-100">Campaign details</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-ink-muted">Campaign name</label>
            <input className="form-field" defaultValue="Pixem" />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-muted">Subdomain</label>
            <input className="form-field" defaultValue="Pixenmarketplace" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-ink-muted">Website</label>
            <input className="form-field" defaultValue="pixemstudio.com" />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-muted">Campaign currency</label>
            <select className="form-field" defaultValue="usd">
              <option value="usd">USD — US dollar</option>
              <option value="eur">EUR — Euro</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-sidebar-border bg-surface-muted px-4 py-3 dark:border-white/10 dark:bg-zinc-800/50">
          <div>
            <p className="text-sm font-semibold text-ink dark:text-zinc-100">Approve affiliates automatically</p>
            <p className="text-xs text-ink-muted">New applications are accepted without manual review.</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={autoApprove}
            onClick={() => setAutoApprove((v) => !v)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${autoApprove ? "bg-primary" : "bg-surface-muted dark:bg-zinc-700"}`}
          >
            <span
              className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform ${autoApprove ? "left-5" : "left-0.5"}`}
            />
          </button>
        </div>

        <div className="rounded-xl border border-sidebar-border bg-surface-muted p-4 dark:border-white/10 dark:bg-zinc-800/40">
          <div className="mb-4 inline-flex rounded-lg border border-sidebar-border bg-white p-0.5 dark:border-white/10 dark:bg-zinc-900">
            <button
              type="button"
              onClick={() => setCommissionTab("pct")}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                commissionTab === "pct" ? "bg-surface-muted text-primary dark:bg-zinc-800" : "text-ink-muted"
              }`}
            >
              Percentage
            </button>
            <button
              type="button"
              onClick={() => setCommissionTab("flat")}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                commissionTab === "flat" ? "bg-surface-muted text-primary dark:bg-zinc-800" : "text-ink-muted"
              }`}
            >
              Flat rate
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-ink-muted">Commission rate</label>
              <input className="form-field" defaultValue="10%" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-muted">Link and coupons</label>
              <input className="form-field" defaultValue="pixen.10" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-muted">For how many payments</label>
              <input className="form-field" defaultValue="10" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-muted">For how many months</label>
              <input className="form-field" defaultValue="12" />
            </div>
          </div>
        </div>

        <button type="button" className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
}
