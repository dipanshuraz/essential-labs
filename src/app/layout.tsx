import type { Metadata } from "next";
import { Suspense } from "react";
import { AffiliateCapture } from "@/components/affiliate-capture";
import { Providers } from "@/app/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panda ❤️ Bamboo | Clothing",
  description:
    "Sustainable clothing brand — Next.js storefront, admin panel, and affiliate program.",
  icons: {
    icon: "/kiddex/assets/images/favicon.ico",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Panda Bamboo",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Providers>
          <Suspense fallback={null}>
            <AffiliateCapture />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
