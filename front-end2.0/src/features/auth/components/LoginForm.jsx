export function LoginForm() {
  return (
    <form className="auth-form">
      <label className="field">
        <span>Correo institucional</span>
        <input type="email" name="email" placeholder="usuario@itsu.edu" autoComplete="email" />
      </label>

      <label className="field">
        <span>Contraseña</span>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </label>

      <button className="auth-button" type="submit">
        Iniciar sesión
      </button>
    </form>
  )
}