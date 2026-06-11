import { RegisterForm } from './RegisterForm'

export function RegisterPage({ onSwitchToLogin }) {
  return (
    <div className="auth-page">
      <header className="auth-page__header">
        <span className="eyebrow">Acceso</span>
        <h2>Registrarse</h2>
        <p className="auth-page__text">
          Completa los datos del usuario y del estudiante según la estructura de tu base de datos.
        </p>
      </header>

      <RegisterForm />

      <button type="button" className="auth-switch" onClick={onSwitchToLogin}>
        Ir a iniciar sesión
      </button>
    </div>
  )
}