import { useNavigate } from 'react-router-dom'
import { LoginForm } from './LoginForm'

export function LoginPage({ onSwitchToRegister }) {
  const navigate = useNavigate()
  const handleSwitchToRegister = onSwitchToRegister || (() => navigate('/registro'))

  return (
    <div className="auth-page">
      <header className="auth-page__header">
        <span className="eyebrow">Acceso</span>
        <h2>Iniciar sesión</h2>
        <p className="auth-page__text">Ingresa con tu correo institucional para entrar al sistema.</p>
      </header>

      <LoginForm />

      <button type="button" className="auth-switch" onClick={handleSwitchToRegister}>
        Ir a registrarse
      </button>
    </div>
  )
}