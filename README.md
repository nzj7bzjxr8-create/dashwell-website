# dashwell-website

Combined **Dashwell** site — a hub page plus product sites for **Dashwell Portfolio Creator**
(formerly FinDash) and **DashCSV**: landing pages, privacy policies, terms, support, and user
guides for both apps. Branded to match [dashwellsolutions.com](https://dashwellsolutions.com).

Published via **GitHub Pages** from the `docs/` folder on the **`master`** branch:

| Page | URL |
|------|-----|
| Hub / Home | https://nzj7bzjxr8-create.github.io/dashwell-website/ |
| About | https://nzj7bzjxr8-create.github.io/dashwell-website/about.html |
| Contact | https://nzj7bzjxr8-create.github.io/dashwell-website/contact.html |
| Dashwell Portfolio Creator | https://nzj7bzjxr8-create.github.io/dashwell-website/findash/ |
| ↳ Privacy Policy | https://nzj7bzjxr8-create.github.io/dashwell-website/findash/privacy.html |
| ↳ Support | https://nzj7bzjxr8-create.github.io/dashwell-website/findash/support.html |
| ↳ Terms of Use | https://nzj7bzjxr8-create.github.io/dashwell-website/findash/terms.html |
| ↳ User Guide | https://nzj7bzjxr8-create.github.io/dashwell-website/findash/guide.html |
| DashCSV | https://nzj7bzjxr8-create.github.io/dashwell-website/dashcsv/ |
| ↳ Privacy Policy | https://nzj7bzjxr8-create.github.io/dashwell-website/dashcsv/privacy.html |
| ↳ Support | https://nzj7bzjxr8-create.github.io/dashwell-website/dashcsv/support.html |
| ↳ Terms of Use | https://nzj7bzjxr8-create.github.io/dashwell-website/dashcsv/terms.html |
| ↳ User Guide | https://nzj7bzjxr8-create.github.io/dashwell-website/dashcsv/guide.html |

> ⚠️ **App Store Connect note:** `findash/privacy.html`, `findash/support.html`,
> `dashcsv/privacy.html`, and `dashcsv/support.html` may be referenced as the apps' Privacy/Support
> URLs. **Do not rename or delete them** — keep all four live and returning HTTP 200.

This repo was renamed from `findash-website` (formerly the standalone Dashwell Portfolio Creator
site) and absorbed the contents of the separate `dashcsv-website` repo, which now only hosts
redirect stubs pointing here.

## Edit and publish (no build step)

```bash
# 1. Edit hub pages (docs/index.html, docs/about.html, docs/contact.html, docs/style.css)
#    or a product's pages (docs/findash/*.html, docs/dashcsv/*.html)

# 2. Commit and push to the master branch
git add -A
git commit -m "Update Dashwell site"
git push                 # branch: master

# 3. GitHub Pages rebuilds docs/ automatically — live in ~1 minute.
```

There is **no build/CI step** — the HTML in `docs/` is served as-is.

## Structure

```
docs/
  index.html, about.html, contact.html   # hub pages
  style.css, assets/                     # shared stylesheet + shared assets (logo, favicon)
  findash/                               # Dashwell Portfolio Creator product site
  dashcsv/                               # DashCSV product site
```

## Look & feel

- Stylesheet `docs/style.css` matches dashwellsolutions.com (black hero, white `#e5e7eb`-bordered
  cards, 16px radius, Dashwell logo header, LLC footer). The canonical copy lives in the Dashwell
  repo at `web-shared/github-pages-style.css` — edit there, then copy into `docs/style.css` to keep
  it consistent with the source.
- Each product page sets `<link rel="canonical">` to the matching `dashwellsolutions.com/findash…`
  or `dashwellsolutions.com/dashcsv…` URL so the WordPress site stays the SEO-canonical source. Hub
  pages canonicalize to the WordPress equivalents (`/`, `/about`, `/contact`).
- Legal text mirrors `Dashwell/wordpress/legal-sources/findash/` and
  `Dashwell/wordpress/dashcsv-*-content.txt`. When legal copy changes, update those sources **and**
  these pages.
- `contact.html` is static (mailto link + links to each product's Support page) — GitHub Pages
  can't process form submissions. Each product's `support.html` still has a working Formspree form.

## GitHub Pages setup

Repo **Settings → Pages → Build and deployment** → **Source: Deploy from a branch** →
**Branch: `master` / `docs`**.
