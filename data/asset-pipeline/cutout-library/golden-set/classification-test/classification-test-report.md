# Phase 4.2 Classification Test Report

**Date:** 2026-08-10
**Model:** DeepSeek Rule-Based Classifier
**Input:** 49 Qwen-VL Vision Results (Golden Set)
**Taxonomy:** taxonomy-v1.json (8 systems, frozen)

---

## 1. Test Summary

| Metric | Value |
|--------|-------|
| Total assets | 49 |
| Successful classifications | 49 |
| Failed (API error) | 0 |
| system_type assigned | **20** (40.8%) |
| system_type = null | **29** (59.2%) |

---

## 2. Prediction Distribution

### 2.1 System Type Distribution

| System Type | Count |
|-------------|:-----:|
| Pumps & Fluid Handling | 7 |
| Valves & Flow Control | 5 |
| Mechanical Transmission | 3 |
| Industrial Filtration | 2 |
| Pneumatic Automation | 2 |
| Industrial Automation & Control | 1 |
| Air Compressor Systems | 0 |
| Hydraulic Systems | 0 |
| **null (unknown)** | **29** |

### 2.2 Asset Type Distribution

| Asset Type | Count |
|------------|:-----:|
| equipment | 19 |
| component | 13 |
| factory | 11 |
| unknown | 6 |

### 2.3 Risk Level Distribution

| Risk Level | Count |
|------------|:-----:|
| high | 19 |
| low | 18 |
| medium | 12 |

### 2.4 Brands Detected (by Qwen)

Atlas Copco, KAESER, CompAir, Siemens, Donaldson, Donaldson Torit, KUKA, Gardner Denver, ABB, FESTO, LOCTITE, China Erzhong, PRECISE, CNC, ALPHA LUBRICANTS

---

## 3. Unknown Analysis (29 assets)

### 3.1 Root Cause Breakdown

| Root Cause | Count | Category |
|------------|:-----:|----------|
| **A. Factory scenes (R002 → correct null)** | 11 | NOT A BUG |
| **B. Qwen clues available but classifier keyword map too narrow** | 10 | CLASSIFIER GAP |
| **C. Qwen output too generic / R009 applies** | 6 | QWEN GAP |
| **D. Cross-system component (R003 → correct null)** | 1 | NOT A BUG |
| **E. Truly unclassifiable** | 1 | EXPECTED |
| **Total** | **29** | |

### 3.2 Category A: Factory Scenes (11 — NOT A BUG)

R002 rule: `asset_type=factory, system_type=null`. These are correctly classified.

| asset_id | Qwen Description | Brand | Confidence | Risk |
|----------|-----------------|-------|:----------:|:----:|
| asset-58e52f7c | Robotic arm assembly line | — | 0.9 | low |
| asset-40e9d9a1 | SIEMENS automated assembly line | SIEMENS | 0.9 | low |
| asset-f611401c | Robot arm + conveyor | — | 0.9 | low |
| asset-7da7f124 | Donaldson outdoor air filtration | Donaldson | 0.9 | low |
| asset-b69c6430 | KUKA factory | KUKA | 0.9 | low |
| asset-5b33ea4b | KUKA factory | KUKA | 0.9 | low |
| asset-87e2254b | China Erzhong entrance | China Erzhong | 0.9 | low |
| asset-81187c75 | PRECISE entrance | PRECISE | 0.9 | low |
| asset-d7c25888 | Factory exterior | — | 0.9 | low |
| asset-ceb53592 | CNC building | CNC | 0.9 | low |
| asset-001ac56b | Factory building + parking | — | 0.9 | low |

**Assessment:** All correctly handled. Factory photos do not belong in any industrial product system.

### 3.3 Category B: Classifier Missed Qwen Clues (10 — CLASSIFIER GAP)

Qwen provided `industrial_clues` that indicate the correct system_type, but the classifier's keyword matching only looks at `visible_object`, missing these signals.

| asset_id | Qwen industrial_clues | Brand | Should Be | Current |
|----------|----------------------|-------|-----------|---------|
| asset-918a3003 | "compressed air system", "industrial machinery" | Atlas Copco | Air Compressor Systems | null |
| asset-6b7b1713 | "compressed air equipment", "industrial machinery" | KAESER | Air Compressor Systems | null |
| asset-21c46019 | "compressed air system", "warehouse setting" | CompAir | Air Compressor Systems | null |
| asset-a978f441 | "compressor", "industrial machinery" | Atlas Copco | Air Compressor Systems | null |
| asset-8490ea6c | "dust_collection_system", "ventilation_equipment" | Donaldson Torit | Industrial Filtration | null |
| asset-eb8b77cc | "dust collection system", "manufacturing environment" | Donaldson | Industrial Filtration | null |
| asset-f0993304 | "air filtration system", "manufacturing environment" | Donaldson Torit | Industrial Filtration | null |
| asset-e4c126b0 | (Qwen recognized "Gardner Denver L250" but industrial_clues=[]) | Gardner Denver | Air Compressor Systems | null |
| asset-f33f7c96 | "control module", "industrial automation", "network connectivity" | ABB | Industrial Automation | null |
| asset-9f330fb8 | "fluid filtration system", "pressure monitoring" | ALPHA LUBRICANTS | Industrial Filtration | null |

