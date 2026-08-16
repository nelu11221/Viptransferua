import { FOOTER_COLUMNS } from '../data/content.js'
import { useLanguage } from '../i18n/LanguageContext.js'
import LanguageSwitcher from './LanguageSwitcher.js'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a className="logo" href="#top">
            <img
              className="logo__img"
              src="/logo/logo-light.svg"
              alt="VIP Transfer"
              width="418"
              height="105"
            />
          </a>
          <p className="footer__tagline">{t.footer.tagline}</p>
          <LanguageSwitcher />
        </div>

        <div className="footer__columns">
          {FOOTER_COLUMNS.map((column) => (
            <div className="footer__column" key={column.id}>
              <h3 className="footer__title">{t.footer.columns[column.id].title}</h3>
              <ul>
                {column.items.map((item) => (
                  <li key={item}>
                    <a href="#top">{t.footer.columns[column.id].items[item]}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container footer__bottom">
        <p>{t.footer.copyright}</p>
      </div>
    </footer>
  )
}
