import Link from "next/link";
import { PANDA_COLLECTIONS } from "@/lib/panda-content";
import { IconArrow } from "@/components/panda/icons";

export function PandaCollections() {
  return (
    <section className="pl-section">
      <div className="pl-container">
        <div className="pl-section-head">
          <div className="pl-section-head__text">
            <span className="pl-eyebrow">Collections</span>
            <h2 className="pl-h2">Considered edits for every season</h2>
          </div>
        </div>
        <div className="pl-collections">
          {PANDA_COLLECTIONS.map((c) => (
            <Link key={c.title} href={c.href} className={`pl-collection pl-collection--${c.tone}`}>
              <h3 className="pl-collection__title">{c.title}</h3>
              <p className="pl-collection__sub">{c.subtitle}</p>
              <span className="pl-collection__cta">
                Explore <IconArrow width={16} height={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
