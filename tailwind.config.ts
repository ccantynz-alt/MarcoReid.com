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
          50: "#f0f3f9",
          100: "#d9e0f0",
          200: "#b3c1e0",
          300: "#8da2d1",
          400: "#6683c1",
          500: "#1a2e5a",
          600: "#162850",
          700: "#121f3d",
          800: "#0d172b",
          900: "#080e19",
        },
        forest: {
          50: "#f0f7f4",
          100: "#d1e8db",
          200: "#a3d1b8",
          300: "#75ba94",
          400: "#47a371",
          500: "#2d6a4f",
          600: "#265e45",
          700: "#1e4a37",
          800: "#173729",
          900: "#0f231b",
        },
        plum: {
          50: "#f7f0f7",
          100: "#e8d4e8",
          200: "#d1a9d1",
          300: "#ba7eba",
          400: "#a353a3",
          500: "#6b2d6b",
          600: "#5e2660",
          700: "#4a1e4a",
          800: "#371737",
          900: "#230f23",
        },
      },
      fontFamily: {
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
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
