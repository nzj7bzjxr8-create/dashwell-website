# findash-website

Standalone **Dashwell Portfolio Creator** (formerly FinDash) product site — landing page, privacy policy, terms, support, and user guide.
Branded to match [dashwellsolutions.com](https://dashwellsolutions.com).

Published via **GitHub Pages** from the `docs/` folder on the **`master`** branch:

| Page | URL |
|------|-----|
| Home | https://nzj7bzjxr8-create.github.io/findash-website/ |
| Privacy Policy | https://nzj7bzjxr8-create.github.io/findash-website/privacy.html |
| Support | https://nzj7bzjxr8-create.github.io/findash-website/support.html |
| Terms of Use | https://nzj7bzjxr8-create.github.io/findash-website/terms.html |
| User Guide | https://nzj7bzjxr8-create.github.io/findash-website/guide.html |

> ⚠️ **App Store Connect note:** `privacy.html` and `support.html` may be referenced as the app's
> Privacy/Support URLs. **Do not rename or delete them** — keep both live and returning HTTP 200.

## Edit and publish (no build step)

```bash
# 1. Edit any page or the stylesheet
#    docs/index.html  docs/privacy.html  docs/terms.html  docs/support.html  docs/guide.html  docs/style.css

# 2. Commit and push to the master branch
git add -A
git commit -m "Update Dashwell Portfolio Creator site"
git push                 # branch: master

# 3. GitHub Pages rebuilds docs/ automatically — live in ~1 minute.
```

There is **no build/CI step** — the HTML in `docs/` is served as-is.

## Look & feel

- Stylesheet `docs/style.css` matches dashwellsolutions.com (black hero, white `#e5e7eb`-bordered
  cards, 16px radius, Dashwell logo header, LLC footer). The canonical copy lives in the Dashwell
  repo at `web-shared/github-pages-style.css` — edit there, then copy into `docs/style.css` to keep
  both app sites consistent.
- Each page sets `<link rel="canonical">` to the matching `dashwellsolutions.com/findash…` URL so the
  WordPress site stays the SEO-canonical source.
- Legal text mirrors `Dashwell/wordpress/legal-sources/findash/`. When legal copy changes, update
  that source **and** these pages.

## GitHub Pages setup

Repo **Settings → Pages → Build and deployment** → **Source: Deploy from a branch** →
**Branch: `master` / `docs`**.
