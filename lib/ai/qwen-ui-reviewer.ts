/**
 * HISVIA Qwen Vision UI Reviewer — Phase 28
 *
 * Calls Qwen Vision model to review page screenshots for industrial B2B brand compliance.
 * Codex (Architect) sends screenshots. Qwen returns structured JSON audit.
 *
 * IMPORTANT: This module defines the interface and auto-reject rules.
 * Actual Qwen API calls require a valid DASHSCOPE_API_KEY in .env.local.
 * Without the key, the system falls back to auto-reject rules (text-only).
 */

// ============================================================
// Types
// ============================================================

export interface UIReviewInput {
  page_name: string;
  page_url: string;
  screenshot_path?: string;
  sections: PageSection[];
  images_used: ImageUsage[];
}

export interface PageSection {
  name: string;
  type: "hero" | "trust" | "solutions" | "products" | "factory" | "cta" | "other";
  image_count: number;
  image_ids: string[];
}

export interface ImageUsage {
  asset_id: string;
  image_url: string;
  slot: string;
  asset_type: string;
  quality_score: number;
  width: number;
  height: number;
  is_transparent_png: boolean;
  is_part_component: boolean;
}

export interface QwenReviewIssue {
  element: string;
  problem: string;
  severity: "critical" | "high" | "medium" | "low";
  solution: string;
}

export interface QwenReviewResult {
  score: number;
  approved: boolean;
  issues: QwenReviewIssue[];
  reviewed_by: "qwen-vision" | "auto-rules";
  reviewed_at: string;
}

// ============================================================
// System Prompt (fixed — never modified by Codex)
// ============================================================

const SYSTEM_PROMPT = `你是HISVIA工业品牌视觉总监。

你的任务：审核网页视觉质量。

不要修改代码。不要设计新的页面。

只判断：
1. 是否符合工业B2B品牌定位
2. 图片是否放在正确区域
3. 是否降低客户信任
4. 页面是否像工业供应链企业官网

参考品牌：Siemens, ABB, Schneider Electric

输出JSON:
{
  "score": 0-100,
  "approved": true/false,
  "issues": [
    {
      "element": "区域名称",
      "problem": "具体问题",
      "severity": "critical/high/medium/low",
      "solution": "修复建议"
    }
  ]
}`;

// ============================================================
// Auto-reject rules (runs without Qwen, text-only validation)
// ============================================================

export function applyAutoRejectRules(input: UIReviewInput): QwenReviewResult {
  const issues: QwenReviewIssue[] = [];
  let score = 100;

  for (const img of input.images_used) {
    // R1: Hero + transparent PNG
    if (img.slot === "hero" && img.is_transparent_png) {
      issues.push({
        element: `Hero image ${img.asset_id}`,
        problem: `透明PNG (${img.image_url}) 用于Hero区域 — 这看起来像淘宝详情页，不是工业企业官网`,
        severity: "critical",
        solution: `替换为工业场景图（工厂/设备运行/工程现场）。将 ${img.asset_id} 移至 Technical Component Gallery。`,
      });
      score -= 25;
    }

    // R2: Hero + low quality
    if (img.slot === "hero" && img.quality_score < 90) {
      issues.push({
        element: `Hero image ${img.asset_id}`,
        problem: `Hero图片质量评分 ${img.quality_score}，低于90分最低要求`,
        severity: "critical",
        solution: "替换为评分 ≥90 的高质量工业场景图",
      });
      score -= 20;
    }

    // R3: Hero + part component
    if (img.slot === "hero" && img.is_part_component) {
      issues.push({
        element: `Hero image ${img.asset_id}`,
        problem: `零件/配件图 (${img.asset_type}) 用于Hero — 小零件不能代表工业供应链平台`,
        severity: "critical",
        solution: "零件图仅用于 Product Detail 的 Technical Gallery，Hero 必须使用工业场景图",
      });
      score -= 20;
    }

    // R4: Hero + wrong aspect ratio
    if (img.slot === "hero" && img.width > 0 && img.height > 0) {
      const ratio = img.width / img.height;
      if (ratio < 1.6) {
        issues.push({
          element: `Hero image ${img.asset_id}`,
          problem: `宽高比 ${ratio.toFixed(1)}:1 不适合Hero横幅 (需要 ≥1.6:1)`,
          severity: "high",
          solution: "使用横构图工业场景图片替换",
        });
        score -= 10;
      }
    }

    // R5: Product showcase + transparent PNG used as main
    if (img.slot === "product_showcase" && img.is_transparent_png && img.width < 800) {
      issues.push({
        element: `Product showcase ${img.asset_id}`,
        problem: `小尺寸透明PNG (${img.width}x${img.height}) 用于产品展示不够清晰`,
        severity: "medium",
        solution: "使用 ≥800px 的实物设备照片",
      });
      score -= 5;
    }
  }

  // R6: Multiple hero main images
  const heroMains = input.images_used.filter((i) => i.slot === "hero_main");
  if (heroMains.length > 1) {
    issues.push({
      element: "Hero section",
      problem: `Hero 区域有 ${heroMains.length} 张 hero_main 图片，应该只有 1 张`,
      severity: "medium",
      solution: "只保留 1 张 hero_main，其余改为 hero_backup 或移入轮播",
    });
    score -= 5;
  }

  return {
    score: Math.max(0, score),
    approved: issues.filter((i) => i.severity === "critical").length === 0,
    issues,
    reviewed_by: "auto-rules",
    reviewed_at: new Date().toISOString(),
  };
}

