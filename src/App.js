import { LanguageProvider } from './i18n/LanguageContext.js'
import Header from './components/Header.js'
import Hero from './components/Hero.js'
import EssentialFacts from './components/EssentialFacts.js'
import TransferInfo from './components/TransferInfo.js'
import Fleet from './components/Fleet.js'
import Vehicles from './components/Vehicles.js'
import Faq from './components/Faq.js'
import PopularRoutes from './components/PopularRoutes.js'
import Europe from './components/Europe.js'
import CtaBanner from './components/CtaBanner.js'
import Footer from './components/Footer.js'

export default function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <Header />
        <main>
          <Hero />
          <EssentialFacts />
          <TransferInfo />
          <Fleet />
          <Vehicles />
          <Faq />
          <PopularRoutes />
          <Europe />
          <CtaBanner />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
