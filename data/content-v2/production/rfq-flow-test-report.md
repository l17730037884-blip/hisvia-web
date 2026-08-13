# HISVIA V2 RFQ Flow Test Report

## Test Scenarios

### Scenario 1: Russian Mining Buyer
- **Persona:** Procurement manager, Russian mining company
- **Need:** Atlas Copco compressor air filters
- **Entry:** V2 homepage → Air Compressor Systems page → Submit Requirement
- **Result:** ✅ System page shows compressor filter sourcing scenario. CTA leads to request form.

### Scenario 2: Kazakh Distributor
- **Persona:** Industrial parts distributor, Kazakhstan
- **Need:** Hydraulic pump replacements, Yuken-compatible
- **Entry:** V2 homepage → Hydraulic Systems page → Review compatible brands → Submit
- **Result:** ✅ Hydraulic page lists Yuken as compatible brand. Sourcing scenarios include pump replacement.

### Scenario 3: OEM Client
- **Persona:** European manufacturer seeking custom parts
- **Need:** Custom CNC machining + IP protection
- **Entry:** V2 homepage → OEM page → Review NDA process → Submit inquiry
- **Result:** ✅ OEM page has 6-step process including NDA. IP protection measures listed.

## API Endpoint

- **POST /api/rfq/match** — Functional
- Returns: parsed requirement, matched systems, asset matches, missing info
- Disclaimer included: "HISVIA does not auto-quote or guarantee supply"

## Flow Completeness

| Step | Compressor Buyer | Hydraulic Buyer | OEM Buyer |
|------|:---------------:|:---------------:|:---------:|
| Land on homepage | ✅ | ✅ | ✅ |
| Find relevant system | ✅ | ✅ | ✅ |
| View supply capability | ✅ | ✅ | ✅ |
| See compatible brands | ✅ | ✅ | N/A |
| Find sourcing scenario | ✅ | ✅ | N/A |
| Review process | ✅ | ✅ | ✅ |
| CTA to submit | ✅ | ✅ | ✅ |
| Submit form | ✅ | ✅ | ✅ |

## Gaps
- RFQ form in V2 is a link to V1 request form
- No in-page RFQ preview/matching in V2
- Missing: email notification after RFQ submission

## Overall: ✅ RFQ flow is functional for all 3 buyer types
