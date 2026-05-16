import Image from "next/image";
import Link from "next/link";
import { Breadcrumb, Button, Section, Text } from "@/design-system";
import { CtaSection, RelatedProductsSection } from "@/components/sections";
import { asset } from "@/lib/assets";
import { formatPrice, products } from "@/lib/catalog";

export function CartPage() {
  const lines = products.slice(0, 3);
  const subtotal = lines.reduce((s, p) => s + p.price, 0);

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <Section>
        <h1 className="text-3xl font-extrabold text-ink">Your Cart</h1>
        <div className="mt-10 space-y-6">
          {lines.map((p) => (
            <div
              key={p.id}
              className="flex gap-4 rounded-2xl border border-border bg-white p-4 shadow-card"
            >
              <Image src={asset(p.image)} alt="" width={96} height={96} className="rounded-xl bg-surface object-contain p-2" />
              <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                <div>
                  <Link href="/shop-details" className="font-bold text-ink hover:text-theme">
                    {p.name}
                  </Link>
                  <Text muted className="mt-1 text-sm">
                    Qty: 1
                  </Text>
                </div>
                <p className="text-lg font-bold text-theme">{formatPrice(p.price)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-surface p-6">
          <p className="text-xl font-bold text-ink">Subtotal: {formatPrice(subtotal)}</p>
          <div className="flex gap-3">
            <Button href="/shop" variant="ghost">
              Continue Shopping
            </Button>
            <Button href="/checkout">Checkout</Button>
          </div>
        </div>
      </Section>
      <CtaSection />
      <RelatedProductsSection
        context="cart"
        productIds={lines.map((p) => p.id)}
        title="Complete Your Order"
      />
    </>
  );
}
