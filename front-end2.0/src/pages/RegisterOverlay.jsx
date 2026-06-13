import { useNavigate } from 'react-router-dom'
import { LandingPage } from './LandingPage'
import { RegisterPage } from '../features/auth/components/RegisterPage'

export function RegisterOverlay() {
  const navigate = useNavigate()

  return (
    <>
      <LandingPage />
      <div
        className="auth-backdrop"
        onClick={() => navigate('/')}
        role="presentation"
      >
        <div
          className="auth-modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="auth-close"
            type="button"
            onClick={() => navigate('/')}
            aria-label="Cerrar"
          >
            ×
          </button>
          <RegisterPage onSwitchToLogin={() => navigate('/')} />
        </div>
      </div>
    </>
  )
}
