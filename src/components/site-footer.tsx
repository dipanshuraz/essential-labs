import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#eadfd6] bg-[#2d2a28] text-[#f5ebe3]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-semibold">
            Panda <span className="text-[#f5a3b0]">❤️</span> Bamboo
          </p>
          <p className="mt-2 max-w-sm text-sm text-[#c4bbb3]">
            Sustainable clothing with calm aesthetics. Next.js storefront, Stripe-ready checkout, admin,
            affiliates.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-white">Explore</span>
          <Link href="/shop" className="text-[#f5a3b0] hover:underline">
            Shop
          </Link>
          <Link href="/about" className="text-[#c4bbb3] hover:text-white">
            About
          </Link>
          <Link href="/shipping" className="text-[#c4bbb3] hover:text-white">
            Shipping & returns
          </Link>
          <Link href="/contact" className="text-[#c4bbb3] hover:text-white">
            Contact
          </Link>
          <Link href="/account/orders" className="text-[#c4bbb3] hover:text-white">
            Order history
          </Link>
        </div>
        <div>
          <span className="font-medium text-white">Newsletter</span>
          <p className="mt-2 text-sm text-[#c4bbb3]">New drops &amp; restocks.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-[#3d3835] py-4 text-center text-xs text-[#9a928b]">
        © {new Date().getFullYear()} Panda ❤️ Bamboo. All rights reserved.
      </div>
    </footer>
  );
}
