import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'

const TOKEN_KEY = 'ksb_admin_token'
const USER_KEY = 'ksb_admin_user'

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null
  } catch {
    return null
  }
}

const AdminAuthContext = createContext(null)

export default function AdminAuthProvider({ children }) {
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
        if (data.user?.role !== 'admin') throw new Error('Not an admin account')
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

  const login = useCallback(async (email, password) => {
    const data = await apiFetch('/login', { method: 'POST', body: { email, password } })
    if (data.user?.role !== 'admin') {
      throw new Error('This account does not have admin access.')
    }
    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(USER_KEY, JSON.stringify(data.user))
    setToken(data.token)
    setUser(data.user)
    setStatus('authed')
    return data.user
  }, [])

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
    <AdminAuthContext.Provider value={{ user, token, status, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}
