export const BUYER_VISIBLE_FLOW: Record<string, string[]> = {
  new: ["in_review", "cancelled"],
  in_review: ["supplier_contacted", "cancelled"],
  supplier_contacted: ["quoted", "cancelled"],
  quoted: ["closed_won", "closed_lost", "cancelled"],
  closed_won: [],
  closed_lost: [],
  cancelled: [],
};

export const INTERNAL_FLOW: Record<string, string[]> = {
  received: ["assigned", "processing", "closed"],
  assigned: ["processing", "closed"],
  processing: ["closed"],
  closed: [],
};

export const CLOSED_BUYER_STATES = new Set(["closed_won", "closed_lost", "cancelled"]);

export function canTransition(flow: Record<string, string[]>, from: string, to: string): boolean {
  if (!flow[from]) return false;
  if (from === to) return false;
  return flow[from].includes(to);
}
