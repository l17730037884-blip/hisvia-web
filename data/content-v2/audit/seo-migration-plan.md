# HISVIA V1→V2 SEO Migration Plan

## Current State

V1 URLs are indexed. V2 has richer content but lives under /v2/* (noindex).

## URL Strategy

### Keep (no change)
- `/` (homepage) — upgrade content to V2
- `/about` — upgrade content
- `/contact` — keep V1 (static)
- `/faq` — keep V1 (static)

### Redirect (301)
- `/solutions/compressors` → `/solutions/compressors` (same URL, V2 content)
- `/solutions/hydraulics` → `/solutions/hydraulic` (URL update)
- `/solutions/pneumatics` → `/solutions/automation` (merged)
- `/solutions/compressor-parts` → `/solutions/compressors` (merged)
- `/solutions/consumables` → `/solutions/filtration` (merged)
- `/manufacturing-network` → `/capability-network` (consolidated)
- `/partners/distributors` → `/partners/distributor` (URL normalization)
- `/partners/service-centers` → `/partners/service-center` (URL normalization)
- `/partners/regional-partners` → `/partners/regional-agent` (URL normalization)

### New URLs (V2 only)
- `/oem` — new OEM partnership page
- `/industries/*` — expanded to 5 industries (was 1)
- `/capability-network` — expanded content

## Canonical Strategy

All V2 pages set `rel="canonical"` to the final URL (without /v2 prefix).
During migration: V1 pages set `rel="canonical"` to V2 equivalent.

## Sitemap Strategy

1. Generate new sitemap from V2 routes
2. Include 301 redirect sources with `lastmod` from V1
3. Submit to Google Search Console after migration
4. Monitor index coverage for 30 days

## Risk Mitigation

- Keep V1 accessible at `/legacy/*` during transition
- Implement 301 redirects before removing V1 routes
- Monitor 404 rates for first 2 weeks
- Preserve all existing backlinks via redirects

## Timeline

| Phase | Action | Duration |
|-------|--------|:--------:|
| Pre-migration | Deploy V2 at /v2/* (noindex), verify all pages | 1 week |
| Soft launch | Add canonicals, monitor | 1 week |
| Migration | 301 redirects, swap V2 to /, V1 to /legacy | 1 day |
| Post-migration | Monitor, fix 404s, submit sitemap | 4 weeks |
