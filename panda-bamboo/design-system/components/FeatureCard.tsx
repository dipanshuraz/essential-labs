import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/assets";
import { Button } from "./Button";
import { cn } from "../cn";

export function FeatureCard({
  eyebrow,
  title,
  priceFrom,
  image,
  href = "/shop",
  className,
}: {
  eyebrow: string;
  title: string;
  priceFrom: string;
  image: string;
  href?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-theme-light to-white p-8 shadow-card",
        className,
      )}
    >
      <p className="text-xs font-bold uppercase tracking-widest text-theme">{eyebrow}</p>
      <h3 className="mt-2 text-2xl font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-muted">
        From <span className="font-bold text-ink">{priceFrom}</span>
      </p>
      <Button href={href} size="sm" className="mt-6">
        Shop now
      </Button>
      <Image
        src={asset(image)}
        alt=""
        width={200}
        height={200}
        className="pointer-events-none absolute bottom-0 right-2 h-36 w-auto object-contain"
      />
    </div>
  );
}
