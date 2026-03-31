import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f5f6f8",
          100: "#e8eaef",
          200: "#cdd1dc",
          300: "#a5adc0",
          400: "#7681a0",
          500: "#1a2e5a",
          600: "#152650",
          700: "#111e40",
          800: "#0d1730",
          900: "#090f20",
          950: "#050913",
        },
        forest: {
          50: "#f0f7f4",
          100: "#dceddf",
          200: "#b8dbc0",
          300: "#86c298",
          400: "#55a670",
          500: "#2d6a4f",
          600: "#245a42",
          700: "#1c4735",
          800: "#153528",
          900: "#0f241b",
        },
        plum: {
          50: "#f8f4f8",
          100: "#ede4ed",
          200: "#d9c5d9",
          300: "#bf9ebf",
          400: "#a47aa4",
          500: "#6b2d6b",
          600: "#5c265c",
          700: "#481e48",
          800: "#351735",
          900: "#220f22",
        },
      },
      fontFamily: {
        serif: ["'Instrument Serif'", "Georgia", "Times New Roman", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display": ["clamp(2rem, 4vw, 3.75rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "headline": ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "subhead": ["clamp(1.125rem, 1.5vw, 1.375rem)", { lineHeight: "1.5" }],
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
      boxShadow: {
        "mockup": "0 32px 64px -16px rgba(26, 46, 90, 0.12), 0 16px 32px -8px rgba(26, 46, 90, 0.08), 0 0 0 1px rgba(26, 46, 90, 0.06)",
        "mockup-hover": "0 40px 80px -16px rgba(26, 46, 90, 0.16), 0 20px 40px -8px rgba(26, 46, 90, 0.1), 0 0 0 1px rgba(26, 46, 90, 0.08)",
        "card": "0 1px 3px rgba(26, 46, 90, 0.04)",
        "card-hover": "0 8px 24px rgba(26, 46, 90, 0.08), 0 2px 8px rgba(26, 46, 90, 0.04)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-up-1": "fadeUp 0.8s ease-out 0.15s forwards",
        "fade-up-2": "fadeUp 0.8s ease-out 0.3s forwards",
        "fade-up-3": "fadeUp 0.8s ease-out 0.45s forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
