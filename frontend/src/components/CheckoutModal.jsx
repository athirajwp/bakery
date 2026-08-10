import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, Lock, ShoppingBag, UserPlus, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { apiFetch } from '@/lib/api'

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  notes: '',
  paymentMethod: 'cod',
}

const inputCls =
  'w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-brown placeholder:text-brown-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

function Field({ label, error, children }) {
  return (
    <label className="block text-left">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brown-muted">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-primary">{error}</span>}
    </label>
  )
}

function ErrorBanner({ message }) {
  if (!message) return null
  return (
    <p className="rounded-2xl bg-primary/10 px-4 py-3 text-center text-sm font-medium text-primary">{message}</p>
  )
}

const TITLES = {
  auth: 'Account',
  form: 'Checkout',
  success: 'Order Placed',
}

export default function CheckoutModal({ open, onClose }) {
  const { user, token, status, login, register, logout } = useAuth()
  const { items, subtotal, clear } = useCart()

  const [authMode, setAuthMode] = useState('login')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [form, setForm] = useState(EMPTY_FORM)
  const [placed, setPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const step = placed ? 'success' : status === 'authed' ? 'form' : 'auth'

  useEffect(() => {
    if (!open) return
    setPlaced(false)
    setOrderNumber('')
    setError('')
    setFieldErrors({})
    setSubmitting(false)
    setForm({
      ...EMPTY_FORM,
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
    })
    setLoginForm({ email: user?.email || '', password: '' })
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open || status !== 'authed') return
    setForm((f) => ({
      ...f,
      name: user?.name || f.name,
      phone: user?.phone || f.phone,
      email: user?.email || f.email,
    }))
  }, [open, user, status])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const handleError = (err) => {
    setError(err.message || 'Something went wrong. Please try again.')
    setFieldErrors(err.data?.errors || {})
  }

  const resetAsync = () => {
    setSubmitting(false)
    setError('')
    setFieldErrors({})
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await login(loginForm.email, loginForm.password)
    } catch (err) {
      handleError(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (registerForm.password !== registerForm.confirm) {
      setError('Passwords do not match.')
      return
    }
    setSubmitting(true)
    try {
      await register({
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone,
        password: registerForm.password,
        password_confirmation: registerForm.confirm,
      })
    } catch (err) {
      handleError(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleOrder = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const data = await apiFetch('/orders', {
        method: 'POST',
        token,
        body: {
          customer_name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          address: form.address.trim() || undefined,
          city: form.city.trim() || undefined,
          payment_method: form.paymentMethod,
          notes: form.notes.trim() || undefined,
          items: items.map((i) => ({
            product_id: i.id,
            name: i.name,
            quantity: i.qty,
            price: i.price,
          })),
        },
      })
      setOrderNumber(data.order.order_number)
      setPlaced(true)
      clear()
    } catch (err) {
      handleError(err)
    } finally {
      setSubmitting(false)
    }
  }

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="checkout-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-brown/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            key="checkout-modal"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-label={TITLES[step]}
          >
            <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl">
              <header className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/10 bg-cream/95 px-6 py-4 backdrop-blur-md">
                <h2 className="font-heading text-xl font-bold text-brown">{TITLES[step]}</h2>
                <button
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-cream"
                  aria-label="Close checkout"
                >
                  <X size={20} />
                </button>
              </header>

              <div className="px-6 pb-6 pt-5">
                {status === 'loading' && !placed ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 size={32} className="animate-spin text-primary" />
                  </div>
                ) : step === 'success' ? (
                  <div className="flex flex-col items-center gap-4 py-6 text-center">
                    <span className="grid h-20 w-20 place-items-center rounded-full bg-green-100 text-green-600">
                      <CheckCircle2 size={40} />
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-brown">Thank you for your order!</h3>
                    <p className="max-w-sm text-sm text-brown-muted">
                      Your order <span className="font-bold text-primary">{orderNumber}</span> has been received. We
                      will call you shortly to confirm the delivery details.
                    </p>
                    <button onClick={onClose} className="btn-gold mt-2 !px-8 !py-4">
                      Continue Shopping
                    </button>
                  </div>
                ) : step === 'auth' ? (
                  <div>
                    <p className="mb-5 text-center text-sm text-brown-muted">
                      Login or create a free account to place your order.
                    </p>
                    <div className="mb-5 grid grid-cols-2 gap-1 rounded-2xl bg-primary/10 p-1">
                      <button
                        onClick={() => {
                          setAuthMode('login')
                          resetAsync()
                        }}
                        className={`flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                          authMode === 'login' ? 'bg-white text-primary shadow-card' : 'text-brown-muted'
                        }`}
                      >
                        <Lock size={15} /> Login
                      </button>
                      <button
                        onClick={() => {
                          setAuthMode('register')
                          resetAsync()
                        }}
                        className={`flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                          authMode === 'register' ? 'bg-white text-primary shadow-card' : 'text-brown-muted'
                        }`}
                      >
                        <UserPlus size={15} /> Register
                      </button>
                    </div>

                    {authMode === 'login' ? (
                      <form onSubmit={handleLogin} className="space-y-4">
                        <Field label="Email" error={fieldErrors.email?.[0]}>
                          <input
                            type="email"
                            required
                            autoComplete="email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
                            className={inputCls}
                            placeholder="you@example.com"
                          />
                        </Field>
                        <Field label="Password" error={fieldErrors.password?.[0]}>
                          <input
                            type="password"
                            required
                            autoComplete="current-password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                            className={inputCls}
                            placeholder="••••••••"
                          />
                        </Field>
                        <ErrorBanner message={error} />
                        <button type="submit" disabled={submitting} className="btn-gold w-full !py-4">
                          {submitting ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
                          Login & Continue
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleRegister} className="space-y-4">
                        <Field label="Full Name" error={fieldErrors.name?.[0]}>
                          <input
                            type="text"
                            required
                            autoComplete="name"
                            value={registerForm.name}
                            onChange={(e) => setRegisterForm((f) => ({ ...f, name: e.target.value }))}
                            className={inputCls}
                            placeholder="Your name"
                          />
                        </Field>
                        <Field label="Email" error={fieldErrors.email?.[0]}>
                          <input
                            type="email"
                            required
                            autoComplete="email"
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm((f) => ({ ...f, email: e.target.value }))}
                            className={inputCls}
                            placeholder="you@example.com"
                          />
                        </Field>
                        <Field label="Phone" error={fieldErrors.phone?.[0]}>
                          <input
                            type="tel"
                            autoComplete="tel"
                            value={registerForm.phone}
                            onChange={(e) => setRegisterForm((f) => ({ ...f, phone: e.target.value }))}
                            className={inputCls}
                            placeholder="98765 43210"
                          />
                        </Field>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Password" error={fieldErrors.password?.[0]}>
                            <input
                              type="password"
                              required
                              minLength={8}
                              autoComplete="new-password"
                              value={registerForm.password}
                              onChange={(e) => setRegisterForm((f) => ({ ...f, password: e.target.value }))}
                              className={inputCls}
                              placeholder="Min 8 characters"
                            />
                          </Field>
                          <Field label="Confirm Password">
                            <input
                              type="password"
                              required
                              minLength={8}
                              autoComplete="new-password"
                              value={registerForm.confirm}
                              onChange={(e) => setRegisterForm((f) => ({ ...f, confirm: e.target.value }))}
                              className={inputCls}
                              placeholder="Repeat password"
                            />
                          </Field>
                        </div>
                        <ErrorBanner message={error} />
                        <button type="submit" disabled={submitting} className="btn-gold w-full !py-4">
                          {submitting ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
                          Create Account & Continue
                        </button>
                      </form>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleOrder} className="space-y-4">
                    <div className="rounded-2xl border border-primary/15 bg-white p-4">
                      <ul className="space-y-2">
                        {items.map((i) => (
                          <li key={i.id} className="flex items-center justify-between gap-3 text-sm">
                            <span className="min-w-0 flex-1 truncate text-brown">
                              <span className="font-semibold">{i.qty}×</span> {i.name}
                            </span>
                            <span className="shrink-0 font-semibold text-brown">₹{i.price * i.qty}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex items-center justify-between border-t border-primary/10 pt-3">
                        <span className="text-sm font-medium text-brown-muted">Subtotal</span>
                        <span className="font-heading text-xl font-bold text-primary">₹{subtotal}</span>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Full Name" error={fieldErrors.customer_name?.[0]}>
                        <input
                          type="text"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={setField('name')}
                          className={inputCls}
                          placeholder="Your name"
                        />
                      </Field>
                      <Field label="Phone" error={fieldErrors.phone?.[0]}>
                        <input
                          type="tel"
                          required
                          autoComplete="tel"
                          value={form.phone}
                          onChange={setField('phone')}
                          className={inputCls}
                          placeholder="98765 43210"
                        />
                      </Field>
                    </div>

                    <Field label="Email" error={fieldErrors.email?.[0]}>
                      <input
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={setField('email')}
                        className={inputCls}
                        placeholder="you@example.com (optional)"
                      />
                    </Field>

                    <Field label="Delivery Address" error={fieldErrors.address?.[0]}>
                      <textarea
                        rows={2}
                        value={form.address}
                        onChange={setField('address')}
                        className={inputCls}
                        placeholder="Street, area, landmark…"
                      />
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="City" error={fieldErrors.city?.[0]}>
                        <input
                          type="text"
                          value={form.city}
                          onChange={setField('city')}
                          className={inputCls}
                          placeholder="Kuthalam"
                        />
                      </Field>
                      <Field label="Payment Method" error={fieldErrors.payment_method?.[0]}>
                        <select value={form.paymentMethod} onChange={setField('paymentMethod')} className={inputCls}>
                          <option value="cod">Cash on Delivery</option>
                          <option value="upi">UPI</option>
                        </select>
                      </Field>
                    </div>

                    <Field label="Order Notes">
                      <textarea
                        rows={2}
                        value={form.notes}
                        onChange={setField('notes')}
                        className={inputCls}
                        placeholder="Any special instructions (optional)"
                      />
                    </Field>

                    <ErrorBanner message={error} />

                    <button type="submit" disabled={submitting} className="btn-gold w-full !py-4">
                      {submitting ? <Loader2 size={18} className="animate-spin" /> : <ShoppingBag size={18} />}
                      Place Order · ₹{subtotal}
                    </button>
                    <button
                      type="button"
                      onClick={logout}
                      className="w-full text-center text-xs font-medium text-brown-muted underline-offset-2 hover:text-primary hover:underline"
                    >
                      Not {user?.name || 'you'}? Log out
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
