/**
 * HISVIA Supply Chain Flywheel — Event Types
 * Phase 14: Closed-loop intelligence events.
 */

// ============================================================
// Event Types
// ============================================================

export type EventType =
  | "BUYER_REQUEST_CREATED"
  | "MATCH_COMPLETED"
  | "SUPPLIER_SELECTED"
  | "QUOTE_RECEIVED"
  | "ORDER_COMPLETED"
  | "PARTNER_REFERRED"
  | "PAGE_GENERATED"
  | "FEEDBACK_RECEIVED"
  | "KNOWLEDGE_UPDATED";

export type ActorType = "buyer" | "supplier" | "partner" | "system";

export interface SupplyChainEvent {
  event_id: string;
  timestamp: string;
  event_type: EventType;
  actor_type: ActorType;
  actor_id: string;
  source: string;
  related_assets: string[];
  related_supplier: string | null;
  related_market: string | null;
  result: string;
  metadata: Record<string, unknown>;
}

// ============================================================
// Feedback Record
// ============================================================

export interface FeedbackRecord {
  feedback_id: string;
  event_id: string;
  feedback_type: "buyer_feedback" | "supplier_feedback" | "partner_feedback";
  match_quality: "excellent" | "good" | "fair" | "poor";
  conversion_status: "won" | "pending" | "lost" | "abandoned";
  rating: number; // 1-5
  comments: string;
  pain_points: string[];
  suggestions: string[];
}

// ============================================================
// Learning Insight
// ============================================================

export interface LearningInsight {
  insight_id: string;
  category: "scoring" | "matching" | "category" | "market" | "partner";
  finding: string;
  evidence: string[];
  confidence: number;
  recommendation: string;
  applied: boolean;
}

// ============================================================
// Knowledge Entry (pending queue)
// ============================================================

export interface KnowledgeEntry {
  entry_id: string;
  source_event: string;
  type: "new_brand" | "new_model" | "new_replacement" | "new_application" | "supplier_capability" | "market_insight";
  data: Record<string, unknown>;
  confidence: number;
  status: "pending_review" | "approved" | "rejected";
}

// ============================================================
// Analytics Snapshot
// ============================================================

export interface AnalyticsSnapshot {
  period: string;
  total_events: number;
  buyer_requests: number;
  matches_completed: number;
  conversion_rate: number;
  top_countries: { country: string; requests: number }[];
  top_systems: { system: string; requests: number }[];
  top_suppliers: { factory_id: string; matches: number; avg_score: number }[];
  seo_pages_generated: number;
  partner_referrals: number;
  knowledge_entries_pending: number;
  avg_match_quality: number;
}
