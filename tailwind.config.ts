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
        book: {
          page: "#FFFEF7",
          shadow: "#00000020",
          border: "#D4C5B9",
          accent: "#2C5F8D",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Garamond", "serif"],
        heading: ["Playfair Display", "serif"],
      },
      spacing: {
        "page-margin": "2rem",
        "page-padding": "3rem",
      },
      boxShadow: {
        page: "0 2px 8px rgba(0,0,0,0.1)",
        book: "0 10px 40px rgba(0,0,0,0.2)",
      },
      animation: {
        "page-enter": "fadeInUp 0.6s ease-out",
        "flip-hint": "cornerCurl 2s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        cornerCurl: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-3px)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
