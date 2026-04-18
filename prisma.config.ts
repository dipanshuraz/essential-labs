import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * `prisma generate` (e.g. Vercel `npm install` / `postinstall`) runs without `.env`.
 * A fallback SQLite URL is only for config resolution; runtime must set DATABASE_URL
 * (e.g. in Vercel Project → Environment Variables).
 */
const databaseUrl =
  process.env.DATABASE_URL?.trim() || "file:./prisma/.generate-placeholder.db";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});
