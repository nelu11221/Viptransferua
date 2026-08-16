import { useEffect, useRef } from 'react'
import { FLEET_PHOTOS } from '../data/content.js'
import { useLanguage } from '../i18n/LanguageContext.js'
import SectionHead from './SectionHead.js'

export default function Fleet() {
  const { t } = useLanguage()
  const gridRef = useRef(null)

  // Tiles fade and rise once, the first time they come into view.
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return undefined

    const tiles = Array.from(grid.children)
    if (typeof IntersectionObserver === 'undefined') {
      tiles.forEach((tile) => tile.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    tiles.forEach((tile) => observer.observe(tile))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section fleet" id="fleet">
      <div className="container">
        <SectionHead title={t.fleet.title} subtitle={t.fleet.subtitle} />

        <div className="gallery" ref={gridRef}>
          {FLEET_PHOTOS.map((photo, i) => (
            <figure
              className="gallery__item"
              key={photo}
              /* Neighbours in the same row come in slightly after each other. */
              style={{ '--delay': `${i * 55}ms` }}
            >
              <img
                className="gallery__img"
                src={`/fleet/${photo}`}
                alt=""
                width="1600"
                height="893"
                loading="eager"
                fetchPriority={i === 0 ? 'high' : 'low'}
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
