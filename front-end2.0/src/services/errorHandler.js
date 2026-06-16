const ERROR_MAP = {
  400: 'Error al enviar los datos. Verifica e inténtalo de nuevo.',
  401: 'Correo o contraseña incorrectos.',
  403: 'No tienes permiso para realizar esta acción.',
  404: 'El recurso solicitado no fue encontrado.',
  409: 'Este correo electrónico o cédula ya se encuentra registrado.',
  422: 'Uno o más campos no son válidos. Revísalos e intenta de nuevo.',
  500: 'Error del servidor. Intenta de nuevo más tarde.',
}

const FIELD_LABELS = {
  email: 'Correo electrónico',
  password: 'Contraseña',
  primer_nombre: 'Primer nombre',
  primer_apellido: 'Primer apellido',
  cedula_identidad: 'Cédula de identidad',
  segundo_nombre: 'Segundo nombre',
  segundo_apellido: 'Segundo apellido',
  telefono: 'Teléfono',
}

export function parseServerError(error) {
  if (!error) return { friendly: ERROR_MAP[500], status: 500, fieldErrors: null }

  const rawStatus = typeof error.status === 'number' ? error.status : null
  const status = rawStatus || error.response?.status || 500
  const body = (error.body || error.response?.data || {})

  const serverMessage = typeof body.error === 'string'
    ? body.error
    : null

  const fieldErrors = body.error && typeof body.error === 'object'
    ? body.error
    : null

  let friendly = ERROR_MAP[status] || `Error inesperado (${status})`

  if (status === 422 && fieldErrors) {
    const details = Object.entries(fieldErrors)
      .map(([field, msgs]) => {
        const label = FIELD_LABELS[field] || field
        return `${label}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`
      })
      .join(' | ')
    friendly = details || friendly
  }

  if (status === 409 && serverMessage) {
    friendly = serverMessage
  }

  if (status === 401 && serverMessage) {
    friendly = serverMessage
  }

  return { status, serverMessage, friendly, fieldErrors }
}

export function formatFieldErrors(fieldErrors) {
  if (!fieldErrors) return {}
  const result = {}
  for (const [field, msgs] of Object.entries(fieldErrors)) {
    const label = FIELD_LABELS[field] || field
    result[field] = Array.isArray(msgs) ? msgs[0] : msgs
  }
  return result
}
