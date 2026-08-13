/**
 * HISVIA UI Vision Agent — Phase 28
 *
 * Integrates:
 * - Page screenshots (from scripts/ui-screenshot.ts)
 * - Design system tokens
 * - Image registry v3.0
 * - Qwen Vision model (or local rules fallback)
 *
 * Role: Industrial Brand Visual Director for HISVIA
 * Reference: Siemens, ABB, Schneider Electric, Bosch Rexroth
 */

import * as fs from "fs";
import * as path from "path";

// ============================================================
// Types
// ============================================================

export interface VisionAgentInput {
  page_name: string;
  page_url: string;
  screenshot_paths: {
    desktop?: string;
    tablet?: string;
    mobile?: string;
  };
  design_system_path?: string;
  image_registry_path?: string;
  max_hero_candidates?: number;
}

export interface VisionAgentIssue {
  area: string;
  severity: "critical" | "high" | "medium" | "low";
  problem: string;
  reason: string;
  solution: string;
}

export interface VisionAgentResult {
  overall_score: number;
  brand_score: number;
  industrial_score: number;
  conversion_score: number;
  approved: boolean;
  issues: VisionAgentIssue[];
  hero_assessment: HeroAssessment;
  reviewed_by: "qwen-vision" | "local-rules-engine";
  reviewed_at: string;
}

export interface HeroAssessment {
  current_image_id: string | null;
  current_image_url: string | null;
  current_layout: string;
  visual_ratio: { image: number; text: number; whitespace: number };
  issues: string[];
  candidates: HeroCandidate[];
  recommendation: string;
}

export interface HeroCandidate {
  asset_id: string;
  filename: string;
  hero_suitability: number;
  visual_quality: number;
  reason: string;
}

// ============================================================
// Industrial brand audit — local rules engine
// ============================================================

const INDUSTRIAL_REFERENCE_BRANDS = [
  "Siemens",
  "ABB",
  "Schneider Electric",
  "Bosch Rexroth",
];

const SYSTEM_PROMPT = `You are the Industrial Brand Creative Director for HISVIA.

HISVIA is a China industrial supply chain platform serving Russian, Central Asian, and European industrial buyers.

Your role: audit web page screenshots for visual quality and industrial B2B brand compliance.

Reference brands: Siemens, ABB, Schneider Electric, Bosch Rexroth.

Do NOT evaluate code. Only evaluate what the user sees.

Audit these dimensions:

1. Brand Identity — Does this look like an international industrial supply chain company?
   - NOT: SaaS template, AI landing page, generic e-commerce

2. Hero Section — Visual ratio should be 50-60% image, 30-40% text, 10-20% whitespace
   - Forbidden: pure CSS gradient as only visual, title+button only, large empty space

3. Industrial Trust — Does it convey: China manufacturing, factory capability, industrial professionalism, supply chain credibility?

4. Visual Density — Is the page too empty? Module rhythm? Information quantity?

5. Image Usage — Are images in correct areas? Do they support the business narrative? Do they reduce brand value?

Output ONLY valid JSON:
{
  "overall_score": 0-100,
  "brand_score": 0-100,
  "industrial_score": 0-100,
  "conversion_score": 0-100,
  "approved": true/false,
  "issues": [
    {
      "area": "hero|layout|images|density|brand",
      "severity": "critical|high|medium|low",
      "problem": "what is wrong",
      "reason": "why it matters for industrial B2B",
      "solution": "how to fix"
    }
  ],
  "hero_assessment": {
    "current_image_id": null,
    "current_layout": "split|gradient|full-bleed|empty",
    "visual_ratio": { "image": 0, "text": 0, "whitespace": 0 },
    "issues": ["issue 1", "issue 2"],
    "recommendation": "what to do"
  }
}`;

// ============================================================
// Local rules engine (runs without Qwen API key)
// ============================================================

