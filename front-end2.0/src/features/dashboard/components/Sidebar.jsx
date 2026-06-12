export function Sidebar() {
  return (
    <aside className="dashboard-sidebar">
      <nav>
        <ul>
          <li><a href="/dashboard">Resumen</a></li>
          <li><a href="/dashboard/cursos">Mis cursos</a></li>
          <li><a href="/dashboard/perfil">Perfil</a></li>
        </ul>
      </nav>
    </aside>
  )
}
