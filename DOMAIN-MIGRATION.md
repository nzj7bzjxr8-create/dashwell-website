# Domain Migration Runbook — dashwellsolutions.com

How `dashwellsolutions.com` was moved from WordPress hosting to this GitHub Pages
site on **2026-08-28**, and how to put it back.

Everything in this file is public DNS information (anyone can `dig` it). No
credentials belong in this document.

## The two configurations

| | **WordPress (original)** | **GitHub Pages (current)** |
|---|---|---|
| Apex `@` | A → `66.223.49.89` | A ×4 → `185.199.108.153`, `.109.153`, `.110.153`, `.111.153` |
| `www` | A → `66.223.49.89` | CNAME → `nzj7bzjxr8-create.github.io.` |
| Repo Pages custom domain | *(empty)* | `dashwellsolutions.com` + Enforce HTTPS |
| `docs/CNAME` | *(absent)* | contains `dashwellsolutions.com` |
| Canonical/og URLs, sitemap, robots | `nzj7bzjxr8-create.github.io/dashwell-website/…` | `dashwellsolutions.com/…` |

**Unchanged in both directions — never touch these:**

- `MX @ → mailserver.businessidentity.llc` (priority 10)
- `TXT @ → v=spf1 a mx include:spf.postal.businessidentity.llc ~all`
- `TXT _dmarc`, `TXT postal-tb7e4t._domainkey` (DKIM)
- `CNAME psrp → rp.postal.businessidentity.llc.`
- `A mail → 66.223.49.89`, `A * → 66.223.49.89`
- The two `NS` records

These carry `info@dashwellsolutions.com`. Breaking them breaks email, and email
failures are quiet — mail lands in spam rather than bouncing, so you may not
notice for days.

---

## Part 1 — Migrate to GitHub Pages

### Step 0. Lower TTLs (a day ahead if you can)

Northwest → **Domain Settings → DNS Settings**. Set the TTL on the `@` and `www`
A records to **1 min**. This is what makes a rollback take a minute instead of
hours. Screenshot the full record list before changing anything.

### Step 1. Point DNS at GitHub

Still in **DNS Settings**:

**A Records** — Edit `@` to `185.199.108.153`, then **Add** three more `@` rows:

```
185.199.109.153
185.199.110.153
185.199.111.153
```

Then **delete the `www` A record**. Leave `*` and `mail` alone.

**CNAME Records** — Add:

```
Host:  www
Value: nzj7bzjxr8-create.github.io.
```

Delete the `www` A record *first* — most panels reject a CNAME on a host that
already has an A record.

Leave **AAAA** (optional; empty is fine), **SRV**, and **CAA** empty. An empty CAA
section matters: a CAA record naming a different certificate authority would block
GitHub from issuing the HTTPS certificate.

Verify before continuing:

```bash
dig +noall +answer A dashwellsolutions.com @ns1.hosting.businessidentity.llc
dig +noall +answer CNAME www.dashwellsolutions.com @ns1.hosting.businessidentity.llc
dig +noall +answer MX dashwellsolutions.com @ns1.hosting.businessidentity.llc
```

Expect four `185.199.x.153` answers, the `www` CNAME, and the MX unchanged.
**Do not proceed until DNS is correct** — GitHub's certificate request will fail
if the domain doesn't already resolve to it.

### Step 2. Set the custom domain on the repo

Either **Settings → Pages → Custom domain** → `dashwellsolutions.com` → Save, or:

```bash
gh api -X PUT repos/nzj7bzjxr8-create/dashwell-website/pages -f cname=dashwellsolutions.com
```

This auto-commits `docs/CNAME` to `master`, so `git pull --rebase` before your
next push.

Watch for the certificate:

```bash
gh api repos/nzj7bzjxr8-create/dashwell-website/pages --jq '{cname,https_enforced,cert:.https_certificate.state,status}'
```

When `cert` reads `approved` (minutes to an hour), enable HTTPS:

```bash
gh api -X PUT repos/nzj7bzjxr8-create/dashwell-website/pages -F https_enforced=true
```

`https_enforced` must be a **separate call after** the certificate is approved —
it cannot be set in the same request as the cname. The `http://` → `https://`
redirect then takes a few more minutes to reach GitHub's edge.

### Step 3. Update the site's absolute URLs

Internal links are relative and need no changes. Only absolute URLs do:

```bash
grep -rl "nzj7bzjxr8-create\.github\.io/dashwell-website/" docs README.md | \
  xargs sed -i '' 's|https://nzj7bzjxr8-create\.github\.io/dashwell-website/|https://dashwellsolutions.com/|g'
```

That covers `<link rel="canonical">`, `og:url`, `og:image`, `docs/sitemap.xml`,
`docs/robots.txt`, and the README table. Commit and push after Step 2 succeeds,
so the github.io site stays untouched if you have to back out.

### Step 4. Verify

