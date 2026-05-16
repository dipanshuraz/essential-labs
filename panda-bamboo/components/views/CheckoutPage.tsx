import { Breadcrumb, Button, Input, Section, Text } from "@/design-system";
import { CtaSection, RelatedProductsSection } from "@/components/sections";

export function CheckoutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Checkout" }]} />
      <Section>
        <h1 className="text-3xl font-extrabold text-ink">Checkout</h1>
        <form className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-ink">Billing details</h2>
            <Input placeholder="Full name" required />
            <Input type="email" placeholder="Email" required />
            <Input placeholder="Address" required />
            <Input placeholder="City" required />
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-lg font-bold text-ink">Order summary</h2>
            <Text muted className="mt-4">
              3 items · Subtotal $97.97
            </Text>
            <Button type="submit" className="mt-6 w-full">
              Place Order
            </Button>
          </div>
        </form>
      </Section>
      <CtaSection />
      <RelatedProductsSection context="cart" productIds={["1", "2", "3"]} title="Last-Minute Adds" />
    </>
  );
}
