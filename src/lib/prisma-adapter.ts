import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaLibSql } from "@prisma/adapter-libsql";

/**
 * Local `file:` → better-sqlite3. Remote `libsql://` (Turso) → libSQL client.
 * On Vercel, set DATABASE_URL to your Turso URL and TURSO_AUTH_TOKEN.
 */
export function createPrismaDriverAdapter(connectionString: string) {
  const url = connectionString.trim();
  if (url.startsWith("file:")) {
    return new PrismaBetterSqlite3({ url });
  }
  return new PrismaLibSql({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN ?? process.env.LIBSQL_AUTH_TOKEN,
  });
}
