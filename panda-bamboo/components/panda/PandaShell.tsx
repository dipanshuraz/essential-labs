import type { ReactNode } from "react";
import { PandaHeader } from "@/components/panda/PandaHeader";
import { PandaFooter } from "@/components/panda/PandaFooter";

/** Clean premium layout wrapper for redesigned Panda routes. */
export function PandaShell({ children }: { children: ReactNode }) {
  return (
    <div className="pl-page">
      <PandaHeader />
      <main>{children}</main>
      <PandaFooter />
    </div>
  );
}
