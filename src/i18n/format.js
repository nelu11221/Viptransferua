// Locale-aware helpers shared by the price-heavy sections.

// Hebrew formatting injects bidi control marks that flip a "x – y" range
// around; strip them and let the CSS decide the direction instead.
const BIDI_MARKS = /[‎‏؜]/g

export function money(locale, value) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(BIDI_MARKS, '')
}
