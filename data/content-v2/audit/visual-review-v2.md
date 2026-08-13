---
version: v2
audit: V2 Design-Taste Review — Phase 24.5
framework: design-taste + ui-ux-kit + anti-slop
date: 2026-08-11
status: awaiting_human_review
---

# HISVIA V2 — Design & Taste Audit

## Design Read

> **Reading this as: an industrial B2B supply-chain landing + multi-page system
> for overseas procurement managers (Russia/CIS, Middle East), functional-industrial
> aesthetic with navy+amber palette, built in Next.js + Tailwind.**
>
> **Dials**: DESIGN_VARIANCE 3 (clean grid, slight asymmetry in hero layout) ·
> MOTION_INTENSITY 1 (static, no animation present) · VISUAL_DENSITY 5 (balanced —
> enough content to scan, enough white space to breathe).

---

## 1. Anti-Slop Scan (Pass/Fail)

Applying the `design-taste` + `ui-ux-kit` anti-slop catalogue:

| Pattern | Detected? | Verdict |
|---------|:---------:|:-------:|
| Gradient text (`bg-clip-text`) | ❌ No | ✅ |
| Glassmorphism (`backdrop-blur`) | ❌ No | ✅ |
| Side-stripe borders | ❌ No | ✅ |
| Over-rounded cards (>24px) | ❌ No | ✅ |
| Ghost-card (border + shadow) | ❌ No | ✅ |
| Hero-metric template (big number + label) | ❌ No | ✅ |
| Identical card grids (icon+heading+text endless) | ⚠️ System cards are same-size but content-differentiated | ⚠️ Borderline |
| Eyebrow on EVERY section | ❌ Only 1 eyebrow (Hero kicker) — deliberate | ✅ |
| Numbered section markers (01/02/03) | ❌ No | ✅ |
| Hand-drawn SVG illustrations | ❌ No | ✅ |
| Stripe backgrounds | ❌ No | ✅ |
| Fake div-based product previews | ❌ No | ✅ |
| Decorative text strip at hero bottom | ❌ No | ✅ |
| Em-dashes (—) in copy | ⚠️ 4 found in body text | ⚠️ P3 |
| Marketing buzzwords | ❌ None detected | ✅ |
| AI-favorite serif fonts | ❌ No serif used | ✅ |
| Pills/labels overlaid on images | ❌ No | ✅ |
| Version footers on marketing pages | ⚠️ "Phase 17 · Not for production use" — intentional dev badge | ✅ |
| "Quietly trusted by" social proof | ❌ No | ✅ |
| Generic step labels (Stage 1/2/3) | ⚠️ OEM page has "1. Submit OEM inquiry..." — verb-noun, acceptable | ✅ |

**Anti-slop score: 18/20 clean. Only 2 minor items (em-dashes, card grid uniformity).**

---

## 2. Design System Audit

### 2.1 Color Palette

| Token | Usage | Assessment |
|-------|-------|-----------|
| `navy` | Primary text, headings, logo | Good — dark industrial, avoids pure black |
| `amber` | Accent, CTA, eyebrow | Good — warm industrial signal, not AI-purple |
| `steel` | Secondary text, nav links | Good — muted but readable |
| `graphite` | Body text, labels | Good — softer than navy for reading |
| `fog` | Section backgrounds, cards | Good — tinted near-white, not flat #fff |
| `line` | Borders, dividers | Good — subtle separation |
| `white` | Page background | Acceptable — used as page base only |

**Verdict**: ✅ Clean, intentional palette. No AI-purple/blue glow. No cream+brass consumer palette. Navy+amber reads industrial/professional, not SaaS.

**Concern**: Amber as sole accent — check contrast on fog background. The eyebrow `text-amber` on `bg-fog` may be borderline for AA compliance (amber is typically low-contrast).

### 2.2 Typography

| Element | Spec | Assessment |
|---------|------|-----------|
| Logo | `text-[16px] font-bold text-navy` | Good — compact, no unnecessary branding flourish |
| Nav links | `text-[13px] text-steel` | Functional — small but scannable |
| Hero eyebrow | `text-[12px] font-semibold uppercase tracking-widest` | ⚠️ Eyebrow pattern. But used ONCE, with real content ("Industrial Supply Chain Partner"), not decorative. Acceptable. |
| Hero h1 | `text-[36px] font-bold leading-tight` | Good — two-line max, fits viewport |
| Section h2 | `text-[22px] font-bold` | Good — clear hierarchy step from h1 |
| Body | Not explicitly sized — inherits browser default (~16px) | ⚠️ Body text relies on browser default. Should explicitly set to 15-16px with 1.6 line-height |
| Cards | Mixed — system cards have their own text sizing | Acceptable — consistent within cards |

**Verdict**: ⚠️ Functional but incomplete. Missing explicit body typography scale. Font stack appears to be system default (no custom font loading) — good for performance, but industrial B2B could benefit from one distinctive sans-serif (e.g., Inter or a workhorse grotesk).

