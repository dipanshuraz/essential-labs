import { useState, type Dispatch, type SetStateAction } from "react";
import { Mail, Pencil } from "lucide-react";

type Row = { id: string; title: string; desc: string; on: boolean };

const toAffiliates: Row[] = [
  { id: "a1", title: "Affiliate approved", desc: "Sent when an application is accepted.", on: true },
  { id: "a2", title: "Affiliate declined", desc: "Sent when an application is rejected.", on: true },
  { id: "a3", title: "New referral", desc: "A tracked referral was created.", on: true },
  { id: "a4", title: "New sale", desc: "Commissionable sale attributed to a partner.", on: true },
];

const toYou: Row[] = [
  { id: "y1", title: "New affiliate programs posted", desc: "Marketplace updates for your niche.", on: true },
  { id: "y2", title: "New affiliate sign up", desc: "Someone applied to your program.", on: true },
  { id: "y3", title: "New referral", desc: "Activity on your tracked links.", on: false },
  { id: "y4", title: "New sale", desc: "Revenue events across affiliates.", on: true },
  { id: "y5", title: "Weekly summary", desc: "Rollup every Monday morning.", on: true },
];

export function EmailSettingsPage() {
  const [aff, setAff] = useState(toAffiliates);
  const [you, setYou] = useState(toYou);

  function flip(setter: Dispatch<SetStateAction<Row[]>>, id: string) {
    setter((rows) => rows.map((r) => (r.id === id ? { ...r, on: !r.on } : r)));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink dark:text-zinc-100">Email settings</h1>
        <p className="mt-1 text-sm text-ink-muted">Control lifecycle emails and your sending identity.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="trakr-card space-y-4 p-6">
          <div>
            <h2 className="font-semibold text-ink dark:text-zinc-100">Email notification</h2>
            <p className="text-sm text-ink-muted">Choose which events generate mail.</p>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-subtle">To affiliates</p>
            <ul className="divide-y divide-sidebar-border rounded-xl border border-sidebar-border dark:divide-white/10 dark:border-white/10">
              {aff.map((r) => (
                <li key={r.id} className="flex items-center gap-3 p-4">
                  <Mail className="size-4 shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink dark:text-zinc-200">{r.title}</p>
                    <p className="text-xs text-ink-muted">{r.desc}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={r.on}
                    onClick={() => flip(setAff, r.id)}
                    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${r.on ? "bg-primary" : "bg-surface-muted dark:bg-zinc-700"}`}
                  >
                    <span
                      className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform ${r.on ? "left-5" : "left-0.5"}`}
                    />
                  </button>
                  <button type="button" className="rounded-lg p-2 text-ink-muted hover:bg-surface-muted dark:hover:bg-zinc-800" aria-label="Edit template">
                    <Pencil className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-subtle">To you</p>
            <ul className="divide-y divide-sidebar-border rounded-xl border border-sidebar-border dark:divide-white/10 dark:border-white/10">
              {you.map((r) => (
                <li key={r.id} className="flex items-center gap-3 p-4">
                  <Mail className="size-4 shrink-0 text-ink-subtle" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink dark:text-zinc-200">{r.title}</p>
                    <p className="text-xs text-ink-muted">{r.desc}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={r.on}
                    onClick={() => flip(setYou, r.id)}
                    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${r.on ? "bg-primary" : "bg-surface-muted dark:bg-zinc-700"}`}
                  >
                    <span
                      className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform ${r.on ? "left-5" : "left-0.5"}`}
                    />
                  </button>
                  <button type="button" className="rounded-lg p-2 text-ink-muted hover:bg-surface-muted dark:hover:bg-zinc-800" aria-label="Edit template">
                    <Pencil className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button type="button" className="btn-primary">
            Save
          </button>
        </div>

        <div className="trakr-card space-y-4 p-6">
          <div>
            <h2 className="font-semibold text-ink dark:text-zinc-100">Custom sending domain</h2>
            <p className="text-sm text-ink-muted">Authenticate your domain to improve deliverability.</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-muted">Domain name</label>
            <div className="mt-1 flex gap-2">
              <input className="form-field flex-1 !mt-0" placeholder="example.com" />
              <button type="button" className="btn-outline shrink-0 !py-2.5">
                Connect
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-muted">Sending email address</label>
            <input className="form-field" defaultValue="pixenstudio.com" />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-muted">Sender name</label>
            <input className="form-field" defaultValue="Unnamed Affiliate Program" />
          </div>
          <button type="button" className="btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
