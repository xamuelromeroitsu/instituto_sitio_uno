import { useState, useEffect } from 'react'
import { getDashboardData } from '../features/dashboard/services/dashboardService'
import { Sidebar } from '../features/dashboard/components/Sidebar'
import { AcademicSummary } from '../features/dashboard/components/AcademicSummary'
import { EnrolledClasses } from '../features/dashboard/components/EnrolledClasses'
import { PaymentSection } from '../features/dashboard/components/PaymentSection'
import { Skeleton } from '../components/Skeleton'

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
        <div className="page-content" style={{ display: 'grid', gap: '18px' }}>
          <Skeleton variant="title" />
          <div className="dashboard-layout">
            <div className="sidebar-card"><Skeleton count={4} /></div>
            <div>
              <Skeleton variant="grid" count={3} />
              <Skeleton variant="card" style={{ marginTop: 16 }} />
              <Skeleton variant="card" style={{ marginTop: 16, height: 120 }} />
            </div>
          </div>
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

  return (
    <div className="dashboard-page">
      <header className="page-content dashboard-page__header">
        <span className="eyebrow">Panel</span>
        <h2>Registro de pagos</h2>
      </header>

      <div className="page-content dashboard-layout">
        <Sidebar student={data.student} />
        <div className="dashboard-main">
          <AcademicSummary summary={data.summary} />
          <EnrolledClasses classes={data.classes} />
          <PaymentSection />
        </div>
      </div>
    </div>
  )
}
