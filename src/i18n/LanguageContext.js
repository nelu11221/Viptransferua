import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES, translations } from './translations.js'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'transport.lang'

// localStorage throws — not returns null — when storage is blocked (embedded
// in an iframe, Safari with cookies disabled). Reading it during the initial
// render means an unguarded throw takes the whole page down, so both sides are
// wrapped and the language simply falls back to the default.
function readStoredLanguage() {
  let stored = null
  try {
    stored = localStorage.getItem(STORAGE_KEY)
  } catch {
    return DEFAULT_LANGUAGE
  }
  return LANGUAGES.some((l) => l.code === stored) ? stored : DEFAULT_LANGUAGE
}

function storeLanguage(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch {
    // Preference just does not persist; nothing else depends on it.
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLanguage)

  const language = useMemo(
    () => LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0],
    [lang],
  )

  // Keep <html lang> / <html dir> in sync so Hebrew renders right-to-left.
  useEffect(() => {
    document.documentElement.lang = language.code
    document.documentElement.dir = language.dir
    storeLanguage(language.code)
  }, [language])

  const value = useMemo(
    () => ({ lang: language.code, language, setLang, t: translations[language.code] }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
