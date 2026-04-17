import { Suspense } from "react";
import { CheckoutSuccess } from "./checkout-success";

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-lg px-4 py-20 text-center text-[#7a716b]">Loading…</div>
      }
    >
      <CheckoutSuccess />
    </Suspense>
  );
}
