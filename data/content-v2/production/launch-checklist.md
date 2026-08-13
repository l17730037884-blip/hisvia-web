# HISVIA V2 Production Launch Checklist

## Before Launch

### Domain & Infrastructure
- [ ] DNS configured for hisvia.com
- [ ] SSL certificate active (HTTPS enforced)
- [ ] CDN configured (Vercel/Cloudflare)

### Analytics & Monitoring
- [ ] Google Analytics 4 installed
- [ ] Google Search Console verified
- [ ] Error monitoring configured
- [ ] Uptime monitoring configured

### Content
- [ ] All pages have zh/ru translations (P0 content done ✅)
- [ ] All images render correctly
- [ ] All CTAs link to correct destinations
- [ ] Contact email configured (partner@hisvia.com)

### SEO
- [ ] sitemap.xml generated for /en, /zh, /ru
- [ ] robots.txt allows indexing (remove noindex from V2 layout)
- [ ] Open Graph tags added
- [ ] hreflang tags implemented
- [ ] Structured data validated

### Legal
- [ ] Privacy policy page exists
- [ ] Terms of service page exists
- [ ] Cookie consent implemented (if required)

## Launch Day

### Morning
- [ ] Final content review
- [ ] Remove V2 noindex from layout.tsx
- [ ] Deploy production build
- [ ] Verify all pages return 200

### Routing
- [ ] V2 content at / (not /v2)
- [ ] V1 archived at /legacy (optional)
- [ ] 301 redirects tested
- [ ] 404 page customized

### Monitoring
- [ ] Watch error logs (first 2 hours)
- [ ] Check Google Analytics real-time
- [ ] Verify sitemap accessible
- [ ] Submit sitemap to GSC

## After Launch

### Day 1-7
- [ ] Monitor 404 errors daily
- [ ] Check search console for crawl errors
- [ ] Collect user feedback
- [ ] Fix any broken links

### Day 7-14
- [ ] Review analytics: bounce rate, time on page
- [ ] Check index coverage in GSC
- [ ] Fix any SEO issues
- [ ] Optimize underperforming pages

### Day 14-30
- [ ] Full analytics review
- [ ] A/B test CTAs if needed
- [ ] Plan content updates based on data
- [ ] Remove /legacy if no issues

## Rollback Plan

If critical issues occur:
1. Set V2 noindex immediately
2. Restore V1 routing
3. Fix issues on staging
4. Re-deploy when ready

## Sign-off

- [ ] Technical lead: _____________
- [ ] Content lead: _____________
- [ ] Business lead: _____________
- [ ] Date: _____________
