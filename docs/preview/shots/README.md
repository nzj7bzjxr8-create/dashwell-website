# Preview screenshots

App Store screenshots used by the `/preview/` layout's detail popups.

## Adding screenshots for an app

1. Put the images in a folder named after the app's slug:
   `preview/shots/<slug>/whatever-you-like.png`
2. List them in that app's `shots` array in `../apps-data.js`:

   ```js
   shots: [
     { src: "shots/sheetstand/library.png",
       alt:  "SheetStand score library on iPad",
       caption: "Score library" }
   ]
   ```

`alt` is required for accessibility; `caption` is optional and shows under the
image. An app with an empty or missing `shots` array renders no screenshot rail
at all — no placeholder, no gap — so it is fine to add them one app at a time.

Dashwell Portfolio Creator currently reuses the existing screenshots in
`../../findash/assets/` rather than duplicating them here.
