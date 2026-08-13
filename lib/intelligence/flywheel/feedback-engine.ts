/**
 * HISVIA Flywheel — Feedback Engine
 * Phase 14: Feedback processing & match quality analysis.
 */

import type { FeedbackRecord } from "./event-types";

// ============================================================
// Feedback Analysis Result
// ============================================================

export interface FeedbackAnalysis {
  total_feedback: number;
  avg_rating: number;
  match_quality_distribution: {
    excellent: number;
    good: number;
    fair: number;
    poor: number;
  };
  conversion_distribution: {
    won: number;
    pending: number;
    lost: number;
    abandoned: number;
  };
  avg_match_quality_score: number;
  common_pain_points: { point: string; count: number }[];
  systems_with_highest_conversion: { system: string; conversion_rate: number }[];
  improvement_suggestions: string[];
}

// ============================================================
// System conversion tracking
// ============================================================

const systemFeedback: Map<string, { won: number; total: number }> = new Map();

// ============================================================
// Public API
// ============================================================

export function analyzeFeedback(
  feedbackList: FeedbackRecord[],
  systemMap?: Map<string, string> // event_id -> system_type
): FeedbackAnalysis {
  if (feedbackList.length === 0) {
    return {
      total_feedback: 0,
      avg_rating: 0,
      match_quality_distribution: { excellent: 0, good: 0, fair: 0, poor: 0 },
      conversion_distribution: { won: 0, pending: 0, lost: 0, abandoned: 0 },
      avg_match_quality_score: 0,
      common_pain_points: [],
      systems_with_highest_conversion: [],
      improvement_suggestions: [],
    };
  }

  // Rating stats
  const totalRating = feedbackList.reduce((sum, f) => sum + f.rating, 0);
  const avgRating = totalRating / feedbackList.length;

  // Quality distribution
  const qualityDist = { excellent: 0, good: 0, fair: 0, poor: 0 };
  for (const f of feedbackList) {
    qualityDist[f.match_quality]++;
  }

  // Conversion distribution
  const convDist = { won: 0, pending: 0, lost: 0, abandoned: 0 };
  for (const f of feedbackList) {
    convDist[f.conversion_status]++;
  }

  // Avg match quality score (excellent=100, good=75, fair=50, poor=25)
  const qualityScores: Record<string, number> = {
    excellent: 100,
    good: 75,
    fair: 50,
    poor: 25,
  };
  const avgQualityScore =
    feedbackList.reduce((sum, f) => sum + (qualityScores[f.match_quality] || 0), 0) /
    feedbackList.length;

  // Pain points
  const painPointMap = new Map<string, number>();
  for (const f of feedbackList) {
    for (const p of f.pain_points) {
      painPointMap.set(p, (painPointMap.get(p) || 0) + 1);
    }
  }
  const commonPainPoints = [...painPointMap.entries()]
    .map(([point, count]) => ({ point, count }))
    .sort((a, b) => b.count - a.count);

  // System conversion (if systemMap provided)
  const systemsWithHighestConversion: { system: string; conversion_rate: number }[] = [];
  if (systemMap) {
    const sysConv = new Map<string, { won: number; total: number }>();
    for (const f of feedbackList) {
      const sys = systemMap.get(f.event_id);
      if (sys) {
        const existing = sysConv.get(sys) || { won: 0, total: 0 };
        existing.total++;
        if (f.conversion_status === "won") existing.won++;
        sysConv.set(sys, existing);
      }
    }
    for (const [system, stats] of sysConv) {
      systemsWithHighestConversion.push({
        system,
        conversion_rate: stats.total > 0 ? stats.won / stats.total : 0,
      });
    }
    systemsWithHighestConversion.sort((a, b) => b.conversion_rate - a.conversion_rate);
  }

  // Suggestions
  const suggestions: string[] = [];
  if (avgRating < 3) {
    suggestions.push("整体评分偏低，建议检查匹配逻辑");
  }
  if (qualityDist.poor > qualityDist.excellent) {
    suggestions.push("差评超过好评，匹配质量需要优化");
  }
  const topPain = commonPainPoints.slice(0, 3).map((p) => p.point);
  if (topPain.length > 0) {
    suggestions.push(`主要痛点: ${topPain.join("、")}`);
  }

  return {
    total_feedback: feedbackList.length,
    avg_rating: Math.round(avgRating * 100) / 100,
    match_quality_distribution: qualityDist,
    conversion_distribution: convDist,
    avg_match_quality_score: Math.round(avgQualityScore * 100) / 100,
    common_pain_points: commonPainPoints,
    systems_with_highest_conversion: systemsWithHighestConversion,
    improvement_suggestions: suggestions,
  };
}

export function recordSystemFeedback(
  eventId: string,
  systemType: string,
  won: boolean
): void {
  const existing = systemFeedback.get(systemType) || { won: 0, total: 0 };
  existing.total++;
  if (won) existing.won++;
  systemFeedback.set(systemType, existing);
}
