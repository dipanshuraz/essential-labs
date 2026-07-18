import { ShopProvider } from "@/components/shop/ShopProvider";

/**
 * Store group provides cart/wishlist state. Theme CSS/JS now live inside
 * `KiddexLayout`, so redesigned Panda routes render on a clean canvas.
 */
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <ShopProvider>{children}</ShopProvider>;
}
