import { createContext, useContext, useState, useCallback } from 'react'
import { loginUser as apiLogin } from '../features/auth/services/authService'

const TOKEN_KEY = 'itsu_token'
const USER_KEY = 'itsu_user'

function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

function removeUser() {
  localStorage.removeItem(USER_KEY)
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(getUser)
  const [token, setTokenState] = useState(getToken)

  const isAuthenticated = !!token && !!user

  const login = useCallback(async (email, password) => {
    const response = await apiLogin({ email, password })
    const userData = response.user
    const newToken = response.token

    setToken(newToken)
    setTokenState(newToken)
    setUser(userData)
    setUserState(userData)

    return response
  }, [])

  const logout = useCallback(() => {
    removeToken()
    removeUser()
    setTokenState(null)
    setUserState(null)
  }, [])

  const setAuth = useCallback((userData, newToken) => {
    setToken(newToken)
    setTokenState(newToken)
    setUser(userData)
    setUserState(userData)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return context
}
