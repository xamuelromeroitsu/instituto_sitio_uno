import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHeaderScroll } from '../hooks/useHeaderScroll'

export function BrandHeader({ onOpenLogin }) {
  const { isScrolled, isHidden } = useHeaderScroll()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className={`site-header${isScrolled ? ' scrolled' : ''}${isHidden ? ' hidden' : ''}`}
    >
      <div className="site-header__row">
        <a className="brand-link" href="#inicio" aria-label="Volver al inicio">
          <img
            className="brand-logo"
            src="/ITSU.webp"
            alt="Instituto Tecnológico Sitio Uno"
            width="399"
            height="64"
          />
        </a>

        <button
          className="hamburger"
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span className={`hamburger__line ${menuOpen ? 'hamburger__line--open' : ''}`} />
        </button>
      </div>

      <nav
        className={`header-actions${menuOpen ? ' header-actions--open' : ''}`}
        aria-label="Acciones principales"
      >
        <button className="header-action outline" type="button" onClick={() => { onOpenLogin(); setMenuOpen(false) }}>
          Iniciar sesión
        </button>
        <Link className="header-action solid" to="/registro" onClick={() => setMenuOpen(false)}>
          Registrarse
        </Link>
      </nav>
    </header>
  )
}
