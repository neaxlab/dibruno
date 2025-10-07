import defaultTheme from "tailwindcss/defaultTheme";
import typographyPlugin from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */

const colors = {
  primary: {
    olive: "#3B3B3B",
    granite: "#67645E",
    bright: "#EAEAEA",
    silver: "#CBCAC8",
    lotion: "#FAFAFA",
    discount: "#F75245",
  },

  error: {
    50: "#FDE8E8",
    100: "#FBCBC8",
    200: "#F8ADAA",
    300: "#F58F8C",
    400: "#A65557",
    500: "#EF5350",
    600: "#C34342",
    700: "#983332",
    800: "#6D2322",
    900: "#421312",
  },
  warning: {
    50: "#FFF9E5",
    100: "#FFF0C0",
    200: "#FFE89A",
    300: "#FFE074",
    400: "#FFD84E",
    500: "#FFD028",
    600: "#D2AC20",
    700: "#A48618",
    800: "#766010",
    900: "#483A08",
  },
  success: {
    50: "#ECF8ED",
    100: "#CBEFD0",
    200: "#ACE4B1",
    300: "#8DD992",
    400: "#6ECE73",
    500: "#4FC354",
    600: "#3F9F43",
    700: "#317C34",
    800: "#235925",
    900: "#153616",
  },

};

const screens = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1920px",
  foo: {
    raw: "(max-height: 850px)",
  },
};


const customFontSizes = {
  "d-title-0": ["130px", { lineHeight: "100%", fontWeight: "500"}],
  "d-title-1": ["40px", { lineHeight: "120%", fontWeight: "600", letterSpacing: "0.96px"}],
  "d-title-2": ["32px", { lineHeight: "120%", fontWeight: "500", letterSpacing: "0.8px"}],
  "d-primary": ["20px", { lineHeight: "140%", fontWeight: "400", letterSpacing: "2%"}],
  "d-products": ["20px", { lineHeight: "100%", fontWeight: "500", letterSpacing: "2%", style: "medium"}],
  "d-secondary": ["18px", { lineHeight: "140%", fontWeight: "400", letterSpacing: "0.36px"}],
  "d-tertiary": ["14px", { lineHeight: "140%", fontWeight: "400", letterSpacing: "0.32px"}],
  "m-tertiary": ["12px", { lineHeight: "140%", fontWeight: "400", letterSpacing: "0.32px"}],
  "d-button": ["16px", { lineHeight: "100%", fontWeight: "600", letterSpacing: "0.36px", textTransform: "uppercase"}],
  "d-nav": ["16px", { lineHeight: "140%", fontWeight: "700", letterSpacing: "0.32px", textTransform: "uppercase"}],
  "d-footer": ["16px", { lineHeight: "100%", fontWeight: "400", letterSpacing: "2%", textTransform: "uppercase"}],
};

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  safelist: [
    {
      pattern: /grid-cols-(\d+)/,
    },
  ],
  theme: {
    colors,
    screens,
    extend: {
      fontSize: customFontSizes,
      fontFamily: {
        sans: ["Geist", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        "screen-2xl": "1240px",
      },
      width: {
        macbook: "1240px",
        max_desktop: "1044px",
        max_laptop: "960px",
      },
      minHeight: {
        "screen-900": "min(110vh, 1000px)",
        "screen-850": "850px",
      },
      maxHeight: {
        "screen-850": "850px",
      },
      gridTemplateColumns: {
        asideBlog: "1.5fr 0.5fr",
      },
      spacing: {
        "section-d-gap-y": "120px",
        "section-d-gap-x": "56px",
        "section-m-gap-y": "80px",
        "section-m-gap-x": "12px",
      },
    },
  },
  plugins: [typographyPlugin],
};
