# HISVIA Asset Isolation Report

## V1 Asset Usage

V1 pages reference images through:
- `public/photos/` — raw photos directory
- `public/assets/` — processed assets
- Component imports (RequestForm, etc.) — no direct asset references
- Most V1 pages are text-only or use placeholder image components

## V2 Asset Usage

V2 uses:
- `data/asset-pipeline/cutout-library/assets-v2.json` (755 assets)
- `asset-resolver.ts` → resolves asset_id to real path
- All images via `<Image>` from `next/image`
- All images bound to `asset_id` + `system_type` + `usage` role

## Isolation Verification

| Check | Status |
|-------|:------:|
| V1 does NOT import from lib/content-v2 | ✅ Confirmed |
| V1 does NOT read assets-v2.json | ✅ Confirmed |
| V2 does NOT import V1 components | ✅ Confirmed |
| V2 does NOT write to public/photos/ | ✅ Confirmed |
| V2 does NOT modify asset-index.json | ✅ Confirmed |
| No shared image state between V1/V2 | ✅ Confirmed |

## Duplicate Reference Check

V1 assets: `public/photos/`, `public/assets/`
V2 assets: `data/asset-pipeline/cutout-library/assets-v2.json` (reads from `public/photos/` + `public/assets/`)

Both layers read from the same physical files but through different indexing systems. No write conflicts.

## Risk: None

Asset isolation is clean. V1 and V2 use separate content systems that happen to read from the same underlying photo storage. Migration does not risk asset corruption or duplication.
