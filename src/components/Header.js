import { useEffect, useRef, useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { CHANNELS } from '../data/content.js'
import { useLanguage } from '../i18n/LanguageContext.js'
import LanguageSwitcher from './LanguageSwitcher.js'

const WHATSAPP = CHANNELS.find((c) => c.id === 'whatsapp').href

export default function Header() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)

  // The panel covers the hero on phones, so it has to be dismissable the ways
  // people expect — tap outside, Escape — not only by the X. Same listener
  // pattern as the language menu.
  useEffect(() => {
    if (!open) return undefined

    function onPointerDown(e) {
      if (!headerRef.current?.contains(e.target)) setOpen(false)
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    // Growing past the burger breakpoint hides the panel but would leave the
    // state (and aria-expanded) stuck open.
    const desktop = window.matchMedia('(min-width: 1041px)')
    function onDesktop(e) {
      if (e.matches) setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onDesktop)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [open])

  const links = [
    { label: t.nav.routes, href: '#routes' },
    { label: t.nav.fleet, href: '#fleet' },
    { label: t.nav.prices, href: '#vehicles' },
    { label: t.nav.faq, href: '#faq' },
  ]

  return (
    <header className="header" ref={headerRef}>
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

          <nav id="site-nav" className={`nav${open ? ' is-open' : ''}`} aria-label="Main">
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
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  )
}
