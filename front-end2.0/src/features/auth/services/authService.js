import { httpClient } from '../../../services/httpClient'

export async function loginUser(payload) {
  return httpClient.post('/api/auth/login', payload)
}

export async function registerStudent(payload) {
  return httpClient.post('/api/auth/register', payload)
}