import { KiddexLayout } from "@/components/kiddex/layout/KiddexLayout";
import { KiddexStaticPage } from "@/components/kiddex/pages/KiddexStaticPage";
import { ShopProvider } from "@/components/shop/ShopProvider";

export default function NotFound() {
  return (
    <ShopProvider>
      <KiddexLayout>
        <KiddexStaticPage title="error" description="Page not found." />
      </KiddexLayout>
    </ShopProvider>
  );
}
