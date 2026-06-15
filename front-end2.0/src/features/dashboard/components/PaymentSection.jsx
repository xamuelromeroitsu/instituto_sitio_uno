import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useToast } from '../../../contexts/ToastContext'
import { Skeleton } from '../../../components/Skeleton'
import { getPaymentStatus, payMonth, getMensualidad, updateMensualidad } from '../services/dashboardService'

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

export function PaymentSection() {
  const fileRef = useRef(null)
  const { user } = useAuth()
  const { addToast } = useToast()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState('')
  const [comprobantes, setComprobantes] = useState([])
  const [paying, setPaying] = useState(false)
  const [paySuccess, setPaySuccess] = useState(null)
  const [mensualidad, setMensualidad] = useState(5000000)
  const [editingMonto, setEditingMonto] = useState(false)
  const [editValue, setEditValue] = useState('')
  const [dragover, setDragover] = useState(false)
  const isAdmin = user?.rol === 'administrador'

  const fetchStatus = () => {
    setLoading(true)
    Promise.all([
      getPaymentStatus(),
      getMensualidad(),
    ])
      .then(([status, arancel]) => {
        setData(status)
        if (arancel?.monto) setMensualidad(arancel.monto)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchStatus() }, [])

  const addFiles = (files) => {
    setComprobantes(prev => [...prev, ...Array.from(files)])
  }

  const removeFile = (index) => {
    setComprobantes(prev => prev.filter((_, i) => i !== index))
  }

  const handlePay = async (e) => {
    e.preventDefault()
    if (!selectedMonth || comprobantes.length === 0) return
    setPaying(true)
    try {
      const result = await payMonth(parseInt(selectedMonth), comprobantes)
      addToast(`Pago registrado para ${MONTHS[parseInt(selectedMonth) - 1]}`, 'success')
      setSelectedMonth('')
      setComprobantes([])
      fetchStatus()
    } catch (err) {
      setError(err.message)
      addToast(err.message, 'error')
    }
    setPaying(false)
  }

  const handleUpdateMonto = async () => {
    const nuevo = parseInt(editValue.replace(/\./g, ''))
    if (isNaN(nuevo) || nuevo <= 0) return
    try {
      await updateMensualidad(nuevo)
      setMensualidad(nuevo)
      setEditingMonto(false)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading && !data) return (
    <section className="dashboard-classes" style={{ marginTop: '2rem' }}>
      <h3>Estado de Pagos</h3>
      <Skeleton variant="card" style={{ height: 200 }} />
    </section>
  )

  const currentMonth = new Date().getMonth() + 1

  return (
    <section className="dashboard-classes" style={{ marginTop: '2rem' }}>
      <h3>Estado de Pagos - Mensualidades</h3>

      {error && <p className="auth-error">{error}</p>}

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
                {m.pagada && m.monto && (
                  <div style={{ fontSize: '0.7rem', marginTop: '0.2rem', opacity: 0.8 }}>
                    {Number(m.monto).toLocaleString('es-VE')} Bs.
                  </div>
                )}
              </div>
            ))}
          </div>
          {data && (
            <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
              <span style={{ color: '#2e7d32' }}>✓ Pagadas: {data.pagadas}</span>
              {' | '}
              <span style={{ color: '#c62828' }}>✗ Adeudadas: {data.adeudadas}</span>
              {' | '}
              <span style={{ color: '#1565c0' }}>
                Total pagado: {
                  data.meses
                    .filter(m => m.pagada && m.monto)
                    .reduce((sum, m) => sum + Number(m.monto), 0)
                    .toLocaleString('es-VE')
                } Bs.
              </span>
            </div>
          )}
        </div>

        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <h4 style={{ margin: 0 }}>Registrar pago</h4>
          </div>
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
              <span>Monto mensual (Bs.)</span>
              {editingMonto ? (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    placeholder="Nuevo monto"
                    autoFocus
                  />
                  <button type="button" className="auth-button" style={{ padding: '0 1rem', minHeight: 40 }} onClick={handleUpdateMonto}>
                    OK
                  </button>
                  <button type="button" className="google-dev-cancel" onClick={() => setEditingMonto(false)}>
                    ✕
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input type="text" value={mensualidad.toLocaleString('es-VE')} disabled />
                  {isAdmin && (
                    <button
                      type="button"
                      className="google-btn"
                      style={{ minHeight: 40, padding: '0 1rem', width: 'auto', flexShrink: 0 }}
                      onClick={() => { setEditValue(mensualidad.toString()); setEditingMonto(true) }}
                    >
                      Editar
                    </button>
                  )}
                </div>
              )}
            </label>
            <div className="field">
              <span>Comprobante de pago</span>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={e => { addFiles(e.target.files); e.target.value = '' }}
                style={{ display: 'none' }}
              />
              <div
                className={`upload-zone ${dragover ? 'upload-zone--dragover' : ''}`}
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragover(true) }}
                onDragLeave={() => setDragover(false)}
                onDrop={e => { e.preventDefault(); setDragover(false); addFiles(e.dataTransfer.files) }}
              >
                <div className="upload-zone__plus">+</div>
                <div className="upload-zone__text">
                  {comprobantes.length === 0
                    ? 'Toca aquí o arrastra las fotos del pago'
                    : `${comprobantes.length} archivo${comprobantes.length > 1 ? 's' : ''} seleccionado${comprobantes.length > 1 ? 's' : ''}`
                  }
                </div>
                <div className="upload-zone__hint">PNG, JPG — hasta 10 MB cada una</div>
              </div>
              {comprobantes.length > 0 && (
                <div className="upload-previews">
                  {comprobantes.map((f, i) => (
                    <div key={i} className="upload-preview">
                      <img src={URL.createObjectURL(f)} alt="" />
                      <button type="button" className="upload-preview__remove" onClick={() => removeFile(i)}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="auth-button" type="submit" disabled={paying || comprobantes.length === 0 || !selectedMonth}>
              {paying ? 'Procesando...' : 'Pagar mensualidad'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
