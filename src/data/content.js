// Hero animation scrubbed by scroll. Drop the frames in public/gif_scroll/ —
// the naming (frame-0001.jpg, frame_001.png, 0001.webp, 1.jpg …) is detected
// automatically. A hero.gif in the same folder is used as a second choice, and
// with neither the hero falls back to an animated gradient.
export const HERO_MEDIA = {
  dir: '/gif_scroll/',
  gif: '/gif_scroll/hero.gif',
  maxFrames: 400,
}

// Replace with the real business number / Telegram handle before going live.
export const PHONE = '+32470000000'
export const PHONE_DISPLAY = '+32 470 00 00 00'

export const CHANNELS = [
  { id: 'whatsapp', href: `https://wa.me/${PHONE.replace('+', '')}` },
  { id: 'viber', href: `viber://chat?number=${encodeURIComponent(PHONE)}` },
  { id: 'telegram', href: 'https://t.me/transporttransfers' },
]

// Fleet gallery photos, in public/fleet/. Image-only cards — no captions.
// Order drives the layout: every third one runs full width.
export const FLEET_PHOTOS = [
  'v-class.jpg',
  'sedan-1.jpg',
  'lincoln.jpg',
  'vito.jpg',
  'carnival.jpg',
  'sprinter.jpg',
  'sedan-2.jpg',
]

export const FACTS = [
  'route',
  'priceFrom',
  'classes',
  'payment',
  'drivers',
  'booking',
  'coverage',
  'guarantee',
]

// Current fares are the discounted ones; the struck-through "was" price is
// derived from this rate so the badge and the numbers always agree.
export const DISCOUNT = 0.1

// Entry-level fares in USD per car (not per seat), taken from the cheapest
// published route. Longer routes cost more — see ROUTE_CITIES. `pax` only where
// the tariff states a capacity; `price: null` means quoted on request.
export const VEHICLES = [
  { id: 'standard', price: 150, pax: 3, shape: 'sedan' },
  { id: 'minivan', price: 170, shape: 'van' },
  { id: 'business', price: 250, shape: 'sedan' },
  { id: 'vito', price: 250, pax: 6, shape: 'van' },
  { id: 'vclass', price: 300, shape: 'van' },
  { id: 'sclass', price: 400, shape: 'sedan' },
  { id: 'sprinter', price: 450, pax: 14, shape: 'bus' },
  { id: 'bus', price: null, pax: 50, shape: 'bus' },
]

// Cities we serve across Ukraine. Each one renders twice in the directions
// grid — Chișinău → city on the left, city → Chișinău on the right — so the
// pair sits on the same row. Only published fares are filled in.
export const ROUTE_CITIES = [
  { id: 'odesa', price: 150 },
  { id: 'vinnytsia', price: 300 },
  { id: 'chernivtsi', price: 300 },
  { id: 'mykolaiv', price: 300 },
  { id: 'khmelnytskyi', price: 350 },
  { id: 'ternopil', price: 350 },
  { id: 'uman', price: 350 },
  { id: 'zhytomyr', price: 380 },
  { id: 'kropyvnytskyi', price: 380 },
  { id: 'kyiv', price: 400 },
  { id: 'ivanoFrankivsk', price: 400 },
  { id: 'cherkasy', price: 400 },
  { id: 'dnipro', price: 400 },
  { id: 'lviv', price: 430 },
  { id: 'rivne', price: 430 },
  { id: 'uzhhorod', price: 500 },
  { id: 'lutsk', price: 500 },
  { id: 'kharkiv', price: 500 },
  { id: 'poltava', price: 550 },
  { id: 'zaporizhzhia', price: 700 },
  { id: 'chernihiv', price: 700 },
  { id: 'sumy', price: 900 },
]

// Europe runs are quoted per request — no published fares to show.
export const EUROPE_COUNTRIES = [
  { id: 'romania', code: 'RO' },
  { id: 'poland', code: 'PL' },
  { id: 'hungary', code: 'HU' },
  { id: 'slovakia', code: 'SK' },
  { id: 'czechia', code: 'CZ' },
  { id: 'austria', code: 'AT' },
  { id: 'germany', code: 'DE' },
  { id: 'italy', code: 'IT' },
  { id: 'bulgaria', code: 'BG' },
  { id: 'netherlands', code: 'NL' },
  { id: 'belgium', code: 'BE' },
  { id: 'france', code: 'FR' },
]

export const FOOTER_COLUMNS = [
  { id: 'directions', items: ['kyiv', 'odesa', 'lviv', 'kharkiv', 'chernivtsi'] },
  { id: 'services', items: ['airport', 'intercity', 'groups', 'return'] },
  { id: 'company', items: ['about', 'fleet', 'prices', 'order'] },
  { id: 'support', items: ['faq', 'payment', 'coverage', 'privacy'] },
]
