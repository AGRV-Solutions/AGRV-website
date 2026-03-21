# GitHub Pages + secrets — checklist

Use this when connecting the repo to GitHub Pages with **no secrets committed**.

## What was found in the old site

| Exposed in repo (before) | Now |
|--------------------------|-----|
| Google Analytics measurement ID in every HTML file | Injected via `GA_MEASUREMENT_ID` secret → `site-config.js` at deploy |
| Web3Forms key in JS / separate config | Injected via `WEB3FORMS_ACCESS_KEY` secret → `site-config.js` |

## Steps on GitHub

1. **Push this repository** to GitHub (if it isn’t already).

2. **Add secrets**  
   **Repository → Settings → Secrets and variables → Actions → New repository secret**

   - **`WEB3FORMS_ACCESS_KEY`** — your Web3Forms access key  
   - **`GA_MEASUREMENT_ID`** — your GA4 ID (format: `G-XXXXXXXXXX`)

3. **Enable GitHub Pages from Actions**  
   **Settings → Pages**  
   - **Build and deployment → Source:** select **GitHub Actions**  
   - Save if prompted  

4. **Trigger a deploy**  
   Push a commit to **`main`** or **`master`**, or:  
   **Actions → “Deploy GitHub Pages” → Run workflow** (if available).

5. **Confirm**  
   - **Actions** tab: latest workflow should be green  
   - **Settings → Pages**: shows the public URL  
   - Open the live site → **View source** or Network tab: `site-config.js` should load and contain your IDs (expected for a static site)

6. **Custom domain**  
   If you use `agrvsolutions.com`, keep **`CNAME`** in the repo root and DNS as in **HOSTING.md**.

## Local development

```bash
cp .env.example .env
# Fill WEB3FORMS_ACCESS_KEY and GA_MEASUREMENT_ID
node scripts/write-site-config.js
python3 -m http.server 8080
```

Never commit `.env` or `site-config.js`.

## Troubleshooting

| Problem | What to check |
|--------|----------------|
| Contact form not sending | Secret `WEB3FORMS_ACCESS_KEY`; Web3Forms allowed domains; run workflow after adding secret |
| No analytics | Secret `GA_MEASUREMENT_ID` exactly like in GA (starts with `G-`); redeploy |
| Workflow fails on “Pages” | Pages source must be **GitHub Actions**; repo **Settings → Actions → General** allows workflows |
| Old site still showing | Browser cache; confirm Pages URL points to Actions deployment |
