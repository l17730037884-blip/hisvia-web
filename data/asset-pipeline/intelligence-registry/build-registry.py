#!/usr/bin/env python3
"""
HISVIA Asset Pipeline V2 — Phase 5: Asset Intelligence Registry Builder

Merges all Phase 4 layers into a unified intelligence registry.
Input:  qwen-results.json + deepseek-results-v2.json + supply-intelligence/*
Output: intelligence-registry/ (single unified schema per asset)

Rules:
- asset_id is the only primary key
- No asset modification
- No API calls
- Factory/unknown assets get status=needs_review, not forced merge
"""

import json
from pathlib import Path
from collections import Counter

BASE = Path("/Users/liujunkai/Downloads/hisvia-web 2")
DATA = BASE / "data" / "asset-pipeline" / "cutout-library"
GS = DATA / "golden-set"
VISION_PATH = GS / "vision-test" / "qwen-results.json"
CLASS_PATH = GS / "classification-test-v2" / "deepseek-results-v2.json"
SUPPLY_DIR = GS / "classification-test-v2" / "supply-intelligence"
OUT_DIR = BASE / "data" / "asset-pipeline" / "intelligence-registry"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ============================================================
# LOAD ALL INPUTS
# ============================================================

with open(VISION_PATH, "r") as f:
    vision_data = json.load(f)
vision_results = {r["asset_id"]: r for r in vision_data.get("results", vision_data)}

with open(CLASS_PATH, "r") as f:
    class_data = json.load(f)
class_results = {r["asset_id"]: r for r in class_data["results"]}

with open(SUPPLY_DIR / "supply-results.json", "r") as f:
    supply_data = json.load(f)
supply_results = {r["asset_id"]: r for r in supply_data}

with open(SUPPLY_DIR / "partner-capability.json", "r") as f:
    cap_data = json.load(f)
cap_results = {r["asset_id"]: r for r in cap_data}

with open(SUPPLY_DIR / "seo-semantic-map.json", "r") as f:
    seo_data = json.load(f)
seo_results = {r["asset_id"]: r for r in seo_data}

# ============================================================
# VALIDATE UNIQUENESS
# ============================================================

all_ids = set(vision_results.keys()) | set(class_results.keys()) | set(supply_results.keys())
print(f"Vision assets:       {len(vision_results)}")
print(f"Classification:      {len(class_results)}")
print(f"Supply intelligence: {len(supply_results)}")
print(f"Union (all IDs):     {len(all_ids)}")

# Check for orphans
orphans_v = set(vision_results.keys()) - set(class_results.keys())
orphans_c = set(class_results.keys()) - set(vision_results.keys())
orphans_s = set(supply_results.keys()) - set(vision_results.keys())

if orphans_v:
    print(f"WARNING: {len(orphans_v)} vision results without classification: {orphans_v}")
if orphans_c:
    print(f"WARNING: {len(orphans_c)} classification results without vision: {orphans_c}")
if orphans_s:
    print(f"WARNING: {len(orphans_s)} supply results without vision: {orphans_s}")

# ============================================================
# MERGE INTO UNIFIED REGISTRY
# ============================================================

registry = []

