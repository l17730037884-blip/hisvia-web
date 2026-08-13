/**
 * HISVIA Flywheel — Analytics Engine
 * Phase 14: Demand heatmaps, supplier performance, country analysis.
 * Pure computation — no side effects.
 */

import type { SupplyChainEvent, AnalyticsSnapshot } from "./event-types";
import { getAllEvents, getEventsByType, getEventCountByType } from "./event-store";

// ============================================================
// System type constants
// ============================================================

const SYSTEM_TYPES = [
  "Air Compressor Systems",
  "Hydraulic Systems",
  "Pneumatic Automation",
  "Industrial Filtration",
  "Pumps & Fluid Handling",
  "Valves & Flow Control",
  "Mechanical Transmission",
  "Industrial Automation & Control",
];

// ============================================================
// Public API
// ============================================================

export function generateAnalytics(period?: string): AnalyticsSnapshot {
  const events = getAllEvents();
  const typeCounts = getEventCountByType();

  const totalEvents = events.length;
  const buyerRequests = typeCounts["BUYER_REQUEST_CREATED"] || 0;
  const matchesCompleted = typeCounts["MATCH_COMPLETED"] || 0;
  const orderCompleted = typeCounts["ORDER_COMPLETED"] || 0;
  const partnerReferrals = typeCounts["PARTNER_REFERRED"] || 0;
  const pagesGenerated = typeCounts["PAGE_GENERATED"] || 0;

  // Conversion rate: matches -> orders
  const conversionRate =
    matchesCompleted > 0 ? orderCompleted / matchesCompleted : 0;

  // Top countries (from buyer requests)
  const countryMap = new Map<string, number>();
  for (const e of getEventsByType("BUYER_REQUEST_CREATED")) {
    if (e.related_market) {
      countryMap.set(e.related_market, (countryMap.get(e.related_market) || 0) + 1);
    }
  }
  const topCountries = [...countryMap.entries()]
    .map(([country, requests]) => ({ country, requests }))
    .sort((a, b) => b.requests - a.requests)
    .slice(0, 10);

  // Top systems (from match events)
  const systemMap = new Map<string, number>();
  for (const e of getEventsByType("MATCH_COMPLETED")) {
    const sys = (e.metadata?.system_type as string) || "unknown";
    if (sys !== "unknown") {
      systemMap.set(sys, (systemMap.get(sys) || 0) + 1);
    }
  }
  const topSystems = [...systemMap.entries()]
    .map(([system, requests]) => ({ system, requests }))
    .sort((a, b) => b.requests - a.requests)
    .slice(0, 10);

  // Top suppliers (from match + order events)
  const supplierMap = new Map<string, { matches: number; scores: number[] }>();
  for (const e of getEventsByType("MATCH_COMPLETED")) {
    if (e.related_supplier) {
      const entry = supplierMap.get(e.related_supplier) || { matches: 0, scores: [] };
      entry.matches++;
      const score = (e.metadata?.match_score as number) || 0;
      if (score > 0) entry.scores.push(score);
      supplierMap.set(e.related_supplier, entry);
    }
  }
  for (const e of getEventsByType("SUPPLIER_SELECTED")) {
    if (e.related_supplier) {
      const entry = supplierMap.get(e.related_supplier) || { matches: 0, scores: [] };
      entry.matches++;
      supplierMap.set(e.related_supplier, entry);
    }
  }
  const topSuppliers = [...supplierMap.entries()]
    .map(([factory_id, stats]) => ({
      factory_id,
      matches: stats.matches,
      avg_score:
        stats.scores.length > 0
          ? Math.round(
              (stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length) * 100
            ) / 100
          : 0,
    }))
    .sort((a, b) => b.matches - a.matches)
    .slice(0, 10);

  // SEO pages generated
  const seoPagesGenerated = pagesGenerated;

  // Knowledge entries pending
  const knowledgeEntriesPending = 0; // Will be enriched from outside

  // Average match quality (from match events)
  const matchScores = getEventsByType("MATCH_COMPLETED")
    .map((e) => (e.metadata?.match_score as number) || 0)
    .filter((s) => s > 0);
  const avgMatchQuality =
    matchScores.length > 0
      ? Math.round(
          (matchScores.reduce((a, b) => a + b, 0) / matchScores.length) * 100
        ) / 100
      : 0;

  return {
    period: period || "all_time",
    total_events: totalEvents,
    buyer_requests: buyerRequests,
    matches_completed: matchesCompleted,
    conversion_rate: Math.round(conversionRate * 100) / 100,
    top_countries: topCountries,
    top_systems: topSystems,
    top_suppliers: topSuppliers,
    seo_pages_generated: seoPagesGenerated,
    partner_referrals: partnerReferrals,
    knowledge_entries_pending: knowledgeEntriesPending,
    avg_match_quality: avgMatchQuality,
  };
}

export function generateDemandHeatmap(): {
  country: string;
  systems: string[];
  volume: number;
}[] {
  const events = getEventsByType("BUYER_REQUEST_CREATED");
  const heatmap = new Map<string, { systems: Set<string>; volume: number }>();

  for (const e of events) {
    const country = e.related_market || "unknown";
    const sys = (e.metadata?.system_type as string) || "unknown";
    const entry = heatmap.get(country) || { systems: new Set<string>(), volume: 0 };
    entry.systems.add(sys);
    entry.volume++;
    heatmap.set(country, entry);
  }

  return [...heatmap.entries()]
    .map(([country, data]) => ({
      country,
      systems: [...data.systems],
      volume: data.volume,
    }))
    .sort((a, b) => b.volume - a.volume);
}

export function generateCountryReport(country: string): {
  country: string;
  total_requests: number;
  matched: number;
  ordered: number;
  top_systems: string[];
} {
  const allEvents = getAllEvents().filter((e) => e.related_market === country);

  const requests = allEvents.filter((e) => e.event_type === "BUYER_REQUEST_CREATED");
  const matched = allEvents.filter((e) => e.event_type === "MATCH_COMPLETED");
  const ordered = allEvents.filter((e) => e.event_type === "ORDER_COMPLETED");

  const sysCounts = new Map<string, number>();
  for (const e of matched) {
    const sys = (e.metadata?.system_type as string) || "unknown";
    if (sys !== "unknown") {
      sysCounts.set(sys, (sysCounts.get(sys) || 0) + 1);
    }
  }
  const topSystems = [...sysCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([s]) => s);

  return {
    country,
    total_requests: requests.length,
    matched: matched.length,
    ordered: ordered.length,
    top_systems: topSystems,
  };
}

export function generateSupplierReport(factoryId: string): {
  factory_id: string;
  total_matches: number;
  selected: number;
  orders: number;
  avg_match_score: number;
} {
  const allEvents = getAllEvents().filter((e) => e.related_supplier === factoryId);

  const matched = allEvents.filter((e) => e.event_type === "MATCH_COMPLETED");
  const selected = allEvents.filter((e) => e.event_type === "SUPPLIER_SELECTED");
  const ordered = allEvents.filter((e) => e.event_type === "ORDER_COMPLETED");

  const scores = matched
    .map((e) => (e.metadata?.match_score as number) || 0)
    .filter((s) => s > 0);

  return {
    factory_id: factoryId,
    total_matches: matched.length,
    selected: selected.length,
    orders: ordered.length,
    avg_match_score:
      scores.length > 0
        ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) / 100
        : 0,
  };
}
