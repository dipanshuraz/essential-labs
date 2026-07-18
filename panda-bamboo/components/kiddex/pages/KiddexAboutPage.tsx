import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { KiddexAboutHero } from "@/components/kiddex/sections/KiddexAboutHero";
import { KiddexAboutTestimonials } from "@/components/kiddex/sections/KiddexAboutTestimonials";
import { KiddexBrandsStyleTwo } from "@/components/kiddex/sections/KiddexBrandsStyleTwo";
import { KiddexHighlightsStrip } from "@/components/kiddex/sections/KiddexHighlightsStrip";
import { KiddexNewsSection } from "@/components/kiddex/sections/KiddexNewsSection";
import { KiddexSlideText } from "@/components/kiddex/sections/KiddexSlideText";
import { KiddexSubscribeSection } from "@/components/kiddex/sections/KiddexSubscribeSection";
import { ABOUT_NEWS } from "@/lib/kiddex-site-content";

export function KiddexAboutPage() {
  return (
    <>
      <KiddexPageTitle crumbs={[{ label: "Home", href: "/" }, { label: "About us" }]} />
      <KiddexAboutHero />
      <KiddexSlideText />
      <KiddexBrandsStyleTwo />
      <KiddexAboutTestimonials />
      <KiddexHighlightsStrip />
      <KiddexNewsSection posts={ABOUT_NEWS} />
      <KiddexSubscribeSection />
    </>
  );
}
