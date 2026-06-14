import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { GoogleLoginButton } from './GoogleLoginButton'

export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const form = new FormData(e.target)
      await login(form.get('email'), form.get('password'))
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <p className="auth-error">{error}</p>}

      <label className="field">
        <span>Correo institucional</span>
        <input type="email" name="email" placeholder="Email" autoComplete="email" required />
      </label>

      <label className="field">
        <span>Contraseña</span>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />
      </label>

      <button className="auth-button" type="submit" disabled={loading}>
        {loading ? 'Ingresando…' : 'Iniciar sesión'}
      </button>

      <GoogleLoginButton />
    </form>
  )
}
