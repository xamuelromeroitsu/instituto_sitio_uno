import { Sidebar } from './components/Sidebar'
import { AcademicSummary } from './components/AcademicSummary'
import { EnrolledClasses } from './components/EnrolledClasses'

export function DashboardPage() {
  return (
    <div className="dashboard-page">
      <header className="page-content dashboard-page__header">
        <span className="eyebrow">Panel</span>
        <h2>Dashboard del estudiante</h2>
      </header>

      <div className="page-content dashboard-layout">
        <Sidebar />
        <div className="dashboard-main">
          <AcademicSummary />
          <EnrolledClasses />
        </div>
      </div>
    </div>
  )
}