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
| ↳ Support | https://dashwellsolutions.com/sheetstand/support.html |
| FormatStand | https://dashwellsolutions.com/formatstand/ |
| ↳ Support | https://dashwellsolutions.com/formatstand/support.html |
| Dashwell | https://dashwellsolutions.com/dashwell/ |
| ↳ Support | https://dashwellsolutions.com/dashwell/support.html |
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
| New layout preview (in development) | https://dashwellsolutions.com/preview/ |

> ⚠️ **App Store Connect note:** `findash/privacy.html`, `findash/support.html`,
> `dashcsv/privacy.html`, and `dashcsv/support.html` may be referenced as the apps'
> Privacy/Support URLs. **Do not rename or delete them** — keep all four live and
> returning HTTP 200.
>
> Every app now has its own support page — `dashwell/support.html`,
> `sheetstand/support.html` and `formatstand/support.html` were added alongside the two
> above. Once a URL is set as an app's Support URL in App Store Connect, treat it the same
> way: never rename or delete it. Support URL is editable in App Store Connect at any time
> without a new build, on the version page under General Information; if you do change one,
> leave the old page live until you are sure nothing points at it (GitHub Pages has no
> server-side redirects).

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
  preview/         # alternative home page layout, in development — see below
    index.html, preview.css, preview.js
    apps-data.js   # the app catalog that drives it
    shots/         # screenshots for its detail popups
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

## New layout preview (in development)

`https://dashwellsolutions.com/preview/` is a **second, experimental home page** running
alongside the current one so people can compare the two and say which they prefer. It shows
every app in a single tile grid with filter chips, and opens the details in a popup instead of
navigating to a separate page. It shows **no prices**, by design.

It is reachable from the "Preview" item in the header nav, a "New layout preview" link in every
footer, and a notice strip on the home page. Nothing else about the current site changed.

It is self-contained in `docs/preview/`:

- It loads `../style.css` first and then `preview.css`, so it inherits the site's existing
  colours, header, footer, and buttons. **Do not move its rules into `docs/style.css`** — that
  file is a copy of `Dashwell/web-shared/github-pages-style.css` and gets overwritten.
- It is `noindex` and deliberately **absent from `sitemap.xml`** while it is an experiment.

### Adding an app to the preview layout

Append one object to `docs/preview/apps-data.js`. The tile, the filter chips, and the detail
popup all follow automatically — no other file to edit. The field reference is in the comment at
the top of that file.

### Adding screenshots

All five apps have App Store screenshots. Drop new images in `docs/preview/shots/<slug>/` and
list them in that app's `shots` array, with `alt`, an optional `caption`, and the image's real
`w`/`h` so the rail reserves space and does not jump. An app with no screenshots simply renders
no rail — no placeholder, no gap. Dashwell Portfolio Creator reuses the existing images in
`docs/findash/assets/`. See `docs/preview/shots/README.md`.

### Retiring the experiment

Once a layout wins: delete `docs/preview/`, then remove the `Preview` nav item and the
`New layout preview` footer link from every page under `docs/`, and the notice strip from
`docs/index.html`. If the new layout is the winner instead, promote it and drop the `noindex`.