for aid in sorted(all_ids):
    vr = vision_results.get(aid, {})
    cr = class_results.get(aid, {})
    sr = supply_results.get(aid, {})
    car = cap_results.get(aid, {})
    ser = seo_results.get(aid, {})

    qo = vr.get("qwen_output", {}) if vr else {}
    cp = cr.get("prediction", {})
    pp = sr.get("procurement_profile", {})

    st = cp.get("system_type")
    at = cp.get("asset_type", "unknown")

    # Determine status
    if at == "factory":
        review_status = "needs_review"
        confidence_level = "LOW"
    elif st is None:
        review_status = "needs_review"
        confidence_level = "LOW"
    elif cr.get("confidence", 0) >= 0.8:
        review_status = "ready"
        confidence_level = "HIGH"
    elif cr.get("confidence", 0) >= 0.6:
        review_status = "ready"
        confidence_level = "MEDIUM"
    else:
        review_status = "needs_review"
        confidence_level = "LOW"

    entry = {
        "asset_id": aid,
        "asset_source": {
            "original_path": vr.get("image_type", "unknown"),
            "cutout_path": None,
            "asset_relationship": "golden_set_test_asset",
        },
        "vision": {
            "visible_object": qo.get("visible_object", []),
            "visible_features": qo.get("visible_features", []),
            "industrial_clues": qo.get("industrial_clues", []),
            "visible_brand": qo.get("visible_brand", []),
            "image_condition": qo.get("image_condition", ""),
        },
        "industrial_classification": {
            "asset_type": at,
            "system_type": st,
            "category": cp.get("category"),
            "subcategory": cp.get("subcategory"),
            "brand": cp.get("brand"),
            "confidence": cr.get("confidence", 0),
            "reasoning": cr.get("reasoning", ""),
            "risk_level": cr.get("risk_level", "unknown"),
        },
        "supply_intelligence": {
            "buyer_need": pp.get("buyer_need", ""),
            "purchase_keywords": pp.get("purchase_keywords", []),
            "replacement_scenarios": pp.get("replacement_scenarios", []),
            "compatible_equipment": pp.get("compatible_equipment", []),
            "buyer_questions": pp.get("buyer_questions", []),
        },
        "supplier_capability": {
            "supplier_type": car.get("supplier_type"),
            "manufacturing_capability": car.get("manufacturing_capability", []),
            "industry_scope": car.get("industry_scope", []),
            "export_potential": car.get("export_potential", "N/A"),
        },
        "seo": {
            "seo_topic": ser.get("seo_topic", ""),
            "buyer_search_terms": ser.get("buyer_search_terms", []),
            "landing_pages": ser.get("industry_pages", []),
        },
        "status": {
            "review_status": review_status,
            "confidence_level": confidence_level,
        },
    }
    registry.append(entry)

# ============================================================
# SAVE REGISTRY SCHEMA
# ============================================================

schema = {
    "version": "1.0",
    "name": "HISVIA Asset Intelligence Registry Schema",
    "description": "Unified schema connecting asset → vision → classification → supply chain → SEO layers",
    "primary_key": "asset_id",
    "layers": {
        "asset_source": "Original file path and relationship metadata",
        "vision": "Qwen-VL visual analysis output (visible_object, features, clues, brand)",
        "industrial_classification": "DeepSeek/V2 rule-based industrial taxonomy mapping",
        "supply_intelligence": "Buyer procurement language, keywords, replacement scenarios",
        "supplier_capability": "Manufacturing capability tags, supplier type, export potential",
        "seo": "SEO topics, buyer search terms, landing page mappings",
        "status": "Review status and confidence level",
    },
    "confidence_levels": {
        "HIGH": "classification confidence >= 0.8",
        "MEDIUM": "classification confidence 0.6-0.79",
        "LOW": "factory, unknown, or confidence < 0.6",
    },
    "data_sources": [
        "golden-set/vision-test/qwen-results.json",
        "golden-set/classification-test-v2/deepseek-results-v2.json",
        "golden-set/classification-test-v2/supply-intelligence/*.json",
    ],
}

with open(OUT_DIR / "registry-schema-v1.json", "w", encoding="utf-8") as f:
    json.dump(schema, f, ensure_ascii=False, indent=2)

# ============================================================
# SAVE LAYERED FILES
# ============================================================

# Full registry
with open(OUT_DIR / "asset-intelligence.json", "w", encoding="utf-8") as f:
    json.dump(registry, f, ensure_ascii=False, indent=2)

# Classification layer (extract only)
class_layer = []
for e in registry:
    class_layer.append({
        "asset_id": e["asset_id"],
        **e["industrial_classification"],
        "status": e["status"],
    })
