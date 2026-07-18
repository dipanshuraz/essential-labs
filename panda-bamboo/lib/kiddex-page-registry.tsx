import type { ComponentType } from "react";
import { KiddexAboutPage } from "@/components/kiddex/pages/KiddexAboutPage";
import { KiddexBlogDetailsPage } from "@/components/kiddex/pages/KiddexBlogDetailsPage";
import { KiddexBlogPage } from "@/components/kiddex/pages/KiddexBlogPage";
import { KiddexCartPage } from "@/components/kiddex/pages/KiddexCartPage";
import { KiddexCheckoutPage } from "@/components/kiddex/pages/KiddexCheckoutPage";
import { KiddexContactPage } from "@/components/kiddex/pages/KiddexContactPage";
import { KiddexErrorPage } from "@/components/kiddex/pages/KiddexErrorPage";
import { KiddexOrderConfirmationPage } from "@/components/kiddex/pages/KiddexOrderConfirmationPage";
import { KiddexProductDetailsPage } from "@/components/kiddex/pages/KiddexProductDetailsPage";
import { KiddexShopListingPage } from "@/components/kiddex/pages/KiddexShopListingPage";
import { KiddexSignPage } from "@/components/kiddex/pages/KiddexSignPage";
import { KiddexAccountTemplatePage } from "@/components/kiddex/pages/KiddexAccountTemplatePage";
import { KiddexComparePage } from "@/components/kiddex/pages/KiddexComparePage";
import { KiddexWishlistPage } from "@/components/kiddex/pages/KiddexWishlistPage";
import { KIDDEX_SLUGS } from "@/lib/kiddex-pages";

function namedPage(name: string, render: () => React.JSX.Element): ComponentType {
  const Page = () => render();
  Page.displayName = name;
  return Page;
}

function resolveKiddexPage(slug: string): ComponentType {
  switch (slug) {
    case "shop":
      return namedPage("KiddexShop", () => <KiddexShopListingPage variant="shop" />);
    case "shop-details":
      return KiddexProductDetailsPage;
    case "cart":
      return KiddexCartPage;
    case "checkout":
      return KiddexCheckoutPage;
    case "order-confirmation":
      return KiddexOrderConfirmationPage;
    case "login":
      return namedPage("KiddexLogin", () => <KiddexSignPage mode="login" />);
    case "signup":
      return namedPage("KiddexSignup", () => <KiddexSignPage mode="signup" />);
    case "about":
      return KiddexAboutPage;
    case "contact":
      return KiddexContactPage;
    case "blog":
      return namedPage("KiddexBlogGrid", () => <KiddexBlogPage layout="grid" />);
    case "blog-details":
      return KiddexBlogDetailsPage;
    case "error":
      return KiddexErrorPage;
    case "account-template":
      return KiddexAccountTemplatePage;
    case "wishlist":
      return KiddexWishlistPage;
    case "compare":
      return KiddexComparePage;
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
