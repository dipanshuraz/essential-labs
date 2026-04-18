import { PrismaClient } from "@/generated/prisma/client";
import { createPrismaDriverAdapter } from "@/lib/prisma-adapter";

/** Keep in sync with `prisma.config.ts` fallback when DATABASE_URL is unset. */
const DEFAULT_SQLITE_URL = "file:./prisma/.generate-placeholder.db";

const connectionString = process.env.DATABASE_URL?.trim() || DEFAULT_SQLITE_URL;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: createPrismaDriverAdapter(connectionString),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
