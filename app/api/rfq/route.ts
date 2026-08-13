import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateUniquePublicRef, hashIp } from "@/lib/rfq/public-ref";
import { validateSubmission } from "@/lib/rfq/validation";
import { isRateLimited } from "@/lib/rfq/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateSubmission(body);
  if (!validation.ok) {
    return NextResponse.json({ success: false, error: validation.error }, { status: validation.status });
  }
  const data = validation.data;

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Idempotency: a repeated submission with the same key returns the existing record.
  const existing = await prisma.rfq.findUnique({ where: { idempotencyKey: data.idempotencyKey } });
  if (existing) {
    return NextResponse.json({ success: true, public_ref: existing.publicRef, duplicate: true });
  }

  if (await isRateLimited(data.buyerEmail, ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let publicRef: string;
  try {
    publicRef = await generateUniquePublicRef();
  } catch {
    return NextResponse.json({ success: false, error: "Could not allocate a reference" }, { status: 500 });
  }

  const rfqId = randomUUID();
  try {
    await prisma.$transaction([
      prisma.rfq.create({
        data: {
          id: rfqId,
          publicRef,
          idempotencyKey: data.idempotencyKey,
          buyerName: data.buyerName ?? null,
          buyerEmail: data.buyerEmail,
          requirementText: data.requirementText,
          capabilitySelection: data.capabilitySelection ? JSON.parse(JSON.stringify(data.capabilitySelection)) : undefined,
          materialApplication: data.materialApplication ? JSON.parse(JSON.stringify(data.materialApplication)) : undefined,
          evidenceSnapshot: data.evidenceSnapshot ? JSON.parse(JSON.stringify(data.evidenceSnapshot)) : undefined,
          factoryClusterSnapshot: data.factoryClusterSnapshot ? JSON.parse(JSON.stringify(data.factoryClusterSnapshot)) : undefined,
          sourceLocale: data.sourceLocale ?? null,
        },
      }),
      prisma.rfqEvent.create({
        data: {
          rfqId,
          eventType: "BUYER_REQUEST_CREATED",
          payload: {
            ipHash: hashIp(ip),
            source: "api",
            note: "Requirement submitted by buyer",
          },
        },
      }),
    ]);
  } catch (err) {
    // Unique constraint on idempotency_key under concurrency: retry as duplicate.
    if (err instanceof Error && "code" in err && (err as { code?: string }).code === "P2002") {
      const raced = await prisma.rfq.findUnique({ where: { idempotencyKey: data.idempotencyKey } });
      if (raced) {
        return NextResponse.json({ success: true, public_ref: raced.publicRef, duplicate: true });
      }
    }
    console.error("RFQ create failed", err);
    return NextResponse.json({ success: false, error: "Failed to create the request" }, { status: 500 });
  }

  return NextResponse.json({ success: true, public_ref: publicRef }, { status: 201 });
}
