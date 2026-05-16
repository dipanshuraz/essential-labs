import { Breadcrumb, Button, Input, Section, Text } from "@/design-system";

export function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <Section className="bg-surface py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
            <h3 className="font-bold text-ink">Address</h3>
            <Text muted className="mt-2 text-sm">
              57 heol isaf Station Road, Cardiff, UK
            </Text>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
            <h3 className="font-bold text-ink">Phone</h3>
            <a href="tel:912345678" className="mt-2 block text-sm font-semibold text-theme">
              91 2345 678
            </a>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
            <h3 className="font-bold text-ink">Email</h3>
            <a href="mailto:info@example.com" className="mt-2 block text-sm font-semibold text-theme">
              info@example.com
            </a>
          </div>
        </div>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-extrabold text-ink">Send a message</h1>
            <Text muted className="mt-4">
              We typically respond within one business day.
            </Text>
          </div>
          <form className="space-y-4 rounded-2xl border border-border bg-white p-8 shadow-card">
            <Input placeholder="Your name" required />
            <Input type="email" placeholder="Email" required />
            <textarea
              className="w-full rounded-2xl border border-border px-5 py-3 text-sm outline-none focus:border-theme focus:ring-2 focus:ring-theme/20"
              rows={5}
              placeholder="Message"
              required
            />
            <Button type="submit">Send message</Button>
          </form>
        </div>
      </Section>
    </>
  );
}
