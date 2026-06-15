import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { GoogleLoginButton } from './GoogleLoginButton'
import { useToast } from '../../../contexts/ToastContext'

export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setFieldErrors({})
    setLoading(true)

    const form = new FormData(e.target)
    const email = form.get('email')
    const password = form.get('password')
    const errs = {}
    if (!email) errs.email = 'El correo es requerido'
    if (!password) errs.password = 'La contraseña es requerida'
    setFieldErrors(errs)
    if (Object.keys(errs).length > 0) { setLoading(false); return }

    try {
      await login(email, password)
      addToast('Inicio de sesión exitoso', 'success')
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
      addToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <p className="auth-error">{error}</p>}

      <label className="field">
        <span>Correo institucional <span className="required">*</span></span>
        <input type="email" name="email" placeholder="Email" autoComplete="email" required className={fieldErrors.email ? 'field--error' : ''} />
        {fieldErrors.email && <span className="field-err">{fieldErrors.email}</span>}
      </label>

      <label className="field">
        <span>Contraseña <span className="required">*</span></span>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          className={fieldErrors.password ? 'field--error' : ''}
        />
        {fieldErrors.password && <span className="field-err">{fieldErrors.password}</span>}
      </label>

      <button className="auth-button" type="submit" disabled={loading}>
        {loading ? 'Ingresando…' : 'Iniciar sesión'}
      </button>

      <GoogleLoginButton />
    </form>
  )
}
