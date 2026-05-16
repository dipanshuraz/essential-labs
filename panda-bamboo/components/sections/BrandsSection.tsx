import Image from "next/image";
import Link from "next/link";
import { Container, SectionTitle } from "@/design-system";
import { asset } from "@/lib/assets";

const brands = [
  { img: "brands/brands-7.png", sale: "25% off" },
  { img: "brands/brands-8.png", sale: "20% off" },
  { img: "brands/brands-9.png", sale: "10% off" },
  { img: "brands/brands-10.png", sale: "15% off" },
  { img: "brands/brands-11.png", sale: "25% off" },
  { img: "brands/brands-12.png", sale: "10% off" },
];

export function BrandsSection() {
  return (
    <section className="bg-surface py-16">
      <Container>
        <SectionTitle title="Shop by" highlight="Brands" centered />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {brands.map((b) => (
            <Link
              key={b.img}
              href="/shop"
              className="flex flex-col items-center rounded-2xl border border-border bg-white p-4 text-center shadow-card transition hover:border-theme"
            >
              <Image src={asset(b.img)} alt="" width={80} height={48} className="h-12 object-contain" />
              <p className="mt-3 text-xs font-semibold text-ink">Big sale {b.sale}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
