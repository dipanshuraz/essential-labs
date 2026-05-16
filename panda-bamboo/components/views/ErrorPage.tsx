import Image from "next/image";
import { Breadcrumb, Button, Section } from "@/design-system";
import { asset } from "@/lib/assets";

export function ErrorPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "404" }]} />
      <Section className="text-center">
        <Image src={asset("icons/error-1.png")} alt="" width={280} height={200} className="mx-auto" />
        <h1 className="mt-8 text-3xl font-extrabold text-ink">Oops! That page can not be found.</h1>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/" variant="ghost">
            Go Back
          </Button>
          <Button href="/">Go to Homepage</Button>
        </div>
      </Section>
    </>
  );
}
