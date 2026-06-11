import { useEffect } from 'react'
import { LoginPage } from './LoginPage'
import { RegisterPage } from './RegisterPage'

export function AuthModal({ mode, onClose, onSwitchMode }) {
  useEffect(() => {
    if (!mode) {
      return undefined
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => window.removeEventListener('keydown', handleEscape)
  }, [mode, onClose])

  if (!mode) {
    return null
  }

  const isLogin = mode === 'login'

  return (
    <div className="auth-backdrop" onClick={onClose} role="presentation">
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="auth-close" type="button" onClick={onClose} aria-label="Cerrar">
          ×
        </button>

        {isLogin ? (
          <LoginPage onSwitchToRegister={() => onSwitchMode('register')} />
        ) : (
          <RegisterPage onSwitchToLogin={() => onSwitchMode('login')} />
        )}
      </div>
    </div>
  )
}