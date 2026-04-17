import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseImages } from "@/lib/format";
import { KiddexPageTitle } from "@/components/kiddex/kiddex-page-title";
import { ProductDetailClient } from "@/components/kiddex/product-detail-client";
import type { ShopBlockProduct } from "@/components/kiddex/kiddex-shop-block-one";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) notFound();

  const images = parseImages(product.images);
  const relatedRows = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    take: 4,
    include: { category: true },
  });

  const related: ShopBlockProduct[] = relatedRows.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    priceCents: p.priceCents,
    image: parseImages(p.images)[0] ?? null,
    categoryName: p.category.name,
    stock: p.stock,
  }));

  return (
    <>
      <KiddexPageTitle
        items={[
          { href: "/", label: "Home" },
          { href: "/shop", label: "Shop" },
          { label: product.name },
        ]}
      />
      <ProductDetailClient
        productId={product.id}
        slug={product.slug}
        name={product.name}
        description={product.description || "No description yet."}
        priceCents={product.priceCents}
        stock={product.stock}
        categoryName={product.category.name}
        images={images}
        related={related}
      />
    </>
  );
}
