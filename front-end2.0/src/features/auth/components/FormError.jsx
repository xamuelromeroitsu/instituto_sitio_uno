import { parseServerError } from '../../../services/errorHandler'

const STATUS_ICONS = {
  201: '✅',
  400: '⚠️',
  401: '🔒',
  409: '👤',
  422: '📝',
  500: '❌',
}

export function FormError({ error, fieldErrors }) {
  if (!error && !fieldErrors) return null

  let parsed, message, status

  try {
    parsed = error ? parseServerError(error) : null
    status = parsed?.status
    message = parsed?.friendly
  } catch (e) {
    console.warn('FormError: parseServerError falló', e)
  }

  if (!message) {
    message = typeof error === 'string'
      ? error
      : error?.message
      || error?.status
      ? `Error ${error.status}`
      : 'Error desconocido'
  }

  const icon = STATUS_ICONS[status] || '⚠️'

  return (
    <div className={`form-error form-error--${status || 'unknown'}`}>
      <p className="form-error__message">{icon} {message}</p>
      {fieldErrors && Object.keys(fieldErrors).length > 0 && (
        <ul className="form-error__fields">
          {Object.entries(fieldErrors).map(([field, msg]) => (
            <li key={field}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
