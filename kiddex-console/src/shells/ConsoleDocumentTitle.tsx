import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAppMode } from "@console/env";
import { getBrowserPageTitle, getShellMeta } from "@console/shells/shellMeta";

function setLinkRel(rel: string, attrs: Record<string, string>) {
  const selector = `link[rel="${rel}"]`;
  let link = document.querySelector<HTMLLinkElement>(selector);
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  for (const [key, value] of Object.entries(attrs)) {
    link.setAttribute(key, value);
  }
}

function setThemeColor(color: string) {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.content = color;
}

export function ConsoleDocumentTitle() {
  const { pathname } = useLocation();
  const mode = getAppMode();
  const meta = getShellMeta(mode);

  useEffect(() => {
    document.title = getBrowserPageTitle(mode, pathname);

    const faviconHref = `${meta.faviconPath}?shell=${mode}`;
    setLinkRel("icon", {
      type: "image/svg+xml",
      href: faviconHref,
    });
    setThemeColor(meta.accentColor);
  }, [pathname, mode, meta.accentColor, meta.faviconPath]);

  return null;
}
