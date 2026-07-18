/**
 * Panda Loves Bamboo — motion tokens.
 * Luxury means restraint. No flashy animation — short, calm easings only.
 */
export const motion = {
  duration: {
    button: "200ms",
    card: "250ms",
    image: "250ms",
    page: "300ms",
  },
  ease: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export type Motion = typeof motion;
