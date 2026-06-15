import { httpClient } from '../../../services/httpClient'

export async function getDashboardData() {
  return httpClient.get('/api/dashboard')
}

export async function getPaymentStatus() {
  return httpClient.get('/api/pagos/estado')
}

export async function payMonth(mes, comprobantes) {
  const form = new FormData()
  form.append('mes', mes)
  if (comprobantes) {
    comprobantes.forEach(f => form.append('comprobante[]', f))
  }
  return httpClient.post('/api/pagos/pagar', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export async function getMensualidad() {
  return httpClient.get('/api/aranceles/mensualidad')
}

export async function updateMensualidad(monto) {
  return httpClient.put('/api/aranceles/mensualidad', { monto })
}