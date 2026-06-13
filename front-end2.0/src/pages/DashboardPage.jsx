import { useState, useEffect } from 'react'
import { getDashboardData } from '../features/dashboard/services/dashboardService'
import { Sidebar } from '../features/dashboard/components/Sidebar'
import { EnrolledClasses } from '../features/dashboard/components/EnrolledClasses'

export function DashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getDashboardData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="page-content">
          <p>Cargando dashboard…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="page-content">
          <p className="auth-error">Error: {error.message}</p>
        </div>
      </div>
    )
  }

  const estado = data.student.estado_matricula

  return (
    <div className="dashboard-page">
      <header className="page-content dashboard-page__header">
        <span className="eyebrow">Panel</span>
        <h2>Dashboard del estudiante</h2>
      </header>

      <div className="page-content dashboard-layout">
        <Sidebar student={data.student} />
        <div className="dashboard-main">
          <section className="dashboard-section">
            <h3>Estado de matrícula</h3>
            <p className={`matricula-badge matricula--${estado}`}>
              {estado === 'activo' ? 'Activo' : estado === 'suspendido' ? 'Suspendido' : estado || 'Sin estado'}
            </p>
          </section>
          <EnrolledClasses classes={data.classes} />
        </div>
      </div>
    </div>
  )
}
