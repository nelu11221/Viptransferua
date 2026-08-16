import { LuGlobe } from 'react-icons/lu'
import { CHANNELS, EUROPE_COUNTRIES } from '../data/content.js'
import { useLanguage } from '../i18n/LanguageContext.js'
import CountryFlag from './CountryFlag.js'
import SectionHead from './SectionHead.js'

const WHATSAPP = CHANNELS.find((c) => c.id === 'whatsapp').href

export default function Europe() {
  const { t } = useLanguage()

  return (
    <section className="section europe" id="europe">
      <div className="container">
        <SectionHead title={t.europe.title} subtitle={t.europe.subtitle} />

        <ul className="europe__grid">
          {EUROPE_COUNTRIES.map((country) => (
            <li className="europe__item" key={country.id}>
              <CountryFlag code={country.code} className="europe__flag" />
              <span className="europe__name">{t.europe.countries[country.id]}</span>
              <span className="europe__request">{t.units.onRequest}</span>
            </li>
          ))}
        </ul>

        <div className="europe__note">
          <LuGlobe aria-hidden="true" />
          <p>{t.europe.note}</p>
          <a className="btn btn--dark" href={WHATSAPP} target="_blank" rel="noreferrer">
            {t.europe.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
