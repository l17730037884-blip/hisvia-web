import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthorized } from "@/lib/rfq/admin-auth";

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
  const assignedTo = typeof b.assignedTo === "string" ? b.assignedTo.trim() : "";
  const note = typeof b.note === "string" ? b.note.trim() : "Assigned";
  if (!assignedTo || assignedTo.length > 200) {
    return NextResponse.json({ success: false, error: "assignedTo is required" }, { status: 400 });
  }

  const rfq = await prisma.rfq.findUnique({ where: { id: params.id } });
  if (!rfq) {
    return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  }

  const data: { assignedTo: string; internalStatus?: string } = { assignedTo };
  if (rfq.internalStatus === "received") data.internalStatus = "assigned";

  await prisma.$transaction([
    prisma.rfq.update({ where: { id: rfq.id }, data }),
    prisma.rfqEvent.create({
      data: {
        rfqId: rfq.id,
        eventType: "RFQ_ASSIGNED",
        payload: { assignedTo, from: rfq.internalStatus, to: data.internalStatus ?? rfq.internalStatus, note },
      },
    }),
  ]);

  return NextResponse.json({ success: true, rfqId: rfq.id, assignedTo, internalStatus: data.internalStatus ?? rfq.internalStatus });
}