with open(OUT_DIR / "classification-layer.json", "w", encoding="utf-8") as f:
    json.dump(class_layer, f, ensure_ascii=False, indent=2)

# Procurement layer
proc_layer = []
for e in registry:
    proc_layer.append({
        "asset_id": e["asset_id"],
        "system_type": e["industrial_classification"]["system_type"],
        **e["supply_intelligence"],
    })
with open(OUT_DIR / "procurement-layer.json", "w", encoding="utf-8") as f:
    json.dump(proc_layer, f, ensure_ascii=False, indent=2)

# Capability layer
cap_layer = []
for e in registry:
    cap_layer.append({
        "asset_id": e["asset_id"],
        "system_type": e["industrial_classification"]["system_type"],
        **e["supplier_capability"],
    })
with open(OUT_DIR / "capability-layer.json", "w", encoding="utf-8") as f:
    json.dump(cap_layer, f, ensure_ascii=False, indent=2)

# SEO layer
seo_layer = []
for e in registry:
    seo_layer.append({
        "asset_id": e["asset_id"],
        "system_type": e["industrial_classification"]["system_type"],
        **e["seo"],
    })
with open(OUT_DIR / "seo-layer.json", "w", encoding="utf-8") as f:
    json.dump(seo_layer, f, ensure_ascii=False, indent=2)

# ============================================================
# STATS
# ============================================================

total = len(registry)
complete = sum(1 for e in registry if e["industrial_classification"]["system_type"] is not None)
factory = sum(1 for e in registry if e["industrial_classification"]["asset_type"] == "factory")
needs_review = sum(1 for e in registry if e["status"]["review_status"] == "needs_review")

conf_dist = Counter(e["status"]["confidence_level"] for e in registry)
sys_dist = Counter(
    e["industrial_classification"]["system_type"] for e in registry
)
proc_ready = sum(1 for e in registry if e["supply_intelligence"]["buyer_need"] and e["industrial_classification"]["system_type"])
seo_ready = sum(1 for e in registry if e["seo"]["seo_topic"] and e["industrial_classification"]["system_type"])

high_value = [
    {"asset_id": e["asset_id"], "system_type": e["industrial_classification"]["system_type"],
     "category": e["industrial_classification"]["category"], "confidence": e["status"]["confidence_level"],
     "brand": e["industrial_classification"]["brand"]}
    for e in registry if e["status"]["confidence_level"] == "HIGH"
]

low_value = [
    {"asset_id": e["asset_id"], "asset_type": e["industrial_classification"]["asset_type"],
     "reason": "factory_scene" if e["industrial_classification"]["asset_type"] == "factory" else "needs_review"}
    for e in registry if e["status"]["confidence_level"] == "LOW"
]

print(f"\n=== Registry Stats ===")
print(f"Total assets:        {total}")
print(f"Complete (system):   {complete}")
print(f"Factory assets:      {factory}")
print(f"Needs review:        {needs_review}")
print(f"Procurement ready:   {proc_ready}")
print(f"SEO ready:           {seo_ready}")
print(f"\nConfidence distribution:")
for k, v in conf_dist.most_common():
    print(f"  {k}: {v}")
print(f"\nSystem distribution:")
for k, v in sys_dist.most_common():
    label = k or "(null)"
    print(f"  {label}: {v}")

# Export stats for report
stats = {
    "total": total,
    "complete": complete,
    "factory": factory,
    "needs_review": needs_review,
    "procurement_ready": proc_ready,
    "seo_ready": seo_ready,
    "confidence_distribution": dict(conf_dist),
    "system_distribution": {k or "null": v for k, v in sys_dist.items()},
    "high_value_count": len(high_value),
    "low_value_count": len(low_value),
}

with open(OUT_DIR / ".stats.json", "w") as f:
    json.dump(stats, f, indent=2)

print(f"\nSaved {len(registry)} entries to {OUT_DIR}/")
