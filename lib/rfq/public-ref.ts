import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/db";

export function buildPublicRef(date = new Date()): string {
  const ymd = [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) suffix += chars[randomBytes(1)[0] % chars.length];
  return `RFQ-${ymd}-${suffix}`;
}

export async function generateUniquePublicRef(): Promise<string> {
  for (let attempt = 0; attempt < 4; attempt++) {
    const ref = buildPublicRef();
    const existing = await prisma.rfq.findUnique({ where: { publicRef: ref }, select: { id: true } });
    if (!existing) return ref;
  }
  throw new Error("Could not allocate a unique public reference");
}

export function hashIp(ip: string): string {
  const salt = process.env.ADMIN_TOKEN ?? "hisvia-rfq-salt";
  return createHash("sha256").update(`${ip}:${salt}`).digest("hex").slice(0, 32);
}
