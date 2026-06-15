export function Skeleton({ variant = 'text', count = 1, style }) {
  if (variant === 'card') {
    return <div className="skeleton skeleton--card" style={style} />
  }
  if (variant === 'title') {
    return <div className="skeleton skeleton--title" style={style} />
  }
  if (variant === 'avatar') {
    return <div className="skeleton skeleton--avatar" style={style} />
  }
  if (variant === 'grid') {
    return (
      <div className="skeleton--grid">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 80, ...style }} />
        ))}
      </div>
    )
  }
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton skeleton--text" style={style} />
      ))}
    </>
  )
}
