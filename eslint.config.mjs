import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "next-env.d.ts",
      "next.config.js",
      // Frozen experimental prototypes (v3-v7 previews) — abandoned, not part of
      // the production experience layer. Kept on disk for reference only.
      "app/v3-preview/**",
      "app/v4-preview/**",
      "app/v5-preview/**",
      "app/v6-preview/**",
      "app/v7-preview/**",
    ],
  },
]);
