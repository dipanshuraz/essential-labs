/**
 * Panda Loves Bamboo — color tokens.
 * Premium, organic, nature-inspired palette. Source of truth for the brand.
 */
export const colors = {
  background: {
    primary: "#F8F5EF",
    secondary: "#F1ECE3",
  },
  surface: "#FFFFFF",
  brand: {
    primary: "#6F8A63",
    dark: "#4D5E48",
  },
  accent: {
    terracotta: "#C78D68",
  },
  border: "#E7E1D8",
  text: {
    primary: "#2F2F2F",
    secondary: "#666055",
    muted: "#8A847A",
  },
  state: {
    success: "#7C9A72",
    error: "#B86B5B",
  },
} as const;

export type Colors = typeof colors;
