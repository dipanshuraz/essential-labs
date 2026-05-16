import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Panda Bamboo — Kiddex",
    template: "%s · Panda Bamboo",
  },
  description:
    "1:1 Kiddex HTML template (CSS + jQuery) served from Next.js public/kiddex — same markup, assets, and scripts as the source pack.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
