import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Footer } from './components/Footer'

export function LandingPage({ onOpenLogin, onOpenRegister }) {
  return (
    <div className="landing-page">
      <main className="page-content">
        <Navbar onOpenLogin={onOpenLogin} onOpenRegister={onOpenRegister} />
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}