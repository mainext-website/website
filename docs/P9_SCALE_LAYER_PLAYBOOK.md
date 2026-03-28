# Phase 9 Scale Layer Playbook

Date: 2026-03-28  
Scope: CMS decisioning, service landing expansion, experiment backlog, and CRM automation flow.

## 1) Objective

Convert the website from a portfolio revamp into a repeatable growth system.

Success condition:
- Content updates are operationally simple.
- New service pages can be rolled out without refactoring core layout.
- Experiments are planned and measurable.
- Leads are triaged with clear CRM stages.

## 2) What Is Implemented in Code (This Phase)

- Dynamic service landing route: `/services/:slug`
- Service content source: `src/content/servicePages.ts`
- Services section now links each card to a dedicated landing page

Current route inventory:
- `/`
- `/services/website-landing-systems`
- `/services/business-process-automation`
- `/services/technical-support-optimization`

## 3) CMS Direction (Decision Matrix)

Option A: Decap CMS
- Pros: Git-based workflow, low cost, works with static sites
- Cons: Editorial UI is basic, role management is limited

Option B: Sanity
- Pros: Strong editorial experience, structured content model, API-first
- Cons: Ongoing platform cost and setup overhead

Option C: Supabase + custom admin
- Pros: Full ownership and flexibility, easy integration with app logic
- Cons: More implementation time and maintenance burden

Recommendation for current stage:
- Start with Git-based content updates (already enabled by `src/content/*`)
- Re-evaluate in 4 to 6 weeks after tracking update frequency
- Move to Sanity only when non-technical content editing becomes frequent

## 4) Service Landing Expansion Plan

Current landing pages are foundation pages. Expand in this order:

1. Website and Landing Systems
2. Business Process Automation
3. Technical Support and Optimization

For each new service page, include:
- Business problem framing
- Delivery process
- Outcomes and proof points
- FAQ + CTA to contact

Owner task:
- Approve copy for each service landing page
- Add 1 real case-study proof item per service page

## 5) A/B Test Backlog (Prioritized)

Experiment format:
- Hypothesis
- Variant A / Variant B
- Primary metric
- Run length
- Decision rule

Priority experiments:

1. Hero headline positioning
- A: Growth-ready websites and systems
- B: Results-focused digital partner for small businesses
- Metric: `hero_primary_cta_click`

2. Primary CTA text
- A: View Case Studies
- B: See Proven Results
- Metric: CTA click-through rate

3. Contact CTA placement
- A: End-of-page only
- B: Sticky/inline CTA after portfolio
- Metric: `form_start`

4. Trust block ordering
- A: Reviews first, testimonials second
- B: Testimonials first, reviews second
- Metric: `form_submit`

Execution rule:
- Run one experiment at a time for clean attribution.

## 6) CRM Automation Blueprint

Lead pipeline stages:

1. New inquiry
2. Qualified
3. Discovery call scheduled
4. Proposal sent
5. Won
6. Lost

Scoring model (starting point):
- Budget fit: +30
- Timeline clarity: +20
- Clear business context: +20
- Service-fit match: +20
- Incomplete inquiry: -20

Automation targets:
- Auto-tag lead by project type
- Auto-prioritize high-score leads
- Send acknowledgment email template
- Push to sheet/CRM with timestamp and source channel

Suggested tools:
- Google Forms/Sheet + Apps Script (quick start)
- HubSpot Free / Notion CRM / Pipedrive (next stage)

## 7) Definition of Done (P9)

P9 is complete when:

- Scale operations playbook exists and is approved
- Service landing infrastructure is live in code
- A/B test backlog is prioritized with measurable events
- CRM stages and scoring baseline are documented

## 8) Owner Checklist

- Choose CMS direction for next quarter
- Approve service landing page copy and proof items
- Approve first two A/B experiments to execute
- Confirm CRM tool choice and pipeline stages
