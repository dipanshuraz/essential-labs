import { ADDRESSES } from "@/lib/account/mockData";

export default function AddressesPage() {
  return (
    <div className="personal-info">
      <h3>Manage Addresses</h3>
      <button type="button" className="theme-btn btn-one" style={{ marginBottom: 20 }}>
        + Add a new address
      </button>
      {ADDRESSES.map((a) => (
        <div key={a.id} className="single-item" style={{ marginTop: 16 }}>
          <h6>{a.type}</h6>
          <span style={{ display: "block", fontWeight: 600 }}>{a.name}</span>
          <span style={{ display: "block" }}>{a.lines}</span>
          <span style={{ display: "block" }}>{a.phone}</span>
          <button type="button">Edit</button>
        </div>
      ))}
    </div>
  );
}
