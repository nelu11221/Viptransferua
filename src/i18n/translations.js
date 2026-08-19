import ru from './ru.js'
import uk from './uk.js'
import he from './he.js'

export const LANGUAGES = [
  { code: 'uk', label: 'Українська', short: 'UA', flag: 'UA', dir: 'ltr', locale: 'uk-UA' },
  { code: 'ru', label: 'Русский', short: 'RU', flag: 'RU', dir: 'ltr', locale: 'ru-RU' },
  { code: 'he', label: 'עברית', short: 'HE', flag: 'IL', dir: 'rtl', locale: 'he-IL' },
]

export const DEFAULT_LANGUAGE = 'uk'

export const translations = { ru, uk, he }
