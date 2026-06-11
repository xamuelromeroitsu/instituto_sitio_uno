export function SectionHeading({ eyebrow, title }) {
  return (
    <header className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </header>
  )
}