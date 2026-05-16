import Image from "next/image";
import Link from "next/link";
import { Breadcrumb, Section, SectionTitle, Text } from "@/design-system";
import { asset } from "@/lib/assets";

const posts = [
  {
    title: "Dressing Your Little One: Stylish and Comfortable Baby Outfits",
    image: "news/news-1.png",
    author: "Jeams",
  },
  {
    title: "Baby Gear Essentials: What You Really Need",
    image: "news/news-2.png",
    author: "Jeams",
  },
  {
    title: "Babyproofing Your Home: A Comprehensive Guide",
    image: "news/news-3.png",
    author: "Jeams",
  },
  {
    title: "How to Choose the Perfect Crib for Your Baby",
    image: "news/news-4.png",
    author: "Jeams",
  },
];

export function BlogPage({ layout = "grid" }: { layout?: "grid" | "standard" }) {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <Section>
        <SectionTitle title="Latest From" highlight="Media" centered />
        <div className={layout === "grid" ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-4" : "mx-auto max-w-3xl space-y-10"}>
          {posts.map((post) => (
            <article key={post.title} className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
              <Image src={asset(post.image)} alt="" width={400} height={260} className="h-48 w-full object-cover" />
              <div className="p-5">
                <Text className="text-xs font-semibold uppercase text-theme">By {post.author}</Text>
                <h3 className="mt-2 text-lg font-bold text-ink">
                  <Link href="/blog-details" className="hover:text-theme">
                    {post.title}
                  </Link>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
