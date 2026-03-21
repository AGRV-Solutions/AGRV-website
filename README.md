# AGRV Solutions

Website for [agrvsolutions.com](https://agrvsolutions.com). Hosted on GitHub Pages.

## Run locally

```bash
cp .env.example .env
# Edit .env: WEB3FORMS_ACCESS_KEY=… and GA_MEASUREMENT_ID=G-…
node scripts/write-site-config.js

python3 -m http.server 8080
```

Open **http://localhost:8080**.  
`site-config.js` is **gitignored**; without running the script you may see 404s for `site-config.js` (contact form + analytics won’t work until it exists).

---

## Secrets (nothing sensitive in git)

| Item | Purpose |
|------|--------|
| **WEB3FORMS_ACCESS_KEY** | Contact form → email (Web3Forms) |
| **GA_MEASUREMENT_ID** | Google Analytics 4 (e.g. `G-XXXXXXXXXX`) |

These live in **`.env`** locally and in **GitHub Actions secrets** for deploy.  
They are **not** hardcoded in HTML/JS in the repo.

**Note:** GA measurement IDs always appear in the **live** site’s `site-config.js` (browsers need them). They are only removed from **source control**.

---

## GitHub Pages + Actions (production)

### One-time setup

1. **Repository secrets**  
   **GitHub repo → Settings → Secrets and variables → Actions → New repository secret**

   | Name | Value |
   |------|--------|
   | `WEB3FORMS_ACCESS_KEY` | UUID from [web3forms.com](https://web3forms.com) |
   | `GA_MEASUREMENT_ID` | e.g. `G-XXXXXXXXXX` (GA4 → Admin → Data streams → your site) |

2. **Use Actions for Pages**  
   **Settings → Pages → Build and deployment**  
   - **Source:** **GitHub Actions** (not “Deploy from a branch”).

3. **First deploy**  
   Push to **`main`** or **`master`**.  
   Workflow **`.github/workflows/deploy-pages.yml`** will:
   - run `node scripts/write-site-config.js` with those secrets
   - upload the site (including generated `site-config.js`)
   - publish to Pages  

4. **Web3Forms dashboard**  
   Allow domain **`agrvsolutions.com`** (and `www` if you use it).

5. **If Pages was previously “branch” deploy**  
   Switching to Actions disables the old branch build; only the workflow deploys from then on.

### After setup

- Change a secret: **Settings → Secrets →** edit → push any commit (or re-run workflow) to redeploy.
- **Actions** tab shows run logs if deploy fails.

---

## Contact form

- Subjects: **`53583a <Area of Interest>`**
- Web3Forms: allow your domain; see [web3forms.com](https://web3forms.com)

---

## Hosting / DNS

See **[HOSTING.md](HOSTING.md)** for Namecheap DNS and custom domain setup.