**Missing**: No `text-wrap: balance` on headings (visible in some cases). No explicit line-height on body text.

### 2.3 Layout & Spacing

| Pattern | Assessment |
|---------|-----------|
| `max-w-wrap` wrapper | ✅ Consistent container — good |
| `px-8` horizontal padding | ✅ 32px — good breathing room |
| `py-20` hero padding | ✅ 80px — substantial but not excessive |
| `gap-10` flex gap in hero | ✅ 40px — good rhythm |
| `gap-5` nav gap | ✅ 20px — good link separation |
| Section separation: `border-b border-line` | ✅ Simple, clean — no decorative flourishes |
| Card grids: 2-column on desktop | ✅ Functional, not identical-card-grid slop |

**Verdict**: ✅ Clean, consistent layout. No anti-patterns. Sections have clear separation without decoration.

### 2.4 Component States

| Component | Hover | Focus | Active | Assessment |
|-----------|:-----:|:-----:|:------:|-----------|
| Nav links | `hover:text-navy` (from steel) | ❌ Not specified | ❌ Not specified | P2 — missing focus rings |
| CTA button | ✅ Has hover state | ❌ Not visible in static render | ✅ | P2 — needs `:focus-visible` |
| System cards | ✅ Has hover | ❌ Not specified | ❌ Not specified | P2 |
| RFQ form | Client component — not inspected | — | — | — |

**Verdict**: ⚠️ Hover states present on links, but **no visible focus indicators** detected. This is an accessibility P2. Per `design-taste` rules: "Keyboard users never see hover — focus is separate, never `outline: none` without a `:focus-visible` replacement."

---

## 3. Surface-Specific Audit (Landing/Marketing Profile)

Per `ui-ux-kit` surface rules for Landing/Marketing:

### 3.1 Hero Section

| Check | Status |
|-------|:------:|
| Hero fits viewport (no scroll to see CTA) | ✅ "Submit Requirement →" visible |
| h1 ≤ 2 lines | ✅ |
| Subtext ≤ 20 words | ✅ The body paragraph is concise |
| CTA visible without scroll | ✅ |
| Hero image present | ✅ 8 images total on page, hero area has content layout |
| No fake product UI in hero | ✅ Clean — just text + CTA |

### 3.2 Trust Signals

| Signal | Present? | Quality |
|--------|:--------:|:-------:|
| "What we are NOT" section | ✅ | **Excellent** — unique, honest, builds real trust |
| Supplier verification tiers | ✅ | Visual → Document → Factory → Partner — credible |
| Real brand references | ✅ | Atlas Copco, SKF, Parker — real industrial brands |
| No fake testimonials | ✅ | None present — honest |
| No fake customer logos | ✅ | None present — honest |
| Verification disclaimer | ✅ | "HISVIA does not guarantee supplier performance" — honest |

### 3.3 Conversion Path

| Check | Status |
|-------|:------:|
| Primary CTA on hero | ✅ "Submit Requirement →" |
| CTA repeated in appropriate sections | ✅ System cards link to solutions |
| No competing CTAs | ✅ Single primary action throughout |
| CTA text is verb + object | ✅ "Submit Requirement" — follows design-taste rule |
| RFQ page exists | ✅ `/request` |
| Expected response time stated | ❌ Missing — adds uncertainty |

### 3.4 Content Structure

| Section | Purpose | Quality |
|---------|---------|:-------:|
| Hero | Positioning + CTA | ✅ Clear |
| What we are NOT | Trust / Differentiation | ✅ Excellent |
| Value Proposition (3 audiences) | Who this is for | ✅ Good segmentation |
| Supplier Verification | Trust mechanism | ✅ Good |
| 8 System Cards | Navigation + capability overview | ✅ Functional |
| Factory Trust | Social proof / credibility | ✅ Good |
| Partner CTA | Secondary conversion | ✅ Appropriate |

**Structure score: 9/10** — one of the best B2B industrial page structures I've seen. The "What we are NOT" section is genuinely differentiating.

---

## 4. Page-by-Page Scores

| # | Page | Design | Content | Trust | CTA | **Total** |
|---|------|:------:|:-------:|:-----:|:---:|:---------:|
| 1 | `/v2/en` Home | 8 | 9 | 9 | 8 | **8.5** |
| 2 | `/v2/ru` Home | 8 | 6* | 9 | 8 | **7.8** |
| 3 | `/v2/zh` Home | 8 | 6* | 9 | 8 | **7.8** |
| 4 | `/solutions/compressors` | 7 | 7 | 7 | 8 | **7.3** |
| 5 | `/solutions/pumps` | 7 | 7 | 7 | 8 | **7.3** |
| 6 | `/solutions/valves` | 7 | 7 | 7 | 8 | **7.3** |
| 7 | `/solutions/hydraulic` | 7 | 7 | 7 | 8 | **7.3** |
| 8 | `/solutions/automation` | 7 | 7 | 7 | 8 | **7.3** |
| 9 | `/solutions/filtration` | 7 | 7 | 7 | 8 | **7.3** |
| 10 | `/solutions/mechanical` | 7 | 7 | 7 | 8 | **7.3** |
| 11 | `/solutions/maintenance` | 0 | 0 | 0 | 0 | **0.0** ❌ |
| 12 | `/capability-network` | 5 | 8 | 6 | 7 | **6.5** |
| 13 | `/oem` | 5 | 8 | 8 | 7 | **7.0** |
| 14 | `/partners/distributor` | 5 | 7 | 7 | 7 | **6.5** |
| 15 | `/request` | 4 | 6 | 5 | 5 | **5.0** |

