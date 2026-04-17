"use client";

import { useEffect } from "react";

const CHAIN = [
  "/kiddex/assets/js/jquery.js",
  "/kiddex/assets/js/bootstrap.min.js",
  "/kiddex/assets/js/owl.js",
  "/kiddex/assets/js/wow.js",
  "/kiddex/assets/js/validation.js",
  "/kiddex/assets/js/jquery.fancybox.js",
  "/kiddex/assets/js/appear.js",
  "/kiddex/assets/js/isotope.js",
  "/kiddex/assets/js/parallax-scroll.js",
  "/kiddex/assets/js/jquery.nice-select.min.js",
  "/kiddex/assets/js/scrolltop.min.js",
  "/kiddex/assets/js/language.js",
  "/kiddex/assets/js/countdown.js",
  "/kiddex/assets/js/jquery-ui.js",
  "/kiddex/assets/js/jquery.bootstrap-touchspin.js",
  "/kiddex/assets/js/script.js",
] as const;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing?.dataset.loaded === "1") {
      resolve();
      return;
    }
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(src)), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.dataset.kiddex = "1";
    s.onload = () => {
      s.dataset.loaded = "1";
      resolve();
    };
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(s);
  });
}

/** Loads Kiddex jQuery plugins in order (same as the HTML pack). Required for menu, Owl, cart popup, preloader. */
export function KiddexScripts() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        for (const src of CHAIN) {
          if (cancelled) return;
          await loadScript(src);
        }
      } catch (e) {
        console.error("[KiddexScripts]", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
