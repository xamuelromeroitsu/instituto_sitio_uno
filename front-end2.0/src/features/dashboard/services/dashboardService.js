import { httpClient } from '../../../services/httpClient'

export async function getDashboardData() {
  return httpClient.get('/api/dashboard')
}