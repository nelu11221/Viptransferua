import { SiInstagram, SiTelegram, SiWhatsapp } from 'react-icons/si'
import { CHANNELS } from '../data/content.js'
import { useLanguage } from '../i18n/LanguageContext.js'

const ICONS = {
  whatsapp: SiWhatsapp,
  instagram: SiInstagram,
  telegram: SiTelegram,
}

export default function ContactChannels({ variant = 'hero' }) {
  const { t } = useLanguage()

  return (
    <ul className={`channels channels--${variant}`}>
      {CHANNELS.map((channel) => {
        const Icon = ICONS[channel.id]
        return (
          <li key={channel.id}>
            <a
              className={`channel channel--${channel.id}`}
              href={channel.href}
              target="_blank"
              rel="noreferrer"
            >
              <Icon className="channel__icon" aria-hidden="true" />
              {t.contact.channels[channel.id]}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
