"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/** Re-run Kiddex jQuery plugins (owl, odometer, etc.) after JSX page mount / navigation. */
export function KiddexPageEffects({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const t = window.setTimeout(() => {
      window.dispatchEvent(new Event("load"));
    }, 80);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return <>{children}</>;
}
