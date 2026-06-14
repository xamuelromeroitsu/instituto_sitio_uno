import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { httpClient } from '../../../services/httpClient'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

export function GoogleLoginButton() {
  const buttonRef = useRef(null)
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.startsWith('TU_')) return

    const initializeGoogle = () => {
      if (!window.google?.accounts?.id) return

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          if (!response?.credential) return

          try {
            const data = await httpClient.post('/api/auth/google', {
              id_token: response.credential,
            })

            if (data.token) {
              setAuth(data.user, data.token)
              navigate('/dashboard')
            }
          } catch (err) {
            console.error('Error al autenticar con Google:', err)
          }
        },
      })

      window.google.accounts.id.renderButton(buttonRef.current, {
        type: 'standard',
        shape: 'rectangular',
        theme: 'outline',
        text: 'signin_with',
        size: 'large',
        width: buttonRef.current?.offsetWidth || 280,
      })
    }

    if (document.readyState === 'complete') {
      initializeGoogle()
    } else {
      window.addEventListener('load', initializeGoogle)
      return () => window.removeEventListener('load', initializeGoogle)
    }
  }, [])

  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.startsWith('TU_')) {
    return (
      <p className="google-config-warning">
        Google Login no configurado. Define <code>VITE_GOOGLE_CLIENT_ID</code> en tu <code>.env</code>.
      </p>
    )
  }

  return (
    <div className="google-login-wrapper">
      <div className="google-divider">
        <span>o continúa con</span>
      </div>
      <div ref={buttonRef} />
    </div>
  )
}
