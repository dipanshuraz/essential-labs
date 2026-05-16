import Link from "next/link";

export default function PaymentsPage() {
  return (
    <div>
      <h3>Billing and Payments</h3>
      <div className="payment-option">
        <div className="bank-payment">
          <div className="check-box mb_12">
            <input className="check" type="radio" id="pay-bank" name="pay" defaultChecked />
            <label htmlFor="pay-bank">Direct Bank Transfer</label>
          </div>
          <p>Make your payment directly into our bank account. Please use your Order ID as payment reference.</p>
        </div>
        <ul className="other-payment">
          <li>
            <div className="check-box mb_12">
              <input className="check" type="radio" id="pay-cod" name="pay" />
              <label htmlFor="pay-cod">Cash on Delivery</label>
            </div>
          </li>
          <li>
            <div className="check-box mb_12">
              <input className="check" type="radio" id="pay-card" name="pay" />
              <label htmlFor="pay-card">Credit/Debit Cards or Paypal</label>
            </div>
          </li>
        </ul>
      </div>
      <p style={{ marginTop: 24 }}>
        <Link href="/account/cards" className="theme-btn btn-one" style={{ display: "inline-block", marginRight: 12 }}>
          Manage saved cards
        </Link>
        <Link href="/account/addresses" className="theme-btn btn-one" style={{ display: "inline-block" }}>
          Manage addresses
        </Link>
      </p>
    </div>
  );
}
