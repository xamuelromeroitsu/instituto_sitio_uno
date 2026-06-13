import { Link } from 'react-router-dom'
import { useHeaderScroll } from '../hooks/useHeaderScroll'

export function BrandHeader({ onOpenLogin }) {
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
        <button className="header-action outline" type="button" onClick={onOpenLogin}>
          Iniciar sesión
        </button>
        <Link className="header-action solid" to="/registro">
          Registrarse
        </Link>
      </nav>
    </header>
  )
}