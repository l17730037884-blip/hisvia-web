/**
 * HISVIA Qwen Vision Provider
 * 
 * - With QWEN_API_KEY: calls Qwen VL model for visual review
 * - Without key: falls back to local visual rules engine (never blocks)
 */

// ============================================================
// Types
// ============================================================

export interface QwenVisionInput {
  images: QwenImageInput[];
  screenshot?: string; // base64 or file path
  context: QwenContextInput;
}

export interface QwenImageInput {
  id: string;
  url: string;
  width: number;
  height: number;
  category: string;
  is_transparent: boolean;
  filename: string;
}

export interface QwenContextInput {
  page: string;
  section: string;
  brand_guidelines: string[];
  previous_issues: string[];
}

export interface QwenVisionOutput {
  score: number;
  approved: boolean;
  issues: QwenIssue[];
  recommendations: QwenRecommendation[];
  hero_selection: QwenHeroSelection | null;
  reviewed_by: "qwen-vision" | "local-rules-engine";
  status: "completed" | "pending_review";
}

export interface QwenIssue {
  element: string;
  problem: string;
  severity: "critical" | "high" | "medium" | "low";
  fix: string;
}

export interface QwenRecommendation {
  area: string;
  suggestion: string;
  priority: number;
}

export interface QwenHeroSelection {
  selected_image_id: string | null;
  reason: string;
  fallback: "image" | "gradient" | "composite";
  layout: "split-45-55" | "full-bleed" | "gradient-only";
  candidates: string[];
}

// ============================================================
// System prompt (fixed contract)
// ============================================================

const QWEN_SYSTEM_PROMPT = `You are the Industrial Brand Creative Director for HISVIA.

HISVIA is a China industrial supply chain platform for Russian, Central Asian, and European buyers.

Your job: review web page screenshots and images for visual quality.

Reference brands: Siemens, ABB, Schneider Electric, Bosch Rexroth.

Output ONLY valid JSON:
{
  "score": 0-100,
  "approved": true/false,
  "issues": [
    { "element": "section name", "problem": "what's wrong", "severity": "critical|high|medium|low", "fix": "how to fix" }
  ],
  "recommendations": [
    { "area": "hero|layout|images|density", "suggestion": "what to do", "priority": 1-5 }
  ],
  "hero_selection": {
    "selected_image_id": "best candidate id or null",
    "reason": "why this image",
    "fallback": "image|gradient|composite",
    "layout": "split-45-55|full-bleed|gradient-only",
    "candidates": ["id1", "id2", "id3"]
  }
}`;

// ============================================================
// Local visual rules engine (runs when no API key)
// ============================================================

