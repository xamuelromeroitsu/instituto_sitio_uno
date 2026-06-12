export function RegisterForm() {
  return (
    <form className="auth-form auth-form--register">
      <section className="auth-group">
        <h3>Cuenta de usuario</h3>

        <label className="field">
          <span>Correo</span>
          <input type="email" name="email" placeholder="Email" autoComplete="email" />
        </label>

        <label className="field">
          <span>Contraseña</span>
          <input
            type="password"
            name="password"
            placeholder="Crear contraseña"
            autoComplete="new-password"
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
            <input type="text" name="primer_nombre" placeholder="Nombre" />
          </label>

          <label className="field">
            <span>Segundo nombre</span>
            <input type="text" name="segundo_nombre" placeholder="Opcional" />
          </label>
        </div>

        <div className="auth-grid">
          <label className="field">
            <span>Primer apellido</span>
            <input type="text" name="primer_apellido" placeholder="Apellido" />
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

      <button className="auth-button" type="submit">
        Registrarse
      </button>
    </form>
  )
}