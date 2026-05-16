/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#3d8b5c",
          dark: "#2d6a45",
          light: "#e8f5ee",
          muted: "#f4f9f6",
        },
        surface: {
          DEFAULT: "#ffffff",
          alt: "#f8f9fa",
        },
        ink: {
          DEFAULT: "#1a1d1f",
          muted: "#6f767e",
          subtle: "#9ca3af",
        },
        status: {
          success: "#21c45d",
          pending: "#f0a500",
          error: "#ef4343",
          info: "#6467f2",
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
