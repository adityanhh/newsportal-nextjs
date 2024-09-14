import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    flowbite.content(),
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F1C2E",
        card: "#374357",
        background2: "#374357"
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
