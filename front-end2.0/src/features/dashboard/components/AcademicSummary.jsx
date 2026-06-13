export function AcademicSummary({ summary }) {
  const items = [
    { label: 'Promedio', value: summary?.promedio },
    { label: 'Materias aprobadas', value: summary?.materiasAprobadas },
    { label: 'Materias inscritas', value: summary?.materiasInscritas },
    { label: 'Créditos', value: summary?.creditos },
  ]

  return (
    <section className="dashboard-summary">
      <h3>Resumen académico</h3>
      <div className="summary-grid">
        {items.map((item) => (
          <div className="summary-card" key={item.label}>
            <span className="summary-card__value">{item.value}</span>
            <span className="summary-card__label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
