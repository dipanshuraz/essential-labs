import { KiddexShell } from "@/components/kiddex/kiddex-shell";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import "@/styles/kiddex-overrides.css";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <WishlistProvider>
        <KiddexShell>{children}</KiddexShell>
      </WishlistProvider>
    </CartProvider>
  );
}
