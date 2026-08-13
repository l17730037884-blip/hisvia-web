/**
 * HISVIA Buyer Intent Parser
 * Analyzes natural language buyer descriptions → structured BuyerIntent.
 * Rule-based. No AI calls.
 */

import type {
  BuyerIntent,
  PurchaseType,
  IndustryIntent,
  PainPoint,
  DecisionFactor,
  SourcingStrategy,
  SourcingRisk,
} from "./intent-types";

// ============================================================
// Purchase Type Detection
// ============================================================

const PURCHASE_TYPE_PATTERNS: Record<PurchaseType, string[]> = {
  replacement: [
    "replace", "replacement", "spare part", "spare parts",
    "need new", "worn", "broken", "failed", "repair",
    "替换", "更换", "备件", "维修",
  ],
  new_purchase: [
    "new equipment", "new machine", "first time", "new project",
    "expansion", "new line", "new factory", "startup",
    "新设备", "新项目", "新建", "扩产",
  ],
  cost_reduction: [
    "cheaper", "cost reduction", "lower cost", "save money",
    "budget", "affordable", "too expensive", "overpriced",
    "降低成本", "便宜", "省钱", "太贵",
  ],
  supplier_switch: [
    "alternative supplier", "new supplier", "switch", "change supplier",
    "current supplier", "different supplier", "backup supplier",
    "second source", "not happy with",
    "换供应商", "替代供应商", "备选",
  ],
  oem_request: [
    "oem", "custom", "customize", "custom made", "private label",
    "own brand", "our design", "our specification",
    "定制", "贴牌", "代工",
  ],
  urgent_supply: [
    "urgent", "emergency", "asap", "immediately", "rush",
    "downtime", "production stopped", "critical",
    "紧急", "急需", "马上",
  ],
};

// Pain point patterns
const PAIN_POINT_PATTERNS: Record<PainPoint, string[]> = {
  high_price: [
    "expensive", "cost too much", "overpriced", "price increase",
    "high price", "too costly", "can't afford",
    "太贵", "价格高", "成本高",
  ],
  supply_unstable: [
    "unstable supply", "inconsistent", "out of stock", "backorder",
    "not available", "hard to find", "shortage",
    "缺货", "不稳定", "断货",
  ],
  obsolete_equipment: [
    "obsolete", "discontinued", "no longer made", "old model",
    "legacy", "out of production", "phased out",
    "停产", "淘汰", "老型号",
  ],
  quality_problem: [
    "poor quality", "low quality", "failing", "break down",
    "not lasting", "premature failure", "defective",
    "质量差", "容易坏", "不耐用",
  ],
  delivery_problem: [
    "long lead time", "slow delivery", "late", "delay",
    "waiting too long", "shipping problem",
    "交期长", "延迟", "物流慢",
  ],
  single_source: [
    "only one supplier", "single source", "no alternative",
    "dependent on", "monopoly", "sole supplier",
    "独家", "唯一供应商", "没有替代",
  ],
  certification_gap: [
    "need certified", "require certification", "must have CE",
    "need ISO", "approval required", "certified parts",
    "需要认证", "要有CE", "认证要求",
  ],
  technical_support: [
    "need help", "technical support", "don't know which",
    "need recommendation", "not sure", "need advice",
    "需要技术支持", "不懂", "帮忙选型",
  ],
};

// Decision factor patterns
const DECISION_FACTOR_PATTERNS: Record<DecisionFactor, string[]> = {
  price: ["price", "cost", "cheap", "budget", "competitive", "价格", "成本"],
  quality: ["quality", "reliable", "durable", "good quality", "质量", "可靠"],
  certification: ["certified", "CE", "ISO", "ASME", "approval", "认证"],
  lead_time: ["fast", "quick", "lead time", "delivery time", "交期", "快速"],
  customization: ["custom", "specific", "special", "定制", "特殊"],
  brand_compatibility: ["compatible", "same brand", "original", "匹配", "原装"],
  technical_support: ["support", "help", "engineer", "技术", "支持"],
  payment_terms: ["payment", "credit", "terms", "付款", "账期"],
};

// Sourcing strategy mapping
const STRATEGY_RULES: {
  conditions: (intent: Partial<BuyerIntent>) => boolean;
  strategy: SourcingStrategy;
}[] = [
  {
    conditions: (i) => i.purchase_type === "urgent_supply",
    strategy: "urgent_fulfillment",
  },
  {
    conditions: (i) => i.purchase_type === "oem_request",
    strategy: "oem_customization",
  },
  {
    conditions: (i) =>
      i.purchase_type === "supplier_switch" &&
      (i.pain_points?.includes("high_price") ?? false),
    strategy: "multi_supplier",
  },
  {
    conditions: (i) =>
      i.purchase_type === "cost_reduction" ||
      (i.decision_factors?.includes("price") ?? false),
    strategy: "multi_supplier",
  },
  {
    conditions: (i) =>
      i.purchase_type === "replacement" &&
      (i.decision_factors?.includes("quality") ?? false),
    strategy: "direct_factory",
  },
  {
    conditions: (i) =>
      i.purchase_type === "new_purchase" &&
      i.estimated_budget_tier === "large",
    strategy: "long_term_partner",
  },
  {
    conditions: () => true, // default
    strategy: "replacement_search",
  },
];

// ============================================================
// Parser
// ============================================================

