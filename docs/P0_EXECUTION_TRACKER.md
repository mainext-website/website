# Mainext P0 Execution Tracker

Date started: 2026-03-28
Reference plan: docs/MAINEXT_WEBSITE_EXECUTION_PLAN.md

## P0 Goal
Lock implementation scope, data model, and execution order for P1 to P9.

## Status Legend
- [ ] Not started
- [~] In progress
- [x] Done

## 1) Scope Lock
- [x] Confirm project objective: business-growth portfolio with lead generation
- [x] Confirm delivery model: 10 phases (P0 to P9)
- [x] Confirm mandatory block: P0 to P4
- [x] Confirm current-cycle block: P5 to P7
- [x] Confirm future/scale block: P8 to P9

## 2) Section Ownership Lock
- [x] Hero improvements mapped to P1
- [x] Services improvements mapped to P1
- [x] Portfolio data engine mapped to P2
- [x] Reviews/trust layer mapped to P3
- [x] Contact funnel mapped to P4
- [x] Process/FAQ mapped to P5
- [x] SEO metadata/schema mapped to P6
- [x] Analytics events mapped to P7
- [x] Performance hardening mapped to P8
- [x] Scale systems (CMS/A-B/CRM) mapped to P9

## 3) Data Model Lock
- [x] Project schema fields finalized in plan
- [x] Review schema fields finalized in plan
- [x] Content file paths finalized in plan

## 4) Decision Inputs Needed From Owner (You)
- [ ] Final target customer profile sentence
- [ ] Final service priority order (top 3)
- [ ] Final list of 3 newly completed projects
- [ ] Real social profile URLs (LinkedIn/Instagram/GitHub)
- [ ] Review source links and reviewer display names

## 5) P1 Kickoff Readiness
- [x] Plan document updated to v1.1 with 10-phase model
- [x] P1 implementation completed in codebase

## 6) P1 Implementation Status (Completed)
- [x] Hero positioning and CTA copy refreshed
- [x] Hero trust line added under primary CTA
- [x] Services reframed to outcome-driven business value
- [x] Services section CTA added (tailored solution plan)
- [x] Contact copy updated from waitlist language to inquiry language
- [x] Contact form fields improved (added company + project requirements)
- [x] Footer placeholder social links replaced with external profile links
- [x] Build validation completed after P1 edits (pass)

## 7) Owner Validation Needed After P1
- [ ] Confirm final LinkedIn profile URL
- [ ] Confirm final GitHub profile URL
- [ ] Confirm final Instagram profile URL

## 8) P2 Implementation Status (Completed)
- [x] Project data moved from component into a reusable content source
- [x] Added structured project schema for growth-ready case study content
- [x] Portfolio UI refactored to render from content-driven model
- [x] Added category filter controls (All + by project category)
- [x] Added richer card details (industry, challenge, solution, outcomes, timeline)
- [x] Added 3 additional projects into the data source for immediate showcase growth
- [x] Portfolio CTA aligned to inquiry flow (Discuss Your Project)
- [ ] Replace placeholder project links with final live/demo URLs where applicable

## 9) P3 Implementation Status (Completed)
- [x] Testimonial data moved into reusable content source
- [x] Google review data source added with verification fields
- [x] Trust section upgraded into two blocks (Google Reviews + Client Testimonials)
- [x] Rating summary card added with average score and verified review count
- [x] Review source links added to each review card
- [x] Review and testimonial date display added
- [x] Avatar fallback handling confirmed using initials badge
- [x] Build validation completed after P3 edits (pass)

## 10) Owner Validation Needed After P3
- [ ] Replace placeholder Google review source URLs with final links

## 11) P4 Implementation Status (Completed)
- [x] Added project type dropdown in contact form
- [x] Added budget range dropdown in contact form
- [x] Added preferred timeline dropdown in contact form
- [x] Added anti-spam honeypot field handling
- [x] Added explicit inline success and error submission states
- [x] Kept response SLA copy clearly visible
- [x] Preserved Google Form submission integration and included qualifier fields in payload

## 12) Owner Validation Needed After P4
- [ ] Confirm project type options are final
- [ ] Confirm budget range options match current pricing
- [ ] Confirm timeline options are final
- [ ] Submit one real test inquiry and confirm response workflow

## 13) P5 Implementation Status (Completed)
- [x] Added new Process section component with 4-step delivery model
- [x] Added reusable process content source for easy copy updates
- [x] Added new FAQ section component with accordion interaction
- [x] Added reusable FAQ content source for future edits
- [x] Wired Process and FAQ sections into homepage flow
- [x] Updated navbar to include Process and FAQ navigation links
- [x] Build validation completed after P5 edits (pass)

## 14) Owner Validation Needed After P5
- [ ] Approve final Process section step titles and descriptions
- [ ] Approve final FAQ entries (keep, remove, or reorder)
- [ ] Confirm if FAQ should include pricing example ranges

