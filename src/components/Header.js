import { useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { CHANNELS } from '../data/content.js'
import { useLanguage } from '../i18n/LanguageContext.js'
import LanguageSwitcher from './LanguageSwitcher.js'

const WHATSAPP = CHANNELS.find((c) => c.id === 'whatsapp').href

export default function Header() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  const links = [
    { label: t.nav.routes, href: '#routes' },
    { label: t.nav.fleet, href: '#fleet' },
    { label: t.nav.prices, href: '#vehicles' },
    { label: t.nav.faq, href: '#faq' },
  ]

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <a className="logo" href="#top">
            <img
              className="logo__img"
              src="/logo/logo-dark.svg"
              alt="VIP Transfer"
              width="418"
              height="105"
            />
          </a>

          <nav className={`nav${open ? ' is-open' : ''}`} aria-label="Main">
            <ul className="nav__list">
              {links.map((link) => (
                <li key={link.href}>
                  <a className="nav__link" href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="nav__actions">
              <LanguageSwitcher />
              <a className="btn btn--dark" href={WHATSAPP} target="_blank" rel="noreferrer">
                {t.nav.book}
              </a>
            </div>
          </nav>

          <button
            type="button"
            className="header__burger"
            aria-label={t.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  )
}
