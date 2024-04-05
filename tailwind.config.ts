import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
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
        geolocationappblack: "var(--geolocationappblack)",
        "geolocationappdusty-gray": "var(--geolocationappdusty-gray)",
        geolocationappnero: "var(--geolocationappnero)",
      },
      fontFamily: {
        "geolocation-app-inter-bold-11-58-underline":
          "var(--geolocation-app-inter-bold-11-58-underline-font-family)",
        "geolocation-app-inter-medium-26-14":
          "var(--geolocation-app-inter-medium-26-14-font-family)",
        "www-google-com-arial-regular-14":
          "var(--www-google-com-arial-regular-14-font-family)",
      },
    },
  },
  plugins: [],
};
export default config;
