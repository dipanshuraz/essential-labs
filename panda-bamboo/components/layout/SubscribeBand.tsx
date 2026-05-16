import { Button, Container, Input } from "@/design-system";

export function SubscribeBand() {
  return (
    <section className="bg-theme py-14 text-white">
      <Container className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Get Discount on First Subscribe</h2>
        <form className="flex w-full max-w-md gap-2" action="/contact" method="get">
          <Input type="email" name="email" placeholder="Email Address" required className="border-0" />
          <Button type="submit" variant="secondary" size="md">
            →
          </Button>
        </form>
      </Container>
    </section>
  );
}
