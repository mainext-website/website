# Project sources

Where each case study's facts came from (Nov 2026 review of the project repos and the VPS infra repos).
Update the matching `src/content/projects/*.json` (or use /admin) when a project changes.

| Case study (slug) | Source repos | Notes |
|---|---|---|
| acco-erp | construct-erp/ac-co | Civil contracting ERP, 21 modules around the M08 transaction engine. Live at acco.mainext.in (login only, not linked). |
| nsl-operations | inventory-manage/nsl | Water + building materials + hollow blocks. PRD, order-screen UX spec. |
| eclipse-invoicing | parthi-eclipse/eclipse-python, eclipse-ui | Invoices, credit, stock, orders, agent commission, price templates, roles, PWA. Since Jan 2024. |
| sakthi-inventory | sakthi-inventory/mono-repo | PRD + DEVELOPMENT progress tracker; service module replaces the old tracker. |
| sakthi-ec | sakthi-ec/ec_backend, ec_frontend | Recharge platform (M Robotics API), Telegram OTP, operator daily report, external API for Accounts. |
| mobile-shop-accounts | sakthi-profits/react, python, backend_old, frontend_old | "Sakthi Profit / Accounts", accounts.mainext.in. |
| rvs-holidays | travels-booking/rvs-holidays | Public site rvsholidays.in + admin panel. |
| polymer-plastics-invoicing | Pandeeswari-polymers/polymer_ui, polymer_backend | Forked from Eclipse Jun 2024; IGST added Nov 2025; live at polymers.mainext.in (not linked). |
| mobile-service-tracker | mainext-dev-ops/sakthi-vps (sakthi-service/) | Angular 4 + Express; app repos (sakthi-mobiles org) were not accessible. |
| growmate | mainext-dev-ops/sakthi-vps (growmate/), parthi-vps scripts, growmate.mainext.in | Own product; app repo not yet accessible. |
| texora-website | TexoraInternational/website (public) | Static site, live at www.texorainternational.com. |

## Screenshots (`public/uploads/projects/<slug>/`)

- acco-erp: in-app user guide images (`frontend/src/features/help/images`), demo data.
- nsl-operations: QA screenshots from git history (`qa/*/screenshots`, removed from main later), test data.
- eclipse-invoicing: captured from a local demo copy seeded with fictional customers and products.
- rvs-holidays, texora-website, growmate: captured from the live public sites.
- Never publish screenshots of production data (real customer names, phone numbers, bank details).

Renamed slugs redirect through `src/content/legacy-slugs.json`.
