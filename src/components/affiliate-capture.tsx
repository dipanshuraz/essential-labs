"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AFFILIATE_COOKIE } from "@/lib/format";

/** Captures `?ref=CODE` (Doc/Kiddex-style referral) into a 30-day cookie for checkout attribution. */
export function AffiliateCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (!ref || ref.length > 64) return;
    if (!/^[a-zA-Z0-9_-]+$/.test(ref)) return;
    const maxAge = 60 * 60 * 24 * 30;
    document.cookie = `${AFFILIATE_COOKIE}=${encodeURIComponent(ref)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  }, [searchParams]);

  return null;
}
