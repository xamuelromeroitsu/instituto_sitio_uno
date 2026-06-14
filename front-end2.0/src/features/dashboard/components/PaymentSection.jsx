import { useState, useEffect } from 'react'
import { getPaymentStatus, payMonth } from '../services/dashboardService'

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const MONTO_MENSUAL = 5000000

export function PaymentSection() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState('')
  const [reference, setReference] = useState('')
  const [paying, setPaying] = useState(false)
  const [paySuccess, setPaySuccess] = useState(null)

  const fetchStatus = () => {
    setLoading(true)
    getPaymentStatus()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchStatus() }, [])

  const handlePay = async (e) => {
    e.preventDefault()
    if (!selectedMonth) return
    setPaying(true)
    setPaySuccess(null)
    try {
      const result = await payMonth(parseInt(selectedMonth), MONTO_MENSUAL)
      setPaySuccess(`Pago registrado para ${MONTHS[parseInt(selectedMonth) - 1]}`)
      setSelectedMonth('')
      setReference('')
      fetchStatus()
    } catch (err) {
      setError(err.message)
    }
    setPaying(false)
  }

  if (loading && !data) return (
    <section className="dashboard-classes" style={{ marginTop: '2rem' }}>
      <h3>Estado de Pagos</h3>
      <p>Cargando...</p>
    </section>
  )

  const currentMonth = new Date().getMonth() + 1

  return (
    <section className="dashboard-classes" style={{ marginTop: '2rem' }}>
      <h3>Estado de Pagos - Mensualidades</h3>

      {error && <p className="auth-error">{error}</p>}
      {paySuccess && <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>{paySuccess}</p>}

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <h4 style={{ marginBottom: '0.75rem' }}>Calendario de pagos</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {data && data.meses && data.meses.map((m) => (
              <div key={m.mes} style={{
                padding: '0.75rem 0.5rem',
                borderRadius: '6px',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                background: m.pagada ? '#e8f5e9' : '#ffebee',
                border: m.pagada ? '2px solid #4caf50' : '2px solid #ef5350',
                color: m.pagada ? '#2e7d32' : '#c62828'
              }}>
                <div>{MONTHS[m.mes - 1].slice(0, 3)}</div>
                <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {m.pagada ? '✓ Pagado' : '✗ Pendiente'}
                </div>
              </div>
            ))}
          </div>
          {data && (
            <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
              <span style={{ color: '#2e7d32' }}>✓ Pagadas: {data.pagadas}</span>
              {' | '}
              <span style={{ color: '#c62828' }}>✗ Adeudadas: {data.adeudadas}</span>
            </div>
          )}
        </div>

        <div style={{ flex: 1, minWidth: '280px' }}>
          <h4 style={{ marginBottom: '0.75rem' }}>Registrar pago</h4>
          <form onSubmit={handlePay} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label className="field">
              <span>Mes a pagar</span>
              <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} required>
                <option value="">Seleccionar mes...</option>
                {data && data.meses && data.meses
                  .filter(m => !m.pagada && m.mes <= currentMonth)
                  .map(m => (
                    <option key={m.mes} value={m.mes}>{MONTHS[m.mes - 1]}</option>
                  ))
                }
              </select>
            </label>
            <label className="field">
              <span>Monto (Bs.)</span>
              <input type="text" value={MONTO_MENSUAL.toLocaleString('es-VE')} disabled />
            </label>
            <label className="field">
              <span>Referencia bancaria</span>
              <input
                type="text"
                value={reference}
                onChange={e => setReference(e.target.value)}
                placeholder="Ingresa la referencia"
                required
              />
            </label>
            <button className="auth-button" type="submit" disabled={paying || !selectedMonth}>
              {paying ? 'Procesando...' : 'Pagar mensualidad'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
