"use client";

import { useWishlist } from "@/context/wishlist-context";

export function WishlistButton({
  productId,
  className,
}: {
  productId: string;
  /** If omitted, uses default Tailwind chip styles. */
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const on = has(productId);

  const defaultCls = `rounded-full border px-4 py-2 text-sm font-medium transition ${
    on
      ? "border-[#e85d75] bg-[#fff0f2] text-[#e85d75]"
      : "border-[#eadfd6] bg-white text-[#5c534d] hover:border-[#c45c6a]"
  }`;

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      className={className ?? defaultCls}
      aria-pressed={on}
      title={on ? "Saved to wishlist" : "Add to wishlist"}
    >
      {className ? (
        <>
          <i className="far fa-heart" aria-hidden />
          <span className="sr-only">{on ? "Saved" : "Save"}</span>
        </>
      ) : (
        <>{on ? "♥ Saved" : "♡ Save"}</>
      )}
    </button>
  );
}
