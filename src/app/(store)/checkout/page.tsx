"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/cart-context";
import {
  FLAT_RATE_CENTS,
  FREE_SHIPPING_THRESHOLD_CENTS,
  shippingCentsForSubtotal,
} from "@/lib/shipping";
import { DUMMY_PRODUCT_IMAGE, formatMoney } from "@/lib/format";
import { KiddexPageTitle } from "@/components/kiddex/kiddex-page-title";

type PreviewRow = {
  id: string;
  name: string;
  slug: string;
  priceCents: number;
  stock: number;
  image: string | null;
  quantity: number;
};

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { lines, totalItems, clear } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [previewRows, setPreviewRows] = useState<PreviewRow[]>([]);
  const [email, setEmail] = useState("");
  const emailField = email || session?.user?.email || "";
  const [name, setName] = useState("");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("US");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stripeEnabled, setStripeEnabled] = useState(false);

  const shippingCents = shippingCentsForSubtotal(subtotal);
  const totalCents = subtotal + shippingCents;

  const idsKey = useMemo(
    () =>
      lines
        .map((l) => l.productId)
        .sort()
        .join(","),
    [lines],
  );

  useEffect(() => {
    fetch("/api/payments/config")
      .then((r) => r.json())
      .then((d: { stripeEnabled?: boolean }) => setStripeEnabled(!!d.stripeEnabled))
      .catch(() => setStripeEnabled(false));
  }, []);

  useEffect(() => {
    if (lines.length === 0) return;
    const params = new URLSearchParams();
    lines.forEach((l) => params.append("id", l.productId));
    const map = Object.fromEntries(lines.map((l) => [l.productId, l.quantity]));
    fetch(`/api/cart-preview?${params.toString()}`)
      .then((r) => r.json())
      .then(
        (d: {
          items: {
            id: string;
            name: string;
            slug: string;
            priceCents: number;
            stock: number;
            image: string | null;
          }[];
        }) => {
          const rows: PreviewRow[] = d.items.map((p) => ({
            ...p,
            quantity: map[p.id] ?? 0,
          }));
          setPreviewRows(rows);
          const t = rows.reduce((a, p) => a + p.priceCents * p.quantity, 0);
          setSubtotal(t);
        },
      )
      .catch(() => {
        setPreviewRows([]);
        setSubtotal(0);
      });
  }, [idsKey, lines]);

  useEffect(() => {
    if (totalItems === 0) {
      router.replace("/cart");
    }
  }, [totalItems, router]);

  const payload = {
    email: emailField.trim(),
    items: lines.map((l) => ({ productId: l.productId, quantity: l.quantity })),
    shipping: { name, line1, city, postal, country },
  };

  async function onSubmitDemo(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; orderId?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      clear();
      router.push(`/checkout/success?order=${data.orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  async function onStripe() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not start checkout");
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No redirect URL");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="large-container py-20 text-center">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <>
      <KiddexPageTitle
        items={[
          { href: "/", label: "Home" },
          { label: "Checkout" },
        ]}
      />
      <section className="checkout-section pb_150">
        <div className="large-container">
          <div className="sec-title centred pb_30">
            <h2>
              The <span>Checkout</span>
            </h2>
          </div>
          <p className="centred mb_30 text-sm opacity-80">
            {stripeEnabled
              ? "Pay with Stripe or complete a demo order."
              : `Demo checkout — add STRIPE_SECRET_KEY for card payments. Free shipping over ${formatMoney(FREE_SHIPPING_THRESHOLD_CENTS)} · otherwise ${formatMoney(FLAT_RATE_CENTS)}.`}
          </p>
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 col-sm-12 billing-column">
              <div className="billing-content mr_30">
                <h3>Shipping details</h3>
                <div className="form-inner">
                  <form id="checkout-form" onSubmit={onSubmitDemo}>
                    <div className="row clearfix">
                      <div className="col-lg-12 col-md-12 col-sm-12 field-column">
                        <div className="form-group">
                          <label htmlFor="co-email">
                            Email<span>*</span>
                          </label>
                          <input
                            id="co-email"
                            type="email"
                            name="email"
                            required
                            value={emailField}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 field-column">
                        <div className="form-group">
                          <label htmlFor="co-name">
                            Full name<span>*</span>
                          </label>
                          <input
                            id="co-name"
                            type="text"
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 field-column">
                        <div className="form-group">
                          <label htmlFor="co-line1">
                            Address<span>*</span>
                          </label>
                          <input
                            id="co-line1"
                            type="text"
                            name="address"
                            required
                            value={line1}
                            onChange={(e) => setLine1(e.target.value)}
                            autoComplete="street-address"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 field-column">
                        <div className="form-group">
                          <label htmlFor="co-city">
                            City<span>*</span>
                          </label>
                          <input
                            id="co-city"
                            type="text"
                            name="city"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            autoComplete="address-level2"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 field-column">
                        <div className="form-group">
                          <label htmlFor="co-postal">
                            Postcode / ZIP<span>*</span>
                          </label>
                          <input
                            id="co-postal"
                            type="text"
                            name="zip"
                            required
                            value={postal}
                            onChange={(e) => setPostal(e.target.value)}
                            autoComplete="postal-code"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 field-column">
                        <div className="form-group">
                          <label htmlFor="co-country">
                            Country<span>*</span>
                          </label>
                          <input
                            id="co-country"
                            type="text"
                            name="country"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            autoComplete="country-name"
                          />
                        </div>
                      </div>
                    </div>
                    {error ? <p className="text-danger mb_15">{error}</p> : null}
                    <div className="payment-option mt_30">
                      {stripeEnabled ? (
                        <button
                          type="button"
                          className="theme-btn btn-one mb_15"
                          onClick={() => void onStripe()}
                          disabled={loading || totalItems === 0}
                        >
                          {loading ? "Redirecting…" : "Pay with card (Stripe)"}
                        </button>
                      ) : null}
                      <button
                        type="submit"
                        className="theme-btn btn-one"
                        disabled={loading || totalItems === 0}
                      >
                        {loading && !stripeEnabled
                          ? "Placing order…"
                          : `Complete order (demo) — ${formatMoney(lines.length === 0 ? 0 : totalCents)}`}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 order-column">
              <div className="order-box">
                <h3>Order Summary</h3>
                <div className="order-info">
                  <div className="title-box">
                    <span className="text">Product</span>
                    <span className="text">total</span>
                  </div>
                  <div className="order-product">
                    {previewRows.map((row) => (
                      <div key={row.id} className="single-item">
                        <div className="product-box">
                          <figure className="image-box">
                            <Image
                              src={row.image ?? DUMMY_PRODUCT_IMAGE}
                              alt=""
                              width={56}
                              height={56}
                              className="object-cover"
                            />
                          </figure>
                          <h6>
                            {row.name} × {row.quantity}
                          </h6>
                        </div>
                        <h4>{formatMoney(row.priceCents * row.quantity)}</h4>
                      </div>
                    ))}
                  </div>
                  <ul className="cost-box">
                    <li>
                      <h4>
                        <span>Subtotal</span>
                      </h4>
                      <h4>{formatMoney(subtotal)}</h4>
                    </li>
                    <li>
                      <h4>
                        <span>Shipping</span>
                      </h4>
                      <h4>
                        <span>{shippingCents === 0 ? "Free" : formatMoney(shippingCents)}</span>
                      </h4>
                    </li>
                  </ul>
                  <div className="total-box">
                    <h4>
                      <span>Total</span>
                    </h4>
                    <h4>{formatMoney(lines.length === 0 ? 0 : totalCents)}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
