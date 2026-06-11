const summaryItems = [
  { label: 'Promedio', value: '9.2' },
  { label: 'Créditos', value: '38' },
  { label: 'Asistencia', value: '94%' },
]

export function AcademicSummary() {
  return (
    <div className="summary-grid">
      {summaryItems.map((item) => (
        <article className="summary-card" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </article>
      ))}
    </div>
  )
}