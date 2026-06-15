import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getDashboardData } from '../features/dashboard/services/dashboardService'
import { Sidebar } from '../features/dashboard/components/Sidebar'
import { Skeleton } from '../components/Skeleton'

export function ProfilePage() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboardData()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const providerLabels = {
    google: 'Google',
    local: 'Correo y contraseña',
  }

  const providerIcons = {
    google: (
      <svg viewBox="0 0 48 48" width="24" height="24">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
        <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
      </svg>
    ),
    local: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      </svg>
    ),
  }

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="page-content" style={{ display: 'grid', gap: '18px' }}>
          <Skeleton variant="title" />
          <div className="dashboard-layout">
            <div className="sidebar-card"><Skeleton count={4} /></div>
            <div className="content-section">
              <div className="profile-info">
                <Skeleton variant="avatar" />
                <div style={{ flex: 1 }}><Skeleton count={5} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const student = data?.student

  return (
    <div className="dashboard-page">
      <header className="page-content dashboard-page__header">
        <span className="eyebrow">Perfil</span>
        <h2>Mi perfil</h2>
      </header>

      <div className="page-content dashboard-layout">
        <Sidebar student={student} />

        <div className="dashboard-main">
          <div className="content-section">
            <h3 style={{ margin: '0 0 18px', fontFamily: 'Georgia, serif', fontSize: '1.5rem' }}>
              Información de la cuenta
            </h3>

            <div className="profile-info">
              <div className="profile-avatar">
                {user?.nombre?.charAt(0)?.toUpperCase() || '?'}
              </div>

              <div className="profile-fields">
                <div className="profile-field">
                  <span className="profile-label">Nombre completo</span>
                  <span className="profile-value">{student?.nombre || user?.nombre || '—'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-label">Correo electrónico</span>
                  <span className="profile-value">{user?.email || '—'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-label">Cédula</span>
                  <span className="profile-value">{student?.cedula || '—'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-label">Carrera</span>
                  <span className="profile-value">{student?.carrera || '—'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-label">Rol</span>
                  <span className="profile-value">{user?.rol === 'estudiante' ? 'Estudiante' : user?.rol || '—'}</span>
                </div>
              </div>
            </div>

            <div className="profile-provider">
              <span className="profile-label">Método de inicio de sesión</span>
              <div className="provider-badge">
                {providerIcons[user?.provider] || providerIcons.local}
                <span>{providerLabels[user?.provider] || 'Correo y contraseña'}</span>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h3 style={{ margin: '0 0 12px', fontFamily: 'Georgia, serif', fontSize: '1.3rem' }}>
              Resumen académico
            </h3>
            <div className="summary-grid">
              <div className="summary-card">
                <span>Promedio</span>
                <strong>{data?.summary?.promedio?.toFixed(2) || '—'}</strong>
              </div>
              <div className="summary-card">
                <span>Materias aprobadas</span>
                <strong>{data?.summary?.materiasAprobadas || 0}</strong>
              </div>
              <div className="summary-card">
                <span>Créditos</span>
                <strong>{data?.summary?.creditos || 0}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
