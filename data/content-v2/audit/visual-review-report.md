---
version: v1
audit: V2 Page Visual & Content Review
date: 2026-08-11
reviewer: Automated Audit
scope: All V2 pages across en/ru/zh
---

# HISVIA V2 — Visual & Content Review Report

## Audit Summary

| Metric | Result |
|--------|:------:|
| Pages audited | 17 (3 home + 8 solutions + 6 utility) |
| Languages working | 3/3 (en, ru, zh) |
| Placeholder content found | 0 |
| Lorem ipsum found | 0 |
| AI-generated feel detected | Moderate (see below) |
| Pages with zero images | 10/17 |
| CTA present | 15/17 |
| Pages with localization bugs | 1 |

---

## 1. Homepage Audit

### /v2/en — English Homepage ✅ Good

- **Positioning clarity**: "Industrial Supply Chain Partner" — correct, not e-commerce
- **"What we are NOT" section**: Strong — clearly states not a marketplace, not SKU-based, not inventory holder. Builds trust.
- **Value proposition**: "Why Overseas Buyers Need a China Supply Chain Partner" — relevant framing
- **System cards**: 8 industrial systems displayed with asset counts
- **Trust section**: Factory trust + verification layer referenced
- **CTA**: "Submit Requirement →" — prominent, clear next step
- **Issue**: "What we are NOT" items are in English hardcoded — may need i18n wrapping

### /v2/ru — Russian Homepage ✅ Good

- Full Russian translation present
- Hero, value proposition, system cards all in Russian
- **Issue**: "What we are NOT" section items appear in English ("✕ We are NOT an e-commerce marketplace...") — **BUG: Missing Russian translations for what_we_are_not array**

### /v2/zh — Chinese Homepage ⚠️ One Bug

- Full Chinese translation for hero, value proposition, system cards
- **BUG**: "What we are NOT" section displays English text, not Chinese — same bug as RU
- "HISVIA 不是" header is correct, but the list items are English

---

## 2. Solutions Pages Audit

### /v2/en/solutions/compressors ✅ Good

- Text: 1990 chars, 4 images, 8 links
- Structure: Problem → China capability → Applications → Compatible brands → Sourcing scenarios → CTA
- Compatible brands listed: Atlas Copco, Ingersoll Rand, Kaeser, Sullair, CompAir, Gardner Denver, Hitachi
- Content reads industrial, not marketing fluff
- CTA: "Submit Sourcing Request →" — clear

### /v2/en/solutions/pumps ✅ Good

- Text: 1812 chars, 3 images, 8 links
- Structure mirrors compressors page
- Compatible brands: Grundfos, KSB, Flowserve, Sulzer, Ebara
- Good industrial specificity

### /v2/en/solutions/valves ✅ Good

- Text: 1819 chars, 3 images, 8 links
- Compatible brands: Emerson, Flowserve, Kitz, Velan, Cameron
- Good technical specificity

### /v2/en/solutions/hydraulic ✅ Good

- Text: 1834 chars, 3 images, 8 links
- Compatible brands: Yuken, Kawasaki, Eaton, Parker, Bosch Rexroth
- Covers cylinders, pumps, valves, power units

### /v2/en/solutions/automation ✅ Good

- Text: 1847 chars, 3 images, 8 links
- Compatible brands: SMC, Festo, CKD, Parker, Norgren

### /v2/en/solutions/filtration ✅ Good

- Text: 1815 chars, 3 images, 8 links
- Compatible brands: Pall, Donaldson, Mahle, HYDAC, Parker

### /v2/en/solutions/mechanical-transmission ✅ Good

- Text: 1811 chars, 3 images, 8 links
- Compatible brands: SKF, FAG, Timken, NSK, NTN

### /v2/en/solutions/maintenance ❌ Empty Page

- **Text: 43 chars** (only navigation text)
- **0 images, 0 links, 0 content**
- This system type does not exist in `system-pages.json`
- **Severity: P1** — results in a broken/empty page for users

---

## 3. Utility Pages Audit

### /v2/en/capability-network ⚠️ Needs Images

- Text: 2266 chars, 0 images
- Lists manufacturing capabilities: CNC machining, casting, forging, assembly, testing
- Content is good but **needs real factory capability images**
- CTA present

### /v2/en/oem ⚠️ Needs Images

- Text: 2917 chars, 0 images
- Strong IP protection messaging — critical for OEM trust
- Sections: IP Protection, Confidential Development, Custom Manufacturing, NDA Process
- **Needs factory/OEM imagery for credibility**

### /v2/en/request ⚠️ Basic

- Text: 939 chars, 0 images
- Has "How It Works" steps: Submit → Analyze → Match → Source
- CTA: "Contact via Existing Form →" — somewhat weak, could be "Submit Your Requirement"
- Form fields not rendered in static HTML (likely client component)

### /v2/en/partners/distributor ✅ Good

- Text: 1223 chars, 0 images
- Value proposition: Direct pricing, 8 categories, technical support, logistics
- Requirements listed
- **Needs partner/capability imagery**

### /v2/en/partners/service-center ✅ Good

- Text: 1145 chars, 0 images
- Good value prop for repair/service centers
- **Needs imagery**

### /v2/en/industries/mining ✅ Good

- Text: 1243 chars, 0 images
- Links to relevant systems: Compressor, Hydraulic, Pumps, Filtration
- **Needs mining application imagery**

---

## 4. Content Quality Assessment

### What Works Well

