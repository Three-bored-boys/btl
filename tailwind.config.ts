import type { Config } from "tailwindcss";
import * as defaultTheme from "tailwindcss/defaultTheme";
import * as colors from "tailwindcss/colors";

const { indigo, orange, green, red } = colors;
const {
  fontFamily: { sans },
} = defaultTheme;

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/libs/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      clash: ["Clash", ...sans],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: "420px",
        "radix-xs": "520px",
        "radix-xl": "1640px",
      },
      colors: {
        primary: {
          ...indigo,
          DEFAULT: indigo[950],
        },
        secondary: {
          ...orange,
          DEFAULT: orange[500],
        },
        "primary-selected": indigo[400],
        "success": green[400],
        "error": red[500],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
