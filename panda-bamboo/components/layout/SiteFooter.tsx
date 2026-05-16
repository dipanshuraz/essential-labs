import Image from "next/image";
import Link from "next/link";
import { Container } from "@/design-system";
import { asset } from "@/lib/assets";
import { footerResources, footerSupport } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-surface pt-16">
      <Container>
        <div className="grid gap-10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/">
              <Image src={asset("logo.png")} alt="Kiddex" width={120} height={40} className="h-9 w-auto" />
            </Link>
            <p className="mt-4 text-sm text-muted">
              <a href="tel:912345678" className="font-bold text-ink hover:text-theme">
                91 2345 678
              </a>
              <br />
              Call out Hotline 24/7
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-ink">Resources</h4>
            <ul className="space-y-2 text-sm text-muted">
              {footerResources.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="hover:text-theme">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-ink">Support</h4>
            <ul className="space-y-2 text-sm text-muted">
              {footerSupport.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="hover:text-theme">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-ink">Store Info</h4>
            <p className="text-sm text-muted">57 heol isaf Station Road, Cardiff, UK</p>
            <a href="mailto:info@example.com" className="mt-2 block text-sm text-theme hover:underline">
              info@example.com
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted sm:flex-row">
          <p>
            Copyright © {new Date().getFullYear()}{" "}
            <Link href="/" className="font-semibold text-ink hover:text-theme">
              Kiddos
            </Link>
            , Inc. All Rights Reserved
          </p>
          <div className="flex gap-2">
            {["card-1", "card-2", "card-3", "card-4"].map((c) => (
              <Image key={c} src={asset(`icons/${c}.png`)} alt="" width={40} height={24} className="h-6 w-auto opacity-80" />
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
