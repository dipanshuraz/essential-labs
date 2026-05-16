/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1",
          hover: "#4f46e5",
          muted: "#eef2ff",
          soft: "#e0e7ff",
        },
        sidebar: {
          DEFAULT: "#f9fafb",
          border: "#e5e7eb",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f9fafb",
        },
        ink: {
          DEFAULT: "#111827",
          muted: "#6b7280",
          subtle: "#9ca3af",
        },
        status: {
          success: "#10b981",
          successBg: "#d1fae5",
          error: "#ef4444",
          errorBg: "#fee2e2",
          warning: "#f59e0b",
          info: "#3b82f6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.08)",
        lift: "0 10px 40px -10px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
