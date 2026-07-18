import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { KiddexSubscribeSection } from "@/components/kiddex/sections/KiddexSubscribeSection";
import { KiddexWishlistSection } from "@/components/kiddex/sections/shop/KiddexWishlistSection";

export function KiddexWishlistPage() {
  return (
    <>
      <KiddexPageTitle crumbs={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <KiddexWishlistSection />
      <KiddexSubscribeSection />
    </>
  );
}
