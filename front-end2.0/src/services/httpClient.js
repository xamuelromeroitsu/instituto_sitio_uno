const BASE_URL = import.meta.env.VITE_API_BASE_URL

function getToken() {
  try {
    return localStorage.getItem('itsu_token')
  } catch {
    return null
  }
}

class ApiError extends Error {
  constructor(status, body) {
    const msg = typeof body?.error === 'string' ? body.error : `Error ${status}`
    super(msg)
    this.status = status
    this.body = body
  }
}

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`
  const token = getToken()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new ApiError(response.status, body)
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
