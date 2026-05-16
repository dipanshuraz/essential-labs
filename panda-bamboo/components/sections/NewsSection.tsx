import Image from "next/image";
import Link from "next/link";
import { Container, SectionTitle, Text } from "@/design-system";
import { asset } from "@/lib/assets";

const posts = [
  { title: "Dressing Your Little One: Stylish and Comfortable Baby Outfits", image: "news/news-1.png" },
  { title: "Baby Gear Essentials What You Really Need", image: "news/news-2.png" },
  { title: "Babyproofing Your Home A Comprehensive Guide", image: "news/news-3.png" },
  { title: "How to Choose the Perfect Crib for Your Baby", image: "news/news-4.png" },
];

export function NewsSection() {
  return (
    <section className="bg-surface py-16">
      <Container>
        <SectionTitle title="Latest From" highlight="Media" centered />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <article key={post.title} className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
              <Image src={asset(post.image)} alt="" width={300} height={200} className="h-40 w-full object-cover" />
              <div className="p-4">
                <Text className="text-xs font-semibold uppercase text-theme">By Jeams</Text>
                <h3 className="mt-2 text-sm font-bold text-ink">
                  <Link href="/blog-details" className="hover:text-theme">
                    {post.title}
                  </Link>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
