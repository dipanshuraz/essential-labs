import { MARQUEE_ITEMS } from "@/lib/kiddex-site-content";
import { asset } from "@/lib/assets";

export function KiddexSlideText() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="slide-text style-two home-3 p_relative">
      <div
        className="pattern-layer float-bob-y"
        style={{ backgroundImage: `url(${asset("shape/shape-75.png")})` }}
      />
      <div className="text-inner">
        <ul className="text-list">
          {items.map((label, i) => (
            <li key={`${label}-${i}`}>{label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
