import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, Star, X } from 'lucide-react'

export const inputCls =
  'w-full rounded-xl border border-primary/15 bg-white px-3.5 py-2.5 text-sm text-brown placeholder:text-brown-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60'

export const btnGhost =
  'inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60'

export function fmtRs(n) {
  return '₹' + Number(n ?? 0).toLocaleString('en-IN')
}

export function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="font-heading text-3xl font-bold text-brown">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-brown-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24">
      <Loader2 size={30} className="animate-spin text-primary" />
      <p className="text-sm text-brown-muted">{label}</p>
    </div>
  )
}

export function ErrorNote({ message }) {
  if (!message) return null
  return <p className="rounded-xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">{message}</p>
}

export function Field({ label, children, error, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brown-muted">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-brown-muted">{hint}</span>}
      {error && <span className="mt-1 block text-xs font-medium text-primary">{error}</span>}
    </label>
  )
}

export function Modal({ open, onClose, title, children, wide }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-brown/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'tween', duration: 0.22 }}
            className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div
              className={`max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl ${
                wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'
              }`}
            >
              <header className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/10 bg-cream/95 px-6 py-4 backdrop-blur-md">
                <h2 className="font-heading text-xl font-bold text-brown">{title}</h2>
                <button
                  onClick={onClose}
                  className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-cream"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </header>
              <div className="px-6 py-5">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const STATUS_COLORS = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-indigo-100 text-indigo-700',
  ready: 'bg-teal-100 text-teal-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  new: 'bg-amber-100 text-amber-700',
  read: 'bg-blue-100 text-blue-700',
  replied: 'bg-green-100 text-green-700',
}

export function StatusPill({ status }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        STATUS_COLORS[status] || 'bg-primary/10 text-primary'
      }`}
    >
      {status || '—'}
    </span>
  )
}

export function Stars({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={13}
          className={n <= Math.round(rating || 0) ? 'fill-gold text-gold' : 'text-brown-muted/40'}
        />
      ))}
      {rating != null && <span className="ml-1 text-xs font-semibold text-brown">{rating}</span>}
    </span>
  )
}

export function ConfirmButton({ onConfirm, title = 'Delete this item?', children, className }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        if (window.confirm(title)) onConfirm()
      }}
      className={
        className ||
        'inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white'
      }
    >
      {children || 'Delete'}
    </button>
  )
}

export function Paginator({ page, lastPage, onPage }) {
  if (!lastPage || lastPage <= 1) return null
  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <button className={btnGhost} disabled={page <= 1} onClick={() => onPage(page - 1)}>
        ← Prev
      </button>
      <span className="text-sm text-brown-muted">
        Page {page} of {lastPage}
      </span>
      <button className={btnGhost} disabled={page >= lastPage} onClick={() => onPage(page + 1)}>
        Next →
      </button>
    </div>
  )
}

export function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-primary/20'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            checked ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </button>
      {label && <span className="text-sm font-medium text-brown">{label}</span>}
    </label>
  )
}
