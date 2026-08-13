# HISVIA V2 SEO Production Report

## Page SEO Audit

| Page | Title | Description | Canonical | OG | Structured Data | hreflang |
|------|:-----:|:-----------:|:---------:|:--:|:---------------:|:--------:|
| Homepage | ✅ | ✅ | ⚠️ | ❌ | ✅ Organization | ❌ |
| Solutions/* (8) | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| Industries/* (5) | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| Capability Network | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| OEM | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| Partners/* (3) | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| Request | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |

## URL Strategy for Production

### Final URL scheme:
- `/en` — English homepage  
- `/zh` — Chinese homepage
- `/ru` — Russian homepage
- `/en/solutions/compressors` etc.

### Migration from /v2/* to /*
- Remove `/v2` prefix
- Update all internal links
- Set canonical to final URL
- 301 redirect `/v2/*` → `/*` (temporary during transition)

## Structured Data

✅ Organization schema ready (JSON-LD)
✅ Service schema (3 services)
✅ FAQ schema (3 questions)
⚠️ hreflang tags not yet implemented

## Sitemap

Requires generation for:
- `/en/*` — 20+ pages
- `/zh/*` — 20+ pages  
- `/ru/*` — 20+ pages

## Pre-Launch SEO Checklist

- [ ] Add Open Graph tags to all pages
- [ ] Add hreflang tags (en/zh/ru)
- [ ] Generate sitemap.xml
- [ ] Set canonical URLs (remove /v2 prefix)
- [ ] Verify robots.txt allows indexing
- [ ] Submit sitemap to Google Search Console
