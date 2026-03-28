# Mainext Website Growth & Revamp Execution Plan

Date: 2026-03-28  
Project: Mainext Innovation portfolio website (mainext.in)

## 1) Purpose of This Document

This document converts the full analysis discussion into an implementation-ready roadmap.

Use this as the single reference to:
- Modernize website UX/UI
- Improve lead conversion and business credibility
- Make project/testimonial/review updates easy and repeatable
- Add SEO and analytics foundations for growth
- Execute delivery in clear phases without missing requirements

## 2) Goals and Success Criteria

Primary goals:
- Increase qualified inbound leads from website traffic
- Improve trust signals (real work, real reviews, clear process)
- Make portfolio content maintainable without repeated code edits
- Strengthen local and service discoverability on Google

Success metrics (90 days):
- +40% CTA clicks (hero/contact CTA)
- +30% completed inquiry submissions
- Bounce rate reduction on landing page by 15%
- At least 3 high-quality case studies published
- At least 10 verified review entries displayed
- Basic SEO baseline complete (sitemap + schema + canonical + OG)

## 3) Current-State Summary (Audit Snapshot)

Strengths:
- Clean React + Vite architecture and sectioned page flow
- Good baseline visual system using Tailwind/shadcn tokens
- Existing portfolio + testimonials + contact sections present
- Build is stable

Gaps to fix:
- Messaging is generic and not strongly niche-positioned
- Portfolio entries are too brief for business decision-makers
- Testimonials/reviews trust layer is not fully verified
- Social links and proof links need real destinations
- Contact flow language/fields need conversion optimization
- Content is mostly hardcoded in components
- SEO is basic and lacks schema/sitemap depth
- Analytics/event instrumentation missing

## 4) Priority Model (P0/P1/P2)

### P0 (Mandatory: implement first)
- Positioning and copy refresh (hero + services + contact)
- Portfolio conversion to data-driven content model
- Add 3 new projects with strong case-study structure
- Add Google Reviews section (manual first, automation-ready)
- Contact form improvement with lead qualification fields
- Footer and social proof link fixes
- SEO essentials: canonical, OG image, sitemap, JSON-LD schema
- Analytics setup: CTA/form/project click events

### P1 (High-value: next)
- Process section (how Mainext works)
- FAQ section for objection handling
- Enhanced project detail pages (or expandable case cards)
- Better media and mock visuals for each project
- Performance pass (image optimization, lazy loading, payload checks)

### P2 (Future growth)
- CMS/admin workflow (Decap/Sanity/Supabase)
- Blog/insights for SEO compounding
- A/B testing for hero and CTA copy
- Lead scoring and CRM workflow automation
- Multi-page service landing strategy

## 4.1) Execution Model (10 Phases, P0 to P9)

This project will be executed in 10 phases.

- Current-cycle delivery block: P0 to P7
- Future/scale delivery block: P8 to P9

Progress rule:
- Do not start the next phase unless the current phase Definition of Done is satisfied.

## 5) Information Architecture (Target Site Structure)

Final recommended structure:
1. Hero (niche + outcomes + CTA)
2. Proof Strip (project count, client sectors, rating snippet)
3. Services (outcome-driven, not only technology list)
4. Featured Projects (3 to 6 with problem/solution/outcome)
5. Process (Discovery -> Build -> Launch -> Support)
6. Reviews & Testimonials (verified sources)
7. FAQ (pricing/timeline/support concerns)
8. Contact/Brief Form (qualified inquiry)
9. Footer (real social links, business identity, trust links)

## 6) Screen/Section Improvement Blueprint

## 6.1 Hero Section

Current issue:
- Good visual intent, but messaging can be more outcome-focused.

Improve with:
- Headline template: "We build conversion-focused websites and business systems for [target business type]."
- Subheadline with measurable outcomes (faster leads, process automation, visibility)
- Two CTAs:
  - Primary: "Book Free Project Consultation"
  - Secondary: "View Case Studies"
- Add immediate trust text under CTAs: "Delivered X projects | Avg rating Y | Response within 24h"

