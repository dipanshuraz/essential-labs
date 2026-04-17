import Link from "next/link";
import Image from "next/image";
import { DUMMY_PRODUCT_IMAGE, formatMoney } from "@/lib/format";

export type GridProduct = {
  id: string;
  name: string;
  slug: string;
  priceCents: number;
  image: string | null;
  category: string;
};

export function ProductGrid({ products }: { products: GridProduct[] }) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-[#eadfd6] bg-[#fffdfb] p-8 text-center text-[#7a716b]">
        No products yet. Add some in the admin panel.
      </p>
    );
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <li key={p.id}>
          <Link
            href={`/product/${p.slug}`}
            className="group block overflow-hidden rounded-2xl border border-[#f0e6de] bg-white shadow-sm transition hover:border-[#c45c6a]/40 hover:shadow-md"
          >
            <div className="relative aspect-[3/4] bg-[#f7f2ed]">
              <Image
                src={p.image ?? DUMMY_PRODUCT_IMAGE}
                alt={p.name}
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-wide text-[#9a928b]">{p.category}</p>
              <h3 className="mt-1 font-semibold text-[#2d2a28] group-hover:text-[#c45c6a]">
                {p.name}
              </h3>
              <p className="mt-2 text-sm font-medium text-[#2d5a4a]">
                {formatMoney(p.priceCents)}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