See [Verification](#verification) below.

### Step 5. Afterwards

- Update Privacy/Support URLs in **App Store Connect** for Dashwell Portfolio
  Creator and DashCSV. The old github.io URLs keep working via GitHub's 301, but
  Apple should point at the canonical domain.
- Resubmit `https://dashwellsolutions.com/sitemap.xml` in Google Search Console.
- **Keep the WordPress hosting paid up for at least two weeks.** Cancelling it is
  the one step that makes this hard to undo.

---

## Part 2 — Roll back to WordPress

Nothing was deleted during the migration, so this is just re-pointing records.
With 60-second TTLs the whole thing takes about five minutes.

### Step 1. Clear the custom domain on the repo

Do this **first** — while it's set, GitHub 301-redirects the github.io URL to a
domain that is about to point elsewhere.

**Settings → Pages → Custom domain** → clear the field → Save. Or:

```bash
gh api -X PUT repos/nzj7bzjxr8-create/dashwell-website/pages -f cname=
```

### Step 2. Remove `docs/CNAME`

```bash
git rm docs/CNAME
git commit -m "Remove custom domain"
git push
```

`nzj7bzjxr8-create.github.io/dashwell-website/` serves normally again as soon as
Pages rebuilds.

### Step 3. Restore DNS

Northwest → **DNS Settings**:

- **A Records** — delete all four `185.199.x.153` rows on `@`; add `@ → 66.223.49.89`.
- **A Records** — add `www → 66.223.49.89`.
- **CNAME Records** — delete the `www` row. Leave `psrp` alone.
- **AAAA** — delete the GitHub IPv6 rows if you added any.
- MX / TXT / NS — untouched, as always.

### Step 4. Revert the site URLs

```bash
git revert <migration-commit>   # 070e7d8 for the 2026-08-28 migration
git push
```

Or run the `sed` from Step 3 of Part 1 with the two URLs swapped.

### Step 5. Verify the rollback

```bash
dig +short A dashwellsolutions.com                 # 66.223.49.89
dig +short A www.dashwellsolutions.com             # 66.223.49.89
dig +short MX dashwellsolutions.com                # mailserver.businessidentity.llc
curl -sI https://dashwellsolutions.com/ | head -3  # WordPress, not GitHub.com
curl -sI https://nzj7bzjxr8-create.github.io/dashwell-website/ | head -1  # 200, not 301
```

**Browser HSTS caveat:** browsers that visited the site while Enforce HTTPS was on
may insist on `https://` for a while. The WordPress host already answers on HTTPS,
so this should be invisible — but it's why the rollback isn't quite instant for
every returning visitor.

---

## Verification

```bash
# DNS
dig +short A dashwellsolutions.com @8.8.8.8
dig +short www.dashwellsolutions.com @8.8.8.8

# Email must be unchanged
dig +short MX dashwellsolutions.com
dig +short TXT dashwellsolutions.com
dig +short TXT _dmarc.dashwellsolutions.com

# Redirect chains all land on https://dashwellsolutions.com/
curl -sI -L http://dashwellsolutions.com/ -o /dev/null -w '%{url_effective} %{http_code}\n'
curl -sI -L http://www.dashwellsolutions.com/ -o /dev/null -w '%{url_effective} %{http_code}\n'
curl -sI https://nzj7bzjxr8-create.github.io/dashwell-website/ | grep -i '^location'

# Certificate
echo | openssl s_client -connect dashwellsolutions.com:443 \
  -servername dashwellsolutions.com 2>/dev/null | \
  openssl x509 -noout -subject -issuer -dates

# Every page and asset returns 200
B=https://dashwellsolutions.com
for p in / /about.html /contact.html /compare/ /music/ /sheetstand/ /formatstand/ \
         /dashwell/ /dashwell/guide.html /findash/ /findash/privacy.html \
         /findash/support.html /findash/terms.html /findash/guide.html /dashcsv/ \
         /dashcsv/privacy.html /dashcsv/support.html /dashcsv/terms.html \
         /privacy.html /terms.html /style.css /assets/dashwell-logo.png; do
  printf '%-32s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' "$B$p")"
done
```

Finally, send a test message to `info@dashwellsolutions.com` and confirm it
arrives — DNS checks prove the records exist, not that mail flows.

---

## Gotchas

**A CNAME at the apex is invalid and dangerous.** A CNAME must be the *only*
record at a name, and the apex already holds A, MX, and TXT records. If one ever
took effect it would take down the website *and* email. During this migration the
`www` CNAME was first saved with Host `@`; Northwest's nameservers refused to
publish it (that was the error popup), so nothing broke — but don't rely on that
safety net.

**Northwest's panel displays the `www` CNAME's Host as `@`.** This is a UI
rendering bug. The zone is correct. Verify with `dig` against
`ns1.hosting.businessidentity.llc` rather than trusting the table, and don't
"fix" the display — see the apex warning above.

**The `*` wildcard A record still points at WordPress.** It doesn't affect `@`
(wildcards never match the apex) and it doesn't affect `www` (an explicit record
always beats a wildcard). But between deleting the `www` A record and adding the
`www` CNAME, `www` silently falls through to the wildcard and serves the old
site. That gap is expected; don't panic at it.

**SPF's `a` mechanism follows the A record.** `v=spf1 a mx include:… ~all`
authorizes whatever `@` resolves to — so after migrating it authorizes GitHub's
IPs instead of the web host. Outbound mail goes through the postal server, which
is covered by `mx` and the `include:`, so this is a non-event here. It would
matter if anything ever sent mail directly from the web host.

**GitHub Pages serves a project site at the domain root.** Once a custom domain
is set, `docs/sheetstand/index.html` is `dashwellsolutions.com/sheetstand/`, not
`/dashwell-website/sheetstand/`. This site's internal links are all relative
(`../style.css`, `compare/`), so nothing broke. A site using absolute
`/dashwell-website/…` paths would need every one rewritten.

**The github.io URL stops being an independent backup.** With a custom domain set,
GitHub 301-redirects it to `dashwellsolutions.com`. If DNS for the domain breaks,
the github.io fallback breaks with it — the redirect points into the outage. A
genuinely independent backup needs a second repo with no custom domain.
