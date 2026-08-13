---
version: v1
document: HISVIA Operator Playbook
audience: Operations team
status: draft
last_updated: 2026-08-11
---

# HISVIA Operator Playbook — Daily & Weekly Operations

## Role Overview

The HISVIA operator manages the supply-demand matching pipeline:
find Chinese factories → verify capabilities → connect with overseas buyers → facilitate RFQs.

This is a manual operation workflow. No AI automation at this stage.

---

## Daily Operations

### Morning (9:00-10:00) — Supplier Sourcing

**Goal**: Identify 3-5 new potential suppliers per day.

1. **B2B Platform Search** (30 min)
   - Open Alibaba.com / Made-in-China.com
   - Search by product category (e.g., "screw compressor air end", "hydraulic cylinder manufacturer")
   - Filter: Gold Supplier + Assessed Supplier + Export experience
   - Record promising factories in `supplier-contact-log.json` with status `identified`

2. **Qualify** (15 min)
   - Check company website
   - Verify business license on 天眼查/qichacha
   - Check product catalog matches HISVIA taxonomy
   - Note any red flags (no export, no website, suspicious)

3. **Outreach** (15 min)
   - Send initial message via platform or email
   - Template: Introduce HISVIA, explain partnership value, request catalog
   - Update status to `contacted` with date

### Midday (10:00-12:00) — Buyer Outreach

**Goal**: Contact 5-10 potential buyers per day.

1. **LinkedIn Search** (30 min)
   - Search by: industry + country + job title (procurement, sourcing, maintenance)
   - Target countries: Russia, Kazakhstan, UAE (rotate daily)
   - Send connection request with personalized note
   - Record in `buyer-contact-log.json` with status `identified`

2. **Email Outreach** (20 min)
   - Research company website for procurement contact
   - Send personalized email introducing HISVIA
   - Reference specific solution page relevant to their industry
   - Update status to `contacted`

3. **Follow-ups** (10 min)
   - Check CRM for overdue follow-ups
   - Send Day 3 / Day 7 / Day 14 follow-up messages
   - Update status accordingly

### Afternoon (14:00-16:00) — Response Handling

**Goal**: Process all inbound responses and RFQs.

1. **Check Notifications** (10 min)
   - Website RFQ form submissions
   - Email inbox
   - LinkedIn messages
   - WeChat messages (suppliers)

2. **Respond to Suppliers** (20 min)
   - Interested factories: request company profile, product catalog, certificates
   - Schedule WeChat call or meeting
   - Update status to `replied` or `meeting`

3. **Respond to Buyers** (30 min)
   - Acknowledged responses: thank them, ask qualifying questions
   - RFQ inquiries: confirm requirement details, map to HISVIA system
   - Update status to `replied` or `qualified`

4. **RFQ Processing** (30 min)
   - New RFQs: validate completeness, check for spam
   - Match to system type and category
   - Identify potential supplier matches
   - Document matching in RFQ record

### End of Day (16:00-16:30) — Logging

1. **Update Contact Logs**
   - All new contacts added to respective JSON logs
   - All status changes recorded with timestamps

2. **Update CRM**
   - New leads created for qualified buyers
   - Follow-up tasks scheduled

3. **Daily Notes**
   - Brief summary of day's progress
   - Notable responses or issues
   - Plan for tomorrow

---

## Weekly Operations

### Monday — Planning

1. Review last week's dashboard numbers
2. Set weekly targets (factories to contact, buyers to reach)
3. Plan which market/category to focus on
4. Check exhibition calendar for upcoming events

### Wednesday — Deep Work

1. **Supplier Deep Dive**: Focus on one system type
   - Research all manufacturers in that category
   - Compare capabilities, pricing indications, export experience
   - Build shortlist of top 5

2. **Content Review**: Check HISVIA website
   - Any outdated information?
   - New brands or applications to add?
   - SEO keywords performing?

### Friday — Weekly Review

1. **Generate Weekly Dashboard**
   - Update `business-dashboard/dashboard-schema.json` with this week's snapshot
   - Calculate conversion rates (only if N>10)
   - Compare with previous week

2. **Pipeline Review**
   - Open RFQs: status check, any stuck?
   - Supplier pipeline: which factories are close to onboarding?
   - Buyer pipeline: which leads are close to RFQ?

3. **Quality Check**
   - Review recent RFQ matches for accuracy
   - Check supplier profiles for completeness
   - Ensure no stale follow-ups (>14 days overdue)

4. **Next Week Planning**
   - Priorities for each market
   - Which factories to visit/audit
   - Exhibition or event preparation

---

## Key Tools

| Tool | Purpose | Access |
|------|---------|--------|
| Alibaba.com | Supplier sourcing | Web |
| Made-in-China.com | Supplier sourcing | Web |
| 天眼查 | Company verification | Web/App |
| LinkedIn Sales Navigator | Buyer sourcing | Premium |
| CRM (`lib/crm/`) | Lead tracking | Internal |
| Supplier contact log | Factory pipeline | Internal JSON |
| Buyer contact log | Buyer pipeline | Internal JSON |
| RFQ system | Requirement management | Internal |
| WeChat | Supplier communication | Mobile/Desktop |
| Telegram | Russia/CIS buyer communication | Mobile/Desktop |

## Communication Templates

### Initial Supplier Message (Chinese)

```
您好，我是HISVIA的[Name]。

HISVIA是一个工业供应链平台，帮助中国工厂连接海外买家，
特别是俄罗斯、哈萨克斯坦、中东市场。

我们正在寻找优质的[产品类型]制造商合作。
合作模式：[简述]。

如果贵司有兴趣拓展海外市场，方便提供产品目录和公司资料吗？

期待您的回复。
```

### Initial Buyer Message (English)

```
Hi [Name],

I came across [Company] and noticed you work in [industry].

I'm with HISVIA — we connect overseas industrial buyers with
Chinese manufacturing capabilities for [system type] parts and systems.

Our focus is on helping companies like yours find alternative
suppliers for [brand] compatible parts with better pricing and lead times.

Would you be open to a brief chat about your current sourcing needs?

Best regards,
[Name]
HISVIA
```

### RFQ Acknowledgment

```
Thank you for your inquiry, [Name].

We've received your requirement for [product/brand].
Our team will review and match with suitable Chinese suppliers.

You can expect an initial response within 1-2 business days.
If you have any additional details (drawings, photos, quantities),
please feel free to share them.

Best regards,
[Name]
HISVIA
```

## Rules

- Never fabricate contact attempts that didn't happen
- Never inflate pipeline numbers for reports
- Never promise supply capability not yet verified
- Never share supplier contact details without consent
- Never share buyer information without consent
- All timestamps must reflect actual activity time
- Zero counts in any metric are acceptable and expected at start
