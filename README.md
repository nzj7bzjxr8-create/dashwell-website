# dashwell-website

Static **backup** of the Dashwell marketing site, published via **GitHub Pages**.
Use this if [dashwellsolutions.com](https://dashwellsolutions.com) is down.

The live WordPress site remains the primary site. This repo is a static snapshot
that works on GitHub Pages at:

**https://nzj7bzjxr8-create.github.io/dashwell-website/**

Pages is served from the `docs/` folder on the **`master`** branch. There is **no
build step** and **no CNAME** — the backup must keep working on `github.io` even
when the custom domain is unavailable. Internal links are relative so they work
under the `/dashwell-website/` base path.

| Page | Backup URL |
|------|------------|
| Hub / Home | https://nzj7bzjxr8-create.github.io/dashwell-website/ |
| About | https://nzj7bzjxr8-create.github.io/dashwell-website/about.html |
| Contact | https://nzj7bzjxr8-create.github.io/dashwell-website/contact.html |
| Compare | https://nzj7bzjxr8-create.github.io/dashwell-website/compare/ |
| SheetStand | https://nzj7bzjxr8-create.github.io/dashwell-website/sheetstand/ |
| FormatStand | https://nzj7bzjxr8-create.github.io/dashwell-website/formatstand/ |
| Dashwell | https://nzj7bzjxr8-create.github.io/dashwell-website/dashwell/ |
| ↳ User Guide | https://nzj7bzjxr8-create.github.io/dashwell-website/dashwell/guide.html |
| Privacy (shared) | https://nzj7bzjxr8-create.github.io/dashwell-website/privacy.html |
| Terms (shared) | https://nzj7bzjxr8-create.github.io/dashwell-website/terms.html |
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
> `dashcsv/privacy.html`, and `dashcsv/support.html` may be referenced as the apps'
> Privacy/Support URLs. **Do not rename or delete them** — keep all four live and
> returning HTTP 200.

## Edit and publish (no build step)

```bash
# 1. Edit files under docs/

# 2. Commit and push to the master branch
git add -A
git commit -m "Update Dashwell backup site"
git push                 # branch: master

# 3. GitHub Pages rebuilds docs/ automatically — live in ~1 minute.
```

## Structure

```
docs/
  index.html, about.html, contact.html, privacy.html, terms.html
  compare/, sheetstand/, formatstand/, dashwell/
  findash/, dashcsv/
  style.css, assets/
```

## GitHub Pages setup

Repo **Settings → Pages → Build and deployment** → **Source: Deploy from a branch** →
**Branch: `master` / `docs`**. Leave **Custom domain** empty so the backup stays on
`github.io` if dashwellsolutions.com is down.

Contact forms post to Formspree (independent of the WordPress host). Email links
use `mailto:info@dashwellsolutions.com`.
