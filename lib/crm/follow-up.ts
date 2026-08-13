/**
 * HISVIA CRM — Follow-up Engine
 */

import type { Lead } from "./lead-types";
import { getNextStatuses, STATUS_LABELS } from "./lead-status";

export interface FollowUpTask {
  lead_id: string;
  company_name: string;
  contact_name: string;
  current_status: string;
  next_action: string;
  due_by: string;
  overdue: boolean;
}

export function generateFollowUpTask(lead: Lead): FollowUpTask {
  const nextStatuses = getNextStatuses(lead.status);
  const nextAction = nextStatuses.length > 0
    ? `Move to ${STATUS_LABELS[nextStatuses[0]]}`
    : "No further action required";

  // Due: 3 days after last contact, or 7 days from creation
  const lastContact = lead.last_contacted_at || lead.created_at;
  const dueDate = new Date(lastContact);
  dueDate.setDate(dueDate.getDate() + 3);

  return {
    lead_id: lead.lead_id,
    company_name: lead.company_name,
    contact_name: lead.contact_name,
    current_status: STATUS_LABELS[lead.status],
    next_action: nextAction,
    due_by: dueDate.toISOString(),
    overdue: new Date() > dueDate,
  };
}

export function getOverdueFollowUps(leads: Lead[]): FollowUpTask[] {
  return leads
    .filter((l) => l.status !== "won" && l.status !== "lost")
    .map(generateFollowUpTask)
    .filter((t) => t.overdue)
    .sort((a, b) => new Date(a.due_by).getTime() - new Date(b.due_by).getTime());
}

export function getUpcomingFollowUps(leads: Lead[], days: number = 7): FollowUpTask[] {
  const now = new Date();
  const future = new Date();
  future.setDate(future.getDate() + days);

  return leads
    .filter((l) => l.status !== "won" && l.status !== "lost")
    .map(generateFollowUpTask)
    .filter((t) => {
      const due = new Date(t.due_by);
      return due >= now && due <= future;
    })
    .sort((a, b) => new Date(a.due_by).getTime() - new Date(b.due_by).getTime());
}
