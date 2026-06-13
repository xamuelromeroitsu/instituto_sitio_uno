import { useNavigate } from 'react-router-dom'
import { LandingPage } from './LandingPage'
import { LoginPage } from '../features/auth/components/LoginPage'

export function LoginOverlay() {
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
          <LoginPage onSwitchToRegister={() => navigate('/registro')} />
        </div>
      </div>
    </>
  )
}
