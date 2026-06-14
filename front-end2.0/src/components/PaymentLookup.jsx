import { useState } from 'react'
import { httpClient } from '../services/httpClient'

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

export function PaymentLookup() {
  const [cedula, setCedula] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await httpClient.post('/api/pagos/consultar', {
        cedula_identidad: cedula,
        primer_nombre: nombre,
        primer_apellido: apellido
      })
      setResult(data)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <section className="content-section" id="consultar-pagos" style={{ scrollMarginTop: '80px' }}>
      <div className="section-heading">
        <span className="eyebrow">Pagos</span>
        <h2>Consulta tus mensualidades</h2>
      </div>
      <p className="content-copy">
        Ingresa tus datos para consultar el estado de tus mensualidades.
      </p>

      <form onSubmit={handleSubmit} style={{
        maxWidth: '500px', margin: '1.5rem auto',
        display: 'flex', flexDirection: 'column', gap: '0.75rem'
      }}>
        <label className="field">
          <span>Cédula de identidad</span>
          <input type="text" value={cedula}
            onChange={e => setCedula(e.target.value)}
            placeholder="V-12345678" required />
        </label>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <label className="field" style={{ flex: 1 }}>
            <span>Primer nombre</span>
            <input type="text" value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Nombre" required />
          </label>
          <label className="field" style={{ flex: 1 }}>
            <span>Primer apellido</span>
            <input type="text" value={apellido}
              onChange={e => setApellido(e.target.value)}
              placeholder="Apellido" required />
          </label>
        </div>
        <button className="auth-button" type="submit" disabled={loading}>
          {loading ? 'Consultando...' : 'Consultar'}
        </button>
      </form>

      {error && <p className="auth-error" style={{ textAlign: 'center' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{
            background: '#f0f4ff', padding: '1rem', borderRadius: '8px',
            marginBottom: '1rem', textAlign: 'center'
          }}>
            <strong>{result.estudiante.nombre}</strong>
            <br />
            <span style={{ fontSize: '0.85rem', color: '#666' }}>
              {result.estudiante.cedula} | {result.estudiante.email}
            </span>
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              <span style={{ color: '#2e7d32' }}>✓ Pagadas: {result.pagadas}</span>
              {' | '}
              <span style={{ color: '#c62828' }}>✗ Adeudadas: {result.adeudadas}</span>
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: '0.5rem', maxWidth: '600px', margin: '0 auto'
          }}>
            {result.meses.map(m => (
              <div key={m.mes} style={{
                padding: '0.6rem 0.3rem', borderRadius: '6px', textAlign: 'center',
                fontWeight: 'bold', fontSize: '0.8rem',
                background: m.pagada ? '#e8f5e9' : '#ffebee',
                border: m.pagada ? '2px solid #4caf50' : '2px solid #ef5350',
                color: m.pagada ? '#2e7d32' : '#c62828'
              }}>
                <div>{MONTHS[m.mes - 1].slice(0, 3)}</div>
                <div style={{ fontSize: '0.7rem', marginTop: '0.2rem' }}>
                  {m.pagada ? '✓ Pagado' : '✗ Pendiente'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
