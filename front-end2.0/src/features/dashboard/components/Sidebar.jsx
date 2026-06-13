import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'

export function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-user">
        <p className="sidebar-user__name">{user?.nombre || 'Estudiante'}</p>
        <p className="sidebar-user__email">{user?.email}</p>
      </div>

      <nav>
        <ul>
          <li><Link to="/dashboard">Resumen</Link></li>
        </ul>
      </nav>

      <button className="sidebar-logout" type="button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </aside>
  )
}
