import { prisma } from "@/lib/db";
import { hashIp } from "@/lib/rfq/public-ref";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

export async function isRateLimited(email: string, ip: string): Promise<boolean> {
  const since = new Date(Date.now() - WINDOW_MS);
  const ipHash = hashIp(ip);
  const recent = await prisma.rfqEvent.findMany({
    where: {
      eventType: "BUYER_REQUEST_CREATED",
      createdAt: { gte: since },
      OR: [
        { rfq: { buyerEmail: email } },
        { payload: { path: ["ipHash"], equals: ipHash } },
      ],
    },
    select: { id: true },
    take: MAX_PER_WINDOW + 1,
  });
  return recent.length >= MAX_PER_WINDOW;
}
