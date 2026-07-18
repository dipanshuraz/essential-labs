import { PANDA_QUOTES } from "@/lib/panda-content";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

export function PandaTestimonials() {
  return (
    <section className="pl-section">
      <div className="pl-container">
        <div className="pl-section-head">
          <div className="pl-section-head__text">
            <span className="pl-eyebrow">Loved by families</span>
            <h2 className="pl-h2">Quiet confidence, in every wardrobe</h2>
          </div>
        </div>
        <div className="pl-quotes">
          {PANDA_QUOTES.map((q) => (
            <figure className="pl-quote" key={q.name}>
              <p>“{q.quote}”</p>
              <figcaption className="pl-quote__by">
                <span className="pl-quote__avatar" aria-hidden>
                  {initials(q.name)}
                </span>
                <span>
                  <b>{q.name}</b>
                  <span>{q.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
