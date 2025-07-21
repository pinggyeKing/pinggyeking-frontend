import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "ownglyph-pdh": ["Ownglyph PDH", "Pretendard", "sans-serif"],
        "ownglyph-rdo": ["Ownglyph RDO ballpen", "Pretendard", "sans-serif"],
        pretendard: [
          "Pretendard",
          "Apple SD Gothic Neo",
          "Malgun Gothic",
          "맑은 고딕",
          "Nanum Gothic",
          "나눔고딕",
          "돋움",
          "Dotum",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        // Grey scale
        "grey-0": "#ffffff",
        "grey-1": "#fafafa",
        "grey-2": "#f0f0f0",
        "grey-3": "#e4e4e4",
        "grey-4": "#cbcbcb",
        "grey-5": "#b5b5b5",
        "grey-6": "#8e8e8e",
        "grey-7": "#666666",
        "grey-8": "#4e4e4e",
        "grey-9": "#333333",
        "grey-10": "#1e1e1e",

        // Yellow
        "yellow-1": "#fff6d9",
        "yellow-2": "#ffecb0",
        "yellow-3": "#ffc60d",
        "yellow-4": "#9f7607",
        "yellow-5": "#86610c",

        // Orange
        "orange-1": "#fff1e5",
        "orange-2": "#ffdbbc",
        "orange-3": "#ff8419",
        "orange-4": "#ab4e07",
        "orange-5": "#91410d",

        // Red
        "red-1": "#ffe5e5",
        "red-2": "#ffbcbc",
        "red-3": "#ff1919",
        "red-4": "#ab070d",
        "red-5": "#910d15",

        // Blue
        "blue-1": "#f5f7ff",
        "blue-2": "#ccd7ff",
        "blue-3": "#2957ff",
        "blue-4": "#0834ba",
        "blue-5": "#0e37a0",

        // Teal
        "teal-1": "#e5fbff",
        "teal-2": "#bff3fc",
        "teal-3": "#3ac5de",
        "teal-4": "#218491",
        "teal-5": "#23737a",

        // Green
        "green-1": "#dbffde",
        "green-2": "#b4fdba",
        "green-3": "#2ce23c",
        "green-4": "#1b8d21",
        "green-5": "#1e7620",
      },
    },
  },
  plugins: [],
} satisfies Config;