export function analyzeBuyerIntent(description: string): BuyerIntent {
  const desc = description.toLowerCase();

  // Detect purchase type
  let purchaseType: PurchaseType = "replacement";
  let ptConf = 0.5;
  for (const [pt, patterns] of Object.entries(PURCHASE_TYPE_PATTERNS)) {
    const matches = patterns.filter((p) => desc.includes(p.toLowerCase()));
    if (matches.length > 0) {
      purchaseType = pt as PurchaseType;
      ptConf = Math.min(0.5 + matches.length * 0.2, 1.0);
      break;
    }
  }

  // Detect pain points
  const painPoints: PainPoint[] = [];
  for (const [pp, patterns] of Object.entries(PAIN_POINT_PATTERNS)) {
    if (patterns.some((p) => desc.includes(p.toLowerCase()))) {
      painPoints.push(pp as PainPoint);
    }
  }

  // Detect decision factors
  const decisionFactors: DecisionFactor[] = [];
  for (const [df, patterns] of Object.entries(DECISION_FACTOR_PATTERNS)) {
    if (patterns.some((p) => desc.includes(p.toLowerCase()))) {
      decisionFactors.push(df as DecisionFactor);
    }
  }
  if (decisionFactors.length === 0) {
    decisionFactors.push("price", "quality");
  }

  // Detect industry intent
  const industryMap: Record<string, IndustryIntent> = {
    mining: "mining", mine: "mining",矿山: "mining",采矿: "mining",
    oil: "oil_gas", gas: "oil_gas", petroleum: "oil_gas",石油: "oil_gas",天然气: "oil_gas",
    food: "food_beverage", beverage: "food_beverage",食品: "food_beverage",饮料: "food_beverage",
    pharma: "pharmaceutical", pharmaceutical: "pharmaceutical",制药: "pharmaceutical",医药: "pharmaceutical",
    chemical: "chemical",化工: "chemical",
    construction: "construction",建筑: "construction",工程: "construction",
    power: "power_generation", energy: "power_generation",发电: "power_generation",电力: "power_generation",
    automotive: "automotive", car: "automotive",汽车: "automotive",
    marine: "marine", ship: "marine", offshore: "marine",船舶: "marine",海洋: "marine",
    textile: "textile",纺织: "textile",
    cement: "cement", concrete: "cement",水泥: "cement",
    steel: "steel", metal: "steel",钢铁: "steel",
    electronics: "electronics", semiconductor: "electronics",电子: "electronics",
    water: "water_treatment", wastewater: "water_treatment",水处理: "water_treatment",污水: "water_treatment",
  };

  let industryIntent: IndustryIntent = "general_industrial";
  let indConf = 0.3;
  for (const [kw, intent] of Object.entries(industryMap)) {
    if (desc.includes(kw.toLowerCase())) {
      industryIntent = intent;
      indConf = 0.7;
      break;
    }
  }

  // Urgency
  let urgency: "low" | "medium" | "high" = "medium";
  if (desc.includes("urgent") || desc.includes("asap") || desc.includes("emergency") ||
      desc.includes("紧急") || desc.includes("急需")) {
    urgency = "high";
  } else if (desc.includes("planning") || desc.includes("future") || desc.includes("计划")) {
    urgency = "low";
  }

  // Budget tier
  let budget: "small" | "medium" | "large" = "medium";
  if (desc.includes("sample") || desc.includes("trial") || desc.includes("样品") || desc.includes("试用")) {
    budget = "small";
  } else if (desc.includes("bulk") || desc.includes("container") || desc.includes("large order") ||
             desc.includes("大批") || desc.includes("大量")) {
    budget = "large";
  }

  // Generate strategies
  const partialIntent = {
    purchase_type: purchaseType,
    pain_points: painPoints,
    decision_factors: decisionFactors,
    estimated_budget_tier: budget,
  };
  const strategies = STRATEGY_RULES
    .filter((rule) => rule.conditions(partialIntent))
    .map((rule) => rule.strategy)
    .slice(0, 3);

  // Risk analysis
  const risks: SourcingRisk[] = [];
  if (painPoints.includes("single_source")) {
    risks.push({
      type: "brand_dependency",
      level: "high",
      description: "Currently dependent on single supplier",
      mitigation: "Qualify 2-3 alternative manufacturers with overlapping capability",
    });
  }
  if (decisionFactors.includes("certification")) {
    risks.push({
      type: "certification_risk",
      level: "medium",
      description: "Certification requirements may limit supplier pool",
      mitigation: "Pre-screen suppliers for ISO/CE/ASME certifications",
    });
  }
  if (purchaseType === "urgent_supply") {
    risks.push({
      type: "delivery_risk",
      level: "high",
      description: "Urgent timeline may compromise quality checks",
      mitigation: "Use pre-vetted suppliers with express logistics capability",
    });
  }
  if (purchaseType === "new_purchase" || purchaseType === "oem_request") {
    risks.push({
      type: "moq_risk",
      level: "medium",
      description: "Minimum order quantity may be higher than expected",
      mitigation: "Negotiate trial order terms or sample production first",
    });
  }
  if (painPoints.includes("quality_problem")) {
    risks.push({
      type: "quality_risk",
      level: "high",
      description: "Previous quality issues — need stricter QC",
      mitigation: "Request material certificates, pre-shipment inspection reports",
    });
  }

  return {
    purchase_type: purchaseType,
    purchase_type_confidence: ptConf,
    industry_intent: industryIntent,
    industry_confidence: indConf,
    pain_points: painPoints,
    decision_factors: decisionFactors,
    recommended_strategies: strategies,
    risks,
    urgency_level: urgency,
    estimated_budget_tier: budget,
  };
}
