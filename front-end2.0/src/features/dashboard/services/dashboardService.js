import { httpClient } from '../../../services/httpClient'

export async function getDashboardData() {
  return httpClient.get('/api/dashboard')
}

export async function getPaymentStatus() {
  return httpClient.get('/api/pagos/estado')
}

export async function payMonth(mes, monto) {
  return httpClient.post('/api/pagos/pagar', { mes, monto })
}