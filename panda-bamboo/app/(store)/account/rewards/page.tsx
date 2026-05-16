import { SUPERCOIN_BALANCE } from "@/lib/account/mockData";

export default function RewardsPage() {
  return (
    <div className="personal-info">
      <h3>Kiddex Coins</h3>
      <p>Your coin balance</p>
      <div className="single-item" style={{ marginTop: 16 }}>
        <h6>Balance</h6>
        <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--theme-color)" }}>
          {SUPERCOIN_BALANCE} coins
        </span>
      </div>
    </div>
  );
}
