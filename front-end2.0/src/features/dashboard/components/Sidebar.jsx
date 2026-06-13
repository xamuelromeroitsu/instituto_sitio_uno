import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'

export function Sidebar({ student }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-user">
        <p className="sidebar-user__name">{student?.nombre || 'Estudiante'}</p>
        <p className="sidebar-user__cedula">{student?.cedula}</p>
        <p className="sidebar-user__carrera">{student?.carrera}</p>
      </div>

      <nav>
        <ul>
          <li><a href="/dashboard">Resumen</a></li>
          <li><a href="/dashboard/cursos">Mis cursos</a></li>
          <li><a href="/dashboard/perfil">Perfil</a></li>
        </ul>
      </nav>

      <button className="sidebar-logout" type="button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </aside>
  )
}
