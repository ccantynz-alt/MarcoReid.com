import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          950: "#1d1d1f",
          900: "#2d2d2f",
          800: "#424245",
          700: "#6e6e73",
          600: "#86868b",
          500: "#aeaeb2",
          400: "#d2d2d7",
          300: "#e8e8ed",
          200: "#f5f5f7",
          100: "#fbfbfd",
        },
        accent: "#2d6a4f",
      },
      fontFamily: {
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display": ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "headline": ["clamp(1.75rem, 3vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
    },
  },
  plugins: [],
};
export default config;
