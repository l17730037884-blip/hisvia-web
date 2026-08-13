# Phase 4.3 — Classification Gap Analysis Report

**Date:** 2026-08-10

---

## 1. Which Qwen Fields Drove the Most Improvement?

| Field | V1 Used? | V2 Used? | Impact |
|-------|:--------:|:--------:|--------|
| `visible_object` | ✅ | ✅ | Baseline |
| **`industrial_clues`** | ❌ | ✅ P0 | **Biggest gain (+10 assets)** |
| `visible_features` | ❌ | ✅ P3 | Moderate (+3 assets) |
| `visible_brand` | ❌ | ✅ P5 | Soft hint (+2 assets) |
| `visible_text` | ❌ | ✅ P4 | Minor |
| `image_condition` | ❌ | ✅ | Factory detection |
| `object_type` | ❌ | ✅ | Asset type routing |

**Conclusion:** `industrial_clues` is the single most important field. Qwen places domain-specific signals there ("compressed air system", "dust collection") that V1 completely ignored.

---

## 2. Categories Still Unclassifiable

### 2.1 Pure Factory Photos (10/49 = 20%)

Factory building exteriors, assembly lines, enterprise entrances. These have NO industrial system mapping by design (R002). This is correct behavior.

**Recommendation:** These need a separate `asset_type=factory` tag with `scene_type` sub-fields (exterior/interior/assembly_line/entrance). Not an industrial system classification problem.

### 2.2 Wrapped/Packaged Components (1/49)

asset-a1ae0abb: Component on pallet with plastic wrapping. Qwen can see "component on pallet" but can't identify what's inside.

**Recommendation:** These need manual review. Cannot be auto-classified from visual data alone.

### 2.3 Truncated Qwen Output (1/49)

asset-84bb2bba: Qwen output truncated during Phase 4.1. Raw response may have more data.

**Recommendation:** Re-run Qwen for this single asset, or check raw response file.

---

## 3. Does Qwen Schema Need Upgrading?

### Current Qwen Output Fields

```
visible_object     → often too generic ("equipment", "machine")
object_type        → equipment/component/factory (good)
visible_brand      → works well when visible
visible_text       → useful for model numbers
visible_features   → descriptive but unstructured
industrial_clues   → MOST VALUABLE but unstructured
image_condition    → white_background / industrial_scene / factory_photo
```

### Suggested New Fields for Phase 4.4

| New Field | Type | Purpose |
|-----------|------|---------|
| `equipment_family` | string | "compressor", "pump", "valve", "filter", "bearing", "motor", "controller" |
| `component_role` | string | "drive", "control", "seal", "filtration", "actuation", "transmission" |
| `possible_systems` | string[] | ["Air Compressor Systems", "Industrial Filtration"] — ranked guesses |
| `is_product_focused` | boolean | Is the image a product photo (even with scene bg) or a pure scene? |
| `product_count` | integer | How many distinct products in frame (>3 → multi-product, skip cutout) |

**Priority:** `equipment_family` + `possible_systems` would directly feed the classifier and eliminate most keyword-matching fragility.

---

## 4. Does Taxonomy Need Adjustment?

**Current taxonomy: 8 systems, 34 categories, 113 subcategories. Frozen.**

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| "Industrial Filtration" has dust/air/oil/hydraulic subtypes — hard to distinguish from vision alone | Medium | Accept broader classification; sub-type via metadata or manual |
| Cross-system components (seals, bearings) correctly null | Low | Add `cross_system: true` flag rather than forcing a system |
| Factory photos have no system mapping | Low | Add `scene_type` field outside taxonomy |
| No "consumables" category (LOCTITE tube) | Low | Add `asset_type=consumable` |

**Overall:** Taxonomy V1 is sufficient for Phase 4.3. No changes needed now.

---

## 5. Remaining Risks

| Risk | Probability | Impact |
|------|:----------:|:------:|
| Qwen misidentifies industrial system (e.g., calls a compressor "equipment") | Medium | Falls to unknown (acceptable per R009) |
| Chinese-only Qwen outputs miss English keyword map | Low | V2 has Chinese keyword support |
| Underscore/space mismatch in keyword matching | Low | Fixed in V2 (normalize `_` → ` `) |
| Brand→system soft hint overrides correct null | Low | Brand hint weight = 0.3, won't override strong clues |

---

## 6. Phase 4.4 Recommendations

1. **P0:** Upgrade Qwen prompt to request `equipment_family` and `possible_systems` structured fields
2. **P1:** Re-run Qwen for asset-84bb2bba (truncated output)  
3. **P2:** Add `asset_type=consumable` for LOCTITE/grease/sealant products
4. **P2:** Add `scene_type` field for factory photos
5. **P3:** Scale classifier to all 755 assets

---

**No assets modified. No AI calls made.**
