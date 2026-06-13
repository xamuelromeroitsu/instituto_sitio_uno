import { useNavigate } from 'react-router-dom'
import { RegisterForm } from './RegisterForm'

export function RegisterPage({ onSwitchToLogin }) {
  const navigate = useNavigate()
  const handleSwitchToLogin = onSwitchToLogin || (() => navigate('/'))

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

      <button type="button" className="auth-switch" onClick={handleSwitchToLogin}>
        Ir a iniciar sesión
      </button>
    </div>
  )
}