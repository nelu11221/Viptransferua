# transport

Landing page for the Ukraine ⇄ Chișinău transfer service (plus Europe on
request), built with React + Vite. Copy and fares come from the client's
existing site (ukrainetomoldova.com.ua); contact details are still placeholders.

## Setup from zero

```bash
npm create vite@latest transport -- --template react
cd transport
npm install
npm run dev
```

Then open http://localhost:5173.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with oxlint |

## Structure

```
index.html                 page shell, fonts, <title>
src/
  main.js                  React entry point
  App.js                   page composition (section order)
  App.css                  all styles (tokens, sections, RTL, responsive)
  data/
    content.js             prices, durations, ids — no words
  i18n/
    translations.js        language list + translation map
    ro/ru/uk/he.js         one file per language
    LanguageContext.js     language state, <html lang/dir>, localStorage
    format.js              locale-aware money / duration formatting
  components/
    Header.js              floating pill: logo, nav, language, CTA
    LanguageSwitcher.js    dropdown (Română, Русский, Українська, עברית)
    Hero.js                pinned hero: headline, channels, trust badges
    HeroScrollMedia.js     canvas frames scrubbed by scroll (+ fallback)
    ContactChannels.js     WhatsApp / Viber / Telegram buttons
    SectionHead.js         shared title + subtitle
    EssentialFacts.js      airport quick-facts table
    TransferInfo.js        two long-form info blocks
    Vehicles.js            eight tariff classes with USD fares
    Faq.js                 ten-question accordion
    PopularRoutes.js       22 cities × both directions
    Europe.js              European countries, quoted per request
    CtaBanner.js           closing call to action
    Fleet.js               bento photo gallery, reveal on scroll
    CursorGrid/            React Bits cursor-reactive grid (vendored)
    Footer.js              four link columns + language switcher
```

Adding a section: create the component, add its copy to all four language
files, put any numbers in `data/content.js`, then mount it in `App.js`.

## Languages

Romanian (default), Russian, Ukrainian and Hebrew. Hebrew flips the page to
RTL via `document.documentElement.dir`; the choice is remembered in
`localStorage` under `transport.lang`. All four files carry the same 110 keys.

To add a language: add an entry to `LANGUAGES` and a matching block in
`translations` in `src/i18n/translations.js`. Nothing else needs to change.

## Note on `.js` files with JSX

`vite.config.js` includes a small `jsx-in-js-files` plugin so that plain `.js`
files can contain JSX (Vite normally requires `.jsx`). That keeps the classic
`App.js` / `main.js` naming.

## Page order

Hero → essential facts → advantages & coverage → fleet gallery → tariffs →
FAQ → directions → Europe on request → CTA banner → footer.

There is no booking form — the site is a landing page, and every call to action
opens WhatsApp, Viber or Telegram instead.

## Hero scroll effect

The hero is pinned (`position: sticky`) for one screen plus `--hero-scroll`
(160vh, set in `App.css`). Scroll progress 0…1 drives a canvas that draws one
animation frame per position, and is published as `--hero-progress` for the
scroll cue. Its bottom edge dissolves into the next section through six
stacked `backdrop-filter` layers over a gradient that reaches solid white
(`.hero__fade`) — the stage has no border radius, since a rounded corner draws
the very edge the blur is meant to hide.

The media comes from `public/gif_scroll/`, in this order:

1. a frame sequence — naming and length are detected automatically
   (`frame-0001.jpg`, `img_001.png`, `1.webp`, starting at 0 or 1)
2. `hero.gif` — decoded to frames in the browser via `ImageDecoder`
   (Chrome/Edge/Safari 17+; elsewhere it plays as a normal image)
3. nothing — an animated gradient stands in

It currently holds 100 JPG frames (7.4 MB), derived from the 300 source PNGs in
`transport/gif_scroll/` — that source folder sits outside `public/`, so it is
never served or bundled. See the README in `public/gif_scroll/` for the exact
conversion and the accepted file names.

