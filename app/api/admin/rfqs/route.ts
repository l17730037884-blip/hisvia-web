import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthorized } from "@/lib/rfq/admin-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isAdminAuthorized(request.headers.get("authorization"))) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(request.url);
  const status = url.searchParams.get("status")?.trim() || undefined;
  const internalStatus = url.searchParams.get("internal_status")?.trim() || undefined;
  const assignedTo = url.searchParams.get("assigned_to")?.trim() || undefined;
  const page = Math.max(1, Number(url.searchParams.get("page") || "1") || 1);
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") || "25") || 25));

  const where = {
    ...(status ? { status } : {}),
    ...(internalStatus ? { internalStatus } : {}),
    ...(assignedTo ? { assignedTo } : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.rfq.findMany({
      where,
      orderBy: { createdAt: "asc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        publicRef: true,
        buyerName: true,
        buyerEmail: true,
        requirementText: true,
        status: true,
        internalStatus: true,
        assignedTo: true,
        sourceLocale: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.rfq.count({ where }),
  ]);

  return NextResponse.json({ success: true, rows, total, page, limit });
}
