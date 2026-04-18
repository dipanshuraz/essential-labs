import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

/** Keep in sync with `prisma.config.ts` fallback when DATABASE_URL is unset. */
const DEFAULT_SQLITE_URL = "file:./prisma/.generate-placeholder.db";

const connectionString = process.env.DATABASE_URL?.trim() || DEFAULT_SQLITE_URL;

const adapter = new PrismaBetterSqlite3({ url: connectionString });

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
