/**
 * HISVIA Image Placement Engine
 * 
 * Replaces free-form <Image/> placement with slot-based resolution.
 * Every image on every page must be resolved through this engine.
 * 
 * Usage:
 *   const result = getBestImageForSlot({
 *     page: "homepage",
 *     slot: "hero",
 *     purpose: "trust_supply_chain"
 *   });
 *   // → { image: "factory-factory-interior-035.jpeg", score: 70, ... }
 *   // or → { status: "MISSING_ASSET", message: "Need: factory production line image" }
 */

import imageAnalysisData from "@/assets/image-analysis.json";

// ============================================================
// Types
// ============================================================

export interface SlotRequest {
  page: string;
  slot: string;
  purpose?: string;
  preferred_visual_types?: string[];
  exclude_ids?: string[];
  count?: number;
}

export interface SlotResult {
  status: "FOUND" | "MISSING_ASSET" | "FALLBACK";
  image?: ImageSlotEntry;
  candidates?: ImageSlotEntry[];
  message?: string;
  reason?: string;
}

export interface ImageSlotEntry {
  image_id: string;
  filename: string;
  path: string;
  visual_type: string;
  visual_role: string;
  quality_score: number;
  resolution: string;
  industrial_message: string;
  buyer_perception: string;
  recommended_slots: string[];
  forbidden_slots: string[];
  reason: string;
}

// ============================================================
// Slot rules registry
// ============================================================

interface SlotRule {
  page: string;
  slot: string;
  allowed_visual_types: string[];
  forbidden_visual_types: string[];
  allowed_visual_roles: string[];
  min_quality: number;
  min_width: number;
  source_directory?: string;
}

const SLOT_RULES: SlotRule[] = [
  {
    page: "homepage",
    slot: "hero",
    allowed_visual_types: ["production_line", "factory_scene"],
    forbidden_visual_types: ["equipment_machine", "component_part", "brand_logo"],
    allowed_visual_roles: ["hero_candidate"],
    min_quality: 70,
    min_width: 1600,
    source_directory: "_factory/",
  },
  {
    page: "homepage",
    slot: "solution_cards",
    allowed_visual_types: ["equipment_machine"],
    forbidden_visual_types: ["component_part", "brand_logo"],
    allowed_visual_roles: ["solution_application"],
    min_quality: 50,
    min_width: 800,
    source_directory: "_final/",
  },
  {
    page: "homepage",
    slot: "factory_gallery",
    allowed_visual_types: ["factory_scene", "production_line", "worker_operation", "laboratory", "warehouse"],
    forbidden_visual_types: ["equipment_machine", "component_part", "brand_logo"],
    allowed_visual_roles: ["factory_proof", "trust_evidence"],
    min_quality: 0,
    min_width: 800,
    source_directory: "_factory/",
  },
  {
    page: "homepage",
    slot: "manufacturing_capability",
    allowed_visual_types: ["production_line", "worker_operation", "laboratory"],
    forbidden_visual_types: ["component_part", "brand_logo"],
    allowed_visual_roles: ["factory_proof", "trust_evidence"],
    min_quality: 0,
    min_width: 600,
  },
  {
    page: "homepage",
    slot: "oem_partner",
    allowed_visual_types: ["equipment_machine", "brand_logo"],
    forbidden_visual_types: ["component_part"],
    allowed_visual_roles: ["brand_partner", "solution_application"],
    min_quality: 40,
    min_width: 600,
    source_directory: "_final/",
  },
];

// ============================================================
// Image data cache
// ============================================================

let imageCache: ImageSlotEntry[] | null = null;

function loadImages(): ImageSlotEntry[] {
  if (imageCache) return imageCache!;
  
  const data = imageAnalysisData as any;
  const images = data.images || [];
  
  imageCache = images.map((img: any) => {
    const fn = img.filename || "";
    const realSource = img.real_source || "";
    const path = realSource 
      ? `/photos/raw/${realSource}${fn}`
      : `/photos/raw/${fn}`;
    
    return {
      image_id: img.image_id || fn,
      filename: fn,
      path,
      visual_type: img.visual_type || "unknown",
      visual_role: img.visual_role || "technical_detail",
      quality_score: img.quality_score || 0,
      resolution: img.resolution || "?",
      industrial_message: img.industrial_message || "",
      buyer_perception: img.buyer_perception || "unknown",
      recommended_slots: img.recommended_slots || [],
      forbidden_slots: img.forbidden_slots || [],
      reason: img.reason || "",
    };
  });
  
  return imageCache!;
}

// ============================================================
// Main engine
// ============================================================

