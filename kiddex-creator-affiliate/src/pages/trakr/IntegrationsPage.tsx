import { useState } from "react";
import { ExternalLink, Link2 } from "lucide-react";
import { INTEGRATIONS } from "@/data/trakrDemo";
import { Badge } from "@/components/ui/Badge";

export function IntegrationsPage() {
  const [rows, setRows] = useState(() =>
    INTEGRATIONS.map((i) => ({ ...i, on: i.id === "i1" || i.id === "i3" })),
  );

  function toggle(id: string) {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, on: !x.on } : x)));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink dark:text-zinc-100">Integration instruction</h1>
          <p className="mt-1 text-sm text-ink-muted">Connect processors, CRMs, and creative workflows.</p>
        </div>
        <button type="button" className="btn-primary">
          Connect Payment Processor
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((i) => (
          <div key={i.id} className="trakr-card flex flex-col p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                {i.title.slice(0, 1)}
              </div>
              <a
                href={`https://${i.domain}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-primary"
              >
                {i.domain}
                <ExternalLink className="size-3.5" />
              </a>
            </div>
            <h3 className="mt-3 font-semibold text-ink dark:text-zinc-100">{i.title}</h3>
            <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-muted">{i.desc}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span
                className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                  i.diff === "Medium" ? "bg-status-errorBg text-status-error" : "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-200"
                }`}
              >
                {i.diff}
              </span>
              <Badge variant="neutral">{i.category}</Badge>
              <span
                className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                  i.dev ? "bg-primary/15 text-primary" : "bg-surface-muted text-ink-muted dark:bg-zinc-800"
                }`}
              >
                {i.dev ? "Developer needed" : "No developer needed"}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-sidebar-border pt-4 dark:border-white/10">
              <button type="button" className="btn-outline !py-2 text-xs">
                <Link2 className="size-3.5" />
                Connect
              </button>
              <button
                type="button"
                role="switch"
                aria-checked={i.on}
                onClick={() => toggle(i.id)}
                className={`relative h-7 w-12 rounded-full transition-colors ${i.on ? "bg-primary" : "bg-surface-muted dark:bg-zinc-700"}`}
              >
                <span
                  className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform ${i.on ? "left-5" : "left-0.5"}`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
