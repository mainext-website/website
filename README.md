# mainext.in

Portfolio site for **Mainext Innovations** (Parthiban V).
Vite + React + TypeScript + Tailwind + shadcn/ui + Framer Motion.

## Content

- Projects: `src/content/projects/*.json` (one file per project)
- Profile, contact, journey: `src/content/site.json`
- Services, process, FAQ: `src/content/services.ts`
- Edit projects without code at **/admin** — see [docs/ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md)

## Develop

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # builds to dist/ and writes one HTML page per project + sitemap
```

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to the `gh-pages` branch (custom domain `mainext.in`).
`npm run deploy` still works as a manual fallback.
