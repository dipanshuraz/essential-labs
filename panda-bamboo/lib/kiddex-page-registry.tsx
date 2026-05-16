import type { ComponentType } from "react";
import { KiddexHomePage } from "@/components/kiddex/pages/KiddexHomePage";
import { KiddexAboutPage } from "@/components/kiddex/pages/KiddexAboutPage";
import { KiddexBlogDetailsPage } from "@/components/kiddex/pages/KiddexBlogDetailsPage";
import { KiddexBlogPage } from "@/components/kiddex/pages/KiddexBlogPage";
import { KiddexContactPage } from "@/components/kiddex/pages/KiddexContactPage";
import { KiddexErrorPage } from "@/components/kiddex/pages/KiddexErrorPage";
import { KiddexProductDetailsSection } from "@/components/kiddex/shop/KiddexProductDetailsSection";
import { KiddexShopSection } from "@/components/kiddex/shop/KiddexShopSection";
import { KIDDEX_SLUGS } from "@/lib/kiddex-pages";

const HOME_VARIANTS: Record<string, number> = {
  "index-2": 2,
  "index-3": 3,
  "index-4": 4,
  "index-5": 5,
};

const SHOP_VARIANTS = new Set(["shop-2", "shop-3", "shop-4", "shop-5", "shop-6"]);

function namedPage(name: string, render: () => React.JSX.Element): ComponentType {
  const Page = () => render();
  Page.displayName = name;
  return Page;
}

function resolveKiddexPage(slug: string): ComponentType {
  if (slug in HOME_VARIANTS) {
    const variant = HOME_VARIANTS[slug];
    const Page = () => <KiddexHomePage variant={variant} />;
    Page.displayName = `KiddexHome_${slug}`;
    return Page;
  }

  if (SHOP_VARIANTS.has(slug)) {
    const Page = () => <KiddexShopSection title={slug.replace(/-/g, " ")} />;
    Page.displayName = `KiddexShop_${slug}`;
    return Page;
  }

  if (slug.startsWith("shop-details")) {
    return KiddexProductDetailsSection;
  }

  switch (slug) {
    case "about":
      return KiddexAboutPage;
    case "contact":
      return KiddexContactPage;
    case "blog":
      return namedPage("KiddexBlogGrid", () => <KiddexBlogPage layout="grid" />);
    case "blog-2":
      return namedPage("KiddexBlogStandard", () => <KiddexBlogPage layout="standard" />);
    case "blog-details":
      return KiddexBlogDetailsPage;
    case "error":
      return KiddexErrorPage;
    default:
      return KiddexErrorPage;
  }
}

export const kiddexPageRegistry: Record<string, ComponentType> = Object.fromEntries(
  KIDDEX_SLUGS.map((slug) => [slug, resolveKiddexPage(slug)]),
);

export function getKiddexPageComponent(slug: string): ComponentType | undefined {
  return kiddexPageRegistry[slug];
}
