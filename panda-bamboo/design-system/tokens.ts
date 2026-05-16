/** Kiddex design tokens (from template style.css). */
export const tokens = {
  color: {
    theme: "#F76188",
    themeDark: "#e04d74",
    themeLight: "#ffe8ee",
    ink: "#111111",
    text: "#666666",
    white: "#ffffff",
    surface: "#f8f8f8",
    border: "#e8e8e8",
  },
  font: {
    sans: '"Nunito", ui-sans-serif, system-ui, sans-serif',
  },
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1.25rem",
    xl: "1.875rem",
    pill: "9999px",
  },
  shadow: {
    card: "0 4px 24px rgba(17, 17, 17, 0.08)",
    header: "0 2px 16px rgba(17, 17, 17, 0.06)",
  },
  container: {
    max: "1320px",
  },
} as const;

export type Tokens = typeof tokens;
