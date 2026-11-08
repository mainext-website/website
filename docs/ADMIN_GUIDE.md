# Adding and editing projects (Admin guide)

The site reads every project from `src/content/projects/*.json` and your profile,
contact details and journey from `src/content/site.json`. You never need to touch
code to add a project.

## One-time setup (5 minutes)

1. **Create a GitHub token**
   - Go to GitHub → Settings → Developer settings → Fine-grained tokens → *Generate new token*
     (direct link: https://github.com/settings/personal-access-tokens/new).
   - Repository access: **Only select repositories → `mainext-website/website`**.
   - Permissions → Repository → **Contents: Read and write**.
   - Expiry: 90 days or more. Copy the token.
   - If the organization blocks fine-grained tokens, a *classic* token with the `repo` scope also works.
2. **Turn on auto-deploy** (only needed once): GitHub → repo → Settings → Actions → General →
   *Workflow permissions* → **Read and write permissions** → Save.
   The workflow `.github/workflows/deploy.yml` then builds the site and updates the
   `gh-pages` branch (which serves mainext.in) on every change to `main`.
3. Open **https://mainext.in/admin**, paste the token, click **Connect**.
   The token stays only in that browser.

## Add a new project

1. `/admin` → **New project**.
2. Fill the sections. Only *Title* and *One-line summary* are required:
   - **Basics**: client, industry, category, status, year, duration.
   - **The story**: problem → what you built → how AI helped.
   - **Features**: 3–5 items.
   - **Results & tech**: only real results.
   - **Images**: cover + gallery. Images are resized and compressed to WebP automatically.
     Blur any client data first. No image = a drawn placeholder screen for that category.
   - **Client quote** (optional).
   - **Display**: published / show on homepage / card size / order / live link.
3. Check the **Preview** tab: it shows the card and the full case-study page exactly as visitors see it.
4. Click **Publish to site**. That makes one commit; the site is live in about 2–3 minutes
   (follow progress with the *Watch the build* link).

## Edit site details

`/admin` → **Site settings**: name, years of experience, availability badge, hero words,
WhatsApp number (turns on all WhatsApp buttons), phone, email, booking link, social links
and the journey timeline.

## Without the admin page

Every project is a plain JSON file. You can also copy an existing file in
`src/content/projects/`, edit it on GitHub and commit. *Download blank template*
in the admin gives an empty one. Put images in `public/uploads/projects/<slug>/`
and reference them as `/uploads/projects/<slug>/file.webp`.

## Field reference

| Field | Values |
| --- | --- |
| `category` | `website`, `erp`, `billing`, `app`, `automation` |
| `status` | `live`, `in-use`, `in-progress`, `own-product` (one `own-product` shows in the homepage product spotlight) |
| `size` | `normal`, `wide`, `large` (homepage card size) |
| `featured` | `true` = on homepage, `false` = only on /work |
| `published` | `false` = hidden draft |
| `order` | lower number shows first |