export function localVisualRulesEngine(input: QwenVisionInput): QwenVisionOutput {
  const issues: QwenIssue[] = [];
  const recommendations: QwenRecommendation[] = [];
  let score = 100;

  // Rule: Hero must have visual content
  const heroImages = input.images.filter((i) => i.category === "hero_candidate");
  if (heroImages.length === 0) {
    issues.push({
      element: "Hero",
      problem: "No hero_candidate images available — hero will be empty gradient",
      severity: "high",
      fix: "Use factory_candidate or equipment_candidate as hero fallback. Do not leave hero as gradient-only.",
    });
    score -= 20;
  }

  // Rule: Transparent small parts cannot be hero
  const transparentParts = input.images.filter((i) => i.is_transparent && i.width < 1200);
  if (transparentParts.some((i) => i.category === "hero_candidate")) {
    issues.push({
      element: "Hero candidates",
      problem: `${transparentParts.length} transparent small-part images classified as hero_candidate — these should be component_candidate`,
      severity: "critical",
      fix: "Reclassify transparent PNGs < 1200px as component_candidate. Hero requires industrial scenes or large equipment.",
    });
    score -= 25;
  }

  // Rule: Visual density check
  const totalImages = input.images.length;
  if (totalImages === 0 && input.context.section === "hero") {
    issues.push({
      element: "Hero layout",
      problem: "Hero has 0 images — visual density is 0%. Looks like SaaS template.",
      severity: "critical",
      fix: "Hero must use split-45-55 layout with an industrial image on the right side.",
    });
    score -= 30;
  }

  // Generate hero selection
  const candidates = input.images
    .filter((i) => !i.is_transparent || i.width >= 1200)
    .sort((a, b) => {
      // Prefer: non-transparent > transparent, wide > square, higher res > lower
      const aScore = (a.is_transparent ? 0 : 50) + (a.width / a.height >= 1.5 ? 30 : 0) + (a.width / 2000) * 20;
      const bScore = (b.is_transparent ? 0 : 50) + (b.width / b.height >= 1.5 ? 30 : 0) + (b.width / 2000) * 20;
      return bScore - aScore;
    });

  const heroSelection: QwenHeroSelection = {
    selected_image_id: candidates.length > 0 ? candidates[0].id : null,
    reason: candidates.length > 0
      ? `Selected ${candidates[0].filename} (${candidates[0].width}x${candidates[0].height}) — best industrial scene candidate`
      : "No qualifying hero image found. Use composite layout with best equipment image.",
    fallback: candidates.length > 0 ? "image" : "composite",
    layout: "split-45-55",
    candidates: candidates.slice(0, 5).map((c) => c.id),
  };

  // Density recommendation
  recommendations.push({
    area: "hero",
    suggestion: "Use 45% text / 55% visual split layout. Never gradient-only hero.",
    priority: 1,
  });

  if (!input.images.some((i) => i.width / i.height >= 1.5)) {
    recommendations.push({
      area: "hero",
      suggestion: "No wide images available. Consider using a high-quality equipment photo with contain fit instead of cover.",
      priority: 2,
    });
  }

  return {
    score: Math.max(0, score),
    approved: issues.filter((i) => i.severity === "critical").length === 0,
    issues,
    recommendations,
    hero_selection: heroSelection,
    reviewed_by: "local-rules-engine",
    status: issues.filter((i) => i.severity === "critical").length > 0 ? "pending_review" : "completed",
  };
}

// ============================================================
// Qwen API call
// ============================================================

export async function reviewWithQwen(input: QwenVisionInput): Promise<QwenVisionOutput> {
  const apiKey = process.env.QWEN_API_KEY || process.env.DASHSCOPE_API_KEY;

  if (!apiKey) {
    console.log("[qwen-provider] No API key — using local rules engine");
    return localVisualRulesEngine(input);
  }

  try {
    const messages: any[] = [
      { role: "system", content: QWEN_SYSTEM_PROMPT },
    ];

    const userContent: any[] = [];

    // Add screenshot if available
    if (input.screenshot) {
      userContent.push({
        type: "image_url",
        image_url: { url: input.screenshot },
      });
    }

    // Build context text
    const contextText = `Page: ${input.context.page}
Section: ${input.context.section}
Brand guidelines: ${input.context.brand_guidelines.join(", ")}
Previous issues: ${input.context.previous_issues.join("; ") || "none"}

Image candidates:
${input.images.map((i) => `- ${i.id}: ${i.filename} (${i.width}x${i.height}, transparent=${i.is_transparent}, category=${i.category})`).join("\n")}

Select the best hero image and provide a complete review.`;

    userContent.push({ type: "text", text: contextText });
    messages.push({ role: "user", content: userContent });

    const response = await fetch(
      "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen-vl-max",
          messages,
          max_tokens: 2000,
          temperature: 0.1,
        }),
      }
    );

    if (!response.ok) {
      console.error(`[qwen-provider] API error ${response.status}`);
      return localVisualRulesEngine(input);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        ...parsed,
        reviewed_by: "qwen-vision",
        status: "completed",
      };
    }

    return localVisualRulesEngine(input);
  } catch (error) {
    console.error("[qwen-provider] Error:", error);
    return localVisualRulesEngine(input);
  }
}
