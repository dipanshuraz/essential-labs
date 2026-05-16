import { Button, Container } from "@/design-system";

export function CtaSection() {
  return (
    <section className="bg-ink py-14 text-white">
      <Container className="text-center">
        <h2 className="text-2xl font-bold">Special offer on kids bundles</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-white/70">
          Save more with coupon 2BD30X on selected toys and games this week.
        </p>
        <Button href="/shop" className="mt-6" variant="primary">
          Shop the sale
        </Button>
      </Container>
    </section>
  );
}
