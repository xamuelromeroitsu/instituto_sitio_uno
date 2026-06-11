const classes = ['Matemática Aplicada', 'Programación Web', 'Base de Datos']

export function EnrolledClasses() {
  return (
    <div className="list-card">
      <h3>Materias inscritas</h3>
      <ul>
        {classes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}