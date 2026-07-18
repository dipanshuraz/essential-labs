"use client";

import { useEffect } from "react";

const JS = "/kiddex/assets/js";

/** Load order must match original Kiddex HTML. */
const SCRIPTS = [
  `${JS}/jquery.js`,
  `${JS}/bootstrap.min.js`,
  `${JS}/owl.js`,
  `${JS}/wow.js`,
  `${JS}/validation.js`,
  `${JS}/jquery.fancybox.js`,
  `${JS}/appear.js`,
  `${JS}/isotope.js`,
  `${JS}/parallax-scroll.js`,
  `${JS}/jquery.nice-select.min.js`,
  `${JS}/scrolltop.min.js`,
  `${JS}/language.js`,
  `${JS}/countdown.js`,
  `${JS}/jquery-ui.js`,
  `${JS}/jquery.bootstrap-touchspin.js`,
  `${JS}/product-filter.js`,
  `${JS}/jquery.lettering.min.js`,
  `${JS}/jquery.circleType.js`,
  `${JS}/odometer.js`,
  `${JS}/bxslider.js`,
  `${JS}/script.js`,
] as const;

function hideLoader() {
  document.querySelectorAll(".loader-wrap").forEach((el) => {
    const node = el as HTMLElement;
    node.style.transition = "opacity 0.4s ease";
    node.style.opacity = "0";
    node.style.pointerEvents = "none";
    window.setTimeout(() => {
      node.style.display = "none";
    }, 450);
  });
  document.documentElement.classList.add("kiddex-ready");
}

type JQueryObj = {
  length: number;
  stop: (clearQueue: boolean, jumpToEnd: boolean) => JQueryObj;
  fadeOut: (duration: number) => void;
  trigger: (event: string) => void;
};

type JQueryFn = (target: string | Window) => JQueryObj;

function initKiddexPlugins() {
  const $ = (window as { jQuery?: JQueryFn }).jQuery;
  if (!$) return;

  // script.js registers on window "load"; that event often fired before we mounted.
  if ($(".loader-wrap").length) {
    $(".loader-wrap").stop(true, true).fadeOut(400);
  }

  $(window).trigger("load");
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const el = document.createElement("script");
    el.src = src;
    el.async = false;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(el);
  });
}

export function KiddexScripts() {
  useEffect(() => {
    let cancelled = false;

    hideLoader();

    (async () => {
      try {
        for (const src of SCRIPTS) {
          if (cancelled) return;
          await loadScript(src);
        }
        if (!cancelled) {
          initKiddexPlugins();
          hideLoader();
        }
      } catch (err) {
        console.error("[KiddexScripts]", err);
        hideLoader();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
