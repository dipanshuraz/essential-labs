/** Editorial content for the Panda Loves Bamboo storefront. */

export type PandaNavLink = { label: string; href: string };

export const PANDA_NAV: PandaNavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/shop?sort=name-asc" },
  { label: "Best Sellers", href: "/shop?sort=rating" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
];

export type PandaCollection = {
  title: string;
  subtitle: string;
  href: string;
  tone: "sage" | "terracotta" | "cream";
};

export const PANDA_COLLECTIONS: PandaCollection[] = [
  {
    title: "The Everyday Organic Edit",
    subtitle: "Breathable cotton basics that move with little explorers, all day long.",
    href: "/shop",
    tone: "sage",
  },
  {
    title: "Warm Layers for Cooler Days",
    subtitle: "Soft knits and cosy jackets in earthy, season-less tones.",
    href: "/shop",
    tone: "terracotta",
  },
  {
    title: "First Wardrobe Essentials",
    subtitle: "Gentle-on-skin staples for 2–6 year olds.",
    href: "/shop",
    tone: "cream",
  },
];

export type PandaTrust = { title: string; copy: string; icon: "feather" | "play" | "leaf" | "badge" };

export const PANDA_TRUST: PandaTrust[] = [
  {
    title: "Soft & Comfortable",
    copy: "Pre-washed organic cotton with flat seams — nothing scratchy, ever.",
    icon: "feather",
  },
  {
    title: "Made for Play",
    copy: "Built to run, climb and tumble through every little adventure.",
    icon: "play",
  },
  {
    title: "Gentle on Skin",
    copy: "OEKO-TEX® certified dyes, free from harsh chemicals.",
    icon: "leaf",
  },
  {
    title: "Premium Quality",
    copy: "Considered construction that lasts from hand-me-up to hand-me-down.",
    icon: "badge",
  },
];

export type PandaQuote = { quote: string; name: string; role: string };

export const PANDA_QUOTES: PandaQuote[] = [
  {
    quote: "The softest clothes my daughter owns. They wash beautifully and still look new after a year.",
    name: "Aarohi M.",
    role: "Mum of two · Bengaluru",
  },
  {
    quote: "Finally, kidswear that doesn't look like a cartoon exploded. Calm, premium, and so well made.",
    name: "Daniel & Priya",
    role: "Parents · Mumbai",
  },
  {
    quote: "You can feel the quality the moment you open the box. Worth every rupee.",
    name: "Sneha R.",
    role: "Mum · Pune",
  },
];
