export function HeroSection({ content }) {
  return (
    <section className="hero-section" id="inicio">
      <div className="hero-copy">
        <span className="eyebrow">{content.eyebrow}</span>
        <h1 className="hero-title">{content.title}</h1>
        <p className="hero-text">{content.description}</p>

        <ul className="hero-points" aria-label="Beneficios destacados">
          {content.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="hero-visual" aria-label="Composición visual institucional">
        <img
          className="hero-art"
          src="/hero-visual.svg"
          alt="Ilustración institucional del campus digital"
          width="480"
          height="280"
        />

        <article className="hero-panel">
          <span className="hero-panel-label">{content.panelLabel}</span>
          <h3>{content.panelTitle}</h3>
          <p>{content.panelText}</p>
        </article>
      </div>
    </section>
  )
}