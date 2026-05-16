import { KiddexLayout } from "@/components/kiddex/layout/KiddexLayout";
import { KiddexStaticPage } from "@/components/kiddex/pages/KiddexStaticPage";
import { KiddexScripts } from "@/components/kiddex/KiddexScripts";
import { KiddexStyles } from "@/components/kiddex/KiddexStyles";
import { ShopProvider } from "@/components/shop/ShopProvider";

export default function NotFound() {
  return (
    <ShopProvider>
      <KiddexStyles />
      <KiddexLayout>
        <KiddexStaticPage title="error" description="Page not found." />
      </KiddexLayout>
      <KiddexScripts />
    </ShopProvider>
  );
}
