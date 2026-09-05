# Preview screenshots

App Store screenshots used by the `/preview/` layout's detail popups, one
folder per app slug.

## Adding screenshots for an app

1. Put the images in `preview/shots/<slug>/`.
2. List them in that app's `shots` array in `../apps-data.js`:

   ```js
   shots: [
     { src: "shots/sheetstand/sheetstand-home-ipad.png",
       alt:  "SheetStand home on iPad with the library browsable by genre",
       caption: "Library home", w: 400, h: 534 }
   ]
   ```

`alt` is required for accessibility. `caption` shows under the image. `w`/`h`
are the image's real pixel dimensions — optional, but include them: they let
the browser reserve the right space before the image loads, so the rail does
not jump, and they tell it up front whether a shot is portrait. Read them with:

```bash
sips -g pixelWidth -g pixelHeight preview/shots/<slug>/*.png
```

Without `w`/`h` the layout still works — orientation is measured once the image
loads instead.

## How the rail lays out

Every landscape shot gets the same height and portrait shots get a taller one,
with widths following each image's own aspect ratio, so phone screenshots stay
readable next to Mac windows instead of becoming slivers. Heights also cap
against the viewport so a tall rail gives space back to the description on
short screens.

An app with an empty or missing `shots` array renders no rail at all — no
placeholder, no gap — so screenshots can be added one app at a time.

Dashwell Portfolio Creator reuses the existing images in
`../../findash/assets/` rather than duplicating them here.
