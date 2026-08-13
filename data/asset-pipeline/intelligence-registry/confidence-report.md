# Phase 5 — Asset Intelligence Registry Confidence Report

**Date:** 2026-08-10
**Registry:** `intelligence-registry/asset-intelligence.json`
**Assets:** 49 (Golden Set)

---

## 1. Registry Summary

| Metric | Value |
|--------|:-----:|
| Total assets in registry | **49** |
| Complete (system_type assigned) | **37 (75.5%)** |
| Factory/exterior scenes | 10 (20.4%) |
| Needs review (unclassifiable) | 2 (4.1%) |
| **Procurement-ready** | **37 (75.5%)** |
| **SEO-ready** | **37 (75.5%)** |
| **Capability-tagged** | **37 (75.5%)** |

---

## 2. Confidence Distribution

| Level | Count | % | Criteria |
|-------|:-----:|:--:|----------|
| **HIGH** | 36 | 73.5% | Classification confidence ≥ 0.8 |
| **MEDIUM** | 1 | 2.0% | Classification confidence 0.6–0.79 |
| **LOW** | 12 | 24.5% | Factory scenes or unclassifiable |

### HIGH Confidence Assets by System

| System Type | HIGH Count |
|-------------|:----------:|
| Industrial Filtration | 6 |
| Mechanical Transmission | 6 |
| Air Compressor Systems | 5 |
| Pumps & Fluid Handling | 5 |
| Pneumatic Automation | 4 |
| Valves & Flow Control | 4 |
| Hydraulic Systems | 4 |
| Industrial Automation & Control | 2 |

### MEDIUM Confidence (1 asset)

| asset_id | System | Reason |
|----------|--------|--------|
| asset-3986d47f | Industrial Automation & Control | Qwen visual info limited; classified via feature matching at 0.75 |

### LOW Confidence (12 assets)

| Type | Count | Reason |
|------|:-----:|--------|
| Factory building/entrance | 6 | R002 — factory scene photos |
| Assembly line / robot cell | 4 | R002 — manufacturing process photos |
| Unclassifiable | 2 | Qwen output truncated or wrapped component |

**All LOW confidence assets are correctly flagged.** No false positives, no missed factory detection.

---

## 3. Layer-by-Layer Coverage

| Layer | Source | Coverage | Completeness |
|-------|--------|:--------:|:------------:|
| **Vision** | Qwen-VL (49/49) | 100% | ✅ Full |
| **Classification** | V2 rule engine (49/49) | 100% | ✅ Full |
| **Procurement** | Supply intelligence (37/49) | 75.5% | ✅ Factory excluded |
| **Capability** | Supply intelligence (37/49) | 75.5% | ✅ Factory excluded |
| **SEO** | Supply intelligence (37/49) | 75.5% | ✅ Factory excluded |

---

## 4. Data Lineage Verification

| Check | Result |
|-------|:------:|
| All 49 asset_ids unique? | ✅ Yes |
| All classification entries have vision source? | ✅ Yes |
| All procurement entries have classification source? | ✅ Yes (37/37) |
| All SEO entries have classification source? | ✅ Yes (37/37) |
| Any orphaned data? | ❌ No |
| Any duplicate entries? | ❌ No |
| Original assets modified? | ❌ No |
| Any API calls made? | ❌ No |

---

## 5. High-Value Assets (Top 10 by Completeness)

| # | asset_id | System | Category | Brand | Confidence |
|:-:|----------|--------|----------|-------|:----------:|
| 1 | asset-918a3003 | Air Compressor Systems | Compressors | Atlas Copco | HIGH |
| 2 | asset-6b7b1713 | Air Compressor Systems | Compressors | KAESER | HIGH |
| 3 | asset-21c46019 | Air Compressor Systems | Compressors | CompAir | HIGH |
| 4 | asset-cfd129d3 | Industrial Filtration | Filter Elements | Atlas Copco | HIGH |
| 5 | asset-e82582ef | Valves & Flow Control | Ball Valves | — | HIGH |
| 6 | asset-b7d57b28 | Mechanical Transmission | Gears | — | HIGH |
| 7 | asset-8342923a | Hydraulic Systems | — | — | HIGH |
| 8 | asset-5d428a16 | Pneumatic Automation | Pneumatic Components | — | HIGH |
| 9 | asset-f33f7c96 | Industrial Automation & Control | PLCs & Controllers | ABB | HIGH |
| 10 | asset-8490ea6c | Industrial Filtration | Dust Filtration | Donaldson Torit | HIGH |

---

## 6. Assets Needing Optimization

| asset_id | Issue | Action |
|----------|-------|--------|
| asset-84bb2bba | Qwen output truncated | Re-run Qwen for this asset |
| asset-a1ae0abb | Wrapped component, no visual cues | Manual review required |
| asset-58e52f7c | Assembly line photo | Tag as scene_type=assembly_line for About page |
| asset-40e9d9a1 | SIEMENS factory | Tag + use in Capabilities page |
| asset-b69c6430 | KUKA factory | Tag + use in Capabilities page |

---

## 7. Registry Readiness for Scale

| Capability | Status |
|-------------|:------:|
| Schema frozen? | ✅ registry-schema-v1.json |
| Build pipeline reproducible? | ✅ build-registry.py |
| Confidence tiers defined? | ✅ HIGH/MEDIUM/LOW |
| Factory/unknown handling? | ✅ Correctly excluded from procurement |
| Multi-layer linking? | ✅ Vision → Classification → Supply → SEO |
| Ready for 755 assets? | ✅ Drop-in replacement of input files |

---

## 8. Phase 5 Completion Checklist

- [x] `registry-schema-v1.json` — Schema definition
- [x] `asset-intelligence.json` — Full unified registry (49 entries)
- [x] `classification-layer.json` — Extracted classification layer
- [x] `procurement-layer.json` — Extracted procurement layer
- [x] `capability-layer.json` — Extracted capability layer
- [x] `seo-layer.json` — Extracted SEO layer
- [x] `confidence-report.md` — This report
- [x] `build-registry.py` — Reproducible builder script

---

**No assets modified. No API calls. No database writes.**