Remove/avoid:
- Generic wording without target customer profile

## 6.2 Services Section

Current issue:
- Service cards explain capability but not business impact deeply.

Improve with:
- Reframe service cards around outcomes:
  - Website and Landing Systems
  - Business Process Automation
  - Technical Support and Optimization
- Add "Who this is for" and "Expected outcomes" line per service
- Add one CTA under services: "Get a tailored solution plan"

Remove/avoid:
- Excessively technical wording without business context

## 6.3 Portfolio / Projects Section

Current issue:
- Hardcoded and shallow project details.

Improve with:
- Convert into content-driven model from local JSON/TS data
- For each project show:
  - Industry
  - Problem
  - Solution summary
  - Stack
  - Outcome metrics (time saved, lead increase, efficiency)
  - Timeline
  - Links (live/demo)
- Add filters by category (Website, Automation, Full Stack)
- Mark top 3 as Featured

Remove/avoid:
- One-line project descriptions without result

## 6.4 Reviews/Testimonial Section

Current issue:
- Trust indicators need stronger verification and source linkage.

Improve with:
- Split into two blocks:
  - Google Reviews (rating + review cards + source link)
  - Client Testimonials (case-based quotes)
- Add verification indicators and dates
- Add profile image fallback logic for missing avatars

Remove/avoid:
- Placeholder images or unverified quote blocks

## 6.5 Process Section (New)

Add a new section:
- Step 1: Discovery (requirements + scope)
- Step 2: Build (design + development)
- Step 3: Launch (testing + deployment)
- Step 4: Support (iterations + maintenance)

Purpose:
- Reduces buyer uncertainty and improves trust

## 6.6 FAQ Section (New)

Add FAQs that handle objections:
- Typical project timelines?
- Pricing model?
- Do you support after launch?
- Do you work with small businesses?
- Can existing systems be upgraded?

Purpose:
- Improves conversion readiness before contact

## 6.7 Contact Section

Current issue:
- Existing language/fields can be modernized for lead quality.

Improve with:
- Fields:
  - Name
  - Email
  - Business/Company
  - Project type (dropdown)
  - Budget range (dropdown)
  - Timeline (dropdown)
  - Message
- Add anti-spam (honeypot or Turnstile)
- Add response commitment text: "We reply within 24 hours"
- Add separate CTA for WhatsApp/Call (optional)

Remove/avoid:
- Waitlist-style wording

## 6.8 Footer

Current issue:
- Placeholder links reduce credibility.

Improve with:
- Real links for LinkedIn, Instagram, GitHub, email
- Add copyright/year auto handling
- Add trust links (privacy policy and terms when available)

## 7) Content System Design (Future-Proof Updates)

## 7.1 Mandatory Data Files

Create:
- src/content/projects.json
- src/content/testimonials.json
- src/content/reviews.json
- src/content/services.json (optional but recommended)

## 7.2 Project Schema (minimum)

For each project:
- id
- slug
- title
- category
- industry
- summary
- challenge
- solution
- outcomes (array)
- stack (array)
- timeline
- featured (boolean)
- coverImage
- galleryImages (array)
- liveUrl
- caseStudyUrl (optional)
- completedAt

## 7.3 Review Schema

For each review:
- id
- reviewerName
- rating (1-5)
- reviewText
- date
- sourceUrl
- verified (boolean)
- avatar (optional)

## 7.4 Update Workflow (Simple)

When adding a new project:
1. Add one object in projects.json
2. Add related images in public/assets/projects/<slug>/
3. If featured, set featured=true
4. Commit and deploy

Outcome:
- Website updates automatically from data

## 8) Mock UI/Image Workflow for Portfolio Presentation

Goal:
- Show project concept visuals even when full real screenshots are limited.

Workflow:
1. Prepare project visual brief with:
   - Business type
   - Main user actions
   - Required modules
   - Preferred style and color direction
2. Generate 2 to 4 mock concepts using AI image tools
3. Select one hero mock + 1 or 2 supporting visuals
4. Store under project asset folder
5. Use clear labels: "Concept UI" vs "Live Screenshot"

