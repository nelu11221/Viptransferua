import { LuArrowRight } from 'react-icons/lu'
import { CHANNELS, ROUTE_CITIES } from '../data/content.js'
import { useLanguage } from '../i18n/LanguageContext.js'
import { money } from '../i18n/format.js'
import SectionHead from './SectionHead.js'

const WHATSAPP = CHANNELS.find((c) => c.id === 'whatsapp').href

function Route({ from, to, price }) {
  const { t, language } = useLanguage()

  return (
    <a className="route" href={WHATSAPP} target="_blank" rel="noreferrer">
      <span className="route__path">
        <span className="route__from">{t.routes.cities[from]}</span>
        <LuArrowRight className="route__arrow" aria-hidden="true" />
        <span className="route__to">{t.routes.cities[to]}</span>
      </span>
      <span className="route__meta">
        {price === null ? (
          <span className="route__request">{t.units.onRequest}</span>
        ) : (
          <span className="route__price">
            <small>{t.units.from}</small>{' '}
            <span className="num">{money(language.locale, price)}</span>
          </span>
        )}
      </span>
    </a>
  )
}

export default function PopularRoutes() {
  const { t } = useLanguage()

  return (
    <section className="section section--alt" id="routes">
      <div className="container">
        <SectionHead title={t.routes.title} subtitle={t.routes.subtitle} />

        {/* Each city fills one row: outbound on the left, return on the right. */}
        <ul className="routes">
          {ROUTE_CITIES.map((city) => (
            <li className="routes__pair" key={city.id}>
              <Route from="chisinau" to={city.id} price={city.price} />
              <Route from={city.id} to="chisinau" price={city.price} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
