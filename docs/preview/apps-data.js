/* ============================================================================
   Dashwell app catalog — data source for the /preview/ layout experiment.

   THIS IS THE ONLY FILE YOU EDIT TO ADD AN APP.
   Append one object below and the tile, the filter chips, and the detail
   popup all appear on /preview/ automatically. Nothing else to touch.

   Field reference
     slug        required  short id, also the deep-link anchor (#app=<slug>)
     name        required  display name
     icon        required  path to the app icon, relative to /preview/
     tagline     optional  one short line under the name in the popup
     summary     required  1-2 sentences shown on the tile
     families    optional  ["money"] | ["music"]  -> Money / Music filter chips
     platforms   optional  any of "mac", "ipad", "iphone" -> platform filters
     chips       optional  free-text labels shown on the tile and popup
     description optional  array of paragraphs for the popup body
     highlights  optional  array of bullet strings for the popup body
     meta        optional  { version, since, ... } shown as small pills.
                           Deliberately has NO price field - this layout
                           does not display prices.
     shots       optional  [{ src, alt, caption }] screenshot rail.
                           Omit or leave empty and the rail is simply not
                           rendered - no placeholder, no empty gap.
                           New screenshots go in preview/shots/<slug>/.
     appStore    optional  App Store URL -> "View on App Store" button
     page        optional  existing detail page -> "Full details" button
   ========================================================================== */

window.DASHWELL_CATALOG = [
  {
    slug: "findash",
    name: "Dashwell Portfolio Creator",
    icon: "../assets/findash-icon.png",
    tagline: "Find what matters, faster — for complex Excel & CSV data",
    summary: "Easy dashboard creator for complex Excel & CSV data. Build portfolio and custom dashboards from any spreadsheet — track tax lots, dividends, inventories, and more.",
    families: ["money"],
    platforms: ["mac", "ipad"],
    chips: ["Mac", "iPad", "Finance"],
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
      { src: "../findash/assets/findash-port-dashboard-mac-full.png", alt: "Dashwell Portfolio Creator — Portfolio mode dashboard with allocation and performance widgets on macOS", caption: "Portfolio dashboard" },
      { src: "../findash/assets/findash-port-options-mac-full.png", alt: "Dashwell Portfolio Creator — Portfolio mode options monitor on macOS", caption: "Options monitor" },
      { src: "../findash/assets/findash-custom-dashboard-mac-full.png", alt: "Dashwell Portfolio Creator — Custom mode home inventory dashboard on macOS", caption: "Custom dashboards" },
      { src: "../findash/assets/findash-custom-attachments-mac-full.png", alt: "Dashwell Portfolio Creator — Custom mode attachments and receipts on macOS", caption: "Attachments & receipts" },
      { src: "../findash/assets/findash-ipad-p1.png", alt: "Dashwell Portfolio Creator running on iPad", caption: "On iPad" }
    ],
    appStore: "https://apps.apple.com/app/findash-portfolio-tracker/id6759726608",
    page: "../findash/"
  },

  {
    slug: "dashcsv",
    name: "DashCSV",
    icon: "../assets/dashcsv-icon.png",
    tagline: "A modern portfolio management & financial dashboard",
    summary: "The established portfolio dashboard for Mac. Import broker CSVs, track tax lots, and monitor dividends and earnings under the DashCSV App Store brand.",
    families: ["money"],
    platforms: ["mac"],
    chips: ["Mac", "Finance"],
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
    shots: [],
    appStore: "https://apps.apple.com/app/dashcsv/id6759270039",
    page: "../dashcsv/"
  },

  {
    slug: "dashwell",
    name: "Dashwell: Your Money Assistant",
    icon: "../assets/dashwell-icon.png",
    tagline: "Your money assistant",
    summary: "Apple Pay and Wallet tracking on iPhone, plus portfolio, banking, and custom dashboards — all synced across your devices with iCloud.",
    families: ["money"],
    platforms: ["mac", "ipad", "iphone"],
    chips: ["Mac", "iPad", "iPhone", "Finance"],
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
    shots: [],
    appStore: "https://apps.apple.com/us/search?term=Dashwell%20Your%20Money%20Assistant",
    page: "../dashwell/"
  },

  {
    slug: "sheetstand",
    name: "SheetStand",
    icon: "../assets/sheetstand-icon.png",
    tagline: "Sheet music library & practice stand",
    summary: "Local-first PDF sheet-music library and practice stand — organize your scores, then play along with a metronome, backing tracks, and a MIDI keyboard.",
    families: ["music"],
    platforms: ["ipad", "mac", "iphone"],
    chips: ["iPad", "Mac", "iPhone", "Music"],
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
    shots: [],
    appStore: "https://apps.apple.com/app/sheetstand-your-score-library/id6796785020",
    page: "../sheetstand/"
  },

  {
    slug: "formatstand",
    name: "FormatStand",
    icon: "../assets/formatstand-icon.png",
    tagline: "Batch audio converter for Mac",
    summary: "Local-first batch audio converter for Mac. Drop folders of FLAC, MP3, and more — convert to AAC, ALAC, AIFF, or WAV while keeping tags and artwork.",
    families: ["music"],
    platforms: ["mac"],
    chips: ["Mac", "Music"],
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
    shots: [],
    appStore: "https://apps.apple.com/app/formatstand-audio-converter/id6805688145",
    page: "../formatstand/"
  }
];