Prompt template:
"Create a high-fidelity desktop SaaS dashboard UI for [business type]. Include [module list]. Style: modern, clean, professional, [color palette]. Add realistic spacing and typography. No brand logos."

Important:
- Do not misrepresent concept images as production screenshots

## 9) SEO, Discoverability, and Analytics Plan

## 9.1 SEO Must-Haves (P0)
- Add sitemap.xml in public/
- Ensure robots.txt references sitemap
- Add canonical URL in index.html
- Add complete Open Graph tags (title, description, image, url)
- Add Twitter card metadata
- Add JSON-LD schema:
  - Organization/LocalBusiness
  - Service
  - Review/AggregateRating (only with valid data)

## 9.2 Content SEO Enhancements (P1)
- Add keyword-aligned headings per service
- Add internal links from hero/services to projects/contact
- Add optional city/service intent references naturally

## 9.3 Analytics Must-Haves (P0)
Track events:
- hero_primary_cta_click
- hero_secondary_cta_click
- service_cta_click
- project_card_click
- review_source_click
- form_start
- form_submit
- form_submit_success

Recommended tools:
- GA4 + optional Microsoft Clarity

## 10) 10-Phase Master Roadmap (P0 to P9)

This section is the source of truth for implementation order.

## P0: Project Baseline Lock (Week 1)

Objective:
- Freeze scope, baseline content, and design direction before edits.

Sections/screens touched:
- Full landing page (audit checklist only)

Implementation checklist:
- Confirm target customer profile and primary offer
- Confirm phase ownership and release cadence
- Confirm project data fields and review data fields
- Create implementation tracker for all P0 to P9 tasks

Definition of Done:
- Scope, data model, and delivery order approved

## P1: Positioning and Conversion Copy (Week 1)

Objective:
- Reframe messaging for business outcomes and lead conversion.

Sections/screens touched:
- Hero, Services, Contact, Footer

Implementation checklist:
- Rewrite hero headline/subheadline for clear niche and outcomes
- Add trust line under hero CTA
- Rewrite service copy with business-impact statements
- Remove waitlist-style language in contact section
- Replace all placeholder social/profile links

Definition of Done:
- Messaging aligns to target audience and all CTA copy is consistent

## P2: Portfolio Content Engine (Week 2)

Objective:
- Make project updates data-driven and repeatable.

Sections/screens touched:
- Portfolio, content layer

Implementation checklist:
- Create `src/content/projects.json`
- Migrate hardcoded project cards to mapped data
- Add filters and featured tags
- Add required fields: challenge, solution, outcomes, timeline, stack

Definition of Done:
- New project can be added by editing one JSON object only

## P3: Reviews and Trust Layer (Week 3)

Objective:
- Strengthen social proof with verifiable sources.

Sections/screens touched:
- Testimonials, Google Reviews (new block)

Implementation checklist:
- Create `src/content/testimonials.json` and `src/content/reviews.json`
- Add rating summary card
- Add source links for each review
- Add avatar fallback handling and date display

Definition of Done:
- Trust section shows verified review/testimonial data with sources

## P4: Contact Funnel Upgrade (Week 3)

Objective:
- Capture higher-quality leads and reduce spam.

Sections/screens touched:
- Contact form

Implementation checklist:
- Add project type, budget range, timeline fields
- Add anti-spam mechanism (honeypot/Turnstile)
- Add clear success/error states and response SLA copy
- Integrate submission target (email/API/Google Sheet)

Definition of Done:
- Form captures qualified data and is production-safe

## P5: Decision Support Sections (Week 4)

Objective:
- Reduce buyer hesitation before contact.

Sections/screens touched:
- Process (new), FAQ (new)

Implementation checklist:
- Implement 4-step process section
- Implement 5 to 8 FAQ entries
- Add internal links from FAQ/process to contact

Definition of Done:
- Decision-support content is live and navigable on mobile/desktop

## P6: SEO Foundation (Week 5)

Objective:
- Make the site indexable, shareable, and semantically rich.

