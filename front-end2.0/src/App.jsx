import './App.css'
import { BrandHeader } from './components/BrandHeader'
import { HeroSection } from './components/HeroSection'
import { SiteFooter } from './components/SiteFooter'
import { SectionHeading } from './components/SectionHeading'
import { ValueGrid } from './components/ValueGrid'
import { siteContent } from './data/siteContent'

function App() {
  return (
    <div className="app-shell">
      <BrandHeader />

      <main className="page-content">
        <HeroSection content={siteContent.hero} />

        <section className="content-section" id="instituto">
          <SectionHeading
            eyebrow={siteContent.intro.eyebrow}
            title={siteContent.intro.title}
          />
          <p className="content-copy">{siteContent.intro.description}</p>
        </section>

        <section className="content-section" id="valores">
          <SectionHeading
            eyebrow={siteContent.values.eyebrow}
            title={siteContent.values.title}
          />
          <ValueGrid items={siteContent.values.items} />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default App
