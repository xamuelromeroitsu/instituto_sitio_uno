import { useHeaderScroll } from '../hooks/useHeaderScroll'

export function BrandHeader() {
  const { isScrolled, isHidden } = useHeaderScroll()

  return (
    <header
      className={`site-header${isScrolled ? ' scrolled' : ''}${isHidden ? ' hidden' : ''}`}
    >
      <a className="brand-link" href="#inicio" aria-label="Volver al inicio">
        <img
          className="brand-logo"
          src="/ITSU.webp"
          alt="Instituto Tecnológico Sitio Uno"
          width="399"
          height="64"
        />
      </a>

      <nav className="header-actions" aria-label="Acciones principales">
        <a className="header-action outline" href="#instituto">
          Conocer instituto
        </a>
        <a className="header-action solid" href="#valores">
          Ver valores
        </a>
      </nav>
    </header>
  )
}