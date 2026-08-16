import { useState } from 'react'
import { LuMinus, LuPlus } from 'react-icons/lu'
import { useLanguage } from '../i18n/LanguageContext.js'
import SectionHead from './SectionHead.js'

export default function Faq() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(0)

  return (
    <section className="section" id="faq">
      <div className="container container--narrow">
        <SectionHead title={t.faq.title} subtitle={t.faq.subtitle} />

        <ul className="faq">
          {t.faq.items.map((item, index) => {
            const isOpen = open === index
            return (
              <li className={`faq__item${isOpen ? ' is-open' : ''}`} key={item.q}>
                <button
                  type="button"
                  className="faq__question"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <LuMinus className="faq__sign" aria-hidden="true" />
                  ) : (
                    <LuPlus className="faq__sign" aria-hidden="true" />
                  )}
                </button>
                {isOpen && <p className="faq__answer">{item.a}</p>}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
