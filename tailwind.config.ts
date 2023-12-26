import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: '#121212',
        primary: {
          // '50': '#e8fffc',
          // '100': '#c5fff7',
          // '200': '#92fff0',
          // '300': '#47ffe5',
          // '400': '#00ffe6',
          // '500': '#00faff',
          // '600': '#00c6d7',
          // '700': '#009cac',
          // '800': '#00818f',
          // '900': '#056674',
          // '950': '#004451',
        },
      },
    },
  },
  plugins: [],
};
export default config;
