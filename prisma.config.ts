import { config as loadEnv } from "dotenv";

// Load .env.local first (Vercel env-pull puts it here, and Next.js reads it
// too), then fall back to .env. dotenv does not override already-set vars,
// so the order means .env.local wins if both exist.
loadEnv({ path: ".env.local" });
loadEnv();

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: "tsx ./prisma/seed.ts",
    async development() {
      return { url: process.env.DATABASE_URL! };
    },
  },
});
