import { LuCheck, LuPhone, LuShieldCheck } from 'react-icons/lu'
import { PHONE, PHONE_DISPLAY } from '../data/content.js'
import { useLanguage } from '../i18n/LanguageContext.js'
import ContactChannels from './ContactChannels.js'
import HeroScrollMedia from './HeroScrollMedia.js'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="hero" id="top">
      <div className="hero__stage">
        <HeroScrollMedia />
        <div className="hero__scrim" aria-hidden="true" />

        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="hero__eyebrow">{t.hero.eyebrow}</p>
            <h1 className="hero__title">{t.hero.title}</h1>
            <p className="hero__subtitle">{t.hero.subtitle}</p>

            <p className="hero__contact-label">{t.contact.label}</p>
            <ContactChannels variant="hero" />

            <a className="hero__phone" href={`tel:${PHONE}`}>
              <LuPhone aria-hidden="true" />
              <span className="num">{PHONE_DISPLAY}</span>
            </a>

            <p className="hero__note">
              <LuShieldCheck aria-hidden="true" />
              {t.hero.note}
            </p>

            <ul className="hero__stats">
              {t.hero.stats.map((stat) => (
                <li key={stat} className="hero__stat">
                  <LuCheck aria-hidden="true" />
                  {stat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Progressive blur melting the hero into the section below. */}
        <div className="hero__fade" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} />
          ))}
        </div>

        <div className="hero__cue" aria-hidden="true">
          <span className="hero__cue-track">
            <span className="hero__cue-fill" />
          </span>
          {t.hero.scroll}
        </div>
      </div>
    </section>
  )
}
