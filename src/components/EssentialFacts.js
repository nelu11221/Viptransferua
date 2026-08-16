import { FACTS } from '../data/content.js'
import { useLanguage } from '../i18n/LanguageContext.js'
import SectionHead from './SectionHead.js'

export default function EssentialFacts() {
  const { t } = useLanguage()

  return (
    <section className="section section--tight" id="facts">
      <div className="container">
        <SectionHead title={t.facts.title} subtitle={t.facts.subtitle} />

        <dl className="facts">
          {FACTS.map((id) => (
            <div className="facts__row" key={id}>
              <dt className="facts__label">{t.facts.rows[id].label}</dt>
              <dd className="facts__value">{t.facts.rows[id].value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
