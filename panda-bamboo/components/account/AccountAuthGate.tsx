"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useCustomerAuth } from "@/lib/customer-auth/CustomerAuthProvider";

export function AccountAuthGate({ children }: { children: ReactNode }) {
  const { isAuthed, isLoading } = useCustomerAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthed) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthed, isLoading, pathname, router]);

  if (isLoading) {
    return <p className="centred" style={{ padding: "4rem" }}>Loading your account…</p>;
  }

  if (!isAuthed) return null;

  return <>{children}</>;
}
