import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { registerStudent } from '../services/authService'

export function RegisterForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const form = new FormData(e.target)
      const payload = Object.fromEntries(form)
      const response = await registerStudent(payload)

      if (response.token) {
        await login(form.get('email'), form.get('password'))
      }

      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
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
          <span>Correo</span>
          <input type="email" name="email" placeholder="Email" autoComplete="email" required />
        </label>

        <label className="field">
          <span>Contraseña</span>
          <input
            type="password"
            name="password"
            placeholder="Crear contraseña"
            autoComplete="new-password"
            required
          />
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
    </form>
  )
}
