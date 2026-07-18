import { HIGHLIGHTS_STRIP } from "@/lib/kiddex-site-content";
import { asset } from "@/lib/assets";

type Props = { className?: string };

export function KiddexHighlightsStrip({ className = "highlights-section pt_0" }: Props) {
  return (
    <section className={className}>
      <div className="large-container">
        <div className="inner-container">
          <ul className="list-item clearfix">
            {HIGHLIGHTS_STRIP.map((item) => (
              <li key={item.title}>
                <div className="single-item">
                  <div className="icon-box"><img src={asset(item.icon)} alt="" /></div>
                  <h5>{item.title}</h5>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
