const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Error ${response.status}`)
  }

  return response.json()
}

export const httpClient = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),

  post: (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

  put: (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
}
