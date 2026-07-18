import { MARQUEE_ITEMS } from "@/lib/kiddex-site-content";
import { asset } from "@/lib/assets";

type Props = { variant?: "two" | "three" };

export function KiddexSlideText({ variant = "two" }: Props) {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  const sectionClass =
    variant === "three" ? "slide-text style-three p_relative" : "slide-text style-two home-3 p_relative";

  return (
    <div className={sectionClass}>
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