**Root Cause:** Classifier only matches keywords in `visible_object` field (e.g., "equipment", "machine"). It does not inspect `industrial_clues` where Qwen places domain-specific signals like "compressed air system", "dust collection system".

### 3.4 Category C: Qwen Output Too Generic (6 — QWEN GAP)

Qwen output insufficient for reliable classification. R009 rule correctly applies.

| asset_id | Qwen visible_object | Qwen industrial_clues | Brand | Reason |
|----------|--------------------|-----------------------|-------|--------|
| asset-5d428a16 | "气缸" (cylinder) | "气动元件", "工业自动化部件" | — | Chinese term not in keyword map |
| asset-84bb2bba | (truncated) | — | — | Visual info insufficient |
| asset-3986d47f | (truncated) | — | — | Visual info insufficient |
| asset-ad1a284d | "component" | "pneumatic component", "adjustable valve" | FESTO | Qwen says "pneumatic" but classifier didn't use clues |
| asset-4ab74032 | "component" | "bearing housing", "mechanical component" | — | Generic component |
| asset-7aaf9aca | "tube" | "sealant", "silicone", "gasket maker" | LOCTITE | Consumable, not equipment |

### 3.5 Category D: Cross-System Component (1 — CORRECT)

| asset_id | Description | Reason |
|----------|-------------|--------|
| asset-a8ee483b | Seals/gaskets | R003: Seals serve all systems. system_type=null is correct. |

### 3.6 Category E: Truly Unclassifiable (1 — EXPECTED)

| asset_id | Description | Reason |
|----------|-------------|--------|
| asset-a1ae0abb | Component on pallet with barcode | Plastic-wrapped, no visual cues. R009 applies correctly. |

---

## 4. Validation Results

| Metric | Value |
|--------|-------|
| Total validated | 49 |
| Passed | 49 (100%) |
| Failed | 0 |

**Assessment:** Validation is too lenient. `system_type=null` should not automatically pass. The validation only checks field existence and taxonomy alignment. It does not flag unknown as a concern. This needs tightening in Phase 4.3.

---

## 5. Key Findings

### 5.1 The Classifier Does Not Use `industrial_clues`

The keyword-to-system mapping (`KEYWORD_SYSTEM_MAP`) only matches against Qwen's `visible_object` field. But Qwen typically outputs generic terms there ("equipment", "machine") and puts domain-specific signals in `industrial_clues` ("compressed air system", "dust collection"). This is the single biggest cause of the 29 unknowns.

**Impact:** 10 compressor/filtration/automation assets that Qwen correctly identified could not be classified.

### 5.2 Air Compressor Systems = 0 in 49 Assets

Despite the Golden Set including Atlas Copco, KAESER, CompAir, and Gardner Denver compressor images, the classifier assigned zero to Air Compressor Systems. All fell into unknown because "compressed air system" was in `industrial_clues`, not `visible_object`.

### 5.3 Factory Classification Works Correctly

R002 correctly routes all 11 factory photos to `asset_type=factory, system_type=null`. No false positives.

### 5.4 Validation Is Too Permissive

100% pass rate with 59% unknown means the validation schema doesn't flag unknowns as warnings.

---

## 6. Recommendations for Phase 4.3

1. **Extend classifier to use `industrial_clues`**: Add keyword mappings for phrases like "compressed air system", "dust collection", "pneumatic component", "fluid handling"

2. **Add brand→system hints**: Atlas Copco/KAESER/CompAir/Gardner Denver → likely Air Compressor. Donaldson → likely Filtration. This is a soft hint, not a rule (R001: brand is not taxonomy).

3. **Add Chinese keyword support**: Qwen outputs Chinese terms (气缸, 气动元件) that the English keyword map misses.

4. **Tighten validation**: Flag `system_type=null` with `asset_type=equipment` as "needs review" rather than "passed".

5. **Consider adding Qwen output fields**: `equipment_family`, `component_role`, `possible_system_clues` to elicit more structured industrial signals from vision model.

---

## 7. Phase 4.2 Completion Checklist

- [x] `deepseek-results.json` — 49 classification results
- [x] `validation-results.json` — 49 validation results
- [x] `classification-log.json` — 49 execution log entries
- [x] `run-deepseek-classification.py` — Documentation script (this phase)
- [x] `classification-test-report.md` — This report (this phase)
- [ ] `vision-gap-analysis.json` — Next

---

**No assets were modified. No AI calls were made in this report generation.**
