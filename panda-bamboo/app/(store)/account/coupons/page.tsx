import { COUPONS } from "@/lib/account/mockData";

export default function CouponsPage() {
  return (
    <div className="personal-info">
      <h3>Available Coupons</h3>
      <p>Apply these offers at checkout on the storefront.</p>
      {COUPONS.map((c) => (
        <div key={c.id} className="single-item" style={{ marginTop: 20 }}>
          <h6 style={{ color: "var(--theme-color)", fontSize: "1rem" }}>{c.title}</h6>
          <span style={{ display: "block", marginTop: 6 }}>{c.description}</span>
          <span style={{ display: "block", marginTop: 4, fontSize: "0.85rem", opacity: 0.8 }}>{c.validTill}</span>
        </div>
      ))}
    </div>
  );
}
