import type { SVGProps } from "react";

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconSearch(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

export function IconUser(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

export function IconBag(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

export function IconHeart(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M12 20s-7-4.6-7-9.3A3.7 3.7 0 0 1 12 8a3.7 3.7 0 0 1 7 2.7C19 15.4 12 20 12 20Z" />
    </svg>
  );
}

export function IconMenu(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconArrow(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconFeather(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <path d="M20 4c-6 0-11 5-13 11l-2 5 5-2c6-2 11-7 11-13Z" />
      <path d="M16 8 7 17M13 8h3v3" />
    </svg>
  );
}

export function IconPlay(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10.5 9.5l4 2.5-4 2.5v-5Z" />
    </svg>
  );
}

export function IconLeaf(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14Z" />
      <path d="M5 19c3-5 7-9 12-11" />
    </svg>
  );
}

export function IconBadge(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <path d="M12 3l2.2 1.6 2.7-.2.9 2.6 2.2 1.6-.9 2.6.9 2.6-2.2 1.6-.9 2.6-2.7-.2L12 21l-2.2-1.6-2.7.2-.9-2.6L4 15.6l.9-2.6L4 10.4l2.2-1.6.9-2.6 2.7.2L12 3Z" />
      <path d="m9.5 12 1.8 1.8 3.2-3.6" />
    </svg>
  );
}

export function IconInstagram(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const trustIcons = {
  feather: IconFeather,
  play: IconPlay,
  leaf: IconLeaf,
  badge: IconBadge,
};
