import { KiddexScripts } from "@/components/kiddex/KiddexScripts";
import { KiddexStyles } from "@/components/kiddex/KiddexStyles";
import { ShopProvider } from "@/components/shop/ShopProvider";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <ShopProvider>
      <KiddexStyles />
      {children}
      <KiddexScripts />
    </ShopProvider>
  );
}
