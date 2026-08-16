import { LuBus, LuCar, LuTruck, LuUsers } from 'react-icons/lu'
import { CHANNELS, DISCOUNT, VEHICLES } from '../data/content.js'
import { useLanguage } from '../i18n/LanguageContext.js'
import { money } from '../i18n/format.js'
import SectionHead from './SectionHead.js'

const SHAPES = { sedan: LuCar, van: LuTruck, bus: LuBus }
const WHATSAPP = CHANNELS.find((c) => c.id === 'whatsapp').href

export default function Vehicles() {
  const { t, language } = useLanguage()

  return (
    <section className="section section--alt" id="vehicles">
      <div className="container">
        <SectionHead title={t.vehicles.title} subtitle={t.vehicles.subtitle} />

        <div className="vehicles">
          {VEHICLES.map((vehicle) => {
            const Icon = SHAPES[vehicle.shape]
            return (
              <article className="vehicle" key={vehicle.id}>
                <Icon className="vehicle__icon" aria-hidden="true" />
                <h3 className="vehicle__name">{t.vehicles.items[vehicle.id].name}</h3>
                <p className="vehicle__desc">{t.vehicles.items[vehicle.id].desc}</p>

                {vehicle.pax && (
                  <ul className="vehicle__specs">
                    <li>
                      <LuUsers aria-hidden="true" />
                      {vehicle.pax} {t.vehicles.pax}
                    </li>
                  </ul>
                )}

                <div className="vehicle__footer">
                  <span className="vehicle__price">
                    {vehicle.price === null ? (
                      <span className="vehicle__request">{t.units.onRequest}</span>
                    ) : (
                      <>
                        <small>{t.units.from}</small>
                        <span className="vehicle__was">
                          <s>
                            <span className="sr-only">{t.units.oldPrice}: </span>
                            <span className="num">
                              {money(language.locale, Math.round(vehicle.price / (1 - DISCOUNT)))}
                            </span>
                          </s>
                          <span className="vehicle__badge">
                            −{Math.round(DISCOUNT * 100)}%
                          </span>
                        </span>
                        <span className="num vehicle__now">
                          {money(language.locale, vehicle.price)}
                        </span>
                      </>
                    )}
                  </span>
                  <a
                    className="btn btn--outline"
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.vehicles.select}
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
