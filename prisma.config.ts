import { defineConfig } from "prisma/config";

export default defineConfig({
  migrate: {
    async development() {
      return { url: process.env.DATABASE_URL! };
    },
  },
});
