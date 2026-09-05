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
  style.css        # shared base sheet (see the warning below)
  home.css, home.js # home page grid + app detail popup
  assets/
    apps-data.js   # the app catalog — see "Adding a new app"
    shots/<slug>/  # app screenshots
  preview/         # redirect stub; the trialled layout is now the home page
```

### Adding a new app

Two edits, both in `docs/`:

1. **`assets/apps-data.js`** — append one object. This drives the app's detail popup on the
   home page and the contact form's "Which app?" picker. The field reference is in the comment
   at the top of that file.
2. **`index.html`** — add one `<a class="app-tile">` block. The tiles are deliberately real
   HTML links rather than JavaScript-generated, so the home page works for search crawlers and
   with JavaScript off; `home.js` upgrades them to open the popup. Match `data-slug` to the
   catalog's `slug`, and set `data-families` / `data-platforms` — the filter chips are built
   from those attributes, so a new platform needs no code change.

The app's one-line summary therefore lives in both the tile and the catalog. Run
`python3 tools/check-tile-copy.py` to confirm they still agree — it also checks `about.html`
and `music/index.html`, which keep their own tiles and have drifted before.

The contact form ships as a plain text field and is upgraded to the picker by that script, so
it still works if the script fails to load.

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

## Home page

The home page is a single tile grid of every app with filter chips, and opens each app's
details in a popup rather than navigating away. It replaced the previous grouped-sections
layout after side-by-side feedback; the per-app detail pages were kept, and the popup's
"Full details" button goes to them. It shows **no prices**, by design.

- Tiles are **real `<a>` links** in `index.html`; `home.js` intercepts the click to open the
  popup. With JavaScript off, a click just opens the detail page, and the filter bar stays
  hidden. This is why the home page is crawlable — do not move tile rendering into JavaScript.
- `home.css` loads **after** `style.css` and only adds what the base sheet lacks. **Do not move
  its rules into `docs/style.css`** — that file is a copy of
  `Dashwell/web-shared/github-pages-style.css` and gets overwritten. `home.css`'s header
  comment lists exactly what it depends on from the base sheet, including the `.btn` classes
  that only ever appear via JavaScript.
- `docs/preview/` is a redirect stub to `/`, kept because that URL was shared with reviewers
  while the layout was being trialled.

### Adding screenshots

All five apps have App Store screenshots. Drop new images in `docs/assets/shots/<slug>/` and
list them in that app's `shots` array, with `alt`, an optional `caption`, and the image's real
`w`/`h` so the rail reserves space and does not jump. An app with no screenshots simply renders
no rail — no placeholder, no gap. Dashwell Portfolio Creator reuses the existing images in
`docs/findash/assets/`. See `docs/assets/shots/README.md`.

To show the same screenshots on the app's detail page, add matching
`<figure class="screenshot-figure">` entries to its `.screenshot-rail` — with `../` in front of
the path, since detail pages sit one level down. Give every one `width`, `height` and
`loading="lazy"`.

### Image sizes

App icons in `docs/assets/` are exported at **256px** — enough for the largest place they are
shown (`.hero .app-icon` at 120px) on a 2× display. They were once up to 1024px and 751 KB
each; the home page loads all five at once, so keep new ones at 256px.

