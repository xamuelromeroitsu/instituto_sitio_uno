export function ValueGrid({ items }) {
  return (
    <div className="value-grid">
      {items.map((item) => (
        <article className="value-card" key={item.label}>
          <span className="value-index">{item.label}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  )
}