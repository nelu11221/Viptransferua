import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES, translations } from './translations.js'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'transport.lang'

function readStoredLanguage() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return LANGUAGES.some((l) => l.code === stored) ? stored : DEFAULT_LANGUAGE
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
    localStorage.setItem(STORAGE_KEY, language.code)
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
