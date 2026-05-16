import { Container } from "@/design-system";

const items = [
  "Same day Product Delivery",
  "100% Customer Satisfaction",
  "Help and access is our mission",
  "100% quality Toy Accessories",
  "24/7 Support for Clients",
];

export function HighlightsSection() {
  return (
    <section className="border-y border-border bg-white py-12">
      <Container>
        <ul className="grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-5">
          {items.map((label) => (
            <li key={label} className="rounded-xl bg-surface px-4 py-5 text-sm font-bold text-ink">
              {label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