async function runLocalAudit(input: VisionAgentInput): Promise<VisionAgentResult> {
  console.log("[ui-vision-agent] Running local rules audit (no Qwen API key)");

  const issues: VisionAgentIssue[] = [];
  let brandScore = 75;
  let industrialScore = 70;
  let conversionScore = 70;

  // Load image registry
  let registry: any = { assets: [] };
  try {
    const registryPath = input.image_registry_path || path.resolve(process.cwd(), "assets", "image-registry.json");
    if (fs.existsSync(registryPath)) {
      registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
    }
  } catch (e) {
    console.warn("[ui-vision-agent] Could not load image registry");
  }

  // Find best hero candidates from registry
  const assets = registry.assets || [];
  const sortedByHero = [...assets]
    .filter((a: any) => a.hero_suitability > 0)
    .sort((a: any, b: any) => b.hero_suitability - a.hero_suitability);

  const heroCandidates: HeroCandidate[] = sortedByHero.slice(0, 10).map((a: any) => ({
    asset_id: a.id,
    filename: a.filename,
    hero_suitability: a.hero_suitability,
    visual_quality: a.visual_quality,
    reason: a.reason || "",
  }));

  // Determine current hero image
  let currentHeroId: string | null = null;
  let currentHeroUrl: string | null = null;

  // Try to load homepage config
  try {
    const hpPath = path.resolve(process.cwd(), "data", "content-v2", "homepage-v2.json");
    if (fs.existsSync(hpPath)) {
      const hp = JSON.parse(fs.readFileSync(hpPath, "utf-8"));
      const heroAssets = hp.sections?.hero?.assets || [];
      const mainAsset = heroAssets.find((a: any) => a.role === "hero_main") || heroAssets[0];
      if (mainAsset) {
        currentHeroId = mainAsset.asset_id || mainAsset.id || null;
        currentHeroUrl = mainAsset.image_url || mainAsset.path || null;
      }
    }
  } catch (e) {
    // ok
  }

  // --- Rule: Hero image quality ---
  const currentHeroAsset = assets.find((a: any) => a.id === currentHeroId);

  if (!currentHeroId || !currentHeroAsset) {
    issues.push({
      area: "hero",
      severity: "critical",
      problem: "No hero image configured — hero may be empty gradient",
      reason: "Industrial buyers judge credibility by visual proof of manufacturing capability",
      solution: "Set hero_main asset to highest hero_suitability factory/equipment image from registry",
    });
    brandScore -= 20;
    industrialScore -= 25;
  } else if (currentHeroAsset.hero_suitability < 60) {
    issues.push({
      area: "hero",
      severity: "high",
      problem: `Hero image "${currentHeroAsset.filename}" has hero_suitability=${currentHeroAsset.hero_suitability} (needs ≥60)`,
      reason: "Low suitability images (parts, components) fail to establish industrial brand identity",
      solution: `Replace with top hero candidate: ${heroCandidates[0]?.filename || "factory/equipment scene"}`,
    });
    brandScore -= 15;
    industrialScore -= 10;
  }

  if (currentHeroAsset?.is_transparent) {
    issues.push({
      area: "hero",
      severity: "critical",
      problem: `Hero uses transparent PNG "${currentHeroAsset.filename}" — looks like e-commerce product page`,
      reason: "Transparent cutout images in hero signal product catalog, not industrial partnership",
      solution: "Move transparent PNG to Product Showcase carousel. Hero needs factory/equipment scene.",
    });
    brandScore -= 15;
  }

  // --- Rule: Hero must have visual content ---
  const noHeroImages = !currentHeroId || !currentHeroUrl;
  if (noHeroImages) {
    issues.push({
      area: "hero",
      severity: "critical",
      problem: "Hero section lacks visual subject — pure text/gradient is unacceptable for industrial B2B",
      reason: "Siemens/ABB/Schneider all use large industrial imagery in hero areas",
      solution: "Implement split-45-55 layout with industrial scene on right side",
    });
    brandScore -= 15;
    conversionScore -= 20;
  }

  // --- Rule: Image category checks ---
  const transparentPartsInProminent = assets.filter(
    (a: any) => a.is_transparent && (a.recommended_section || []).includes("hero")
  );
  if (transparentPartsInProminent.length > 0) {
    issues.push({
      area: "images",
      severity: "medium",
      problem: `${transparentPartsInProminent.length} transparent PNG images classified for hero use — should be component/technical`,
      reason: "Parts close-ups don't build supply chain trust",
      solution: "Reclassify transparent PNGs to recommended_section: ['carousel', 'detail']",
    });
  }

  // --- Density check ---
  const topCandidates = heroCandidates.slice(0, 3);
  const hasWideCandidate = topCandidates.some((c) => {
    const asset = assets.find((a: any) => a.id === c.asset_id);
    return asset && asset.aspect_ratio >= 1.5;
  });

  if (!hasWideCandidate) {
    issues.push({
      area: "hero",
      severity: "medium",
      problem: "No wide (≥1.5:1) hero candidates available — images may not fill banner well",
      reason: "Hero banners work best with landscape industrial photography",
      solution: "Use contain-fit for narrower images, or source new wide industrial scene photos",
    });
  }

  // Build hero assessment
  const heroAssessment: HeroAssessment = {
    current_image_id: currentHeroId,
    current_image_url: currentHeroUrl,
    current_layout: currentHeroId ? "split" : "gradient",
    visual_ratio: currentHeroId ? { image: 55, text: 35, whitespace: 10 } : { image: 0, text: 60, whitespace: 40 },
    issues: issues.filter((i) => i.area === "hero").map((i) => i.problem),
    candidates: heroCandidates.slice(0, 5),
    recommendation: heroCandidates.length > 0
      ? `Use ${heroCandidates[0].filename} (hero_suitability=${heroCandidates[0].hero_suitability}) as hero_main`
      : "Source new industrial scene photography for hero",
  };

  const overallScore = Math.round((brandScore + industrialScore + conversionScore) / 3);

  return {
    overall_score: Math.max(0, overallScore),
    brand_score: Math.max(0, brandScore),
    industrial_score: Math.max(0, industrialScore),
    conversion_score: Math.max(0, conversionScore),
    approved: issues.filter((i) => i.severity === "critical").length === 0,
    issues,
    hero_assessment: heroAssessment,
    reviewed_by: "local-rules-engine",
    reviewed_at: new Date().toISOString(),
  };
}

