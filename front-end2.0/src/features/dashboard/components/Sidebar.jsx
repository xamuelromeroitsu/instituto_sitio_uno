const items = ['Resumen', 'Materias', 'Calificaciones', 'Perfil']

export function Sidebar() {
  return (
    <aside className="sidebar-card">
      <h3>Panel del estudiante</h3>
      <nav>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}