/**
 * HISVIA Flywheel — Learning Engine
 * Phase 14: Analyzes matches → optimization suggestions.
 * DOES NOT auto-apply changes. Only generates suggestions.
 */

import type { SupplyChainEvent, LearningInsight } from "./event-types";
import { getAllEvents, getEventsByType } from "./event-store";
import type { FeedbackAnalysis } from "./feedback-engine";
import { analyzeFeedback } from "./feedback-engine";
import type { FeedbackRecord } from "./event-types";

// ============================================================
// Optimization Suggestion
// ============================================================

let insightCounter = 0;

// ============================================================
// Public API
// ============================================================

export function generateOptimizationSuggestions(options?: {
  feedbackList?: FeedbackRecord[];
  systemMap?: Map<string, string>;
}): LearningInsight[] {
  const events = getAllEvents();
  const insights: LearningInsight[] = [];

  if (events.length === 0) {
    return insights;
  }

  // 1. Analyze match completion patterns
  const matchEvents = getEventsByType("MATCH_COMPLETED");
  const orderEvents = getEventsByType("ORDER_COMPLETED");
  const conversionRate =
    matchEvents.length > 0 ? orderEvents.length / matchEvents.length : 0;

  if (conversionRate < 0.3 && matchEvents.length >= 5) {
    insights.push({
      insight_id: `LRN-${String(++insightCounter).padStart(3, "0")}`,
      category: "matching",
      finding: `Match-to-order conversion rate is low (${Math.round(conversionRate * 100)}%)`,
      evidence: matchEvents.slice(0, 3).map((e) => e.event_id),
      confidence: 0.75,
      recommendation:
        "匹配到订单的转化率低于30%，建议增加 supplier_score 中 export_experience 和 certification 的权重",
      applied: false,
    });
  }

  // 2. Analyze system type performance
  const systemCounts = new Map<string, { matches: number; orders: number }>();
  for (const e of matchEvents) {
    const sys = (e.metadata?.system_type as string) || "unknown";
    const entry = systemCounts.get(sys) || { matches: 0, orders: 0 };
    entry.matches++;
    systemCounts.set(sys, entry);
  }
  for (const e of orderEvents) {
    const sys = (e.metadata?.system_type as string) || "unknown";
    const entry = systemCounts.get(sys) || { matches: 0, orders: 0 };
    entry.orders++;
    systemCounts.set(sys, entry);
  }

  for (const [sys, stats] of systemCounts) {
    if (stats.matches >= 3 && stats.orders === 0) {
      insights.push({
        insight_id: `LRN-${String(++insightCounter).padStart(3, "0")}`,
        category: "matching",
        finding: `${sys}: ${stats.matches}次匹配但零成交`,
        evidence: matchEvents
          .filter((e) => (e.metadata?.system_type as string) === sys)
          .slice(0, 2)
          .map((e) => e.event_id),
        confidence: 0.7,
        recommendation: `${sys} 类别匹配高但未转化，建议检查供应商能力覆盖或增加该类别供应商`,
        applied: false,
      });
    }
  }

  // 3. Analyze country/market performance
  const countryCounts = new Map<string, number>();
  for (const e of getEventsByType("BUYER_REQUEST_CREATED")) {
    if (e.related_market) {
      countryCounts.set(e.related_market, (countryCounts.get(e.related_market) || 0) + 1);
    }
  }
  const topCountries = [...countryCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  if (topCountries.length > 0) {
    insights.push({
      insight_id: `LRN-${String(++insightCounter).padStart(3, "0")}`,
      category: "market",
      finding: `Top 3 buyer markets: ${topCountries.map((c) => `${c[0]}(${c[1]})`).join(", ")}`,
      evidence: getEventsByType("BUYER_REQUEST_CREATED")
        .filter((e) => topCountries.some((c) => c[0] === e.related_market))
        .slice(0, 3)
        .map((e) => e.event_id),
      confidence: 0.85,
      recommendation: `建议优先为 ${topCountries[0][0]} 市场建立本地合作伙伴网络`,
      applied: false,
    });
  }

  // 4. Analyze partner referral effectiveness
  const referralEvents = getEventsByType("PARTNER_REFERRED");
  if (referralEvents.length >= 3) {
    const partnerCounts = new Map<string, number>();
    for (const e of referralEvents) {
      partnerCounts.set(e.actor_id, (partnerCounts.get(e.actor_id) || 0) + 1);
    }
    const topPartner = [...partnerCounts.entries()].sort((a, b) => b[1] - a[1])[0];
    if (topPartner && topPartner[1] >= 2) {
      insights.push({
        insight_id: `LRN-${String(++insightCounter).padStart(3, "0")}`,
        category: "partner",
        finding: `Partner ${topPartner[0]} generated ${topPartner[1]} referrals — top performer`,
        evidence: referralEvents
          .filter((e) => e.actor_id === topPartner[0])
          .slice(0, 2)
          .map((e) => e.event_id),
        confidence: 0.8,
        recommendation: `Partner ${topPartner[0]} 推荐率高，建议升级为区域独家合作伙伴`,
        applied: false,
      });
    }
  }

  // 5. Scoring weight suggestions based on feedback
  if (options?.feedbackList && options.feedbackList.length > 0) {
    const analysis = analyzeFeedback(options.feedbackList, options.systemMap);
    if (analysis.avg_rating < 3.5 && analysis.common_pain_points.length > 0) {
      const topPain = analysis.common_pain_points[0];
      insights.push({
        insight_id: `LRN-${String(++insightCounter).padStart(3, "0")}`,
        category: "scoring",
        finding: `用户反馈主要痛点: "${topPain.point}" (${topPain.count}次)`,
        evidence: options.feedbackList
          .filter((f) => f.pain_points.includes(topPain.point))
          .slice(0, 2)
          .map((f) => f.feedback_id),
        confidence: 0.65,
        recommendation: `建议在 supplier_score 中增加与 "${topPain.point}" 相关的评分维度`,
        applied: false,
      });
    }
  }

  return insights;
}

export function getAllInsights(insights: LearningInsight[]): LearningInsight[] {
  return [...insights];
}

export function getUnappliedInsights(insights: LearningInsight[]): LearningInsight[] {
  return insights.filter((i) => !i.applied);
}