// ============================================================
// Qwen Vision API audit
// ============================================================

async function runQwenAudit(input: VisionAgentInput): Promise<VisionAgentResult> {
  const apiKey = process.env.QWEN_API_KEY || process.env.DASHSCOPE_API_KEY;

  if (!apiKey) {
    return runLocalAudit(input);
  }

  try {
    const messages: any[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    const userContent: any[] = [];

    // Attach desktop screenshot if available
    if (input.screenshot_paths.desktop && fs.existsSync(input.screenshot_paths.desktop)) {
      const screenshotBuffer = fs.readFileSync(input.screenshot_paths.desktop);
      const base64 = screenshotBuffer.toString("base64");
      userContent.push({
        type: "image_url",
        image_url: { url: `data:image/png;base64,${base64}` },
      });
    }

    // Build context text
    const contextLines = [
      `Page: ${input.page_name}`,
      `URL: ${input.page_url}`,
      `Screenshots available: ${Object.entries(input.screenshot_paths).filter(([, v]) => v).map(([k]) => k).join(", ")}`,
      "",
      "Audit this page as if you are the Industrial Brand Creative Director.",
      "Reference: Siemens, ABB, Schneider Electric, Bosch Rexroth.",
      "Judge whether a Russian/Central Asian/European industrial buyer would trust this company.",
    ];

    userContent.push({ type: "text", text: contextLines.join("\n") });
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
          max_tokens: 3000,
          temperature: 0.1,
        }),
      }
    );

    if (!response.ok) {
      console.error(`[ui-vision-agent] Qwen API error: ${response.status}`);
      return runLocalAudit(input);
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
        reviewed_at: new Date().toISOString(),
      };
    }

    return runLocalAudit(input);
  } catch (error) {
    console.error("[ui-vision-agent] Error:", error);
    return runLocalAudit(input);
  }
}

// ============================================================
// Public API
// ============================================================

export async function auditPage(input: VisionAgentInput): Promise<VisionAgentResult> {
  console.log(`[ui-vision-agent] Auditing: ${input.page_name}`);

  const apiKey = process.env.QWEN_API_KEY || process.env.DASHSCOPE_API_KEY;
  const hasScreenshot = !!input.screenshot_paths.desktop;

  if (apiKey && hasScreenshot) {
    console.log("[ui-vision-agent] Using Qwen Vision for audit");
    return runQwenAudit(input);
  }

  console.log("[ui-vision-agent] Using local rules engine");
  return runLocalAudit(input);
}

