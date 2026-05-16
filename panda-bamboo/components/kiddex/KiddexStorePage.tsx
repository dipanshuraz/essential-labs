import { notFound } from "next/navigation";
import { KiddexLayout } from "@/components/kiddex/layout/KiddexLayout";
import { getKiddexPageComponent } from "@/lib/kiddex-page-registry";
import { KIDDEX_SLUGS } from "@/lib/kiddex-pages";

export function KiddexStorePage({ slug }: { slug: string }) {
  if (!KIDDEX_SLUGS.includes(slug)) notFound();
  const Page = getKiddexPageComponent(slug);
  if (!Page) notFound();

  return (
    <KiddexLayout>
      <Page />
    </KiddexLayout>
  );
}
