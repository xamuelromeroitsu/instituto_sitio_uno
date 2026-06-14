import { useState } from 'react'
import { BrandHeader, HeroSection, SectionHeading, ValueGrid, SiteFooter } from '../components'
import { AuthModal } from '../features/auth/components/AuthModal'
import { PaymentLookup } from '../components/PaymentLookup'

const hero = {
  eyebrow: 'Campus digital',
  title: 'Instituto Tecnológico Sitio Uno',
  description:
    'Un sitio institucional claro, moderno y ordenado para comunicar la identidad del instituto, orientar a la comunidad educativa y reforzar una presencia digital sólida.',
  points: ['Identidad institucional', 'Comunicación clara', 'Diseño responsivo'],
  panelLabel: 'Refactor visual',
  panelTitle: 'Una interfaz limpia, sobria y con enfoque académico.',
  panelText:
    'La composición mantiene el carácter del front-end original, pero lo reorganiza en componentes React con una estructura mantenible y lista para crecer.',
}

const intro = {
  eyebrow: 'Sobre el instituto',
  title: 'Una propuesta académica con presencia digital',
  description:
    'ITSU combina una imagen institucional seria con una experiencia visual directa para estudiantes, docentes y personal administrativo. Esta versión en React y Vite preserva la base visual del sitio original, pero la convierte en un proyecto modular y limpio.',
}

const values = {
  eyebrow: 'Valores del instituto',
  title: 'Los ejes que sostienen la identidad',
  items: [
    {
      label: '01',
      title: 'Excelencia académica',
      description:
        'Formación de alto nivel con foco en criterio profesional, innovación y mejora continua.',
    },
    {
      label: '02',
      title: 'Integridad institucional',
      description:
        'Procesos claros, responsabilidad y respeto por estudiantes, docentes y comunidad.',
    },
    {
      label: '03',
      title: 'Innovación con IA',
      description:
        'Tecnología aplicada para potenciar el aprendizaje, la orientación y el análisis de progreso.',
    },
  ],
}

export function LandingPage() {
  const [authMode, setAuthMode] = useState(null)

  return (
    <div className="landing-page">
      <main className="page-content">
        <BrandHeader onOpenLogin={() => setAuthMode('login')} />

        <HeroSection content={hero} />

        <section className="content-section" id="instituto">
          <SectionHeading eyebrow={intro.eyebrow} title={intro.title} />
          <p className="content-copy">{intro.description}</p>
        </section>

        <section className="content-section" id="valores">
          <SectionHeading eyebrow={values.eyebrow} title={values.title} />
          <ValueGrid items={values.items} />
        </section>

        <PaymentLookup />
      </main>

      <SiteFooter />

      <AuthModal
        mode={authMode}
        onClose={() => setAuthMode(null)}
        onSwitchMode={setAuthMode}
      />
    </div>
  )
}
