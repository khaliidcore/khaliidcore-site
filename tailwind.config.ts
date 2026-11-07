import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        surface: "#0b0b0c",
        line: "rgba(255,255,255,0.08)",
        accent: { DEFAULT: "#39ff14", soft: "rgba(57,255,20,0.12)" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%, -6%, 0) scale(1.15)" },
        },
      },
      animation: { drift: "drift 18s ease-in-out infinite" },
    },
  },
  plugins: [],
};

export default config;
