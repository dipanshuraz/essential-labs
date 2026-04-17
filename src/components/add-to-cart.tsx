"use client";

import { useCart } from "@/context/cart-context";

const defaultClass =
  "w-full rounded-full bg-[#e85d75] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#e85d75]/20 transition hover:bg-[#d14d66] disabled:cursor-not-allowed disabled:bg-[#d4cac2]";

export function AddToCart({
  productId,
  disabled,
  className,
}: {
  productId: string;
  disabled?: boolean;
  /** Override styles (e.g. Kiddex `theme-btn btn-one`). */
  className?: string;
}) {
  const { add } = useCart();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => add(productId, 1)}
      className={className ?? defaultClass}
    >
      {disabled ? "Out of stock" : "Add to bag"}
    </button>
  );
}
