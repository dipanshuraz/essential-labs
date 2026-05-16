import { DEMO_ACCESS } from "@/lib/demo-access";

function AccessRow({
  label,
  url,
  email,
  password,
  note,
}: {
  label: string;
  url: string;
  email: string | null;
  password: string | null;
  note?: string;
}) {
  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.08)",
        background: "rgba(255,255,255,0.95)",
        padding: "1rem",
        fontSize: 14,
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div>
          <p style={{ margin: 0, fontWeight: 600, color: "#1a1d1f" }}>{label}</p>
          {note ? <p style={{ margin: "4px 0 0", fontSize: 12, color: "#6f767e" }}>{note}</p> : null}
        </div>
        <a
          href={url}
          style={{
            flexShrink: 0,
            borderRadius: 8,
            background: "#3d8b5c",
            color: "#fff",
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Open login
        </a>
      </div>
      {email && password ? (
        <p style={{ margin: "12px 0 0", fontFamily: "ui-monospace, monospace", fontSize: 12, color: "#6f767e" }}>
          Email {email} · Password {password}
        </p>
      ) : null}
    </div>
  );
}

export function DemoAccessPanel() {
  const { storefront, admin, affiliate } = DEMO_ACCESS;

  return (
    <section
      style={{
        position: "relative",
        zIndex: 100,
        borderBottom: "1px solid rgba(61,139,92,0.2)",
        background: "#e8f5ee",
        padding: "1.25rem 1rem",
        fontFamily: "Nunito, system-ui, sans-serif",
      }}
      aria-label="Development access"
    >
      <div style={{ maxWidth: 768, margin: "0 auto" }}>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1a1d1f" }}>
          Kiddex platform — who logs in where?
        </h2>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "#6f767e" }}>
          Two back-office panels (merchant admin and affiliate hub) plus this storefront for shoppers. Only the panels
          have working demo login today.
        </p>
        <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
          <AccessRow
            label={storefront.label}
            url={storefront.url}
            email={storefront.email}
            password={storefront.password}
            note={storefront.note}
          />
          <AccessRow label={admin.label} url={admin.url} email={admin.email} password={admin.password} />
          <AccessRow
            label={affiliate.label}
            url={affiliate.url}
            email={affiliate.email}
            password={affiliate.password}
          />
        </div>
      </div>
    </section>
  );
}
