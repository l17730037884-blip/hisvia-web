# HISVIA Factory Verification Flow

## Overview

All factories must pass verification before being presented to buyers. No unverified factory data is published.

## Verification Tiers

| Tier | Name | Requirements | Buyer Visible |
|:----:|------|-------------|:------------:|
| 1 | Document Verified | Business license, export registration, ISO/API certs | ✅ |
| 2 | Factory Verified | On-site audit: capacity, quality, equipment | ✅ |
| 3 | Partner Verified | 3+ completed orders, positive feedback | ✅ |

## Onboarding Flow

```
APPLICATION
    ↓
Factory submits profile via HISVIA
    ↓
DOCUMENT REVIEW (3-5 business days)
    ├── Business license verification
    ├── Certificate validation
    ├── Export registration check
    └── Decision: PROCEED / REJECT / NEED_MORE
    ↓
MEDIA REVIEW
    ├── Factory exterior photos
    ├── Production line photos
    ├── QC area photos
    └── Decision: VERIFIED / SUSPICIOUS
    ↓
CAPABILITY TAGGING
    ├── Auto-tag system types from products
    ├── Auto-tag manufacturing processes
    └── Manual review & adjustment
    ↓
ON-SITE AUDIT (optional, Tier 2)
    ├── Physical facility inspection
    ├── Equipment verification
    ├── Sample production review
    └── Audit report
    ↓
ACTIVATION
    ├── Factory profile published (tier-based)
    ├── Products linked to HISVIA taxonomy
    └── Available for buyer matching
```

## Status States

| Status | Description | Next Action |
|--------|-------------|-------------|
| `pending` | Application received, awaiting review | Document review |
| `document_review` | Documents under review | Approve / Reject / Need more |
| `media_review` | Factory photos under review | Verify / Flag |
| `capability_tagging` | System types and processes being tagged | Manual review |
| `audit_scheduled` | On-site audit scheduled | Conduct audit |
| `verified` | Factory verified (Tier 1 or higher) | Activate |
| `active` | Factory live on platform | Monitor |
| `rejected` | Application rejected | Notify with reason |
| `suspended` | Temporarily removed | Review & reinstate |

## Rejection Reasons

- Unable to verify business license
- Certificate validation failed
- Factory photos do not match claimed capability
- Export experience cannot be confirmed
- Quality concerns identified during audit

## Rules

- Never activate a factory without document verification (minimum Tier 1)
- Never claim Tier 3 without documented order history
- All rejection reasons must be documented
- Factory can re-apply after 6 months if rejected
