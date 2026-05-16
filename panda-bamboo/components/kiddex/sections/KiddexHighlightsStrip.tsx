import { HIGHLIGHTS_STRIP } from "@/lib/kiddex-site-content";
import { asset } from "@/lib/assets";

export function KiddexHighlightsStrip() {
  return (
    <section className="highlights-section pt_0">
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
