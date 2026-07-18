import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { KiddexAccountSection } from "@/components/kiddex/sections/KiddexAccountSection";
import { FeaturedStyleTwoSection } from "@/components/kiddex/sections/home/FeaturedStyleTwoSection";
import { KiddexSubscribeSection } from "@/components/kiddex/sections/KiddexSubscribeSection";

export function KiddexAccountTemplatePage() {
  return (
    <>
      <KiddexPageTitle crumbs={[{ label: "Home", href: "/" }, { label: "Account" }]} />
      <KiddexAccountSection />
      <FeaturedStyleTwoSection className="featured-style-two home-4 pb_90" />
      <KiddexSubscribeSection />
    </>
  );
}
