import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { httpClient } from '../../../services/httpClient'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const HAS_REAL_CLIENT_ID = GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.startsWith('TU_')

export function GoogleLoginButton() {
  const buttonRef = useRef(null)
  const navigate = useNavigate()
  const { setAuth } = useAuth()
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogleResponse = useCallback(async (response) => {
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
  }, [setAuth, navigate])

  useEffect(() => {
    if (!HAS_REAL_CLIENT_ID || !window.google?.accounts?.id) return

    if (!window.__gisInited) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      })
      window.__gisInited = true
    }

    window.google.accounts.id.renderButton(buttonRef.current, {
      type: 'standard',
      shape: 'rectangular',
      theme: 'outline',
      text: 'signin_with',
      size: 'large',
      width: buttonRef.current?.offsetWidth || 280,
    })

    return () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.cancel()
      }
    }
  }, [handleGoogleResponse])

  const handleDevLogin = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const data = await httpClient.post('/api/auth/google/dev', {
        email: email,
        nombre: email.split('@')[0],
      })
      if (data.token) {
        setAuth(data.user, data.token)
        navigate('/dashboard')
      }
    } catch (err) {
      console.error('Error en login Google dev:', err)
    } finally {
      setLoading(false)
    }
  }

  const content = HAS_REAL_CLIENT_ID ? (
    <div ref={buttonRef} />
  ) : !showEmailInput ? (
    <button
      type="button"
      className="google-btn"
      onClick={() => setShowEmailInput(true)}
    >
      <svg className="google-icon" viewBox="0 0 48 48" width="20" height="20">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
        <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
      </svg>
      <span>Continuar con Google</span>
    </button>
  ) : (
    <form className="google-dev-form" onSubmit={handleDevLogin}>
      <label className="field">
        <span>Correo de Google</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tucorreo@gmail.com"
          autoFocus
          required
        />
      </label>
      <button
        type="submit"
        className="auth-button"
        disabled={loading}
      >
        {loading ? 'Ingresando…' : 'Continuar'}
      </button>
      <button
        type="button"
        className="google-dev-cancel"
        onClick={() => setShowEmailInput(false)}
      >
        Cancelar
      </button>
    </form>
  )

  return (
    <div className="google-section">
      <div className="google-section-title">
        <span>O accede con</span>
      </div>
      <div className="google-login-wrapper">
        {content}
      </div>
    </div>
  )
}
