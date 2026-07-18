import type { ReactNode } from "react";
import { KiddexCartPopup } from "@/components/kiddex/layout/KiddexCartPopup";
import { KiddexCartToggle } from "@/components/kiddex/layout/KiddexCartToggle";
import { KiddexFooter } from "@/components/kiddex/layout/KiddexFooter";
import { KiddexHeader } from "@/components/kiddex/layout/KiddexHeader";
import { KiddexPageDirection } from "@/components/kiddex/layout/KiddexPageDirection";
import { KiddexPreloader } from "@/components/kiddex/layout/KiddexPreloader";
import { KiddexPageEffects } from "@/components/kiddex/KiddexPageEffects";
import { KiddexMobileMenu } from "@/components/kiddex/layout/KiddexMobileMenu";
import { KiddexScripts } from "@/components/kiddex/KiddexScripts";
import { KiddexStyles } from "@/components/kiddex/KiddexStyles";

/**
 * Layout for the legacy Kiddex-themed routes. Theme CSS/JS are loaded here
 * (not globally) so the redesigned Panda routes stay on a clean canvas.
 */
export function KiddexLayout({ children }: { children: ReactNode }) {
  return (
    <div className="boxed_wrapper ltr">
      <KiddexStyles />
      <KiddexPreloader />
      <KiddexPageDirection />
      <KiddexCartToggle />
      <KiddexCartPopup />
      <KiddexHeader />
      <KiddexMobileMenu />
      <KiddexPageEffects>{children}</KiddexPageEffects>
      <KiddexFooter />
      <button type="button" className="scroll-top scroll-to-target" data-target="html">
        <i className="far fa-angle-up" />
      </button>
      <KiddexScripts />
    </div>
  );
}
