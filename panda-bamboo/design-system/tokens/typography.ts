/**
 * Panda Loves Bamboo — typography tokens.
 * Headings: Manrope · Body: Inter · Display: Manrope ExtraBold.
 */
export const typography = {
  family: {
    heading: 'var(--font-manrope), "Manrope", system-ui, sans-serif',
    body: 'var(--font-inter), "Inter", system-ui, sans-serif',
    display: 'var(--font-manrope), "Manrope", system-ui, sans-serif',
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  /** Editorial type scale (px). */
  scale: {
    heroH1: { size: "72px", lineHeight: "82px", weight: 800, letterSpacing: "-0.02em" },
    sectionTitle: { size: "48px", lineHeight: "1.08", weight: 800, letterSpacing: "-0.02em" },
    collectionTitle: { size: "36px", lineHeight: "1.15", weight: 700, letterSpacing: "-0.02em" },
    subheading: { size: "24px", lineHeight: "1.45", weight: 600, letterSpacing: "0" },
    body: { size: "18px", lineHeight: "1.7", weight: 400, letterSpacing: "0" },
    small: { size: "14px", lineHeight: "1.5", weight: 400, letterSpacing: "0" },
    button: { size: "15px", lineHeight: "1", weight: 600, letterSpacing: "0.01em" },
    eyebrow: { size: "13px", lineHeight: "1", weight: 600, letterSpacing: "0.16em" },
  },
} as const;

export type Typography = typeof typography;
