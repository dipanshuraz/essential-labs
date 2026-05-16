export default function PlusPage() {
  return (
    <div className="personal-info">
      <h3>Kiddex Plus Zone</h3>
      <p>Shop 20 times in a year for Plus Gold · 10 times for Plus Silver.</p>
      <div className="row clearfix" style={{ marginTop: 24 }}>
        {["15% early access during sale", "Bigger surprise treats", "Extra 5% off", "2% Kiddex Coins"].map((b) => (
          <div key={b} className="col-xl-6 col-md-12 single-column">
            <div className="single-item">
              <h6>Benefit</h6>
              <span>{b}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
