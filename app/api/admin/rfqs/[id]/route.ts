import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthorized } from "@/lib/rfq/admin-auth";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  if (!isAdminAuthorized(request.headers.get("authorization"))) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const rfq = await prisma.rfq.findUnique({
    where: { id: params.id },
    include: { events: { orderBy: { createdAt: "asc" } } },
  });
  if (!rfq) {
    return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, rfq });
}
