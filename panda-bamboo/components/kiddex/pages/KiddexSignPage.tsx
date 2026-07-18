"use client";

import { Suspense } from "react";
import { KiddexLoginForm } from "@/components/kiddex/sections/auth/KiddexLoginForm";
import { KiddexSignupForm } from "@/components/kiddex/sections/auth/KiddexSignupForm";
import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { KiddexSubscribeSection } from "@/components/kiddex/sections/KiddexSubscribeSection";
import { CustomerAuthProvider } from "@/lib/customer-auth/CustomerAuthProvider";

export function KiddexSignPage({ mode }: { mode: "login" | "signup" }) {
  const label = mode === "login" ? "Login" : "Sign up";
  const heading =
    mode === "login" ? (
      <>
        Account <span>Login</span>
      </>
    ) : (
      <>
        Create <span>Account</span>
      </>
    );

  return (
    <CustomerAuthProvider>
      <KiddexPageTitle crumbs={[{ label: "Home", href: "/" }, { label: label }]} />
      <section className="sign-section pb_120">
        <div className="large-container">
          <div className="sec-title centred pb_30">
            <h2>{heading}</h2>
          </div>
          {mode === "login" ? (
            <Suspense fallback={<p className="centred">Loading…</p>}>
              <KiddexLoginForm />
            </Suspense>
          ) : (
            <KiddexSignupForm />
          )}
        </div>
      </section>
      <KiddexSubscribeSection />
    </CustomerAuthProvider>
  );
}
