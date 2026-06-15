import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'

export function Sidebar({ student }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const providerLabels = { google: 'Google', local: 'Email' }

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-user">
        <p className="sidebar-user__name">{student?.nombre || 'Estudiante'}</p>
        <p className="sidebar-user__cedula">{student?.cedula}</p>
        <p className="sidebar-user__carrera">{student?.carrera}</p>
        <p className="sidebar-provider">
          {user?.provider === 'google' ? (
            <svg viewBox="0 0 48 48" width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 4 }}>
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
              <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ verticalAlign: 'middle', marginRight: 4 }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          )}
          {providerLabels[user?.provider] || 'Email'}
        </p>
      </div>

      <nav>
        <ul>
          <li><Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Resumen</Link></li>
          <li><Link to="/dashboard/perfil" className={location.pathname === '/dashboard/perfil' ? 'active' : ''}>Perfil</Link></li>
        </ul>
      </nav>

      <button className="sidebar-logout" type="button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </aside>
  )
}
