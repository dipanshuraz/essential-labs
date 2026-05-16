import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/assets";
import { cn } from "../cn";

export function CategoryCard({
  name,
  image,
  href = "/shop",
  className,
}: {
  name: string;
  image: string;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center rounded-2xl border border-border bg-white p-6 text-center shadow-card transition hover:border-theme hover:shadow-lg",
        className,
      )}
    >
      <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-theme-light/60">
        <Image src={asset(image)} alt="" width={96} height={96} className="object-contain" />
      </div>
      <h4 className="text-base font-bold text-ink hover:text-theme">{name}</h4>
    </Link>
  );
}
