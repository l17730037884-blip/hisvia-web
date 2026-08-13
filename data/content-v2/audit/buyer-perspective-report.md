# HISVIA V2 — Buyer Perspective Audit

**Audit Date:** 2026-08-11
**Method:** Simulated first-visit journey for 4 buyer types

---

## Buyer Journey Audit

### Journey 1: Compressor Parts Buyer (Mining)

```
Landing: /v2/en
  ↓ Scroll: "8 Industrial Systems" grid
  ↓ Click: "Air Compressor Systems"
  ↓ Read: industry_problem → supply_capability → applications → brands → scenarios
  ↓ CTA: "Submit Requirement"
```

| Checkpoint | Status | Time (simulated) |
|------------|:------:|:----------------:|
| Understand HISVIA within 5s | ✅ | 3s |
| Find relevant system | ✅ | 5s |
| See compatible brands | ✅ | 8s |
| Find specific sourcing scenario | ✅ | 12s |
| Know what to do next | ✅ | 15s |

**Score: 92/100**

---

### Journey 2: Hydraulic Valve Buyer (Oil & Gas)

```
Landing: /v2/en
  ↓ See: "8 Industrial Systems" → "Hydraulic Systems" or "Valves & Flow Control"
  ↓ Navigate to appropriate system
  ↓ Find: Oil & Gas application reference
  ↓ See: Compatible brands (Yuken, Kawasaki, Eaton)
```

| Checkpoint | Status | Time |
|------------|:------:|:----:|
| Find hydraulic content | ✅ | 4s |
| Find valve content | ✅ | 4s |
| See oil/gas application | ✅ | 10s |
| API/ASME certification mentioned | ✅ | In industry page |

**Score: 88/100**

---

### Journey 3: Pump Spare Parts Buyer (Water Treatment)

```
Landing: /v2/en
  ↓ Industry landing: /industries/water-treatment
  ↓ See: "Pump impellers and wear rings" in priorities
  ↓ Navigate: /solutions/pumps
  ↓ CTA: Submit requirement
```

| Checkpoint | Status | Time |
|------------|:------:|:----:|
| Find water treatment industry | ✅ | 5s |
| See pump-related priority | ✅ | 8s |
| Cross-link to pump system page | ⚠️ | Manual — no in-page link |
| Find mechanical seal scenario | ✅ | 15s |

**Score: 85/100**

---

### Journey 4: Automation Parts Buyer (Manufacturing)

```
Landing: /v2/en
  ↓ /industries/manufacturing
  ↓ See: "VFD and servo drive replacements" priority
  ↓ Navigate: /solutions/automation-control
  ↓ See: "VFD replacement for pump motor speed control" scenario
```

| Checkpoint | Status | Time |
|------------|:------:|:----:|
| Find manufacturing industry | ✅ | 5s |
| See automation priority | ✅ | 8s |
| Match to system page | ✅ | 12s |
| VFD scenario matches need | ✅ | 15s |

**Score: 90/100**

---

## Aggregate Buyer Journey Score: 89/100 ✅

### What Works
- Clear system-to-industry mapping
- Sourcing scenarios speak buyer language
- Industry pages have specific equipment lists
- CTA is consistently present

### What Needs Improvement
- No cross-links between industry pages and system pages
- No search/filter capability
- No "I need help finding my system" guidance for unfamiliar buyers
- Asset images are placeholder (asset_id references only, no actual images)

### Buyer Questions Audit

For each system page, we checked if it answers these common buyer questions:

| Question | Compressor | Hydraulic | Pumps | Valves | Filtration | Pneumatic | Mech Trans | Automation |
|----------|:----------:|:---------:|:-----:|:------:|:----------:|:---------:|:----------:|:----------:|
| What parts can you supply? | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Which brands are compatible? | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| What industries do you serve? | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| How do I place an order? | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| What are typical lead times? | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| What quality standards? | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Can you do custom/OEM? | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| What about urgent orders? | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

- ✅ = Directly addressed
- ⚠️ = Implied but not explicit on page
- ❌ = Missing

**Key Missing Answers:**
- Lead times (all 8 systems)
- Urgent order capability (all 8 systems)
- OEM/custom capability cross-reference (should link to capability-network)