| Aspect | Rating | Notes |
|--------|:------:|-------|
| Industrial positioning | **9/10** | Clearly not e-commerce; supply chain partner framing is consistent |
| "What we are NOT" | **9/10** | Excellent trust-building — rare in B2B industrial sites |
| System page structure | **8/10** | Consistent: Problem → Capability → Applications → Brands → CTA |
| Brand references | **8/10** | Real industrial brands listed (Atlas Copco, SKF, Parker, etc.) |
| CTA clarity | **7/10** | "Submit Sourcing Request" is clear, action-oriented |
| Multi-language | **7/10** | 3 languages working, one i18n bug |
| No fake claims | **10/10** | No fabricated case studies, no fake certifications, no fake factory names |

### What Needs Improvement

| Issue | Severity | Page(s) |
|-------|:--------:|---------|
| "What we are NOT" not translated (RU/ZH) | **P1** | Homepage RU, ZH |
| Maintenance solution page empty | **P1** | /solutions/maintenance |
| Zero images on 10 of 17 pages | **P2** | Capability, OEM, RFQ, Partners, Industries |
| RFQ form CTA could be stronger | **P3** | /request |
| Some descriptions feel AI-generated (generic, template-like) | **P3** | All solution pages |

### AI-Generation Assessment

The content reads as **professionally structured but noticeably templated**:

- All 7 active solution pages follow an identical structure with near-identical sentence patterns
- Descriptions are accurate but generic: "X is the heart of Y industry..."
- No unique industry anecdotes, specific technical parameters, or real-world sourcing examples
- **Verdict**: Functional for MVP. Needs operator-written case examples after real buyer interactions.

**AI-feel score: 6/10** (10 = obvious AI, 1 = indistinguishable from human expert)

---

## 5. Image Audit

| Page | Images | Has Hero | Has System Images | Status |
|------|:------:|:--------:|:-----------------:|:------:|
| Homepage EN | 8 | ✅ | ✅ (system cards) | OK |
| Homepage RU | 8 | ✅ | ✅ | OK |
| Homepage ZH | 8 | ✅ | ✅ | OK |
| Compressors | 4 | ✅ | ✅ | OK |
| Pumps | 3 | ✅ | ✅ | OK |
| Valves | 3 | ✅ | ✅ | OK |
| Hydraulic | 3 | ✅ | ✅ | OK |
| Automation | 3 | ✅ | ✅ | OK |
| Filtration | 3 | ✅ | ✅ | OK |
| Mechanical | 3 | ✅ | ✅ | OK |
| Maintenance | 0 | ❌ | ❌ | BROKEN |
| Capability Network | 0 | ❌ | ❌ | Missing |
| OEM | 0 | ❌ | ❌ | Missing |
| RFQ | 0 | — | — | Acceptable (form page) |
| Partners: Distributor | 0 | ❌ | ❌ | Missing |
| Partners: Service Center | 0 | ❌ | ❌ | Missing |
| Industries: Mining | 0 | ❌ | ❌ | Missing |

**Image coverage: 7/17 pages have images (41%)** — below acceptable threshold for a visual industrial site.

---

## 6. CTA Audit

| Page | CTA Text | Clarity | Actionability |
|------|----------|:-------:|:-------------:|
| Homepage | "Submit Requirement →" | ✅ Clear | ✅ Direct |
| Solutions (all) | "Submit Sourcing Request →" | ✅ Clear | ✅ Direct |
| Capability Network | "Submit Requirement →" | ✅ Clear | ✅ Direct |
| OEM | "Start OEM Inquiry →" | ✅ Clear | ✅ Direct |
| RFQ | "Contact via Existing Form →" | ⚠️ Weak | ⚠️ Indirect |
| Partners | "Apply as Distributor →" / "Apply Now →" | ✅ Clear | ✅ Direct |
| Industries | "Submit Requirement →" | ✅ Clear | ✅ Direct |

---

## 7. Recommendations

### P1 — Must Fix Before Production

1. **Fix i18n for "What we are NOT"**: The `what_we_are_not` array in `company-profile.json` needs `zh` and `ru` translations
2. **Remove or create maintenance page**: Either add maintenance system data or remove the route from system-pages.json

### P2 — Should Fix for Credibility

3. **Add images to utility pages**: Capability Network, OEM, Partner pages need real factory/industrial images from asset-intelligence
4. **Add industry page images**: Mining (and other industry pages) need relevant application imagery

### P3 — Consider for Polish

5. **Diversify solution page copy**: Add unique technical details per system to reduce template feel
6. **Improve RFQ CTA**: Change "Contact via Existing Form →" to "Submit Your Requirement →"

---

## 8. Overall Score

| Category | Score | Weight | Weighted |
|----------|:-----:|:------:|:--------:|
| Industrial positioning | 9/10 | 25% | 2.25 |
| Content authenticity | 7/10 | 20% | 1.40 |
| Visual/imagery | 4/10 | 20% | 0.80 |
| CTA effectiveness | 7/10 | 15% | 1.05 |
| Multi-language | 7/10 | 10% | 0.70 |
| No fake data | 10/10 | 10% | 1.00 |
| **TOTAL** | | | **7.20/10** |

**Verdict**: Functional industrial B2B MVP. Two P1 bugs to fix. Imagery needs significant work before production launch.

---

## 9. Compliance Check

| Rule | Status |
|------|:------:|
| No modification to V1 pages | ✅ Confirmed |
| No modification to asset registry | ✅ Confirmed |
| No fabricated case studies | ✅ Confirmed |
| No fake certifications | ✅ Confirmed |
| No fake factory names | ✅ Confirmed |
| No SKU/product catalog format | ✅ Confirmed |
| V2 label visible | ✅ "HISVIA V2" badge in nav |
| "Not for production use" footer | ✅ Present on all pages |

---

*End of audit. Awaiting human review before any changes.*
