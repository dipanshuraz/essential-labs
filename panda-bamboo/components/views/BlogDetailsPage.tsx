import Image from "next/image";
import Link from "next/link";
import { Breadcrumb, Section, Text } from "@/design-system";
import { asset } from "@/lib/assets";

export function BlogDetailsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Article" },
        ]}
      />
      <Section containerClassName="max-w-4xl">
        <article className="mx-auto max-w-3xl">
          <Text className="text-xs font-semibold uppercase text-theme">By Jeams · June 3, 2024</Text>
          <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">
            Dressing Your Little One: Stylish and Comfortable Baby Outfits
          </h1>
          <Image
            src={asset("news/news-1.png")}
            alt=""
            width={800}
            height={420}
            className="mt-8 w-full rounded-2xl object-cover"
          />
          <div className="prose prose-neutral mt-8 max-w-none space-y-4 text-muted">
            <p>
              Choosing baby outfits combines comfort, safety, and style. Soft fabrics and easy fasteners make daily
              changes simpler for parents and gentler on sensitive skin.
            </p>
            <p>
              Layering works well across seasons — breathable cotton for warm days and cozy knits when temperatures
              drop. Look for tagless labels and machine-washable materials to save time.
            </p>
            <p>
              Mix neutral basics with playful prints so every outfit feels fresh without overcrowding the wardrobe.
            </p>
          </div>
          <Link href="/blog" className="mt-8 inline-block font-semibold text-theme hover:underline">
            ← Back to blog
          </Link>
        </article>
      </Section>
    </>
  );
}
