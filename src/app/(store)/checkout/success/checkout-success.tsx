"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { KiddexPageTitle } from "@/components/kiddex/kiddex-page-title";
import { useCart } from "@/context/cart-context";
import { formatMoney } from "@/lib/format";

export function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const { clear } = useCart();
  const order = searchParams.get("order");
  const sessionId = searchParams.get("session_id");

  const [stripeState, setStripeState] = useState<
    "idle" | "polling" | "ready" | "timeout"
  >(sessionId ? "polling" : "idle");
  const [orderId, setOrderId] = useState<string | null>(order);
  const [totalCents, setTotalCents] = useState<number | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    let attempts = 0;
    const max = 20;

    const tick = async () => {
      const res = await fetch(`/api/order/status?session_id=${encodeURIComponent(sessionId)}`);
      const data = (await res.json()) as {
        found?: boolean;
        orderId?: string;
        status?: string;
        totalCents?: number;
      };
      if (cancelled) return;
      if (data.found && data.status === "PAID") {
        setOrderId(data.orderId ?? null);
        setTotalCents(data.totalCents ?? null);
        setStripeState("ready");
        clear();
        return;
      }
      attempts += 1;
      if (attempts >= max) {
        setStripeState("timeout");
        return;
      }
      setTimeout(tick, 500);
    };

    tick();
    return () => {
      cancelled = true;
    };
  }, [sessionId, clear]);

  if (sessionId && stripeState === "polling") {
    return (
      <>
        <KiddexPageTitle items={[{ href: "/", label: "Home" }, { label: "Order" }]} />
        <section className="sign-section pb_120">
          <div className="large-container text-center">
            <p>Confirming payment…</p>
          </div>
        </section>
      </>
    );
  }

  if (sessionId && stripeState === "timeout") {
    return (
      <>
        <KiddexPageTitle items={[{ href: "/", label: "Home" }, { label: "Order" }]} />
        <section className="sign-section pb_120">
          <div className="large-container text-center">
            <h2 className="mb_20">Payment processing</h2>
            <p>
              Your payment may still be completing. Check your email or{" "}
              <Link href="/account/orders">order history</Link> shortly.
            </p>
          </div>
        </section>
      </>
    );
  }

  const displayId = orderId ?? order;

  return (
    <>
      <KiddexPageTitle items={[{ href: "/", label: "Home" }, { label: "Thank you" }]} />
      <section className="sign-section pb_120">
        <div className="large-container">
          <div className="sec-title centred pb_30">
            <h2>
              Thank <span>you!</span>
            </h2>
          </div>
          <div className="form-inner text-center">
            <p>
              Your order
              {displayId ? <> #{displayId}</> : null} is confirmed.
            </p>
            {totalCents != null ? <p className="mt_20">Total {formatMoney(totalCents)}</p> : null}
            <p className="mt_20 text-sm opacity-80">Fulfillment emails can be wired later (e.g. Resend).</p>
            <div className="btn-box mt_30">
              <Link href="/shop" className="theme-btn btn-one">
                Keep shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
