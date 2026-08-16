import { useEffect, useRef, useState } from 'react'
import { LuCheck, LuChevronDown } from 'react-icons/lu'
import { LANGUAGES } from '../i18n/translations.js'
import { useLanguage } from '../i18n/LanguageContext.js'
import CountryFlag from './CountryFlag.js'

export default function LanguageSwitcher() {
  const { language, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function onPointerDown(e) {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className="lang" ref={ref}>
      <button
        type="button"
        className="lang__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <CountryFlag code={language.flag} className="lang__flag" />
        <span className="lang__label">{language.label}</span>
        <LuChevronDown className="lang__caret" aria-hidden="true" />
      </button>

      {open && (
        <ul className="lang__menu" role="listbox">
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === language.code}
                className={`lang__option${l.code === language.code ? ' is-active' : ''}`}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
              >
                <CountryFlag code={l.flag} className="lang__flag" />
                <span>{l.label}</span>
                {l.code === language.code && (
                  <LuCheck className="lang__check" aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
