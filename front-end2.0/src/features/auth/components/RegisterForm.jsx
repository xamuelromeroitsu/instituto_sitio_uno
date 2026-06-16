import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { registerStudent } from '../services/authService'
import { parseServerError, formatFieldErrors } from '../../../services/errorHandler'
import { FormError } from './FormError'

export function RegisterForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setFieldErrors({})
    setSuccess('')
    setLoading(true)

    try {
      const form = new FormData(e.target)
      const payload = Object.fromEntries(form)
      const response = await registerStudent(payload)

      setSuccess('¡Registro exitoso! Redirigiendo al dashboard…')

      if (response.token) {
        await login(form.get('email'), form.get('password'))
      }

      navigate('/dashboard')
    } catch (err) {
      const parsed = parseServerError(err)
      setError(err)
      if (parsed.fieldErrors) {
        setFieldErrors(formatFieldErrors(parsed.fieldErrors))
      }
    } finally {
      setLoading(false)
    }
  }

  const fieldClass = (name) =>
    `field${fieldErrors[name] ? ' field--error' : ''}`

  return (
    <form className="auth-form auth-form--register" onSubmit={handleSubmit}>
      {success && <div className="form-success">{success}</div>}
      <FormError error={error} fieldErrors={fieldErrors} />

      <section className="auth-group">
        <h3>Cuenta de usuario</h3>

        <label className={fieldClass('email')}>
          <span>Correo</span>
          <input type="email" name="email" placeholder="Email" autoComplete="email" required />
          {fieldErrors.email && <span className="field__error-msg">{fieldErrors.email}</span>}
        </label>

        <label className={fieldClass('password')}>
          <span>Contraseña</span>
          <input
            type="password"
            name="password"
            placeholder="Crear contraseña"
            autoComplete="new-password"
            required
          />
          {fieldErrors.password && <span className="field__error-msg">{fieldErrors.password}</span>}
        </label>

        <label className="field">
          <span>Rol</span>
          <select name="rol" defaultValue="estudiante">
            <option value="estudiante">Estudiante</option>
            <option value="profesor">Profesor</option>
            <option value="administrador">Administrador</option>
          </select>
        </label>

        <label className="checkbox-field">
          <input type="checkbox" name="activo" defaultChecked />
          <span>Cuenta activa</span>
        </label>
      </section>

      <section className="auth-group">
        <h3>Datos del estudiante</h3>

        <label className={fieldClass('cedula_identidad')}>
          <span>Cédula de identidad</span>
          <input type="text" name="cedula_identidad" placeholder="V-12345678" />
          {fieldErrors.cedula_identidad && <span className="field__error-msg">{fieldErrors.cedula_identidad}</span>}
        </label>

        <div className="auth-grid">
          <label className={fieldClass('primer_nombre')}>
            <span>Primer nombre</span>
            <input type="text" name="primer_nombre" placeholder="Nombre" required />
            {fieldErrors.primer_nombre && <span className="field__error-msg">{fieldErrors.primer_nombre}</span>}
          </label>

          <label className="field">
            <span>Segundo nombre</span>
            <input type="text" name="segundo_nombre" placeholder="Opcional" />
          </label>
        </div>

        <div className="auth-grid">
          <label className={fieldClass('primer_apellido')}>
            <span>Primer apellido</span>
            <input type="text" name="primer_apellido" placeholder="Apellido" required />
            {fieldErrors.primer_apellido && <span className="field__error-msg">{fieldErrors.primer_apellido}</span>}
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
    </form>
  )
}
