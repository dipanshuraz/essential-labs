/**
 * Panda Loves Bamboo — spacing tokens.
 * Base unit 8px. Whitespace is treated as a feature: scales are intentionally
 * generous (~30% airier than mass-market e-commerce).
 */
const base = 8;

export const spacing = {
  base,
  /** 8px scale, index = multiples of base. */
  scale: {
    0: "0px",
    1: "8px",
    2: "16px",
    3: "24px",
    4: "32px",
    5: "40px",
    6: "48px",
    8: "64px",
    10: "80px",
    12: "96px",
    15: "120px",
    20: "160px",
  },
  /** Vertical rhythm between major sections. */
  section: {
    desktop: "120px",
    tablet: "80px",
    mobile: "64px",
  },
  /** Horizontal page gutters. */
  container: {
    desktop: "80px",
    tablet: "48px",
    mobile: "24px",
  },
  card: "24px",
  cardLarge: "32px",
  hero: {
    top: "120px",
    bottom: "120px",
  },
  maxWidth: "1440px",
  readingWidth: "720px",
} as const;

export type Spacing = typeof spacing;
