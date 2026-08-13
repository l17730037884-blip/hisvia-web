# Phase 6 — Website Content Mapping Report

**Date:** 2026-08-10
**Input:** Asset Intelligence Registry (49 assets)
**Output:** Website content layer (55 pages mapped)

---

## 1. Page Mapping Summary

| Page Type | Count | Description |
|-----------|:-----:|-------------|
| **System Solutions Pages** | 8 | One per industrial system — comprehensive product + procurement |
| **Capability Pages** | 3 | Manufacturing network, factory trust, quality control |
| **Procurement Entry Pages** | 10 | Buyer problem → solution → RFQ path |
| **SEO Landing Pages** | 34 | Industry-specific Google-targeted content pages |
| **Total** | **55** | |

---

## 2. System Pages (8)

| # | System | Assets | Hero | URL |
|:-:|--------|:------:|:----:|-----|
| 1 | Air Compressor Systems | 5 | 2 | `/en/solutions/compressed-air-systems` |
| 2 | Hydraulic Systems | 4 | 2 | `/en/solutions/hydraulic-systems` |
| 3 | Pneumatic Automation | 4 | 2 | `/en/solutions/pneumatic-automation` |
| 4 | Industrial Filtration | 6 | 2 | `/en/solutions/industrial-filtration` |
| 5 | Pumps & Fluid Handling | 5 | 2 | `/en/solutions/pumps-fluid-handling` |
| 6 | Valves & Flow Control | 4 | 2 | `/en/solutions/valves-flow-control` |
| 7 | Mechanical Transmission | 6 | 2 | `/en/solutions/mechanical-transmission` |
| 8 | Industrial Automation & Control | 3 | 2 | `/en/solutions/automation-control` |

---

## 3. Capability Pages (3)

| Page | Assets | Trust Role |
|------|:------:|------------|
| **Manufacturing Network** | 37 product assets across 8 systems | Multi-category industrial supply capability |
| **Partner Factory Facilities** | 10 factory photos (KUKA, SIEMENS, CNC, PRECISE, China Erzhong) | Authentic on-site photos = buyer trust |
| **Quality Control & Testing** | 8 systems covered | Pressure/performance/material certification |

---

## 4. Procurement Entry Pages (10 Buyer Scenarios)

| # | Buyer Problem | Solution Page | Type |
|:-:|--------------|---------------|------|
| 1 | Need compressor replacement parts (Atlas Copco/KAESER) | compressed-air-systems | spare_parts_rfq |
| 2 | Complete compressed air system package | compressed-air-systems | system_package_rfq |
| 3 | Replace hydraulic pumps/cylinders | hydraulic-systems | component_replacement_rfq |
| 4 | Dust collection system for cement plant | industrial-filtration | system_design_rfq |
| 5 | Replacement filter elements (scheduled maintenance) | industrial-filtration | consumable_reorder |
| 6 | Industrial valves for water treatment project | valves-flow-control | project_bulk_rfq |
| 7 | Centrifugal pump — SS316, 50m³/h @ 40m | pumps-fluid-handling | spec_rfq |
| 8 | Pneumatic cylinders + valves for new automation line | pneumatic-automation | automation_components_rfq |
| 9 | SKF/NSK equivalent bearings — bulk pricing | mechanical-transmission | bulk_commodity_rfq |
| 10 | PLC + VFD for machine retrofit | automation-control | system_integration_rfq |

---

## 5. SEO Pages (34)

### Industry Landing Pages (30)

From each system's `landing_pages` — e.g.:
- `food-beverage-compressed-air`
- `cement-plant-dust-collection`
- `chemical-process-pumps`
- `oil-gas-pipeline-valves`
- `mining-conveyor-bearings`
- `smart-factory-automation`

### Top-Level SEO Pages (4)

| Page | Target Keyword |
|------|---------------|
| Industrial Air Compressor Manufacturer China | "air compressor manufacturer China" |
| Industrial Pump Supplier China | "industrial pump supplier China" |
| China Industrial Valve Manufacturer | "industrial valve manufacturer China" |
| About HISVIA Manufacturing Network | "China industrial supply chain partner" |

---

## 6. Asset Placement Distribution

| Role | Count | Usage |
|------|:-----:|-------|
| **hero** | 8 | System page hero banners (1 per system) |
| **system_section** | 15 | Supporting product images within system pages |
| **product_support** | 13 | Detail/gallery images |
| **factory_trust** | 10 | About Us / Capabilities pages |
| **seo_thumbnail** | 1 | SEO page thumbnail |
| **needs_review** | 2 | Unclassifiable — pending manual review |
| **Total** | **49** | 1 role per asset, no conflicts |

---

## 7. Website Modules Supported

| Module | Pages | Assets Used |
|--------|:-----:|:-----------:|
| Homepage | 1 | Hero + system overview |
| System Solutions | 8 | 37 product assets |
| Procurement RFQ Entry | 10 | Cross-system buyer paths |
| SEO Content | 34 | 37 product assets |
| About / Manufacturing Network | 3 | 10 factory assets |
| OEM/ODM | 1 | Factory + system capability |

---

## 8. Data Gaps

| Gap | Severity | Impact |
|-----|:--------:|--------|
| No product specification data (kW, bar, CFM, sizes) | High | Cannot auto-generate spec tables on system pages |
| No certification logos/mentions (CE, ASME, ISO) | High | Missing trust signals for European buyers |
| No case studies or application photos | Medium | SEO pages need real application context |
| Only 2 hero assets per system (small sample) | Medium | Full 755 assets will provide richer hero selection |
| No video/CAD/document assets mapped | Medium | Future asset types not covered |
| 2 assets need manual review | Low | Single-asset gaps |

---

## 9. Phase 6 Completion Checklist

- [x] `page-mapping.json` — Summary of all 55 pages mapped
- [x] `system-pages.json` — 8 system solution pages
- [x] `capability-pages.json` — 3 capability/trust pages
- [x] `procurement-pages.json` — 10 buyer procurement entry pages
- [x] `seo-pages.json` — 34 SEO landing pages
- [x] `asset-placement.json` — 49 assets placed, no conflicts
- [x] `generation-report.md` — This report
- [x] `generate-content-map.py` — Reproducible generator

---

## 10. Ready for Next.js?

| Criterion | Status |
|-----------|:------:|
| All 37 classified assets mapped to pages? | ✅ |
| Factory assets assigned to trust pages? | ✅ |
| SEO keywords mapped per page? | ✅ |
| Asset placement conflict-free? | ✅ |
| Buyer procurement paths defined? | ✅ |
| Missing: technical specs for spec tables | ⚠️ Need extraction |
| Missing: certification badges for trust | ⚠️ Need metadata |
| Can proceed to page skeleton generation? | ✅ Phase 7 ready |

---

**No site code modified. No assets modified. No database writes.**
