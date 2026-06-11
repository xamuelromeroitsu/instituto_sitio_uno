import { LoginForm } from './LoginForm'

export function LoginPage({ onSwitchToRegister }) {
  return (
    <div className="auth-page">
      <header className="auth-page__header">
        <span className="eyebrow">Acceso</span>
        <h2>Iniciar sesión</h2>
        <p className="auth-page__text">Ingresa con tu correo institucional para entrar al sistema.</p>
      </header>

      <LoginForm />

      <button type="button" className="auth-switch" onClick={onSwitchToRegister}>
        Ir a registrarse
      </button>
    </div>
  )
}