*\* RU/ZH scores docked for untranslated English sections.*

---

## 5. AI-Feel Assessment

Applying the "could someone look at this and say AI made it" test:

| Dimension | Score | Notes |
|-----------|:-----:|-------|
| Visual design | **2/10** AI-feel | Clean functional design, no decorative AI tells |
| Typography | **4/10** AI-feel | Functional but generic — could be any Tailwind site |
| Hero copy | **4/10** AI-feel | "China Industrial Supply Chain, Connected to Your Business" — professional, not AI-slosh |
| Solution page copy | **6/10** AI-feel | "X is the heart of Y industry" formula repeated 7 times — template detectable |
| "What we are NOT" | **1/10** AI-feel | Does NOT read like AI wrote it — specific, honest, differentiating |
| Verification section | **2/10** AI-feel | Reads like a real operations document |

**Overall AI-feel: 3.5/10** — passes the test. The solution pages are the weakest link.

---

## 6. Problem Summary (Design-Taste Priority)

### P0 — Broken

| ID | Issue | Page | Fix |
|----|-------|------|-----|
| P0-1 | Maintenance page renders empty | `/solutions/maintenance` | Add data or remove route |

### P1 — Trust / Language Degradation

| ID | Issue | Pages | Fix |
|----|-------|-------|-----|
| P1-1 | "What we are NOT" untranslated (EN on RU page) | `/v2/ru` | Add `ru` array to `company-profile.json` |
| P1-2 | "What we are NOT" untranslated (EN on ZH page) | `/v2/zh` | Add `zh` array to `company-profile.json` |
| P1-3 | Value proposition section untranslated on RU/ZH | `/v2/ru`, `/v2/zh` | Add localized arrays |

### P2 — Design Polish

| ID | Issue | Pages | Fix |
|----|-------|-------|-----|
| P2-1 | No focus indicators on interactive elements | All | Add `:focus-visible` ring styles |
| P2-2 | Zero images on utility pages | Capability, OEM, Partners | Add asset images from registry |
| P2-3 | Body text missing explicit font-size and line-height | All | Set `text-[15px] leading-relaxed` on body |
| P2-4 | Solution pages too templated — identical structure | 7 pages | Vary opening sentence; add unique system detail |
| P2-5 | RFQ page CTA says "Contact via Existing Form" | `/request` | Change to "Submit Requirement →" |
| P2-6 | Amber-on-fog contrast may fail AA | Homepage | Verify contrast ratio ≥4.5:1 |

### P3 — Minor

| ID | Issue | Pages | Fix |
|----|-------|-------|-----|
| P3-1 | 4 em-dashes in body copy | Homepage | Replace with commas/periods per taste rules |
| P3-2 | System cards have uniform height — borderline identical-card-grid | Homepage | Acceptable for now; vary heights on redesign |
| P3-3 | No `text-wrap: balance` on h2 headings | All | Add for better line breaks |

---

## 7. Category-Reflex Check

Per `anti-slop.md`:

- **First-order**: "Industrial B2B supply chain site" → the reflex would be navy+gray corporate, stock photos of factories, "global solutions" language. HISVIA uses navy+amber (not the reflex), real industrial brand names (not generic), and "What we are NOT" honesty (not corporate puffery). **✅ First-order reflex avoided.**

- **Second-order**: The anti-reflex of "not corporate" could fall into "startup-industrial" (bold typography, monospace, brutalist). HISVIA stays in functional-industrial without overcorrecting. **✅ Second-order reflex avoided.**

---

## 8. Overall Verdict

| Category | Score | Weight |
|----------|:-----:|:------:|
| Anti-slop cleanliness | 9/10 | 25% |
| Color & typography | 6/10 | 20% |
| Layout & spacing | 8/10 | 15% |
| Content authenticity | 8/10 | 20% |
| Trust signals | 9/10 | 10% |
| Accessibility | 5/10 | 10% |
| **Weighted Total** | **7.6/10** | |

**Verdict**: Solid industrial B2B foundation. The design language is clean and appropriate — no AI slop, no decorative excess. The three P1 i18n bugs and one P0 empty page are the only blockers. P2 items (images on utility pages, focus indicators, typography scale) are polish, not blockers.

**Strongest element**: "What we are NOT" section — rare honesty in B2B, genuinely differentiates.

**Weakest element**: Utility pages (Capability, OEM, Partners, RFQ) feel incomplete without images. The typography system needs a proper scale.

---

*Awaiting human confirmation before any code changes.*
