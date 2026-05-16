import type { ReactNode } from "react";
import { KiddexCartPopup } from "@/components/kiddex/layout/KiddexCartPopup";
import { KiddexCartToggle } from "@/components/kiddex/layout/KiddexCartToggle";
import { KiddexFooter } from "@/components/kiddex/layout/KiddexFooter";
import { KiddexHeader } from "@/components/kiddex/layout/KiddexHeader";
import { KiddexPageDirection } from "@/components/kiddex/layout/KiddexPageDirection";

export function KiddexLayout({ children }: { children: ReactNode }) {
  return (
    <div className="boxed_wrapper ltr">
      <KiddexPageDirection />
      <KiddexCartToggle />
      <KiddexCartPopup />
      <KiddexHeader />
      {children}
      <KiddexFooter />
      <button type="button" className="scroll-top scroll-to-target" data-target="html">
        <i className="far fa-angle-up" />
      </button>
    </div>
  );
}
