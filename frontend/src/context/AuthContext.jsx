import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'

const TOKEN_KEY = 'ksb_token'
const USER_KEY = 'ksb_user'

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null
  } catch {
    return null
  }
}

const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(readStoredUser)
  const [status, setStatus] = useState(token ? 'loading' : 'guest')

  useEffect(() => {
    if (!token) {
      setUser(null)
      setStatus('guest')
      return
    }

    let active = true
    setStatus('loading')
    apiFetch('/me', { token })
      .then((data) => {
        if (!active) return
        setUser(data.user)
        localStorage.setItem(USER_KEY, JSON.stringify(data.user))
        setStatus('authed')
      })
      .catch(() => {
        if (!active) return
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
        setToken(null)
        setUser(null)
        setStatus('guest')
      })

    return () => {
      active = false
    }
  }, [token])

  const persistSession = useCallback((session) => {
    localStorage.setItem(TOKEN_KEY, session.token)
    localStorage.setItem(USER_KEY, JSON.stringify(session.user))
    setToken(session.token)
    setUser(session.user)
    setStatus('authed')
  }, [])

  const login = useCallback(
    async (email, password) => {
      const data = await apiFetch('/login', { method: 'POST', body: { email, password } })
      persistSession(data)
      return data.user
    },
    [persistSession]
  )

  const register = useCallback(
    async (payload) => {
      const data = await apiFetch('/register', { method: 'POST', body: payload })
      persistSession(data)
      return data.user
    },
    [persistSession]
  )

  const logout = useCallback(async () => {
    try {
      if (token) await apiFetch('/logout', { method: 'POST', token })
    } catch {
      // ignore network errors on logout
    }
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
    setStatus('guest')
  }, [token])

  return (
    <AuthContext.Provider value={{ user, token, status, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
