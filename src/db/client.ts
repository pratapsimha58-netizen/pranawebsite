import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export type Database = NeonHttpDatabase<typeof schema>;

const globalForDb = globalThis as unknown as { __pranaDb?: Database };

export function getDatabaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL?.trim();
  return url ? url : undefined;
}

export function isDatabaseConfigured(): boolean {
  return getDatabaseUrl() !== undefined;
}

/**
 * Returns a Drizzle client bound to Neon over HTTP, or null when DATABASE_URL
 * is not set. Callers fall back to the in-memory store in that case.
 */
export function getDb(): Database | null {
  const url = getDatabaseUrl();
  if (!url) return null;
  if (!globalForDb.__pranaDb) {
    globalForDb.__pranaDb = drizzle(neon(url), { schema });
  }
  return globalForDb.__pranaDb;
}
