export function EnrolledClasses({ classes }) {
  if (!classes || classes.length === 0) {
    return (
      <section className="dashboard-classes">
        <h3>Materias inscritas</h3>
        <p>No hay materias inscritas actualmente.</p>
      </section>
    )
  }

  return (
    <section className="dashboard-classes">
      <h3>Materias inscritas</h3>
      <div className="classes-list">
        {classes.map((cls) => (
          <div className="class-card" key={cls.codigo}>
            <span className="class-card__code">{cls.codigo}</span>
            <span className="class-card__name">{cls.nombre}</span>
            <span className="class-card__profesor">{cls.profesor}</span>
            <span className="class-card__schedule">{cls.horario}</span>
            <span className="class-card__aula">{cls.aula}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
