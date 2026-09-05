/* ============================================================================
   Dashwell app catalog — data behind the home page popups and the contact
   form's app picker.

   ADDING AN APP TAKES TWO EDITS:
     1. Append one object below — this drives the home page popup and the
        contact form's app picker.
     2. Add one <a class="app-tile"> block to index.html — the tiles are real
        HTML links so the home page works for crawlers and without JavaScript.
   Keep the slug identical in both; home.js pairs them up by data-slug.

   Field reference
     slug        required  short id, also the deep-link anchor (#app=<slug>)
     name        required  display name
     icon        required  path to the app icon, relative to the site root
     tagline     optional  one short line under the name in the popup
     summary     required  1-2 sentences shown on the tile
     families    optional  ["money"] | ["music"]. Drives BOTH the Money/Music
                           filter and the coloured category badge that leads
                           each tile - see DASHWELL_FAMILY_LABELS below.
     platforms   optional  any of "mac", "ipad", "iphone" -> platform filters
     chips       optional  platform labels shown after the category badge,
                           e.g. ["Mac", "iPad"]. Do not repeat the category
                           here - it is added automatically.
     description optional  array of paragraphs for the popup body
     highlights  optional  array of bullet strings for the popup body
     meta        optional  { version, since, ... } shown as small pills.
                           Deliberately has NO price field - this layout
                           does not display prices.
     shots       optional  [{ src, alt, caption }] screenshot rail.
                           Omit or leave empty and the rail is simply not
                           rendered - no placeholder, no empty gap.
                           New screenshots go in assets/shots/<slug>/.
     appStore    optional  App Store URL -> "View on App Store" button
     page        optional  existing detail page -> "Full details" button
   ========================================================================== */

/* Display label for each family, used by the category badge that leads every
   tile and popup. Adding a family? Add its label here and a `.cat-<key>` rule
   in home.css to give it a colour - without one it falls back to grey. */
window.DASHWELL_FAMILY_LABELS = {
  money: "Finance",
  music: "Music"
};

