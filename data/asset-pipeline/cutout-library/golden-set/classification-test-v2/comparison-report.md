# Phase 4.2 vs Phase 4.3 — Classification Comparison Report

**Date:** 2026-08-10
**Assets:** 49 (Golden Set)

---

## 1. Headline Metrics

| Metric | Phase 4.2 (V1) | Phase 4.3 (V2) | Δ |
|--------|:---:|:---:|:---:|
| **Assigned** | 20 | **37** | **+17** |
| **Unknown** | 29 | **12** | **-17** |
| **Unknown %** | 59.2% | **24.5%** | **-34.7pp** |
| **Validation pass** | 49/49 | 49/49 | — |

---

## 2. System Coverage Comparison

| System Type | V1 | V2 | Δ |
|------------|:--:|:--:|:--:|
| Air Compressor Systems | 0 | **5** | +5 |
| Hydraulic Systems | 0 | **4** | +4 |
| Pneumatic Automation | 2 | **4** | +2 |
| Industrial Filtration | 2 | **6** | +4 |
| Pumps & Fluid Handling | 7 | 5 | -2 |
| Valves & Flow Control | 5 | 4 | -1 |
| Mechanical Transmission | 3 | **6** | +3 |
| Industrial Automation & Control | 1 | **3** | +2 |
| **(null)** | 29 | **12** | -17 |

**Key:** Air Compressor Systems went from 0 → 5. This was the biggest gap in V1 — all compressor images were missed because the classifier ignored `industrial_clues`.

---

## 3. What Changed: Assets Recovered from Unknown

### 3.1 New Air Compressor Systems (5)

| asset_id | Qwen Clue | Brand |
|----------|-----------|-------|
| asset-918a3003 | "compressed air system" | Atlas Copco |
| asset-6b7b1713 | "compressed air equipment" | KAESER |
| asset-21c46019 | "compressed air system" | CompAir |
| asset-a978f441 | "compressor" | Atlas Copco |
| asset-e4c126b0 | (Gardner Denver L250 recognized) | Gardner Denver |

**V1 reason:** `visible_object=["equipment"]` → no match → unknown
**V2 fix:** `industrial_clues` scanned → "compressed air/compressor" → Air Compressor Systems

### 3.2 New Industrial Filtration (4)

| asset_id | Qwen Clue | Brand |
|----------|-----------|-------|
| asset-8490ea6c | "dust_collection_system" | Donaldson Torit |
| asset-eb8b77cc | "dust collection system" | Donaldson |
| asset-f0993304 | "air filtration system" | Donaldson Torit |
| asset-7da7f124 | "air filtration system" | Donaldson |
| asset-9f330fb8 | "fluid filtration system" | ALPHA LUBRICANTS |

### 3.3 New Hydraulic Systems (4)

| asset_id | Qwen Clue |
|----------|-----------|
| asset-8342923a | "hydraulic" features detected |
| asset-475bb362 | "hydraulic" features detected |
| asset-344e002d | "hydraulic" features detected |
| asset-48b63b1e | "hydraulic" features detected |

### 3.4 New Pneumatic Automation (2)

| asset_id | Qwen Clue | Brand |
|----------|-----------|-------|
| asset-5d428a16 | "气动元件" (pneumatic components) | — |
| asset-ad1a284d | "pneumatic component", "adjustable valve" | FESTO |

### 3.5 New Industrial Automation (2)

| asset_id | Qwen Clue | Brand |
|----------|-----------|-------|
| asset-f33f7c96 | "control module", "industrial automation" | ABB |
| asset-3986d47f | "industrial control" features | — |

---

## 4. Still Unknown (12)

### 4.1 Factory Scenes — Correctly Null (10)

| asset_id | Description | Brand |
|----------|-------------|-------|
| asset-58e52f7c | Robotic arm assembly line | — |
| asset-40e9d9a1 | Automated assembly line | SIEMENS |
| asset-f611401c | Robot arm + conveyor | — |
| asset-b69c6430 | Factory scene | KUKA |
| asset-5b33ea4b | Factory scene | KUKA |
| asset-87e2254b | Building entrance | China Erzhong |
| asset-81187c75 | Building entrance | PRECISE |
| asset-d7c25888 | Factory exterior | — |
| asset-ceb53592 | CNC building | CNC |
| asset-001ac56b | Factory + parking | — |

**All correctly handled by R002.** Factory photos are not industrial products.

### 4.2 Truly Unclassifiable (2)

| asset_id | Reason |
|----------|--------|
| asset-84bb2bba | Qwen output truncated/insufficient |
| asset-a1ae0abb | Component on pallet, wrapped, no visual cues |

---

## 5. Confidence Distribution

| Confidence | V1 | V2 |
|-----------:|:--:|:--:|
| 0.9 (high) | 20 | **27** |
| 0.75 (medium) | 12 | **8** |
| 0.5 (low) | 16 | **12** |
| 0.3 (very low) | 1 | **2** |

---

## 6. Root Cause: Why V1 Failed

| Cause | Count |
|-------|:-----:|
| Classifier only scanned `visible_object` | **10** |
| No Chinese keyword support | **3** |
| Underscore/space mismatch | **4** |
| Factory detection too aggressive (no system clue override) | **5** |

All four issues are fixed in V2.

---

## 7. Conclusion

| Question | Answer |
|----------|--------|
| Did unknown count drop? | ✅ 29 → 12 (-59%) |
| Did system coverage improve? | ✅ All 8 systems now represented |
| Did Air Compressor Systems recover? | ✅ 0 → 5 |
| Are remaining unknowns justified? | ✅ 10 factory + 2 unclassifiable = correct |
| Were any assets modified? | ❌ No |
| Was Qwen called? | ❌ No |
| Was taxonomy modified? | ❌ No |

**Phase 4.3 classification engine V2 is ready for full-scale deployment.**
