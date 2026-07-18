import { KiddexStorePage } from "@/components/kiddex/KiddexStorePage";
import { KIDDEX_DYNAMIC_SLUGS } from "@/lib/kiddex-routes";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return KIDDEX_DYNAMIC_SLUGS.map((slug) => ({ slug }));
}

export default async function StoreSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!KIDDEX_DYNAMIC_SLUGS.includes(slug as (typeof KIDDEX_DYNAMIC_SLUGS)[number])) {
    notFound();
  }
  return (
    <Suspense fallback={null}>
      <KiddexStorePage slug={slug} />
    </Suspense>
  );
}
