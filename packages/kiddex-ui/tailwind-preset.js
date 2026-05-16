/** Shared Tailwind preset — use with @kiddex/ui/styles.css for shell accents. */
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "rgb(var(--kx-accent-rgb) / <alpha-value>)",
          hover: "var(--kx-accent-hover)",
          muted: "var(--kx-accent-muted)",
          soft: "var(--kx-accent-soft)",
        },
        surface: {
          DEFAULT: "#ffffff",
          alt: "var(--kx-surface-alt)",
          muted: "var(--kx-surface-muted)",
        },
        sidebar: {
          DEFAULT: "#f9fafb",
          border: "#e5e7eb",
        },
        ink: {
          DEFAULT: "#1a1d1f",
          muted: "#6f767e",
          subtle: "#9ca3af",
        },
        status: {
          success: "#21c45d",
          successBg: "#d1fae5",
          pending: "#f0a500",
          error: "#ef4343",
          errorBg: "#fee2e2",
          warning: "#f59e0b",
          info: "#6467f2",
        },
        brand: {
          DEFAULT: "rgb(var(--kx-accent-rgb) / <alpha-value>)",
          dark: "var(--kx-accent-hover)",
          light: "var(--kx-accent-muted)",
          muted: "var(--kx-accent-soft)",
        },
        primary: {
          DEFAULT: "rgb(var(--kx-accent-rgb) / <alpha-value>)",
          hover: "var(--kx-accent-hover)",
          muted: "var(--kx-accent-muted)",
          soft: "var(--kx-accent-soft)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
        lift: "0 8px 24px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