Sections/screens touched:
- Global metadata and public assets

Implementation checklist:
- Add canonical, OG, and Twitter tags
- Add `public/sitemap.xml`
- Confirm `public/robots.txt` references sitemap
- Add Organization/Service JSON-LD

Definition of Done:
- SEO essentials validated on production

## P7: Analytics and Measurement (Week 6)

Objective:
- Instrument conversion funnel events.

Sections/screens touched:
- Hero, Services, Portfolio, Reviews, Contact

Implementation checklist:
- Add GA4 events for CTA, project clicks, form lifecycle
- Verify events in debug/production
- Add optional Microsoft Clarity

Definition of Done:
- Core business events are being captured reliably

## P8: Performance and UX Hardening (Week 7)

Objective:
- Improve loading speed and mobile usability.

Sections/screens touched:
- Full landing page

Implementation checklist:
- Optimize image formats and lazy loading
- Reduce initial payload and animation overhead
- Validate responsive behavior on key breakpoints

Definition of Done:
- Performance and mobile UX quality pass completed

## P9: Scale Layer (Weeks 8-12)

Objective:
- Build compounding growth systems beyond the base revamp.

Sections/screens touched:
- Content ops, SEO growth pages, experimentation layer

Implementation checklist:
- Evaluate CMS/admin integration
- Plan service-specific landing pages
- Add A/B test backlog (hero/CTA variants)
- Define CRM automation and lead scoring flow

Definition of Done:
- Next-quarter scaling roadmap approved and queued

## 11) Mandatory vs Future Plan Split

## A) Mandatory (Execute Immediately)
- Phases: P0, P1, P2, P3, P4
- Positioning/copy modernization
- Contact conversion improvements
- Portfolio data model and 3 project additions
- Reviews section and trust improvements
- Footer and social proof fixes

## B) Mandatory-Plus (Recommended in same cycle)
- Phases: P5, P6, P7
- Process + FAQ sections
- SEO essentials
- Analytics event setup

## C) Future Plan (Scale Layer)
- Phases: P8, P9
- CMS/admin content editing interface
- Blog/content marketing pipeline
- Service-specific landing pages
- A/B testing and conversion experiments
- CRM automation and lead scoring
- Expanded review integrations

## 11.1) Section-to-Phase Mapping (Implementation Clarity)

- Hero: P1, P7
- Services: P1, P7
- Portfolio: P2, P7
- Testimonials/Reviews: P3, P7
- Contact: P4, P7
- Process: P5
- FAQ: P5
- SEO/meta/sitemap/schema: P6
- Performance/mobile hardening: P8
- CMS/experiments/CRM scale: P9

## 11.2) Owner Actions by Phase (What You Need to Do)

Use this as your checklist for inputs and approvals required from your side.

### P0: Project Baseline Lock
- Provide final target customer profile sentence
- Confirm top 3 service priorities (ranked)
- Confirm whether current cycle includes P5 to P7 in the same release
- Approve overall visual direction and tone

### P1: Positioning and Conversion Copy
- Approve final hero and services messaging
- Confirm brand voice preference (formal vs friendly)
- Verify social links used in footer are correct

### P2: Portfolio Content Engine
- Replace placeholder project URLs with final live/demo/source links
- Approve project ordering and featured flags
- Verify each project outcome claim is accurate
- Provide final screenshots or concept UI images per project

### P3: Reviews and Trust Layer
- Replace placeholder Google review source URLs with final links
- Confirm reviewer display names allowed for publishing
- Approve which reviews should be marked as verified
- Provide any missing testimonial photos (optional)

### P4: Contact Funnel Upgrade
- Confirm project type list used in dropdown
- Confirm budget range options based on your pricing model
- Confirm timeline options and wording
- Confirm final destination for submissions (Google Form/CRM/email)
- Perform one real form submission and approve success messaging

### P5: Decision Support Sections
- Approve 4-step process text
- Approve 5 to 8 FAQ entries
- Confirm pricing/timeline/support answers for public display

