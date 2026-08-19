import { LuArrowLeft } from 'react-icons/lu'
import privacy from '../i18n/privacy.js'
import { useLanguage } from '../i18n/LanguageContext.js'
import LanguageSwitcher from './LanguageSwitcher.js'

export default function PrivacyPolicy() {
  const { lang } = useLanguage()
  const copy = privacy[lang] ?? privacy.uk

  return (
    <div className="app legal">
      <header className="legal__bar">
        <div className="container legal__bar-inner">
          <a className="logo" href="/">
            <img
              className="logo__img"
              src="/logo/logo-dark.svg"
              alt="VIP Transfer"
              width="418"
              height="105"
            />
          </a>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container container--narrow legal__body">
        <h1 className="legal__title">{copy.title}</h1>
        <p className="legal__updated">{copy.updated}</p>
        <p className="legal__intro">{copy.intro}</p>

        {copy.sections.map((section) => (
          <section className="legal__section" key={section.heading}>
            <h2 className="legal__heading">{section.heading}</h2>

            {section.paragraphs?.map((text) => (
              <p className="legal__text" key={text.slice(0, 32)}>
                {text}
              </p>
            ))}

            {section.bullets && (
              <ul className="legal__list">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {section.after && <p className="legal__text">{section.after}</p>}
          </section>
        ))}

        <a className="legal__back" href="/">
          <LuArrowLeft aria-hidden="true" />
          {copy.back}
        </a>
      </main>
    </div>
  )
}
