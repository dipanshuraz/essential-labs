import { KiddexCartPopup, KiddexCartToggle } from "@/components/kiddex/kiddex-cart";
import { KiddexFooter } from "@/components/kiddex/kiddex-footer";
import { KiddexHeader } from "@/components/kiddex/kiddex-header";
import { KiddexMobileMenus } from "@/components/kiddex/kiddex-mobile-menus";
import { KiddexScripts } from "@/components/kiddex/kiddex-scripts";
import { KiddexStyleLinks } from "@/components/kiddex/kiddex-style-links";

export function KiddexShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="boxed_wrapper ltr">
      <KiddexStyleLinks />
      <div className="loader-wrap">
        <div className="preloader">
          <div id="handle-preloader" className="handle-preloader">
            <div className="animation-preloader">
              <div className="spinner" />
              <div className="txt-loading">
                {["p", "a", "n", "d", "a"].map((ch, i) => (
                  <span key={`${ch}-${i}`} data-text-preloader={ch} className="letters-loading">
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <KiddexCartToggle />
      <KiddexCartPopup />

      <KiddexHeader />
      <KiddexMobileMenus />

      <main className="kiddex-main">{children}</main>

      <KiddexFooter />

      <div className="scroll-to-top">
        <svg className="scroll-top-inner" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>

      <KiddexScripts />
    </div>
  );
}
