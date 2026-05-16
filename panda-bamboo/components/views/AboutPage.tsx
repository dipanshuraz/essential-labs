import Image from "next/image";
import { Breadcrumb, Section, StatCard, Text } from "@/design-system";
import {
  BrandsSection,
  HighlightsSection,
  MarqueeTicker,
  NewsSection,
  TestimonialsSection,
} from "@/components/sections";
import { asset } from "@/lib/assets";

export function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About us" }]} />
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <Image
              src={asset("resource/about-1.jpg")}
              alt=""
              width={480}
              height={520}
              className="rounded-[2rem] object-cover shadow-card"
            />
            <Image
              src={asset("resource/about-2.jpg")}
              alt=""
              width={200}
              height={220}
              className="absolute -bottom-6 -right-4 rounded-3xl border-4 border-white object-cover shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
              We are a retail business in the Ecommerce Products and accessories for kids
            </h1>
            <Text className="mt-6">
              <span className="font-bold text-theme">Balloon</span>, with a rich legacy spanning 12 years, stands as a
              venerable online destination for parents seeking high-quality toys and accessories.
            </Text>
            <Text muted className="mt-4">
              All components featured in our inventory undergo rigorous quality checks to meet or exceed industry
              standards.
            </Text>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <StatCard value={25} label="Retails Store in the city" />
              <StatCard value={300} label="Active Delivery Person" />
              <StatCard value={120} label="Brands and Companies" />
            </div>
          </div>
        </div>
      </Section>
      <MarqueeTicker />
      <BrandsSection />
      <TestimonialsSection />
      <HighlightsSection />
      <NewsSection />
    </>
  );
}