export function getBestImageForSlot(request: SlotRequest): SlotResult {
  const images = loadImages();
  const rule = SLOT_RULES.find(r => r.page === request.page && r.slot === request.slot);
  
  if (!rule) {
    return {
      status: "MISSING_ASSET",
      message: `No slot rule defined for page="${request.page}" slot="${request.slot}"`,
    };
  }

  // Filter by slot rules
  let candidates = images.filter(img => {
    // Exclude specified IDs
    if (request.exclude_ids?.includes(img.image_id)) return false;
    
    // Check forbidden slots
    if (img.forbidden_slots.includes(request.slot)) return false;
    
    // Check visual type
    const typeOk = rule.allowed_visual_types.length === 0 
      || rule.allowed_visual_types.includes(img.visual_type);
    if (!typeOk) return false;
    
    // Check forbidden types
    const typeForbidden = rule.forbidden_visual_types.includes(img.visual_type);
    if (typeForbidden) return false;
    
    // Check visual role
    const roleOk = rule.allowed_visual_roles.length === 0
      || rule.allowed_visual_roles.includes(img.visual_role);
    if (!roleOk) return false;
    
    // Quality threshold
    if (img.quality_score < rule.min_quality) return false;
    
    // Resolution threshold
    const width = parseInt(img.resolution.split("x")[0]) || 0;
    if (width < rule.min_width) return false;
    
    // Source directory preference
    if (rule.source_directory && img.path.includes(rule.source_directory)) {
      // Boost images from preferred directory
    }
    
    return true;
  });

  // Score and sort
  candidates.sort((a, b) => {
    // Prefer higher quality
    if (b.quality_score !== a.quality_score) return b.quality_score - a.quality_score;
    // Prefer images from source directory
    if (rule.source_directory) {
      const aInSource = a.path.includes(rule.source_directory) ? 1 : 0;
      const bInSource = b.path.includes(rule.source_directory) ? 1 : 0;
      if (aInSource !== bInSource) return bInSource - aInSource;
    }
    // Prefer hero_candidate role
    if (a.visual_role === "hero_candidate" && b.visual_role !== "hero_candidate") return -1;
    if (b.visual_role === "hero_candidate" && a.visual_role !== "hero_candidate") return 1;
    return 0;
  });

  if (candidates.length === 0) {
    return {
      status: "MISSING_ASSET",
      message: `No image found for page="${request.page}" slot="${request.slot}". Need: ${rule.allowed_visual_types.join(" or ")} image, quality ≥${rule.min_quality}, width ≥${rule.min_width}px`,
    };
  }

  const count = request.count || 1;
  const selected = candidates.slice(0, count);

  return {
    status: "FOUND",
    image: selected[0],
    candidates: selected,
    reason: `Selected ${selected[0].filename}: ${selected[0].industrial_message} (score=${selected[0].quality_score}, role=${selected[0].visual_role})`,
  };
}

/**
 * Get multiple images for a slot (e.g., 8 solution cards, 10 factory gallery)
 */
export function getImagesForSlot(request: SlotRequest & { count: number }): SlotResult {
  return getBestImageForSlot(request);
}

/**
 * Validate that all images on a page comply with slot rules
 */
export function validatePageImages(
  page: string,
  assignments: Array<{ slot: string; image_id: string }>
): Array<{ slot: string; image_id: string; valid: boolean; reason: string }> {
  const images = loadImages();
  const results: Array<{ slot: string; image_id: string; valid: boolean; reason: string }> = [];

  for (const assign of assignments) {
    const rule = SLOT_RULES.find(r => r.page === page && r.slot === assign.slot);
    const img = images.find(i => i.image_id === assign.image_id);

    if (!rule) {
      results.push({ ...assign, valid: false, reason: "No slot rule defined" });
      continue;
    }
    if (!img) {
      results.push({ ...assign, valid: false, reason: "Image not found in registry" });
      continue;
    }

    const typeOk = rule.allowed_visual_types.length === 0 || rule.allowed_visual_types.includes(img.visual_type);
    const typeForbidden = rule.forbidden_visual_types.includes(img.visual_type);
    const roleOk = rule.allowed_visual_roles.length === 0 || rule.allowed_visual_roles.includes(img.visual_role);
    const qualityOk = img.quality_score >= rule.min_quality;
    const forbiddenSlot = img.forbidden_slots.includes(assign.slot);

    if (forbiddenSlot) {
      results.push({ ...assign, valid: false, reason: `Image forbidden for slot "${assign.slot}"` });
    } else if (!typeOk || typeForbidden) {
      results.push({ ...assign, valid: false, reason: `Visual type "${img.visual_type}" not allowed for ${assign.slot}` });
    } else if (!roleOk) {
      results.push({ ...assign, valid: false, reason: `Visual role "${img.visual_role}" not allowed for ${assign.slot}` });
    } else if (!qualityOk) {
      results.push({ ...assign, valid: false, reason: `Quality ${img.quality_score} below minimum ${rule.min_quality}` });
    } else {
      results.push({ ...assign, valid: true, reason: "OK" });
    }
  }

  return results;
}
