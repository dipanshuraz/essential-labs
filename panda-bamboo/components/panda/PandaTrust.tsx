import { PANDA_TRUST } from "@/lib/panda-content";
import { trustIcons } from "@/components/panda/icons";

export function PandaTrust() {
  return (
    <section className="pl-section" style={{ background: "var(--pl-bg-2)" }}>
      <div className="pl-container">
        <div className="pl-section-head">
          <div className="pl-section-head__text">
            <span className="pl-eyebrow">Why parents choose us</span>
            <h2 className="pl-h2">Made with care, from thread to doorstep</h2>
          </div>
        </div>
        <div className="pl-trust">
          {PANDA_TRUST.map((t) => {
            const Icon = trustIcons[t.icon];
            return (
              <div className="pl-trust__item" key={t.title}>
                <span className="pl-trust__icon">
                  <Icon />
                </span>
                <h4>{t.title}</h4>
                <p>{t.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
