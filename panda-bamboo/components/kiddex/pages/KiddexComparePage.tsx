import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { KiddexSubscribeSection } from "@/components/kiddex/sections/KiddexSubscribeSection";
import { KiddexCompareSection } from "@/components/kiddex/sections/shop/KiddexCompareSection";

export function KiddexComparePage() {
  return (
    <>
      <KiddexPageTitle crumbs={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
      <KiddexCompareSection />
      <KiddexSubscribeSection />
    </>
  );
}
