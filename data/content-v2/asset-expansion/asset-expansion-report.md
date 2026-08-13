---
version: v1
phase: 25
title: Asset Content Expansion Layer
date: 2026-08-11
---

# Phase 25 — Asset Expansion Report

## Summary

| Metric | Before | After | Δ |
|--------|:------:|:-----:|:--:|
| Total assets | 755 | 755 | — |
| Classified with role | 0 | **755** | +755 |
| In placement | 17 | **166** | +149 |
| Unique assets placed | 17 | **122** | +105 |
| Page image tags (across all V2) | 32 | **143** | +111 |
| Unique image paths rendered | 20 | **98** | +78 |
| Usage rate | 2.6% | **16.2%** | +13.6% |

## Per-Page Image Count

| Page | Before | After | Δ |
|------|:------:|:-----:|:--:|
| Homepage (`/v2/en`) | 13 | **24** | +11 |
| Compressors | 3 | **29** | +26 |
| Pumps | 2 | **32** | +30 |
| Valves | 2 | **13** | +11 |
| Hydraulic | 2 | **20** | +18 |
| Filtration | 2 | **12** | +10 |
| Mechanical Transmission | 2 | **9** | +7 |
| Capability Network | 4 | 4 | — |
| **Total** | **32** | **143** | **+111** |

## Files Created

| # | File | Purpose |
|---|------|---------|
| 1 | `data/content-v2/asset-expansion/asset-role-mapping.json` | 755 assets mapped to visual roles + systems + pages |
| 2 | `data/content-v2/asset-expansion/asset-placement-v2.json` | 166 placements, 122 unique assets, for all V2 pages |
| 3 | `data/content-v2/asset-expansion/asset-expansion-report.md` | This report |

## Files Modified

| # | File | Change |
|---|------|--------|
| 1 | `lib/content-v2/content-loader.ts` | Import switched to `asset-placement-v2.json` |
| 2 | `components/v2/V2TrustSection.tsx` | Dynamic assets via `trustAssets` prop, max 12 |
| 3 | `app/v2/[locale]/page.tsx` | Added `getAssetsByUsage()`, capability gallery, OEM/partner section |

## Visual Role Distribution (755 assets)

| Role | Count | % |
|------|:-----:|:--:|
| application_scene | 204 | 27.0% |
| brand_section | 171 | 22.6% |
| system_banner | 136 | 18.0% |
| factory_trust | 134 | 17.7% |
| product_showcase | 110 | 14.6% |

## System Distribution

| System | Assets | Placed |
|--------|:------:|:------:|
| Air Compressor Systems | 166 | 29 |
| Automation Systems | 136 | 28 |
| Pumps & Fluid Handling | 97 | 32 |
| Hydraulic Systems | 81 | 20 |
| Industrial Filtration | 74 | 12 |
| Mechanical Transmission | 74 | 9 |
| Manufacturing Capability | 74 | 17 |
| Valves & Flow Control | 37 | 13 |

## What Was NOT Modified

- ✅ V1 pages: 0 modifications
- ✅ Asset registry: 0 modifications
- ✅ Intelligence core: 0 modifications
- ✅ 755 source files (assets-v2.json): 0 modifications
- ✅ No fake images created
- ✅ No stock photography used
- ✅ No placeholder images
- ✅ Design style: preserved (black/white/industrial-blue)

## Remaining Gap

**Unused assets: 633 (83.8%)** — did not reach <20% target.

To reach <20% unused, would need to:
- Add more pages (industries, applications, brands detail pages)
- Add carousel/gallery components to existing pages
- Create brand-specific landing pages
- Add asset detail/zoom views

This requires new page creation which is beyond Phase 25 scope.

## Next Steps

- Phase 26: Add image carousels and galleries to solution pages
- Add industry pages with application imagery
- Add brand detail pages with all brand assets

---

*Phase 25 complete. Waiting for Phase 26.*