window.DASHWELL_CATALOG = [
  {
    slug: "findash",
    name: "Dashwell Portfolio Creator",
    icon: "assets/findash-icon.png",
    tagline: "Find what matters, faster — for complex Excel & CSV data",
    summary: "Easy dashboard creator for complex Excel & CSV data. Build portfolio and custom dashboards from any spreadsheet — track tax lots, dividends, inventories, and more.",
    families: ["money"],
    platforms: ["mac", "ipad"],
    chips: ["Mac", "iPad"],
    description: [
      "Import broker CSVs into Portfolio mode, or build Custom dashboards from any table. Optional API keys add delayed quotes.",
      "Your data stays on your Mac unless you turn on iCloud sync. No account, no subscription, no proprietary format."
    ],
    highlights: [
      "Portfolio dashboard with allocation and performance widgets",
      "Multi-broker CSV support",
      "Tax lot tracking",
      "Dividend and earnings event monitoring",
      "Custom dashboards and data spaces",
      "Smart columns, widgets, and attachments"
    ],
    meta: { platform: "macOS & iPad" },
    shots: [
      { src: "findash/assets/findash-port-dashboard-mac-full.png",
        alt: "Dashwell Portfolio Creator — Portfolio mode dashboard with allocation and performance widgets on macOS",
        caption: "Portfolio dashboard", w: 2880, h: 1800 },
      { src: "findash/assets/findash-port-options-mac-full.png",
        alt: "Dashwell Portfolio Creator — Portfolio mode options monitor on macOS",
        caption: "Options monitor", w: 2880, h: 1800 },
      { src: "findash/assets/findash-custom-dashboard-mac-full.png",
        alt: "Dashwell Portfolio Creator — Custom mode home inventory dashboard on macOS",
        caption: "Custom dashboards", w: 2880, h: 1800 },
      { src: "findash/assets/findash-custom-attachments-mac-full.png",
        alt: "Dashwell Portfolio Creator — Custom mode attachments and receipts on macOS",
        caption: "Attachments & receipts", w: 2880, h: 1800 },
      { src: "findash/assets/findash-ipad-p1.png",
        alt: "Dashwell Portfolio Creator running on iPad",
        caption: "On iPad", w: 1000, h: 1333 }
    ],
    appStore: "https://apps.apple.com/app/findash-portfolio-tracker/id6759726608",
    page: "findash/"
  },

  {
    slug: "dashcsv",
    name: "DashCSV",
    icon: "assets/dashcsv-icon.png",
    tagline: "A modern portfolio management & financial dashboard",
    summary: "The established portfolio dashboard for Mac. Import broker CSVs, track tax lots, and monitor dividends and earnings under the DashCSV App Store brand.",
    families: ["money"],
    platforms: ["mac"],
    chips: ["Mac"],
    description: [
      "DashCSV turns broker CSV exports into a portfolio dashboard on your Mac — no account to create and nothing uploaded.",
      "It shares its engine with Dashwell Portfolio Creator and remains the established App Store brand for Mac-only users."
    ],
    highlights: [
      "Portfolio dashboard",
      "Multi-broker CSV support",
      "Tax lot tracking",
      "Dividend and earnings event monitoring",
      "Custom dashboards",
      "Private and secure — data stays on your Mac"
    ],
    meta: { platform: "macOS" },
    shots: [
      { src: "assets/shots/dashcsv/dashcsv-dashboard-mac.png",
        alt: "DashCSV portfolio dashboard on Mac with allocation donut, performance report and top gainers and losers",
        caption: "Portfolio dashboard", w: 640, h: 400 },
      { src: "assets/shots/dashcsv/dashcsv-positions-mac.png",
        alt: "DashCSV positions table on Mac showing tax lots, market value and gain or loss per holding",
        caption: "Positions & tax lots", w: 640, h: 400 },
      { src: "assets/shots/dashcsv/dashcsv-options-monitor-mac.png",
        alt: "DashCSV options monitor on Mac listing option positions by expiry",
        caption: "Options monitor", w: 640, h: 400 },
      { src: "assets/shots/dashcsv/dashcsv-performance-report-mac.png",
        alt: "DashCSV performance analysis report on Mac with a per-holding performance chart",
        caption: "Performance reports", w: 640, h: 400 }
    ],
    appStore: "https://apps.apple.com/app/dashcsv/id6759270039",
    page: "dashcsv/"
  },

  {
    slug: "dashwell",
    name: "Dashwell",
    icon: "assets/dashwell-icon.png",
    tagline: "Your money assistant",
    summary: "Apple Pay and Wallet tracking on iPhone, plus portfolio, banking, and custom dashboards — all synced across your devices with iCloud.",
    families: ["money"],
    platforms: ["mac", "ipad", "iphone"],
    chips: ["Mac", "iPad", "iPhone"],
    description: [
      "Dashwell brings Apple Pay and Wallet transaction tracking to iPhone and syncs it with portfolio, banking, and custom dashboards across your devices.",
      "Local-first and private by default — iCloud sync is yours, not ours."
    ],
    highlights: [
      "Apple Pay & Wallet tracking on iPhone",
      "iCloud sync across Mac, iPad & iPhone",
      "Portfolio & stocks",
      "Banking & budgets",
      "Custom dashboards",
      "Local-first, private by default"
    ],
    meta: { platform: "Mac, iPad & iPhone" },
    shots: [
      { src: "assets/shots/dashwell/dashwell-portfolio-mac.png",
        alt: "Dashwell portfolio dashboard on Mac with allocation donut, spend by category and recent entries",
        caption: "Portfolio dashboard", w: 640, h: 400 },
      { src: "assets/shots/dashwell/dashwell-banking-mac.png",
        alt: "Dashwell banking dashboard on Mac showing spend by category, budget versus actual and recent transactions",
        caption: "Banking & budgets", w: 640, h: 400 },
      { src: "assets/shots/dashwell/dashwell-banking-light-mac.png",
        alt: "The same Dashwell banking dashboard on Mac in light appearance",
        caption: "Light appearance", w: 640, h: 400 },
      { src: "assets/shots/dashwell/dashwell-home-inventory-mac.png",
        alt: "Dashwell custom home inventory dashboard on Mac as a sortable data table",
        caption: "Custom dashboards", w: 640, h: 400 },
      { src: "assets/shots/dashwell/dashwell-attachments-mac.png",
        alt: "Dashwell showing a scanned receipt attached to a home inventory row on Mac",
        caption: "Attachments & receipts", w: 640, h: 400 },
      { src: "assets/shots/dashwell/dashwell-portfolio-ipad.png",
        alt: "Dashwell portfolio dashboard on iPad with budget versus actual and spend by category widgets",
        caption: "On iPad", w: 400, h: 534 },
      { src: "assets/shots/dashwell/dashwell-dashboard-iphone.png",
        alt: "Dashwell bank dashboard on iPhone showing this month's spend by category",
        caption: "On iPhone", w: 370, h: 800 },
      { src: "assets/shots/dashwell/dashwell-register-iphone.png",
        alt: "Dashwell transaction register on iPhone listing categorised credit card transactions",
        caption: "Transaction register", w: 370, h: 800 }
    ],
    appStore: "https://apps.apple.com/us/search?term=Dashwell%20Your%20Money%20Assistant",
    page: "dashwell/"
  },

  {
    slug: "sheetstand",
    name: "SheetStand",
    icon: "assets/sheetstand-icon.png",
    tagline: "Sheet music library & practice stand",
    summary: "Local-first PDF sheet-music library and practice stand — organize your scores, then play along with a metronome, backing tracks, and a MIDI keyboard.",
    families: ["music"],
    platforms: ["ipad", "mac", "iphone"],
    chips: ["iPad", "Mac", "iPhone"],
    description: [
      "Copy your PDF sheet music in, organize by title and composer, and play full-screen at the piano.",
      "Version 2.0 adds a metronome scheduled against the audio clock, backing tracks, adjustable practice speed, and MIDI keyboard play-along. Your scores live in your own iCloud Drive, not on our server."
    ],
    highlights: [
      "Metronome on the audio clock",
      "Backing tracks",
      "Practice speed 0.5×–1.5×",
      "MIDI keyboard play-along",
      "Full-screen performance view",
      "Your iCloud Drive, not our server"
    ],
    meta: { version: "2.0", platform: "iPad-first · Mac & iPhone" },
    shots: [
      { src: "assets/shots/sheetstand/sheetstand-home-ipad.png",
        alt: "SheetStand home on iPad with the library browsable by genre, composer, artist and key",
        caption: "Library home", w: 400, h: 534 },
      { src: "assets/shots/sheetstand/sheetstand-performance-view-ipad.png",
        alt: "SheetStand full-screen performance view on iPad showing a piano score",
        caption: "Full-screen performance", w: 400, h: 534 },
      { src: "assets/shots/sheetstand/sheetstand-metronome-midi-ipad.png",
        alt: "SheetStand on iPad with the performance panel open showing metronome tempo and MIDI settings",
        caption: "Metronome & MIDI", w: 400, h: 534 },
      { src: "assets/shots/sheetstand/sheetstand-library-ipad.png",
        alt: "SheetStand library list on iPad showing pieces with composer and genre",
        caption: "Your score library", w: 400, h: 534 },
      { src: "assets/shots/sheetstand/sheetstand-circle-of-fifths-ipad.png",
        alt: "SheetStand circle of fifths reference chart on iPad",
        caption: "Built-in reference", w: 400, h: 534 },
      { src: "assets/shots/sheetstand/sheetstand-home-mac.png",
        alt: "SheetStand home on Mac with library filters and recently played pieces",
        caption: "On Mac", w: 640, h: 400 },
      { src: "assets/shots/sheetstand/sheetstand-reference-mac.png",
        alt: "SheetStand reference shelf on Mac showing saved chord charts and scale PDFs",
        caption: "Reference shelf", w: 640, h: 400 },
      { src: "assets/shots/sheetstand/sheetstand-home-iphone.png",
        alt: "SheetStand home on iPhone with the library browsable by genre and composer",
        caption: "On iPhone", w: 370, h: 800 },
      { src: "assets/shots/sheetstand/sheetstand-score-iphone.png",
        alt: "SheetStand playing a piano score on iPhone with speed and page controls",
        caption: "Playing on iPhone", w: 370, h: 800 }
    ],
    appStore: "https://apps.apple.com/app/sheetstand-your-score-library/id6796785020",
    page: "sheetstand/"
  },

  {
    slug: "formatstand",
    name: "FormatStand",
    icon: "assets/formatstand-icon.png",
    tagline: "Batch audio converter for Mac",
    summary: "Local-first batch audio converter for Mac. Drop folders of FLAC, MP3, and more — convert to AAC, ALAC, AIFF, or WAV while keeping tags and artwork.",
    families: ["music"],
    platforms: ["mac"],
    chips: ["Mac"],
    description: [
      "Drop a folder of music, convert to the format you want, and keep tags and artwork — no accounts, no uploads.",
      "Everything runs on your Mac, offline."
    ],
    highlights: [
      "Batch convert whole folders",
      "Keep tags & artwork",
      "Split CUE albums",
      "Extract audio from video",
      "Local-first, works offline"
    ],
    meta: { platform: "macOS" },
    shots: [
      { src: "assets/shots/formatstand/formatstand-convert-folder-mac.png",
        alt: "FormatStand on Mac converting a whole folder of audio files at once",
        caption: "Convert a whole folder", w: 640, h: 400 },
      { src: "assets/shots/formatstand/formatstand-rename-from-tags-mac.png",
        alt: "FormatStand on Mac renaming output files from their tags using a filename template",
        caption: "Rename from tags", w: 640, h: 400 },
      { src: "assets/shots/formatstand/formatstand-originals-safe-mac.png",
        alt: "FormatStand on Mac showing already-converted files skipped so originals are never overwritten",
        caption: "Originals stay safe", w: 640, h: 400 },
      { src: "assets/shots/formatstand/formatstand-built-in-guide-mac.png",
        alt: "The FormatStand help guide open on Mac",
        caption: "The guide is built in", w: 640, h: 400 }
    ],
    appStore: "https://apps.apple.com/app/formatstand-audio-converter/id6805688145",
    page: "formatstand/"
  }
];
