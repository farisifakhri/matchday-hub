import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f5f5f5",
        surface: "#ffffff",
        charcoal: {
          DEFAULT: "#222222",
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#383838",
          900: "#222222",
          950: "#141414",
        },
        fotmob: {
          red: "#d71149",
          green: "#0a8a4a",
          yellow: "#eab308",
          border: "#f0f0f0",
          muted: "#666666",
        },
        pitch: {
          dark: "#0a2e1d",
          grass: "#15803d",
          line: "#4ade80",
        },
      },
      borderRadius: {
        sm: "4px",
        md: "14px",
        lg: "16px",
        xl: "22px",
      },
    },
  },
  plugins: [],
};

export default config;
