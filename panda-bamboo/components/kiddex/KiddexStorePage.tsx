import { notFound } from "next/navigation";
import { KiddexLayout } from "@/components/kiddex/layout/KiddexLayout";
import { getKiddexPageComponent } from "@/lib/kiddex-page-registry";
import { KIDDEX_DYNAMIC_SLUGS } from "@/lib/kiddex-routes";

export function KiddexStorePage({ slug }: { slug: string }) {
  if (!KIDDEX_DYNAMIC_SLUGS.includes(slug as (typeof KIDDEX_DYNAMIC_SLUGS)[number])) notFound();
  const Page = getKiddexPageComponent(slug);
  if (!Page) notFound();

  return (
    <KiddexLayout>
      <Page />
    </KiddexLayout>
  );
}
