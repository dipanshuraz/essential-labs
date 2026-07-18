/**
 * Panda Loves Bamboo — shadow tokens.
 * Restraint over drama: everything feels soft and gently elevated.
 */
export const shadows = {
  none: "none",
  card: "0 8px 24px rgba(0, 0, 0, 0.04)",
  hover: "0 16px 48px rgba(0, 0, 0, 0.06)",
} as const;

export type Shadows = typeof shadows;
