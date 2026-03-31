import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#09090b",
          raised: "#111113",
          overlay: "#18181b",
          subtle: "#1e1e22",
          border: "#27272a",
          "border-light": "#3f3f46",
        },
        text: {
          primary: "#fafafa",
          secondary: "#a1a1aa",
          tertiary: "#71717a",
        },
        accent: {
          DEFAULT: "#10b981",
          glow: "#10b98133",
        },
      },
      fontFamily: {
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 10vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(2.5rem, 7vw, 6rem)", { lineHeight: "1", letterSpacing: "-0.035em" }],
        "display": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "headline": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in-up-delay": "fadeInUp 0.8s ease-out 0.2s forwards",
        "fade-in-up-delay-2": "fadeInUp 0.8s ease-out 0.4s forwards",
        "fade-in-up-delay-3": "fadeInUp 0.8s ease-out 0.6s forwards",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
