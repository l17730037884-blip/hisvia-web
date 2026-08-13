import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { isAdminAuthorized } from "@/lib/rfq/admin-auth";
import {
  BUYER_VISIBLE_FLOW,
  INTERNAL_FLOW,
  CLOSED_BUYER_STATES,
  canTransition,
} from "@/lib/rfq/state-machine";

export const runtime = "nodejs";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!isAdminAuthorized(request.headers.get("authorization"))) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }
  const b = (body ?? {}) as Record<string, unknown>;
  const note = typeof b.note === "string" ? b.note.trim() : "";
  const reason = typeof b.reason === "string" ? b.reason.trim() : undefined;
  const status = typeof b.status === "string" ? b.status.trim() : undefined;
  const internalStatus = typeof b.internalStatus === "string" ? b.internalStatus.trim() : undefined;

  if (!status && !internalStatus) {
    return NextResponse.json({ success: false, error: "Provide status or internalStatus" }, { status: 400 });
  }
  if (!note) {
    return NextResponse.json({ success: false, error: "A note is required for every status change" }, { status: 400 });
  }

  const rfq = await prisma.rfq.findUnique({ where: { id: params.id } });
  if (!rfq) {
    return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  }

  const events: Array<{ eventType: string; payload: Prisma.InputJsonValue }> = [];
  const data: { status?: string; internalStatus?: string } = {};

  if (status) {
    if (!canTransition(BUYER_VISIBLE_FLOW, rfq.status, status)) {
      return NextResponse.json(
        { success: false, error: `Invalid transition ${rfq.status} → ${status}` },
        { status: 400 }
      );
    }
    if (CLOSED_BUYER_STATES.has(status) && !reason) {
      return NextResponse.json({ success: false, error: "A reason is required when closing an RFQ" }, { status: 400 });
    }
    data.status = status;
    events.push({
      eventType: CLOSED_BUYER_STATES.has(status) ? "RFQ_CLOSED" : "RFQ_STATUS_CHANGED",
      payload: { from: rfq.status, to: status, note, reason: reason ?? null },
    });
  }

  if (internalStatus) {
    if (!canTransition(INTERNAL_FLOW, rfq.internalStatus, internalStatus)) {
      return NextResponse.json(
        { success: false, error: `Invalid internal transition ${rfq.internalStatus} → ${internalStatus}` },
        { status: 400 }
      );
    }
    data.internalStatus = internalStatus;
    events.push({
      eventType: internalStatus === "closed" ? "RFQ_CLOSED" : "RFQ_STATUS_CHANGED",
      payload: { from: rfq.internalStatus, to: internalStatus, note, reason: reason ?? null, dimension: "internal" },
    });
  }

  await prisma.$transaction([
    prisma.rfq.update({ where: { id: rfq.id }, data }),
    ...events.map((e) =>
      prisma.rfqEvent.create({
        data: { rfqId: rfq.id, eventType: e.eventType, payload: e.payload },
      })
    ),
  ]);

  return NextResponse.json({ success: true, rfqId: rfq.id, status: data.status ?? rfq.status, internalStatus: data.internalStatus ?? rfq.internalStatus });
}
