import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { registerStudent } from '../services/authService'
import { GoogleLoginButton } from './GoogleLoginButton'
import { useToast } from '../../../contexts/ToastContext'

export function RegisterForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { addToast } = useToast()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  const validate = (form) => {
    const errors = {}
    const password = form.get('password')
    const confirm = form.get('password_confirm')
    const email = form.get('email')

    if (!email) errors.email = 'El correo es requerido'
    if (!password || password.length < 4) errors.password = 'Mínimo 4 caracteres'
    if (password !== confirm) errors.password_confirm = 'Las contraseñas no coinciden'

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setFieldErrors({})

    const form = new FormData(e.target)
    if (!validate(form)) return

    setLoading(true)

    try {
      const payload = Object.fromEntries(form)
      const response = await registerStudent(payload)

      if (response.token) {
        await login(form.get('email'), form.get('password'))
      }

      addToast('Registro exitoso. ¡Bienvenido!', 'success')
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
      addToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="auth-form auth-form--register" onSubmit={handleSubmit}>
      {error && <p className="auth-error">{error}</p>}

      <section className="auth-group">
        <h3>Cuenta de usuario</h3>

        <label className="field">
          <span>Correo <span className="required">*</span></span>
          <input type="email" name="email" placeholder="Email" autoComplete="email" required className={fieldErrors.email ? 'field--error' : ''} />
          {fieldErrors.email && <span className="field-err">{fieldErrors.email}</span>}
        </label>

        <label className="field">
          <span>Contraseña <span className="required">*</span></span>
          <input
            type="password"
            name="password"
            placeholder="Crear contraseña"
            autoComplete="new-password"
            required
            className={fieldErrors.password ? 'field--error' : ''}
          />
          {fieldErrors.password && <span className="field-err">{fieldErrors.password}</span>}
        </label>

        <label className="field">
          <span>Confirmar contraseña <span className="required">*</span></span>
          <input
            type="password"
            name="password_confirm"
            placeholder="Repite la contraseña"
            autoComplete="new-password"
            required
            className={fieldErrors.password_confirm ? 'field--error' : ''}
          />
          {fieldErrors.password_confirm && <span className="field-err">{fieldErrors.password_confirm}</span>}
        </label>

        <label className="field">
          <span>Rol</span>
          <select name="rol" defaultValue="estudiante">
            <option value="estudiante">Estudiante</option>
            <option value="profesor">Profesor</option>
          </select>
        </label>
      </section>

      <section className="auth-group">
        <h3>Datos del estudiante</h3>

        <label className="field">
          <span>Cédula de identidad</span>
          <input type="text" name="cedula_identidad" placeholder="V-12345678" />
        </label>

        <div className="auth-grid">
          <label className="field">
            <span>Primer nombre</span>
            <input type="text" name="primer_nombre" placeholder="Nombre" required />
          </label>

          <label className="field">
            <span>Segundo nombre</span>
            <input type="text" name="segundo_nombre" placeholder="Opcional" />
          </label>
        </div>

        <div className="auth-grid">
          <label className="field">
            <span>Primer apellido</span>
            <input type="text" name="primer_apellido" placeholder="Apellido" required />
          </label>

          <label className="field">
            <span>Segundo apellido</span>
            <input type="text" name="segundo_apellido" placeholder="Opcional" />
          </label>
        </div>

        <label className="field">
          <span>Teléfono</span>
          <input type="tel" name="telefono" placeholder="Teléfono celular" />
        </label>
      </section>

      <button className="auth-button" type="submit" disabled={loading}>
        {loading ? 'Registrando…' : 'Registrarse'}
      </button>

      <GoogleLoginButton />
    </form>
  )
}
