/**
 * Panda Loves Bamboo — radius tokens.
 * Soft, rounded, premium. Larger radii on imagery and product cards.
 */
export const radius = {
  button: "16px",
  input: "16px",
  card: "24px",
  productCard: "28px",
  image: "32px",
  heroImage: "40px",
  pill: "9999px",
} as const;

export type Radius = typeof radius;
