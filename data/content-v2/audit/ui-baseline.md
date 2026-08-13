---
version: v1
audit: UI Baseline Assessment — Phase 24.6
date: 2026-08-11
method: Playwright headless rendering @ 1440x900
---

# UI Baseline — V2 Pre-Iteration Assessment

## Scores (1-10)

| Dimension | Score | Notes |
|-----------|:-----:|-------|
| **A. Brand Position** | 6 | Hero is clear industrial partner. But "What we are NOT" section is mixed-language (EN items in CN company-profile.json). Descriptions are generic — "connects overseas industrial enterprises with..." |
| **B. Trust** | 5 | Verification section shows numbers (1-4) with labels. No real factory photos on homepage. Trust section should show assets. "HISVIA does not guarantee" disclaimer present — good. |
| **C. Information Architecture** | 7 | Clear flow: Hero → Not → Value → Verification → Systems → Manufacturing → Trust → CTA. 8 sections. RFQ path is clear. |
| **D. Visual Design** | 6 | Clean palette (black/white/blue). But: no hero image on homepage, no images on capability/OEM/request pages. Typography is functional but flat — system cards feel templated. Emoji (🔒) on OEM page violates design rules. |
| **E. Conversion** | 5 | "Submit Requirement →" on hero — good. But RFQ page CTA says "Contact via Existing Form →" — weak. No expected response time, no trust signal on RFQ page. |
| **TOTAL** | **5.8** | |

## Key Issues Found

### P0 (Blocking)
1. **No hero image on homepage** — hero section is text-only, no visual anchor
2. **OEM page has emoji (🔒)** — violates design rule "no decorative icons"

### P1 (Trust/Conversion)
3. **0 images on Capability Network page** — a manufacturing capability page without factory images
4. **0 images on OEM page** — IP protection messaging without visual trust
5. **RFQ CTA "Contact via Existing Form"** — weak, should be action-oriented
6. **Homepage Trust section is empty** — shows "Verified Industrial Assets" header but no images loaded (getAssetsWithCutout may return empty)

### P2 (Polish)
7. **System cards have no images** — getHeroImage returns null for most systems
8. **Solution pages too templated** — all 7 follow identical structure
9. **Typography monotone** — all headings are same weight/size, no hierarchy variation
10. **Em-dashes in body copy** — 10+ occurrences across pages

## Image Status

| Page | Images | Status |
|------|:------:|:------:|
| Homepage | ~4? | Trust section images may not load |
| Compressors | ~2? | Hero image missing |
| Capability | 0 | Critical gap |
| OEM | 0 | Critical gap |
| Request | 0 | Acceptable (form page) |

## Target

All dimensions must reach ≥9/10 through max 5 iteration rounds.
