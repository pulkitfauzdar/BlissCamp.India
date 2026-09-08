import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        spruce: {
          DEFAULT: "#1B2E28",
          light: "#25392F",
          dark: "#12211C",
        },
        stone: {
          fog: "#EDEBE2",
          paper: "#F6F5EF",
        },
        ink: "#16211D",
        amber: {
          DEFAULT: "#E8A33D",
          dark: "#C9822A",
          light: "#F2C374",
        },
        glacier: {
          DEFAULT: "#6E93A0",
          dark: "#4E7784",
        },
        line: "#D8D4C4",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-plex)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
