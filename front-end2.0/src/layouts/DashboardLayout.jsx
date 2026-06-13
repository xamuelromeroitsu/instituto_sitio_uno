import { Outlet } from 'react-router-dom'
import { Sidebar } from '../features/dashboard/components/Sidebar'

export function DashboardLayout() {
  return (
    <div className="dashboard-page">
      <header className="page-content dashboard-page__header">
        <span className="eyebrow">Panel</span>
        <h2>Dashboard del estudiante</h2>
      </header>

      <div className="page-content dashboard-layout">
        <Sidebar />
        <div className="dashboard-main">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
