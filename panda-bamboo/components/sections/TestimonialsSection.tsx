import { Container, SectionTitle } from "@/design-system";

const reviews = [
  {
    name: "Kenneth R. Myers",
    rating: 5,
    text: "I absolutely love this baby shop! The staff is incredibly helpful, and the selection is fantastic.",
  },
  {
    name: "James W. Myers",
    rating: 4,
    text: "Shopping here has been a delightful experience. The quality of the products is top-notch.",
  },
  {
    name: "Sarah L. Chen",
    rating: 5,
    text: "This baby shop has been a lifesaver! Knowledgeable staff guided me through every purchase.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16">
      <Container>
        <SectionTitle title="Customer" highlight="Testimonials" centered />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <blockquote
              key={r.name}
              className="rounded-2xl border border-border bg-white p-6 shadow-card"
            >
              <p className="text-sm font-bold text-ink">{r.name}</p>
              <p className="mt-1 text-xs text-theme">★ {r.rating}/5</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{r.text}</p>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
