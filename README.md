# Restaurant Menu Website Template

A reusable, single-page restaurant menu website built with **HTML, CSS, vanilla
JavaScript and one JSON file**. No React, no npm, no build step, no backend.

```
/
├── index.html          # Structure only — no restaurant content
├── css/style.css       # Generic styles driven by CSS variables
├── js/app.js           # Loads the JSON and renders everything
├── data/restaurant.json # ← THE ONLY FILE YOU NORMALLY EDIT
├── assets/
│   ├── logo/  hero/  menu/  icons/
└── README.md
```

To build a different restaurant site: edit `data/restaurant.json`, replace the
images in `assets/`, upload to GitHub Pages. Done.

---

## Change restaurant information

Everything lives under `restaurant` in `data/restaurant.json`: `name`,
`shortName`, `tagline`, `description`, `cuisine`, `currency`,
`currencyPosition` (`"before"` or `"after"`), `logo`, `favicon` and the `hero`
block (image, title, subtitle, button labels).

## Add / remove menu categories

Edit the `categories` array. Each entry needs a unique `id` and a display
`name`. The **All** chip is added automatically and is always first.

```json
{ "id": "burgers", "name": "Burgers" }
```

Deleting a category does not delete its items — move the items to another
category first, or they will only appear under **All**.

## Add / remove menu items

Edit the `menu` array. Only `name` and `category` are really required:

```json
{
  "id": 21,
  "category": "burgers",
  "name": "Classic Smash",
  "description": "Double patty, cheddar, house sauce.",
  "price": 34,
  "calories": 720,
  "image": "assets/menu/smash.jpg",
  "available": true,
  "badge": "Bestseller",
  "dietary": ["Spicy"]
}
```

Graceful behaviour built in:

- no `description` → no empty space
- no `calories` → calories line hidden
- empty `badge` → no badge
- no `image` → a clean image-less card layout
- `"available": false` → the item **stays visible** but is dimmed and marked
  *Currently Unavailable*. This was chosen over hiding it so guests searching
  for a dish get an answer instead of a blank result. To hide sold-out items
  instead, simply delete them from the JSON.

## Change colors

Edit the `theme` block. Values are applied to CSS custom properties at runtime,
so the CSS file never needs touching.

| JSON key      | CSS variable          |
| ------------- | --------------------- |
| `primary`     | `--primary-color`     |
| `secondary`   | `--secondary-color`   |
| `accent`      | `--accent-color`      |
| `background`  | `--background-color`  |
| `surface`     | `--surface-color`     |
| `text`        | `--text-color`        |
| `mutedText`   | `--muted-text-color`  |
| `heroOverlay` | `--hero-overlay`      |
| `borderRadius`| `--border-radius`     |

## Change fonts

Set `headingFont` and `bodyFont` to any CSS font stack. To use Google Fonts,
list them in `googleFonts` — they are loaded dynamically, so `index.html`
never changes:

```json
"headingFont": "\"Playfair Display\", Georgia, serif",
"bodyFont": "\"Inter\", system-ui, sans-serif",
"googleFonts": ["Playfair Display:wght@600;700", "Inter:wght@400;600"]
```

Always keep a system fallback at the end of each stack.

## Change images

Drop your files into `assets/logo/`, `assets/hero/`, `assets/menu/` and point
the JSON paths at them. Paths are relative to `index.html`. Menu images use
`object-fit: cover`, so any aspect ratio still looks consistent. Recommended:
hero 1920×1080, menu items 800×600, logo square PNG.

## Change location / contact information

Edit `restaurant.contact` (phone, whatsapp, email, instagram, tiktok),
`restaurant.location` (name, address, googleMapsUrl, googleMapsEmbedUrl) and
`restaurant.openingHours`.

- **Call** uses `tel:` from `phone`
- **WhatsApp** uses `https://wa.me/` from `whatsapp`
- **Get Directions** uses `googleMapsUrl`, or falls back to a Maps search on the address
- Empty `googleMapsEmbedUrl` → the map is hidden
- Empty social URLs → those footer links are not rendered
- Empty `openingHours` → the hours block is hidden

To get an embed URL: Google Maps → Share → Embed a map → copy the `src` value.

## Enable Arabic / RTL

```json
"language": "ar",
"direction": "rtl"
```

The document `lang` and `dir` switch automatically and the whole layout mirrors
(one stylesheet handles both directions via logical CSS properties). Translate
the `labels` block and your menu text to Arabic, and pick an Arabic-friendly
font such as `"Cairo"` or `"Tajawal"` in `googleFonts`.

## UI text / translations

All interface strings live in the `labels` block: `all`, `menuHeading`,
`searchPlaceholder`, `noResults`, `visitHeading`, `call`, `whatsapp`,
`directions`, `unavailable` and `nav`.

## Deploy to GitHub Pages

1. Create a repository and upload these files to the repository root.
2. Repository → **Settings → Pages**.
3. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Save, wait a minute, open `https://<username>.github.io/<repo>/`.

Because everything is relative and static, no configuration is needed. For
local testing, serve the folder over HTTP (`python3 -m http.server`) — opening
`index.html` directly with `file://` blocks `fetch()` of the JSON.

## Features

Category chips with instant filtering, menu search combined with the active
category, sticky header and filter bar, smooth scrolling, lazy-loaded images,
semantic HTML with keyboard-accessible buttons and visible focus states,
dynamic `<title>`/meta description and Restaurant JSON-LD structured data, and
a friendly error screen if the JSON fails to load.
