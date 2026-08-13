import { timingSafeEqual } from "crypto";

export function isAdminAuthorized(authHeader: string | null): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  const provided = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  if (!provided || provided.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  } catch {
    return false;
  }
}
