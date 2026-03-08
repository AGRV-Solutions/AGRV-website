# Hosting agrvsolutions.com on GitHub Pages

Follow these steps to point your Namecheap domain to this GitHub Pages site.

---

## 1. Push the site and enable GitHub Pages

1. Commit and push this repo (including the `CNAME` file):
   ```bash
   git add .
   git commit -m "Add site and CNAME for agrvsolutions.com"
   git push origin main
   ```

2. On GitHub: open **AGRV-Solutions/AGRV-website** → **Settings** → **Pages**.

3. Under **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: `main` / root
   - Click **Save**.

4. Under **Custom domain**:
   - Enter: `agrvsolutions.com`
   - Click **Save**.
   - When DNS is correct, GitHub will show a green check. Then enable **Enforce HTTPS**.

---

## 2. Configure DNS at Namecheap

In **Namecheap** → **Domain List** → **Manage** next to **agrvsolutions.com** → **Advanced DNS**.

### A records (for agrvsolutions.com)

Add or edit so you have **four A records** for the apex:

| Type | Host | Value              | TTL  |
|------|------|--------------------|------|
| A    | @    | 185.199.108.153    | Auto |
| A    | @    | 185.199.109.153    | Auto |
| A    | @    | 185.199.110.153    | Auto |
| A    | @    | 185.199.111.153    | Auto |

(If you already have a single A record for `@`, replace it with these four.)

### Optional: redirect www to apex

If you want **www.agrvsolutions.com** to open the same site:

| Type   | Host | Value                    | TTL  |
|--------|------|--------------------------|------|
| CNAME  | www  | AGRV-Solutions.github.io | Auto |

Then in GitHub **Settings → Pages → Custom domain**, you can add `www.agrvsolutions.com` as well, or keep only `agrvsolutions.com` (visitors can use either if CNAME is set).

---

## 3. Wait and verify

- DNS can take from a few minutes up to 24–48 hours.
- In GitHub **Settings → Pages**, when the custom domain shows a green check, turn on **Enforce HTTPS**.
- Visit **https://agrvsolutions.com** to confirm.

---

## Summary

- **Repo**: AGRV-Solutions/AGRV-website, branch `main`, deploy from branch (root).
- **CNAME file**: Contains `agrvsolutions.com` so GitHub serves the site for that domain.
- **Namecheap**: Four A records for `@` pointing to GitHub’s IPs; optionally CNAME `www` to `AGRV-Solutions.github.io`.
