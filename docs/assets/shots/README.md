# App screenshots

Screenshots used by the home page's detail popups and by each app's detail
page, one folder per app slug.

## Adding screenshots for an app

1. Put the images in `assets/shots/<slug>/`.
2. List them in that app's `shots` array in `../apps-data.js`:

   ```js
   shots: [
     { src: "assets/shots/sheetstand/sheetstand-home-ipad.png",
       alt:  "SheetStand home on iPad with the library browsable by genre",
       caption: "Library home", w: 400, h: 534 }
   ]
   ```

   Paths are relative to the site root, because the catalog is loaded by
   root-level pages (`index.html`, `contact.html`).
3. If the app's detail page should show them too, add matching
   `<figure class="screenshot-figure">` entries to its `.screenshot-rail`,
   with `../` in front of the path since detail pages sit one level down.

`alt` is required for accessibility. `caption` shows under the image. `w`/`h`
are the image's real pixel dimensions — optional, but include them: they let
the browser reserve the right space before the image loads, so the rail does
not jump, and they tell it up front whether a shot is portrait. Read them with:

```bash
sips -g pixelWidth -g pixelHeight assets/shots/<slug>/*.png
```

Without `w`/`h` the popup still works — orientation is measured once the image
loads instead.

## How the popup rail lays out

Every landscape shot gets the same height and portrait shots get a taller one,
with widths following each image's own aspect ratio, so phone screenshots stay
readable next to Mac windows instead of becoming slivers. Heights also cap
against the viewport so a tall rail gives space back to the description on
short screens.

An app with an empty or missing `shots` array renders no rail at all — no
placeholder, no gap — so screenshots can be added one app at a time.

Dashwell Portfolio Creator reuses the existing images in `../../findash/assets/`
rather than duplicating them here.
