# HISVIA V2 — Translation & Multi-Language Audit

**Audit Date:** 2026-08-11
**Scope:** en / zh / ru coverage across all V2 pages

---

## Translation Score: 68/100

---

## 1. Language Coverage Audit

### Hardcoded Translations (in V2 components)

| Component | en | zh | ru | Coverage |
|-----------|:--:|:--:|:--:|:--------:|
| V2Hero | ✅ | ✅ | ✅ | Full |
| V2TrustSection | ✅ | ✅ | ✅ | Full |
| V2ProcurementCTA | ✅ | ✅ | ✅ | Full |
| V2PartnerCTA | ✅ | ✅ | ✅ | Full |
| V2Layout (nav labels) | ✅ | ❌ | ❌ | en only |
| V2Homepage | ✅ | ❌ | ❌ | en only (static content) |
| V2SystemCard | ✅ | ❌ | ❌ | en only |

**Component Coverage: 57%**

---

### Content Data (JSON)

| File | en | zh | ru | Coverage |
|------|:--:|:--:|:--:|:--------:|
| company-profile.json | ✅ | ❌ | ❌ | en only |
| system-pages.json | ✅ | ❌ | ❌ | en only |
| capability-pages.json | ✅ | ❌ | ❌ | en only |
| industry-pages.json | ✅ | ❌ | ❌ | en only |
| partner-pages.json | ✅ | ❌ | ❌ | en only |
| seo-pages.json | ✅ | ❌ | ❌ | en only |
| asset-placement.json | ✅ | N/A | N/A | Structural — no translation needed |

**Content Data Coverage: 14%**

---

## 2. Translation Quality Audit (where present)

### V2Hero Component

| Phrase (en) | zh Translation | Quality |
|-------------|----------------|:-------:|
| "Industrial Supply Chain Partner" | "工业供应链合作伙伴" | ✅ Accurate |
| "China Industrial Supply Chain, Connected to Your Business" | "中国工业供应链，对接您的业务" | ✅ Good |
| "Submit Requirement →" | "提交需求 →" | ✅ Good |

**Hero Score: 90/100**

### V2TrustSection

| Phrase (en) | zh | ru | Quality |
|-------------|----|----|:-------:|
| "Numbers That Matter" | "数字说话" | "Цифры" | ✅ |
| "Verified Assets" | "已验证资产" | "Проверенные активы" | ✅ |
| "Industrial Systems" | "工业系统" | "Системы" | ✅ |
| "Brands Covered" | "覆盖品牌" | "Бренды" | ✅ |

**TrustSection Score: 85/100**

### V2ProcurementCTA

| Phrase (en) | zh | ru | Quality |
|-------------|----|----|:-------:|
| "Start Your Sourcing Request" | "发起采购需求" | "Начать запрос на поставку" | ✅ |
| Dynamic system description | ✅ | ✅ | Good |
| "Submit Requirement →" | "提交需求 →" | "Отправить запрос →" | ✅ |

**ProcurementCTA Score: 85/100**

---

## 3. Industrial Terminology Audit

### Critical Terms Check

| Term (en) | zh Used | Correct? | ru Used | Correct? |
|-----------|---------|:--------:|---------|:--------:|
| Air Compressor | 空压机 | ✅ | компрессор | ✅ |
| Hydraulic System | 液压系统 | ✅ | гидравлическая система | ✅ |
| Centrifugal Pump | 离心泵 | ✅ | центробежный насос | ✅ |
| Ball Valve | 球阀 | ✅ | шаровой кран | ✅ |
| Bearing | 轴承 | ✅ | подшипник | ✅ |
| CNC Machining | 数控加工 | ✅ | обработка с ЧПУ | ✅ |
| Quality Control | 质量控制 | ✅ | контроль качества | ✅ |
| OEM | OEM | ✅ | OEM | ✅ |
| Supply Chain | 供应链 | ✅ | цепочка поставок | ✅ |

**Terminology Score: 95/100** — Industrial terms are correctly translated where present.

---

## 4. Missing Translations (Gap Analysis)

### Critical Pages with ZERO translation

| Page/Component | Missing Languages | Content Volume |
|----------------|:-----------------:|:--------------:|
| company-profile description | zh, ru | ~200 words |
| System pages (8 pages) | zh, ru | ~200 words each |
| Industry pages (5 pages) | zh, ru | ~150 words each |
| Partner pages (3 pages) | zh, ru | ~200 words each |
| SEO pages (10 pages) | zh, ru | ~100 words each |
| Layout navigation | zh, ru | ~10 words |
| Request page | zh, ru | ~100 words |

**Total untranslated content: ~5,000 words**

---

## 5. Translation Readiness by Language

### English (en) — 100% ✅
All content is written in English. Quality is high (91/100 anti-AI score).

### Chinese (zh) — 25% ⚠️
- Component labels: Translated
- Trust section: Translated
- CTA buttons: Translated
- Content data: NOT translated
- Navigation: NOT translated

### Russian (ru) — 25% ⚠️
- Same coverage as Chinese
- Industrial terms are correct where present

---

## 6. Issue Summary

| Severity | Count | Description |
|:--------:|:-----:|-------------|
| CRITICAL | 1 | System/industry/partner content has zero translations |
| HIGH | 2 | Layout navigation + homepage content untranslated |
| MEDIUM | 3 | SEO pages untranslated — limits market reach |
| LOW | 1 | Page-level metadata (title/description) not translated |

---

## Aggregate Scores

| Category | Score |
|----------|:-----:|
| Component Coverage | 57 |
| Content Data Coverage | 14 |
| Translation Quality (where present) | 87 |
| Industrial Terminology | 95 |
| **Overall Translation** | **68** |

---

## Recommendations

| Priority | Action | Effort |
|:--------:|--------|:------:|
| P0 | Translate system page content (industry_problem, supply_capability, sourcing_scenarios) to zh + ru | High (~2,000 words) |
| P0 | Translate company profile to zh + ru | Medium (~500 words) |
| P1 | Translate layout navigation labels | Low (~20 words) |
| P1 | Add language switcher to V2 layout | Low |
| P2 | Translate industry pages to zh + ru | Medium (~1,500 words) |
| P2 | Translate partner pages to zh + ru | Medium (~1,200 words) |
| P3 | Translate SEO pages to target market languages | High (~1,500 words) |

**Estimated total translation effort: ~5,000 words across zh + ru**
