---
version: v1
audit: Homepage External Assets Verification
date: 2026-08-11
status: MISSING
---

# Homepage External Assets Audit

## Executive Summary

**0 of 15 external homepage images are referenced or rendered on V2 pages.**

## 1. Image Inventory

### public/assets/homepage/ (3 images)

| File | Size | Source | Qwen Classified | In Placement | Rendered |
|------|------|--------|:--------------:|:------------:|:--------:|
| `factory-office.png` | 3.3 MB | Desktop `_图片/` | ❌ (too large) | ❌ | ❌ |
| `equipment-product.png` | 660 KB | Desktop `_图片/` | ✅ | ❌ | ❌ |
| `equipment-cutout.webp` | 15 KB | Desktop `_图片/` | ✅ | ❌ | ❌ |

### public/assets/processed/hero/ (2 images)

| File | Source | In Placement | Rendered |
|------|--------|:-----------:|:--------:|
| `asset-7b5cb069_hero.jpg` | 755 asset processed variant | ❌ | ❌ |
| `asset-2d60b432_hero.jpg` | 755 asset processed variant | ❌ | ❌ |

### public/assets/processed/brand/ (10 hero variants)

| File | Source | In Placement | Rendered |
|------|--------|:-----------:|:--------:|
| `asset-0d1cca1a_hero.jpg` | 755 asset | ❌ | ❌ |
| `asset-1c3ce8d2_hero.jpg` | 755 asset | ❌ | ❌ |
| `asset-2ae58bc9_hero.jpg` | 755 asset | ❌ | ❌ |
| `asset-41f7fc18_hero.jpg` | 755 asset | ❌ | ❌ |
| `asset-4410b50a_hero.jpg` | 755 asset | ❌ | ❌ |
| `asset-4b20cacb_hero.jpg` | 755 asset | ❌ | ❌ |
| `asset-9c7ea94f_hero.jpg` | 755 asset | ❌ | ❌ |
| `asset-b6daca95_hero.jpg` | 755 asset | ❌ | ❌ |
| `asset-c7d2f802_hero.jpg` | 755 asset | ❌ | ❌ |
| `asset-caaeee3a_hero.jpg` | 755 asset | ❌ | ❌ |

## 2. Qwen Classification Results

**File**: `data/content-v2/audit/homepage-image-classification.json`

| Stat | Value |
|------|:-----:|
| Images scanned | 6 (from `~/Desktop/_图片/`) |
| Successfully classified | 5 |
| Failed (file too large) | 1 (`landing_page_full.png`, 13MB) |
| Classified as industrial | 1 |
| Copied to project | 3 |
| Entered placement | 0 |
| Rendered | 0 |

## 3. Placement File Check

| File | External Refs |
|------|:------------:|
| `asset-placement-v2.json` (166 entries) | 0 external (all from 755 assets-v2.json) |
| `asset-placement.json` (17 entries, old) | 0 external |

All 166 placement entries reference `asset-*` IDs from `assets-v2.json`, not from `public/assets/homepage/` or `public/assets/processed/`.

## 4. Registry Check

`asset-intelligence.json`: 49 entries, 0 external references.

## 5. DOM Rendering Check

All 20 rendered images (across all V2 pages) come from `/photos/raw/` paths within the 755 asset library. Zero images from `public/assets/homepage/` or `public/assets/processed/` render in any V2 page.

## 6. Final Status

| Check | Count | Status |
|-------|:-----:|:------:|
| External images on disk | 15 | — |
| `public/assets/homepage/` | 3 | On disk |
| `public/assets/processed/hero/` | 2 | On disk |
| `public/assets/processed/brand/` (hero) | 10 | On disk |
| Qwen classified | 6 | Partial (1 failed due to size) |
| In placement files | **0** | ❌ |
| In registry | **0** | ❌ |
| Rendered in DOM | **0** | ❌ |

**Overall: MISSING** — 0 of 15 images flow through to any V2 page.

## 7. Root Cause

1. **No placement entries**: Neither placement file references `public/assets/homepage/` or `public/assets/processed/` paths
2. **Asset resolver only reads `assets-v2.json`**: The resolver maps `asset_id` → path using `assets-v2.json`. External images outside this registry are invisible.
3. **Processed variants not registered**: The 12 processed images (2 hero + 10 brand) were generated from 755 assets but the `_hero` suffix variants never got `asset_id` entries in placement or registry.

## 8. What Was NOT Done

- ❌ Did not modify any code
- ❌ Did not re-call Qwen API
- ❌ Did not modify placement files
- ❌ Did not modify registry
- ❌ Did not modify 755 assets

---

*Awaiting instructions for Phase 25.0 follow-up.*
