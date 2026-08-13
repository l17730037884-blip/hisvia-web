---
version: v1
audit: V2 Asset Usage Report
date: 2026-08-11
method: Static analysis + Playwright DOM rendering
---

# HISVIA V2 — Asset Usage Report

## Executive Summary

**755 assets in the library. 20 render on the V2 frontend. That is 2.6% utilization.**

## Pipeline Flow

```
assets-v2.json (755)
    │
    ├─→ intelligence-registry/asset-intelligence.json (49) ── 6.5%
    │       └─→ V2 rendered: 16 of 49
    │
    ├─→ content-v2/asset-placement.json (17) ── 2.3%
    │       └─→ V2 rendered: 16 of 17
    │
    ├─→ content-v2/system-pages.json (35) ── 4.6%
    │
    └─→ V2 DOM (20 unique paths) ── 2.6%
```

## Final Counts

| Metric | Count | % of 755 |
|--------|:-----:|:--------:|
| Total assets | **755** | 100% |
| In registry (`asset-intelligence.json`) | 49 | 6.5% |
| In content-v2 (`asset-placement.json`) | 17 | 2.3% |
| In content-v2 (`system-pages.json` related_asset_ids) | 35 | 4.6% |
| Hardcoded in V2 page TSX | 0 | 0% |
| **Rendered in DOM (unique paths)** | **20** | **2.6%** |
| In registry but NOT rendered | 33 | 4.4% |
| In content but NOT rendered | 1 | 0.1% |
| **Completely unused** | **735** | **97.4%** |

---

## Component-Level Image Usage

| Component | Assets Resolved | Notes |
|-----------|:--------------:|-------|
| **V2Hero** | 1 per page | Gets hero asset via `getHeroImage(systemType)` → `asset-placement.json`. Most pages get the same fallback image because placement data is sparse. |
| **V2SystemCard** | 1 per card | Each system card gets a hero image via `getHeroImage()`. 8 cards on homepage → 8 images (some reused). |
| **V2AssetGallery** | 2-4 per solution page | Shows `data.allAssets` from `getSystemPageWithAssets()`. Only renders if placement data exists for that system. |
| **V2TrustSection** | 4 | `getAssetsWithCutout().slice(0, 4)` — returns 276 total, only shows first 4. |

### Per-Page DOM Image Count

| Page | img tags | Loaded | Unique paths |
|------|:--------:|:------:|:------------:|
| `/v2/en` (home) | 13 | 9 | 10 |
| `/v2/ru` (home) | 13 | 9 | 10 |
| `/v2/zh` (home) | 13 | 9 | 10 |
| `/v2/en/solutions/compressors` | 3 | 3 | 3 |
| `/v2/en/solutions/pumps` | 2 | 2 | 2 |
| `/v2/en/solutions/valves` | 2 | 2 | 2 |
| `/v2/en/solutions/hydraulic` | 2 | 2 | 2 |
| `/v2/en/solutions/automation` | 2 | 2 | 2 |
| `/v2/en/solutions/filtration` | 2 | 2 | 2 |
| `/v2/en/solutions/mechanical-transmission` | 2 | 2 | 2 |
| `/v2/en/capability-network` | 4 | 4 | 4 |
| `/v2/en/oem` | 0 | 0 | 0 |
| `/v2/en/request` | 0 | 0 | 0 |
| `/v2/en/partners/distributor` | 0 | 0 | 0 |
| `/v2/en/industries/mining` | 0 | 0 | 0 |

---

## 20 Rendered Assets (the 2.6%)

