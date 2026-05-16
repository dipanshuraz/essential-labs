import kiddexPreset from "../packages/kiddex-ui/tailwind-preset.js";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [kiddexPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../packages/kiddex-ui/src/**/*.{js,ts,jsx,tsx}",
    "../essential-labs-admin/src/**/*.{js,ts,jsx,tsx}",
    "../kiddex-creator-affiliate/src/**/*.{js,ts,jsx,tsx}",
  ],
};
