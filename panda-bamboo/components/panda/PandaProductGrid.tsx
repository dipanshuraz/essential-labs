import type { Product } from "@/lib/catalog";
import { PandaProductCard } from "@/components/panda/PandaProductCard";

export function PandaProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="pl-product-grid">
      {products.map((p) => (
        <PandaProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
