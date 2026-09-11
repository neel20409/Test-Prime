import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        tcs: {
          header: "#1f4a8b",
          subHeader: "#337ab7",
          border: "#b2d1ff",
          bg: "#eef5ff",
          card: "#ffffff",
          accent: "#286090",
          notVisited: "#ffffff",
          notAnswered: "#d9534f",
          answered: "#5cb85c",
          marked: "#7b52ab",
          markedAnswered: "#7b52ab",
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
