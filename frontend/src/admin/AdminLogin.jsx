import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Cake, Loader2, Lock } from 'lucide-react'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { ErrorNote, inputCls } from './ui'

export default function AdminLogin() {
  const { login } = useAdminAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2a0000] px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-gold shadow-lift">
            <Cake size={30} strokeWidth={1.8} />
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-white">Kavitha Sweets</h1>
          <p className="mt-1 text-sm text-gold">Admin Panel</p>
        </div>

        <form onSubmit={submit} className="space-y-4 rounded-3xl bg-cream p-7 shadow-2xl">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brown-muted">
              Username
            </label>
            <input
              type="text"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
              placeholder="admin"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brown-muted">
              Password
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
              placeholder="••••••••"
            />
          </div>
          <ErrorNote message={error} />
          <button type="submit" disabled={submitting} className="btn-gold w-full !py-3.5">
            {submitting ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  )
}
