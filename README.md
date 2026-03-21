# AGRV Solutions

Website for [agrvsolutions.com](https://agrvsolutions.com). Hosted on GitHub Pages.

## Run locally

From the project root:

```bash
python3 -m http.server 8080
```

Then open **http://localhost:8080**.

With Node:

```bash
npx serve .
```

## Secrets (`.env` — not in git)

All local secrets belong in **`.env`**. That file is **gitignored**; only **`.env.example`** is committed as a template.

```bash
cp .env.example .env
# Edit .env and set WEB3FORMS_ACCESS_KEY=your-key-from-web3forms.com

node scripts/sync-env-to-web3forms.js
```

That generates **`web3forms-config.js`** (also gitignored), which the contact page loads. Re-run the script whenever you change `.env`.

**Do not** commit `.env`, `web3forms-config.js`, or any `*.pem` / `credentials.json` — see `.gitignore`.

## Contact form (email to agrvsolutions@gmail.com)

The contact page sends messages through **[Web3Forms](https://web3forms.com)** (free tier). Subjects look like: **`53583a <Area of Interest>`**.

The key is **not** in `contact-form.js`. Use **`.env` → sync script → `web3forms-config.js`** (see above), or hand-create `web3forms-config.js` from `web3forms-config.example.js`.

### Web3Forms dashboard

Allow your domain (**`agrvsolutions.com`**) and/or **`localhost`** for local testing.

### GitHub Pages — hide the key in the repo

1. Repo → **Settings → Secrets and variables → Actions → New repository secret**  
   - Name: **`WEB3FORMS_ACCESS_KEY`**  
   - Value: your Web3Forms access key  
2. Repo → **Settings → Pages** → set **Source** to **GitHub Actions** (not “Deploy from a branch”) if you use the workflow below.
3. Push the included workflow **`.github/workflows/deploy-pages.yml`**. On each push to `main`/`master`, it creates `web3forms-config.js` from the secret and deploys the site. The key never appears in git history.

If you keep **Deploy from a branch** instead of Actions, you cannot inject the secret automatically — you would have to commit a config file (key would be public) or switch to Actions deploy.

### Email validation (browser only)

The form checks format, rejects obvious fake prefixes (`test@…`, `fake@…`), and blocks common **disposable** domains. It **cannot** prove a mailbox exists (that needs a server or paid verification API).

## Hosting

The site is set up for GitHub Pages with the custom domain. See **[HOSTING.md](HOSTING.md)** for DNS (Namecheap) and GitHub Pages setup.