## Fleet gallery

A plain CSS-grid bento: every third photo spans the full width, the rest pair
up, so the rhythm holds for any number of photos in `FLEET_PHOTOS`. Tiles fade
and rise once as they enter the viewport (`IntersectionObserver`, staggered
90ms across a row) and the image pushes in very slowly on hover. Both stop
under `prefers-reduced-motion`.

This replaced a React Bits ScrollStack. That version pinned the section for
~5000px of scroll and pulled in `lenis`, which hijacked smooth scrolling for the
whole document; both are gone now and the page scrolls natively again.

The tiles are image-only — no captions. Photos live in `public/fleet/`, resized
from the originals in `transport/parc_auto/` (23 MB → 1.6 MB). That source
folder sits outside `public/`, so it is never bundled.

## CursorGrid

`src/components/CursorGrid/` is the React Bits `CursorGrid-JS-CSS` component,
copied verbatim from `https://reactbits.dev/r/CursorGrid-JS-CSS.json`. The
shadcn CLI could not write it here (it crashes parsing the registry's `.css`
file in a non-TypeScript project), so the two files were fetched from the same
registry by hand. No dependencies, no Tailwind.

It renders behind the closing CTA (`CtaBanner.js`); move the `<CursorGrid />`
block to another section to relocate the effect.

## Brand assets

The logo files live in `Logo/` (source) and are served from `public/logo/`:
`logo-dark.svg` for light backgrounds (header pill) and `logo-light.svg` for
dark ones (footer). Both are the same artwork; only the wordmark fill differs.
`.logo__img` sizes them by height — the file is 418×105.

`public/favicon.svg` is the yellow VIP badge alone, extracted from the logo.
Note the original SVG carries `fill="none"` on its root and the badge outline
inherits it; the extracted file keeps that attribute, without which the badge
fills solid black and swallows the lettering.

`apple-touch-icon.png` (180×180) is that same mark rasterised, plus a
`theme-color` of `#FFCC00` for mobile browser chrome.

## Icons

`react-icons` — Lucide (`react-icons/lu`) for interface icons and Simple Icons
(`react-icons/si`) for the WhatsApp / Viber / Telegram marks.

Country flags are SVGs from `country-flag-icons`, wrapped in `CountryFlag.js`,
which imports the fifteen we use one by one so the bundle does not carry all
~250. They replaced emoji flags, which rendered differently per OS and not at
all on most of Windows. `EUROPE_COUNTRIES` and `LANGUAGES` now hold ISO codes
(`RO`, `UA`, …) instead of emoji.

Icon sizes live in one block in `App.css` rather than on each element. The only
hand-drawn SVG left is the logo mark in `Header.js` / `Footer.js`.

## Fonts

Ubuntu for headings, Inter for body text — both loaded in `index.html`,
switched via `--font-heading` / `--font` in `App.css`.

## Content

Fares are USD per car, scraped from the per-city pages on the source site
(`/ru/<city>-chisinau-airport-transfer-taxi.html`), taking the standard-class
figure from each. All 22 cities now carry a real "from" price, sorted cheapest
first: Odesa 150 … Sumy 900.

`VEHICLES` holds the entry-level tariff per class (150 / 170 / 250 / 250 / 300 /
400 / 450, coach on request) — the cheapest published route, Odesa — Chișinău —
so the section reads as starting prices rather than one route's flat rates. Each
card also shows a struck-through "was" price with a −10% badge, derived from
`DISCOUNT` (`price / 0.9`), so the badge and the numbers cannot drift apart.

Europe stays "on request": the source publishes no fares for it. The country
list in `EUROPE_COUNTRIES` is a plausible starting set, not something the source
published — adjust it to the routes actually served.

Still placeholders in `src/data/content.js`: `PHONE` / `PHONE_DISPLAY`
(currently `+32 470 00 00 00`) and the Telegram handle in `CHANNELS`.
