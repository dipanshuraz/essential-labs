import { SAVED_CARDS } from "@/lib/account/mockData";

export default function CardsPage() {
  return (
    <div className="personal-info">
      <h3>Manage Saved Cards</h3>
      {SAVED_CARDS.map((card) => (
        <div key={card.id} className="single-item" style={{ marginTop: 16 }}>
          <h6>{card.label}</h6>
          <span>**** **** **** {card.last4}</span>
          <button type="button">Edit</button>
        </div>
      ))}
    </div>
  );
}
