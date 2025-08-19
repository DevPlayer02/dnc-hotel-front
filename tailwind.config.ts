import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "snow-white": "#ebebeb",
        "main-brand-blue-100": "#CCE6FE",
        "main-brand-blue-200": "#99CAFE",
        "main-brand-blue-300": "#66A9FC",
        "main-brand-blue-400": "#408CF9",
        "main-brand-blue-500": "#035DF5",
        "main-brand-blue-600": "#0247D2",
        "main-brand-blue-700": "#0135B0",
        "main-brand-blue-800": "#00258E",
        "main-brand-blue-900": "#001A75",
        "light-grey-400": "#E7E4E4",
        "light-grey-500": "#bcbcbc",
      },
      borderColor: {
        "main-brand-green-300": "#1dbb9e",
        "light-grey-300": "#D9D9D9",
        "light-grey-400": "#E7E4E4",
        "light-grey-500": "#bcbcbc",
        "light-grey-600": "#ABABAB",
      },
      colors: {
        "main-brand-blue-100": "#CCE6FE",
        "main-brand-blue-200": "#99CAFE",
        "main-brand-blue-300": "#66A9FC",
        "main-brand-blue-400": "#408CF9",
        "main-brand-blue-500": "#035DF5",
        "main-brand-blue-600": "#0247D2",
        "main-brand-blue-700": "#0135B0",
        "main-brand-blue-800": "#00258E",
        "main-brand-blue-900": "#001A75",
        "light-grey-800": "#636363",
      },
    },
  },
  plugins: [],
};
export default config;