import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/libs/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-geist-sans)"],
      clash: ["Clash", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: "420px",
      },
      colors: {
        primary: {
          50: "#FAF7F2",
          100: "#F3EDE1",
          200: "#E7D8C1",
          300: "#D7BF9A",
          400: "#C59E70",
          500: "#B48557",
          600: "#A77045",
          700: "#8B5433",
          800: "#744025",
          900: "#582F19",
          950: "#32180C",
          DEFAULT: "#32180C",
        },
        secondary: {
          50: "#FCF7FC",
          100: "#F7EFF8",
          200: "#EFDEF0",
          300: "#E3C4E3",
          400: "#D2A0D1",
          500: "#BB7ABA",
          600: "#9E5B9B",
          700: "#82457E",
          800: "#6B3367",
          900: "#4A1F46",
          950: "#2F102B",
        },
        "primary-selected": "#C59E70", // golden-brown
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
