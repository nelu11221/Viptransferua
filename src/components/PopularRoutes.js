import { useMemo, useState } from 'react'
import { LuArrowLeftRight } from 'react-icons/lu'
import { CHANNELS, ROUTE_CITIES } from '../data/content.js'
import { useLanguage } from '../i18n/LanguageContext.js'
import { money } from '../i18n/format.js'
import SectionHead from './SectionHead.js'

const WHATSAPP = CHANNELS.find((c) => c.id === 'whatsapp').href

// Every published fare runs to or from Chișinău, so a valid pair always has it
// on exactly one side. Picking a city on one side pins the other to the hub.
const HUB = 'chisinau'

const PRICES = new Map(ROUTE_CITIES.map((city) => [city.id, city.price]))

export default function PopularRoutes() {
  const { t, language } = useLanguage()
  const [from, setFrom] = useState(HUB)
  const [to, setTo] = useState(ROUTE_CITIES[0].id)

  // Twenty-two entries is a lot to scan in a dropdown, and the data order is by
  // price. Sorted by the name actually shown, in that language's collation.
  const cities = useMemo(() => {
    const collator = new Intl.Collator(language.locale)
    return ROUTE_CITIES.map((city) => ({ id: city.id, label: t.routes.cities[city.id] })).sort(
      (a, b) => collator.compare(a.label, b.label),
    )
  }, [language.locale, t])

  const options = useMemo(
    () => [{ id: HUB, label: t.routes.cities[HUB] }, ...cities],
    [cities, t],
  )

  const price = PRICES.get(from === HUB ? to : from)

  function pickFrom(value) {
    setFrom(value)
    if (value === HUB) {
      if (to === HUB) setTo(cities[0].id)
    } else {
      setTo(HUB)
    }
  }

  function pickTo(value) {
    setTo(value)
    if (value === HUB) {
      if (from === HUB) setFrom(cities[0].id)
    } else {
      setFrom(HUB)
    }
  }

  function swap() {
    setFrom(to)
    setTo(from)
  }

  return (
    <section className="section section--alt" id="routes">
      <div className="container container--narrow">
        <SectionHead title={t.routes.title} subtitle={t.routes.subtitle} />

        <div className="picker">
          <div className="picker__fields">
            <label className="picker__field">
              <span className="picker__label">{t.routes.pickFrom}</span>
              <select
                className="picker__select"
                value={from}
                onChange={(e) => pickFrom(e.target.value)}
              >
                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              className="picker__swap"
              onClick={swap}
              aria-label={t.routes.swap}
            >
              <LuArrowLeftRight aria-hidden="true" />
            </button>

            <label className="picker__field">
              <span className="picker__label">{t.routes.pickTo}</span>
              <select
                className="picker__select"
                value={to}
                onChange={(e) => pickTo(e.target.value)}
              >
                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="picker__result">
            <div className="picker__price">
              <span className="picker__price-label">{t.routes.priceLabel}</span>
              {/* aria-live so the figure is announced when a selection changes. */}
              <span className="picker__price-value" aria-live="polite">
                {price === null || price === undefined ? (
                  <span className="picker__request">{t.units.onRequest}</span>
                ) : (
                  <>
                    <small>{t.units.from}</small>{' '}
                    <span className="num">{money(language.locale, price)}</span>
                  </>
                )}
              </span>
            </div>

            <a className="btn btn--dark" href={WHATSAPP} target="_blank" rel="noreferrer">
              {t.nav.book}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
