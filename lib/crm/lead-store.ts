/**
 * HISVIA CRM — Lead Store
 * In-memory lead tracking. Replace with database in production.
 */

import type { Lead, LeadStatus } from "./lead-types";

const leads: Lead[] = [];

let counter = 0;

export function createLead(lead: Omit<Lead, "lead_id" | "created_at" | "updated_at">): Lead {
  const newLead: Lead = {
    ...lead,
    lead_id: `LEAD-${String(++counter).padStart(4, "0")}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  leads.push(newLead);
  return newLead;
}

export function getLead(id: string): Lead | undefined {
  return leads.find((l) => l.lead_id === id);
}

export function getAllLeads(): Lead[] {
  return [...leads];
}

export function getLeadsByType(type: string): Lead[] {
  return leads.filter((l) => l.type === type);
}

export function getLeadsByStatus(status: LeadStatus): Lead[] {
  return leads.filter((l) => l.status === status);
}

export function getLeadsByCountry(country: string): Lead[] {
  return leads.filter((l) => l.country.toLowerCase() === country.toLowerCase());
}

export function updateLeadStatus(id: string, status: LeadStatus, note?: string): boolean {
  const lead = leads.find((l) => l.lead_id === id);
  if (!lead) return false;
  lead.status = status;
  lead.updated_at = new Date().toISOString();
  if (note) lead.notes += `\n[${new Date().toISOString()}] ${status}: ${note}`;
  return true;
}

export function getLeadCount(): number {
  return leads.length;
}

export function getLeadCountByStatus(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const l of leads) {
    counts[l.status] = (counts[l.status] || 0) + 1;
  }
  return counts;
}

export function getLeadCountByCountry(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const l of leads) {
    counts[l.country] = (counts[l.country] || 0) + 1;
  }
  return counts;
}
