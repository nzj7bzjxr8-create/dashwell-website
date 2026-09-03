# dashwell-website

The **live** Dashwell marketing site, published via **GitHub Pages** at:

**https://dashwellsolutions.com/**

This repo replaced the previous WordPress site. Pages is served from the `docs/`
folder on the **`master`** branch, with `docs/CNAME` setting the custom domain.
There is **no build step**. Internal links are relative, and with the custom domain
the site is served from the domain root, so `docs/sheetstand/index.html` is
`https://dashwellsolutions.com/sheetstand/`.

`https://nzj7bzjxr8-create.github.io/dashwell-website/` still resolves, but GitHub
now 301-redirects it to the custom domain — it is no longer an independent fallback.

| Page | URL |
|------|------------|
| Hub / Home | https://dashwellsolutions.com/ |
| About | https://dashwellsolutions.com/about.html |
| Contact | https://dashwellsolutions.com/contact.html |
| Compare | https://dashwellsolutions.com/compare/ |
| SheetStand | https://dashwellsolutions.com/sheetstand/ |
| FormatStand | https://dashwellsolutions.com/formatstand/ |
| Dashwell | https://dashwellsolutions.com/dashwell/ |
| ↳ User Guide | https://dashwellsolutions.com/dashwell/guide.html |
| Privacy (shared) | https://dashwellsolutions.com/privacy.html |
| Terms (shared) | https://dashwellsolutions.com/terms.html |
| Dashwell Portfolio Creator | https://dashwellsolutions.com/findash/ |
| ↳ Privacy Policy | https://dashwellsolutions.com/findash/privacy.html |
| ↳ Support | https://dashwellsolutions.com/findash/support.html |
| ↳ Terms of Use | https://dashwellsolutions.com/findash/terms.html |
| ↳ User Guide | https://dashwellsolutions.com/findash/guide.html |
| DashCSV | https://dashwellsolutions.com/dashcsv/ |
| ↳ Privacy Policy | https://dashwellsolutions.com/dashcsv/privacy.html |
| ↳ Support | https://dashwellsolutions.com/dashcsv/support.html |
| ↳ Terms of Use | https://dashwellsolutions.com/dashcsv/terms.html |
| ↳ User Guide | https://dashwellsolutions.com/dashcsv/guide.html |

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
    apps.js        # the app lineup — see below
```

### Adding a new app

`docs/assets/apps.js` is the one list of app names shared across pages: the contact form's
"Which app?" picker is built from it, so a new app needs one line there and nothing else on
`contact.html`. The form ships as a plain text field and is upgraded to the picker by that
script, so it still works if the script fails to load.

`privacy.html` and `terms.html` are written to cover **every** app Dashwell LLC publishes, by
family (finance apps / music apps) rather than by name, so a new app is covered the day it
ships. Names appear only as "at the date above" examples — refresh them when convenient, not as
a release blocker. A new app in an existing family needs no edit to either page; a genuinely new
*kind* of app needs a new family bullet in both.

## GitHub Pages setup

Repo **Settings → Pages → Build and deployment** → **Source: Deploy from a branch** →
**Branch: `master` / `docs`**, with **Custom domain** set to `dashwellsolutions.com`
and **Enforce HTTPS** enabled. That setting is mirrored by `docs/CNAME` — keep the
two in sync; deleting `docs/CNAME` drops the custom domain.

DNS lives at Northwest Registered Agent (`ns1/ns2.hosting.businessidentity.llc`).
The apex has four A records pointing at GitHub Pages (`185.199.108-111.153`), plus
AAAA records, and `www` is a CNAME to `nzj7bzjxr8-create.github.io.`. The **MX and
SPF records in that zone carry `info@dashwellsolutions.com` and must not be touched**
when changing where the website points.

Contact forms post to Formspree (independent of any host). Email links use
`mailto:info@dashwellsolutions.com`.