// ============================================================
// Qwen Vision API call (requires DASHSCOPE_API_KEY)
// ============================================================

export async function reviewWithQwenVision(input: UIReviewInput): Promise<QwenReviewResult> {
  const apiKey = process.env.DASHSCOPE_API_KEY;

  // If no API key, fall back to auto-rules only
  if (!apiKey) {
    console.warn("[qwen-reviewer] No DASHSCOPE_API_KEY — using auto-rules only");
    return applyAutoRejectRules(input);
  }

  // If no screenshot, use auto-rules
  if (!input.screenshot_path) {
    console.warn("[qwen-reviewer] No screenshot provided — using auto-rules only");
    return applyAutoRejectRules(input);
  }

  try {
    const fs = await import("fs");
    const screenshotBuffer = fs.readFileSync(input.screenshot_path);
    const screenshotBase64 = screenshotBuffer.toString("base64");

    const userPrompt = buildReviewPrompt(input);

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
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: { url: `data:image/png;base64,${screenshotBase64}` },
                },
                { type: "text", text: userPrompt },
              ],
            },
          ],
          max_tokens: 2000,
          temperature: 0.1,
        }),
      }
    );

    if (!response.ok) {
      console.error(`[qwen-reviewer] API error: ${response.status}`);
      return applyAutoRejectRules(input);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]) as QwenReviewResult;
      result.reviewed_by = "qwen-vision";
      result.reviewed_at = new Date().toISOString();
      return result;
    }

    return applyAutoRejectRules(input);
  } catch (error) {
    console.error("[qwen-reviewer] Error:", error);
    return applyAutoRejectRules(input);
  }
}

function buildReviewPrompt(input: UIReviewInput): string {
  const sections = input.sections
    .map((s) => `- ${s.name} (${s.type}): ${s.image_count} images`)
    .join("\n");

  const images = input.images_used
    .map(
      (i) =>
        `- ${i.asset_id}: slot=${i.slot}, type=${i.asset_type}, score=${i.quality_score}, size=${i.width}x${i.height}, transparent=${i.is_transparent_png}`
    )
    .join("\n");

  return `审核页面: ${input.page_name}
URL: ${input.page_url}

页面结构:
${sections}

使用图片:
${images}

请审核并返回JSON。`;
}

// ============================================================
// Convenience: review + auto-fix summary
// ============================================================

export function summarizeReview(result: QwenReviewResult): string {
  if (result.approved) {
    return `✅ 审核通过 (${result.score}/100) — reviewed by ${result.reviewed_by}`;
  }

  const criticals = result.issues.filter((i) => i.severity === "critical");
  const highs = result.issues.filter((i) => i.severity === "high");

  return [
    `❌ 未通过 (${result.score}/100) — ${result.issues.length} 个问题`,
    `  Critical: ${criticals.length}`,
    `  High: ${highs.length}`,
    "",
    ...result.issues.map((i) => `  [${i.severity}] ${i.element}: ${i.problem}`),
  ].join("\n");
}