export async function auditAllPages(
  screenshotDir: string = path.resolve(process.cwd(), "reports", "screenshots"),
  baseUrl: string = "http://localhost:3001"
): Promise<Record<string, VisionAgentResult>> {
  const results: Record<string, VisionAgentResult> = {};

  const pages = [
    { name: "homepage", slug: "/v2/en" },
    { name: "solutions", slug: "/v2/en/solutions" },
    { name: "products", slug: "/v2/en/products" },
    { name: "factory", slug: "/v2/en/factory" },
  ];

  for (const pg of pages) {
    results[pg.name] = await auditPage({
      page_name: pg.name,
      page_url: `${baseUrl}${pg.slug}`,
      screenshot_paths: {
        desktop: path.join(screenshotDir, `${pg.name}_desktop.png`),
        tablet: path.join(screenshotDir, `${pg.name}_tablet.png`),
        mobile: path.join(screenshotDir, `${pg.name}_mobile.png`),
      },
    });
  }

  return results;
}

export function generateAuditReport(
  results: Record<string, VisionAgentResult>,
  outputPath: string
): string {
  const lines: string[] = [
    "# HISVIA UI Visual Audit Report",
    `> Generated: ${new Date().toISOString()}`,
    `> Reviewer: ${Object.values(results)[0]?.reviewed_by || "unknown"}`,
    "",
    "---",
    "",
    "## Overall Summary",
    "",
  ];

  for (const [page, result] of Object.entries(results)) {
    const status = result.approved ? "✅" : "❌";
    const criticalCount = result.issues.filter((i) => i.severity === "critical").length;
    const highCount = result.issues.filter((i) => i.severity === "high").length;

    lines.push(`| ${page} | ${status} | ${result.overall_score}/100 | Brand: ${result.brand_score} | Industrial: ${result.industrial_score} | Conversion: ${result.conversion_score} | ${criticalCount}C ${highCount}H |`);
  }

  lines.push("");
  lines.push("---");
  lines.push("");

  for (const [page, result] of Object.entries(results)) {
    lines.push(`## ${page}`);
    lines.push("");
    lines.push(`- **Overall**: ${result.overall_score}/100`);
    lines.push(`- **Brand**: ${result.brand_score}/100`);
    lines.push(`- **Industrial**: ${result.industrial_score}/100`);
    lines.push(`- **Conversion**: ${result.conversion_score}/100`);
    lines.push(`- **Approved**: ${result.approved}`);
    lines.push("");

    if (result.issues.length > 0) {
      lines.push("### Issues");
      lines.push("");
      for (const issue of result.issues) {
        lines.push(`- **[${issue.severity}] ${issue.area}**: ${issue.problem}`);
        lines.push(`  - Reason: ${issue.reason}`);
        lines.push(`  - Fix: ${issue.solution}`);
        lines.push("");
      }
    }

    if (result.hero_assessment) {
      lines.push("### Hero Assessment");
      lines.push("");
      lines.push(`- Current layout: \`${result.hero_assessment.current_layout}\``);
      lines.push(`- Current image: \`${result.hero_assessment.current_image_id || "none"}\``);
      lines.push(`- Visual ratio: ${result.hero_assessment.visual_ratio.image}% image / ${result.hero_assessment.visual_ratio.text}% text / ${result.hero_assessment.visual_ratio.whitespace}% whitespace`);
      lines.push(`- Recommendation: ${result.hero_assessment.recommendation}`);
      lines.push("");

      if (result.hero_assessment.candidates.length > 0) {
        lines.push("**Top Hero Candidates:**");
        lines.push("");
        for (const c of result.hero_assessment.candidates.slice(0, 5)) {
          lines.push(`- \`${c.filename}\` — hero=${c.hero_suitability}, quality=${c.visual_quality}: ${c.reason}`);
        }
        lines.push("");
      }
    }

    lines.push("---");
    lines.push("");
  }

  const report = lines.join("\n");
  fs.writeFileSync(outputPath, report);
  console.log(`[ui-vision-agent] Report saved: ${outputPath}`);

  return report;
}
