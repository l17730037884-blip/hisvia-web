import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0E2A4A",
        steel: "#2E72B8",
        graphite: "#46586B",
        fog: "#DCEBFA",
        line: "#B9D8F0",
        amber: "#D98A3D",
        surface: "#F5F6F8",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "sans-serif"],
        body: ["var(--font-plex-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      maxWidth: {
        wrap: "1240px",
      },
    },
  },
  plugins: [],
};
export default config;
