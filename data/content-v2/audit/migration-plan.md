# HISVIA V1 → V2 Migration Plan

## Stage 1: Internal Preview (Current)

**Duration:** Until P0 blockers resolved
**Access:** `/v2/en`, `/v2/zh`, `/v2/ru`
**Status:** `robots: noindex`

### Checklist
- [x] V2 pages deployed at /v2/*
- [x] All 8 system pages functional
- [x] OEM page functional
- [x] Capability network page functional
- [x] Industry pages functional
- [x] Partner pages functional
- [x] Real images rendering via asset-resolver
- [x] zh/ru translations for P0 content
- [x] JSON-LD structured data ready

## Stage 2: Gray Release

**Duration:** 2 weeks
**Access:** Both V1 and V2 accessible

### Actions
1. Enable `/v2/*` for indexing (remove noindex)
2. Add `rel="canonical"` from V1 pages to V2 equivalents
3. Add language switcher to V2 layout
4. Monitor analytics: V1 vs V2 traffic split
5. Collect user feedback on V2 content
6. Fix any content issues before full switch

### Rollback Plan
- V2 can be instantly hidden (set noindex)
- V1 remains fully functional
- No data migration needed (separate systems)

## Stage 3: Full Migration

**Duration:** 1 day execution + 4 weeks monitoring

### Actions
1. Swap routes:
   - V2 content → `/` (production URLs)
   - V1 content → `/legacy/*` (archive)
2. Implement 301 redirects for changed URLs
3. Update sitemap.xml to V2 URLs
4. Submit new sitemap to Google Search Console
5. Monitor 404 rates, redirect chains, index coverage
6. After 4 weeks of clean monitoring: remove `/legacy/*`

### URL Changes Summary
- 16 URLs: same path, upgraded content
- 9 URLs: new path (301 redirect from old)
- 2 URLs: keep V1 (contact, FAQ)
- 1 URL: new (OEM)

### Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|:----------:|:------:|------------|
| SEO ranking drop | Medium | High | Preserve URLs, 301 redirects, monitor |
| Broken links | Low | Medium | Test all redirects before launch |
| Translation quality | Medium | Medium | Native speaker review of zh/ru |
| Missing content | Low | Medium | Migration-map coverage check (ready: 16/28) |

## Decision Gate

Before proceeding to Stage 3, confirm:
- [ ] All Stage 2 issues resolved
- [ ] zh/ru translations reviewed by native speaker
- [ ] All 301 redirects tested
- [ ] New sitemap validated
- [ ] Team approval for production switch
