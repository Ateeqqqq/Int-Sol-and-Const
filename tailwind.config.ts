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
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        "primary-accent": {
          DEFAULT: "var(--primary-accent)",
          hover: "var(--primary-accent-hover)",
          muted: "var(--primary-accent-muted)",
        },
        editorial: {
          black: "#1A1A1A",
          white: "#FFFFFF",
          subtle: "#F9F9F9",
        },
        gold: {
          light: "#D4AF7A",
          DEFAULT: "#C19B6C",
          dark: "#A38053",
          muted: "rgba(193, 155, 108, 0.12)",
        },
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.22em",
        "editorial-wide": "0.32em",
        tighter: "-0.035em",
      },
      borderColor: {
        subtle: "var(--border-subtle)",
        accent: "var(--border-accent)",
      },
      boxShadow: {
        "gallery-elevated": "0 20px 60px -15px rgba(26, 26, 26, 0.08)",
        "gold-glow": "0 0 30px -5px rgba(193, 155, 108, 0.35)",
      },
      transitionTimingFunction: {
        "anti-gravity": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
