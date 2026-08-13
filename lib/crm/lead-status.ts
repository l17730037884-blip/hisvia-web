/**
 * HISVIA CRM — Lead Status Transitions
 */

import type { LeadStatus } from "./lead-types";

export const VALID_TRANSITIONS: Record<LeadStatus, LeadStatus[]> = {
  new: ["contacted", "lost", "inactive"],
  contacted: ["qualified", "lost", "inactive"],
  qualified: ["proposal_sent", "lost"],
  proposal_sent: ["negotiating", "lost"],
  negotiating: ["won", "lost"],
  won: [],
  lost: ["new"],
  inactive: ["new"],
};

export function isValidTransition(from: LeadStatus, to: LeadStatus): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}

export function getNextStatuses(current: LeadStatus): LeadStatus[] {
  return VALID_TRANSITIONS[current] || [];
}

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal_sent: "Proposal Sent",
  negotiating: "Negotiating",
  won: "Won",
  lost: "Lost",
  inactive: "Inactive",
};
