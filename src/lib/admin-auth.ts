import { timingSafeEqual } from "node:crypto";

export function getAdminToken(): string | undefined {
  const token = process.env.ADMIN_TOKEN?.trim();
  return token ? token : undefined;
}

/**
 * Admin access is open when ADMIN_TOKEN is unset (local development). When set,
 * the request must carry the token as ?token= or an x-admin-token header.
 */
export function isAdminAuthorised(candidate: string | null | undefined): boolean {
  const expected = getAdminToken();
  if (!expected) return true;
  if (!candidate) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
