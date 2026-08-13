/**
 * HISVIA CRM — Lead Types
 * Phase 22: Real business data tracking.
 */

export type LeadType = "buyer" | "supplier" | "partner";

export type LeadSource =
  | "website_form"
  | "email_inquiry"
  | "partner_referral"
  | "exhibition"
  | "linkedin"
  | "direct_outreach"
  | "other";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal_sent"
  | "negotiating"
  | "won"
  | "lost"
  | "inactive";

export interface Lead {
  lead_id: string;
  type: LeadType;
  source: LeadSource;
  status: LeadStatus;
  company_name: string;
  contact_name: string;
  contact_email: string;
  country: string;
  industry: string;
  interest: string[];
  notes: string;
  assigned_to: string;
  created_at: string;
  updated_at: string;
  last_contacted_at: string | null;
  next_follow_up: string | null;
}
