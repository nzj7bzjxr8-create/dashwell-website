#!/usr/bin/env python3
"""Flag drift between the app catalog and the hand-written product tiles.

The home page's tiles are real HTML (so the page works for crawlers and
without JavaScript), which means each app's one-line summary is written in
two places: assets/apps-data.js and the tile markup. about.html and
music/index.html carry their own tiles too. This has drifted before —
about.html ran pre-2.0 SheetStand copy for months.

Read-only. Nothing generates anything and the site never depends on this;
run it before committing a copy change.

    python3 tools/check-tile-copy.py
"""
import html
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent / "docs"
PAGES = ["index.html", "about.html", "music/index.html"]


def catalog_summaries():
    text = (ROOT / "assets" / "apps-data.js").read_text()
    slugs = re.findall(r'slug: "([^"]+)"', text)
    summaries = re.findall(r'summary: "([^"]+)"', text)
    return dict(zip(slugs, summaries))


def tile_summaries(page_text):
    """Both tile shapes: the home page's .app-tile and the older .product-tile."""
    found = {}
    for slug, body in re.findall(
        r'href="\.{0,3}/?([a-z]+)/"[^>]*>(.*?)</a>', page_text, re.S
    ):
        m = re.search(r'<p(?: class="tile-summary")?>(.*?)</p>', body, re.S)
        if m:
            found[slug] = html.unescape(re.sub(r"\s+", " ", m.group(1)).strip())
    return found


def main():
    canon = catalog_summaries()
    problems = []

    for page in PAGES:
        path = ROOT / page
        if not path.exists():
            continue
        for slug, text in tile_summaries(path.read_text()).items():
            if slug not in canon:
                continue
            if text != html.unescape(canon[slug]):
                problems.append(
                    f"{page} — {slug}\n"
                    f"    tile:    {text}\n"
                    f"    catalog: {html.unescape(canon[slug])}"
                )

    if problems:
        print("Tile copy has drifted from assets/apps-data.js:\n")
        print("\n\n".join(problems))
        return 1

    print(f"Tile copy matches the catalog across {len(PAGES)} pages.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