| Asset ID | Brand | System | Type | Path |
|----------|-------|--------|------|------|
| `asset-918a3003` | Atlas Copco | compressor | brand_asset | brand-machine-atlas-copco-2.jpg |
| `asset-96030d72` | Atlas Copco | compressor | brand_asset | brand-machine-atlas-copco-4.jpg |
| `asset-3905f805` | Ingersoll Rand | compressor | brand_asset | brand-machine-ingersoll-rand-0.jpg |
| `asset-035e504d` | Ingersoll Rand | compressor | brand_asset | brand-machine-ingersoll-rand-5.jpg |
| `asset-37b6f83b` | Kaeser | compressor | brand_asset | brand-machine-kaeser-0.jpg |
| `asset-6b7b1713` | Kaeser | compressor | brand_asset | _docx5/image12.jpeg |
| `asset-21c46019` | CompAir | compressor | brand_asset | _docx2/image8.jpeg |
| `asset-8342923a` | — | automation | part_asset | part-pneumatic-0.jpg |
| `asset-5d428a16` | — | automation | part_asset | part-pneumatic-1.jpg |
| `asset-344e002d` | — | pump | product_asset | part-pump-0.jpg |
| `asset-ce8be518` | Yuken | hydraulic | brand_asset | _docx2/image17.jpeg |
| `asset-3986d47f` | — | automation | product_asset | _docx3/image13.jpeg |
| `asset-40a7670c` | — | filter | part_asset | _docx3/image17.jpeg |
| `asset-325714de` | — | pump | product_asset | _docx3/image23.jpeg |
| `asset-4ab74032` | — | coupling | part_asset | _docx3/image33.jpeg |
| `asset-cd532cc1` | — | filter | part_asset | _docx6/image73.jpeg |
| `asset-d29f9c00` | — | valve | product_asset | _docx6/image139.jpeg |
| `asset-7b19d020` | — | valve | product_asset | _docx6/image140.jpeg |
| `asset-91e283b8` | — | automation | product_asset | _docx6/image174.jpeg |
| `asset-6b0073d0` | — | bearing | part_asset | _docx6/image231.jpeg |

---

## Top 100 Unused — by Brand

| Brand | Unused |
|-------|:------:|
| (no brand) | 500+ |
| Gardner Denver | 29 |
| Eaton | 29 |
| Hitachi | 16 |
| CompAir | 12 |
| Ingersoll Rand | 11 |
| Sullair | 8 |
| Wilo | 7 |
| Atlas Copco | 6 |
| Yaskawa | 6 |
| Emerson | 6 |

## Top 100 Unused — by System

| System | Unused |
|--------|:------:|
| compressor | 134 |
| automation | 125 |
| pump | 92 |
| hydraulic | 77 |
| factory | 69 |
| filter | 68 |
| valve | 32 |
| seal | 31 |
| coupling | 23 |
| dryer | 19 |

## Top 100 Unused — by Type

| Type | Unused |
|------|:------:|
| product_asset | 240+ |
| part_asset | 200+ |
| brand_asset | 160+ |
| manufacturing_asset | 55+ |
| factory_interior | 42+ |
| factory_exterior | 28+ |

---

## Root Cause Analysis

### Why 97.4% unused?

1. **asset-placement.json has only 17 entries**. This is the bridge between assets and pages. With only 17 placements for 755 assets, 738 assets have no page mapping.

2. **system-pages.json references 35 asset IDs**, but these are `related_asset_ids` — used for data association, not image placement. The asset-resolver filters by `asset-placement.json`, not by system-pages.

3. **V2 pages use dynamic resolver**, not hardcoded IDs. This is good architecture, but it depends entirely on placement data.

4. **asset-placement.json is sparse**. Only 17 assets have a defined `page` + `usage` combination. The rest are invisible to the resolver.

5. **getAssetsWithCutout() returns 276**, but V2TrustSection only shows `.slice(0, 4)`. 272 cutout-ready assets not displayed.

### What would unlock the other 735?

- Add 50-100 entries to `asset-placement.json` mapping key assets to pages
- Vary the trust section to show more than 4 assets (pagination or random rotation)
- Add asset galleries to OEM, partners, and industry pages
- Use `getAssetsBySystem()` to populate solution pages with system-specific galleries

---

## Compliance

| Rule | Status |
|------|:------:|
| No code modified | ✅ Read-only audit |
| No content-v2 JSON modified | ✅ |
| No asset registry modified | ✅ |
| No intelligence layer modified | ✅ |

---

*End of audit.*