### P6: SEO Foundation
- Confirm canonical domain is `https://mainext.in`
- Approve final OG image and meta descriptions
- Approve business details for JSON-LD (name, location, contact)
- Validate sitemap URLs after deployment

### P7: Analytics and Measurement
- Share GA4 measurement ID
- Confirm event naming and conversion definitions
- Approve optional Microsoft Clarity enablement
- Validate event firing in production once deployed

### P8: Performance and UX Hardening
- Approve image quality vs performance trade-offs
- Review mobile UI and sign off on responsive behavior
- Confirm animation intensity preferences

### P9: Scale Layer
- Choose CMS direction (Decap/Sanity/Supabase/custom)
- Prioritize service landing pages for next quarter
- Approve A/B testing backlog
- Confirm CRM automation tools and lead pipeline stages

## 12) Detailed To-Do Checklist (Implementation Ready)

## 12.1 Content and Messaging
- [ ] Finalize target customer profile statement
- [ ] Rewrite hero headline/subheadline for outcomes
- [ ] Rewrite services for business impact framing
- [ ] Rewrite contact section copy
- [ ] Prepare FAQ content set (5 to 8 entries)

## 12.2 Projects and Reviews Data
- [ ] Create projects.json schema and seed existing projects
- [ ] Add 3 new projects with challenge/solution/outcome
- [ ] Create testimonials.json and review schema
- [ ] Create reviews.json with verified source URLs
- [ ] Add project concept visuals and real screenshots

## 12.3 UI and Sections
- [ ] Add proof strip under hero
- [ ] Add process section
- [ ] Add FAQ section
- [ ] Upgrade project cards with richer metadata
- [ ] Add Google review summary card + list

## 12.4 Contact and Lead Flow
- [ ] Add project type, budget, timeline fields
- [ ] Add anti-spam mechanism
- [ ] Add clear success/error states
- [ ] Integrate form destination (email/API/sheet)

## 12.5 SEO and Analytics
- [ ] Add canonical + OG + Twitter metadata
- [ ] Add sitemap.xml and robots update
- [ ] Add JSON-LD schema blocks
- [ ] Configure GA4 events
- [ ] Verify event firing on production

## 12.6 Technical Quality
- [ ] Replace placeholder social/review links
- [ ] Ensure missing avatar fallback handling
- [ ] Confirm responsive behavior across breakpoints
- [ ] Run build + lint + visual smoke test

## 13) Risks and Mitigations

Risk:
- Scope creep during redesign
Mitigation:
- Lock P0 requirements before visual exploration

Risk:
- Inconsistent project data format
Mitigation:
- Define strict JSON schema and sample template

Risk:
- Trust loss from unclear mock vs real images
Mitigation:
- Label concept visuals clearly

Risk:
- SEO changes without monitoring
Mitigation:
- Add analytics before major content deployment

## 14) Team Execution Cadence

Weekly operating rhythm:
- Monday: backlog prioritize and copy/data updates
- Mid-week: UI implementation and QA
- Friday: metrics review and release

Decision gate after each phase:
- Continue to next phase only when exit criteria are met

## 15) Immediate Start Plan (Next 48 Hours)

Day 1:
- Execute P0 checklist and lock baseline
- Start P1 copy updates for hero/services/contact/footer
- Start P2 by creating JSON content files and migrating current data
- Add 3 new projects with placeholder images if needed

Day 2:
- Complete P2 migration and begin P3 reviews block
- Begin P4 contact form qualification fields
- Prepare P5/P6 backlog items (process, FAQ, SEO)

Outcome by end of Day 2:
- P0 complete, P1 in progress, and P2/P3 implementation started

## 16) Definition of Done (Project-Level)

The revamp is considered successful when:
- Mandatory scope in section 11A is fully complete
- New projects can be added via data files only
- Trust signals are verifiable and visible
- Contact flow captures qualified leads effectively
- Analytics and SEO foundations are in production
- Website communicates a premium, outcome-focused business identity

---

Owner: Mainext Innovation  
Document type: Master implementation plan  
Version: v1.1