## 15) P6 Implementation Status (Completed)
- [x] Added canonical URL metadata in site head
- [x] Added complete Open Graph tags (title, description, url, image)
- [x] Added Twitter metadata tags (title, description, image)
- [x] Added JSON-LD schema graph (Organization, ProfessionalService, WebSite)
- [x] Updated robots.txt and linked sitemap URL
- [x] Build validation completed after P6 edits (pass)

## 16) Owner Validation Needed After P6
- [ ] Confirm canonical domain is final (https://mainext.in/)
- [ ] Replace temporary social profile links in JSON-LD if needed
- [ ] Confirm final OG image file (currently og-image.svg)
- [ ] Confirm business details for schema (service area and service types)

## 17) P7 Implementation Status (Completed)
- [x] Added centralized analytics utility for GA4 and optional Microsoft Clarity
- [x] Added environment-based analytics initialization in app bootstrap
- [x] Added hero CTA click tracking (primary and secondary)
- [x] Added services CTA click tracking
- [x] Added portfolio project click tracking (live/code/discuss CTA)
- [x] Added review source click tracking
- [x] Added contact form lifecycle tracking (start, submit, submit success, submit error)
- [x] Added `.env.example` with required analytics environment variables
- [x] Build validation completed after P7 edits (pass)

## 18) Owner Validation Needed After P7
- [ ] Add real GA4 measurement ID in environment config
- [ ] Add optional Microsoft Clarity project ID (if enabling Clarity)
- [ ] Confirm event naming and conversion definitions
- [ ] Validate event firing in browser (GA4 DebugView / network inspection)

## 19) P8 Implementation Status (Completed)
- [x] Added motion-aware smooth scrolling fallback using reduced-motion preference
- [x] Added global reduced-motion CSS guard to reduce animation and transition overhead
- [x] Added section anchor offset for fixed navbar scroll targets
- [x] Added deferred rendering utility class to below-the-fold sections
- [x] Applied deferred rendering class to Services, Portfolio, Process, Testimonials, FAQ, and Contact sections
- [x] Added lazy loading and async decoding for portfolio project images
- [x] Improved mobile navbar accessibility with aria attributes and controlled menu id
- [x] Build validation completed after P8 edits (pass)

## 20) Owner Validation Needed After P8
- [ ] Review animation intensity and confirm reduced-motion behavior feels correct
- [ ] Validate mobile section navigation offsets across major screen sizes
- [ ] Approve image quality vs performance trade-off for portfolio covers
- [ ] Run mobile smoke test on one Android and one iOS device

## 21) Owner Pending Items by Phase (P0 to P9)

### P0
- [ ] Final target customer profile sentence
- [ ] Final service priority order (top 3)

### P1
- [ ] Confirm final LinkedIn profile URL
- [ ] Confirm final GitHub profile URL
- [ ] Confirm final Instagram profile URL

### P2
- [ ] Replace placeholder project links with final live/demo URLs where applicable

### P3
- [ ] Replace placeholder Google review source URLs with final links
- [ ] Confirm reviewer display names to publish

### P4
- [ ] Confirm contact dropdown options (project type, budget, timeline)
- [ ] Confirm form submission destination and workflow

### P5
- [ ] Approve process section content draft
- [ ] Approve FAQ list (5 to 8 entries)

### P6
- [ ] Confirm canonical domain and final OG image
- [ ] Confirm business details for JSON-LD schema

### P7
- [ ] Share GA4 measurement ID
- [ ] Confirm analytics event naming and conversion definitions

### P8
- [ ] Approve mobile/performance trade-off decisions

### P9
- [ ] Choose CMS direction and CRM automation stack

## 22) P9 Implementation Status (Completed)
- [x] Added service landing page infrastructure with dynamic route `/services/:slug`
- [x] Added reusable service page content model in `src/content/servicePages.ts`
- [x] Linked service cards to dedicated landing pages from Services section
- [x] Created scale-layer execution playbook in `docs/P9_SCALE_LAYER_PLAYBOOK.md`

## 23) Owner Validation Needed After P9
- [ ] Approve service landing page copy and outcomes
- [ ] Choose CMS direction for next quarter (Decap, Sanity, or Supabase)
- [ ] Approve first two A/B experiments from P9 playbook
- [ ] Confirm CRM stack and lead pipeline stages

## 24) UX Follow-up Round (Completed)
- [x] Made navbar brand/logo clickable to return users to homepage
- [x] Fixed cross-route section navigation behavior so nav links resolve correctly from service pages
- [x] Changed default theme behavior from forced dark to system preference
- [x] Rebalanced light theme tokens to reduce harsh pure-white appearance
- [x] Rebalanced dark theme tokens to reduce heavy contrast feel
- [x] Preserved responsive section layout behavior after theme/navigation updates
- [x] Build validation completed after UX follow-up edits (pass)

## 25) Owner Validation Needed After UX Follow-up
- [ ] Confirm first-visit theme preference behavior (system default)
- [ ] Verify "Mainext" logo click returns to homepage from all routes
- [ ] Approve light-theme visual balance after token refresh
- [ ] Run a quick mobile walkthrough for navbar links and section spacing

## Notes
- No blocker in codebase build path.
- Previous "ugt.clearMarks is not a function" issue is external tool/chat runtime side, not website source code.
