import ro from './ro.js'
import ru from './ru.js'
import uk from './uk.js'
import he from './he.js'

export const LANGUAGES = [
  { code: 'ro', label: 'Română', short: 'RO', flag: 'RO', dir: 'ltr', locale: 'ro-RO' },
  { code: 'ru', label: 'Русский', short: 'RU', flag: 'RU', dir: 'ltr', locale: 'ru-RU' },
  { code: 'uk', label: 'Українська', short: 'UA', flag: 'UA', dir: 'ltr', locale: 'uk-UA' },
  { code: 'he', label: 'עברית', short: 'HE', flag: 'IL', dir: 'rtl', locale: 'he-IL' },
]

export const DEFAULT_LANGUAGE = 'ro'

export const translations = { ro, ru, uk, he }
