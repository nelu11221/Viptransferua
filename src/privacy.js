import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './i18n/LanguageContext.js'
import PrivacyPolicy from './components/PrivacyPolicy.js'
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <PrivacyPolicy />
    </LanguageProvider>
  </StrictMode>,
)
