import { KiddexPageTitle } from "@/components/kiddex/kiddex-page-title";
import { CartClient } from "./cart-client";

export default function CartPage() {
  return (
    <>
      <KiddexPageTitle
        items={[
          { href: "/", label: "Home" },
          { label: "Cart" },
        ]}
      />
      <CartClient />
    </>
  );
}
