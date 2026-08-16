import { useLanguage } from '../i18n/LanguageContext.js'
import ContactChannels from './ContactChannels.js'
import CursorGrid from './CursorGrid/CursorGrid.jsx'

export default function CtaBanner() {
  const { t } = useLanguage()

  return (
    <section className="cta">
      <div className="cta__grid" aria-hidden="true">
        <CursorGrid
          cellSize={64}
          color="#ffb400"
          radius={170}
          maxOpacity={0.75}
          lineWidth={1}
          fillOpacity={0.05}
          gridOpacity={0.04}
        />
      </div>

      <div className="container cta__inner">
        <div>
          <h2 className="cta__title">{t.cta.title}</h2>
          <p className="cta__subtitle">{t.cta.subtitle}</p>
        </div>
        <ContactChannels variant="cta" />
      </div>
    </section>
  )
}
