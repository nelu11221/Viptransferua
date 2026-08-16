import { LuCheck } from 'react-icons/lu'
import { useLanguage } from '../i18n/LanguageContext.js'

export default function TransferInfo() {
  const { t } = useLanguage()

  return (
    <section className="section section--alt" id="info">
      <div className="container info">
        {t.info.blocks.map((block) => (
          <article className="info__block" key={block.title}>
            <h2 className="info__title">{block.title}</h2>
            {block.paragraphs.map((p) => (
              <p className="info__text" key={p.slice(0, 24)}>
                {p}
              </p>
            ))}
            <ul className="info__list">
              {block.bullets.map((bullet) => (
                <li key={bullet}>
                  <LuCheck aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
