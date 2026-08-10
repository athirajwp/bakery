import { useCallback, useEffect, useState } from 'react'
import { Eye, Loader2, MessageCircle, Phone } from 'lucide-react'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { apiFetch } from '@/lib/api'
import { btnPrimary, ErrorNote, Field, fmtDate, fmtRs, Modal, PageHeader, Paginator, Spinner, StatusPill } from './ui'

const STATUSES = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled']

export default function AdminOrders() {
  const { token } = useAdminAuth()
  const [list, setList] = useState({ data: [], page: 1, lastPage: 1, total: 0 })
  const [statusFilter, setStatusFilter] = useState('')
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [order, setOrder] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  const load = useCallback(
    async (page = 1, extra = {}) => {
      setLoading(true)
      setError('')
      try {
        const params = new URLSearchParams({ page, per_page: '20' })
        if (extra.status ?? statusFilter) params.set('status', extra.status ?? statusFilter)
        if (extra.q ?? q) params.set('q', extra.q ?? q)
        const d = await apiFetch(`/admin/orders?${params}`, { token })
        setList({ data: d.data, page: d.current_page, lastPage: d.last_page, total: d.total })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    },
    [token, statusFilter, q]
  )

  useEffect(() => {
    load(1)
  }, [load])

  const openDetail = async (id) => {
    setSelectedId(id)
    setOrder(null)
    setDetailLoading(true)
    setError('')
    try {
      setOrder(await apiFetch(`/admin/orders/${id}`, { token }))
    } catch (err) {
      setError(err.message)
    } finally {
      setDetailLoading(false)
    }
  }

  const updateStatus = async (status) => {
    if (!order || order.status === status) return
    setUpdatingStatus(true)
    try {
      const updated = await apiFetch(`/admin/orders/${order.id}/status`, {
        method: 'PATCH',
        token,
        body: { status },
      })
      setOrder(updated)
      setList((prev) => ({
        ...prev,
        data: prev.data.map((o) => (o.id === updated.id ? updated : o)),
      }))
    } catch (err) {
      setError(err.message)
    } finally {
      setUpdatingStatus(false)
    }
  }

  return (
    <div>
      <PageHeader title="Orders" subtitle="Manage customer orders from the website cart." />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            load(1, { status: e.target.value })
          }}
          className="rounded-full border border-primary/15 bg-white px-4 py-2 text-sm text-brown focus:outline-none"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && load(1, { q: e.target.value })}
          placeholder="Search order / customer / phone…"
          className="min-w-0 flex-1 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm text-brown placeholder:text-brown-muted focus:border-primary focus:outline-none sm:max-w-xs"
        />
        <button onClick={() => load(1, { q })} className={btnPrimary}>
          Search
        </button>
      </div>

      {error && <div className="mt-4"><ErrorNote message={error} /></div>}

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
        {loading ? (
          <Spinner label="Loading orders…" />
        ) : list.data.length === 0 ? (
          <p className="py-16 text-center text-sm text-brown-muted">No orders found.</p>
        ) : (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-primary/10 text-xs uppercase tracking-wide text-brown-muted">
                <th className="px-5 py-3 font-semibold">Order</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Items</th>
                <th className="px-5 py-3 font-semibold">Total</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {list.data.map((o) => (
                <tr key={o.id} className="border-b border-primary/5 last:border-0 hover:bg-primary/[0.02]">
                  <td className="px-5 py-3 font-semibold text-primary">{o.order_number}</td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-brown">{o.customer_name}</p>
                    <p className="text-xs text-brown-muted">{o.phone}</p>
                  </td>
                  <td className="px-5 py-3 text-brown">{o.items_count ?? '—'}</td>
                  <td className="px-5 py-3 font-semibold text-brown">{fmtRs(o.total)}</td>
                  <td className="px-5 py-3"><StatusPill status={o.status} /></td>
                  <td className="px-5 py-3 text-xs text-brown-muted">{fmtDate(o.created_at)}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => openDetail(o.id)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-cream"
                    >
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Paginator page={list.page} lastPage={list.lastPage} onPage={load} />

      <Modal open={selectedId != null} onClose={() => setSelectedId(null)} title={`Order ${order?.order_number || ''}`} wide>
        {detailLoading ? (
          <Spinner label="Loading order…" />
        ) : order ? (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4">
              <div className="flex items-center gap-3">
                <StatusPill status={order.status} />
                <span className="text-xs text-brown-muted">{fmtDate(order.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${order.phone}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-white px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-cream"
                >
                  <Phone size={13} /> Call
                </a>
                <a
                  href={`https://wa.me/${String(order.phone).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${order.customer_name}, this is Kavitha Sweets & Bakery regarding your order ${order.order_number}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold-gradient px-3 py-1.5 text-xs font-semibold text-brown shadow-gold"
                >
                  <MessageCircle size={13} /> WhatsApp
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-brown-muted">Customer</h3>
                <p className="mt-2 font-medium text-brown">{order.customer_name}</p>
                <p className="text-sm text-brown-muted">{order.phone}</p>
                {order.email && <p className="text-sm text-brown-muted">{order.email}</p>}
              </div>
              <div className="rounded-2xl bg-white p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-brown-muted">Delivery</h3>
                {order.address ? (
                  <>
                    <p className="mt-2 text-sm font-medium text-brown">{order.address}</p>
                    {order.city && <p className="text-sm text-brown-muted">{order.city}</p>}
                  </>
                ) : (
                  <p className="mt-2 text-sm text-brown-muted">Pickup — no address provided.</p>
                )}
                <p className="mt-1 text-xs capitalize text-brown-muted">Payment: {order.payment_method || 'cod'}</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl bg-white p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-brown-muted">Items</h3>
              <table className="mt-2 w-full text-sm">
                <tbody>
                  {order.items.map((item, i) => (
                    <tr key={item.id ?? i} className="border-b border-primary/5 last:border-0">
                      <td className="py-2.5">
                        <p className="font-medium text-brown">{item.product_name}</p>
                      </td>
                      <td className="py-2.5 text-brown-muted">{item.quantity}×</td>
                      <td className="py-2.5 text-right font-semibold text-brown">{fmtRs(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 flex flex-col items-end gap-1 border-t border-primary/10 pt-3 text-sm">
                <p className="text-brown-muted">
                  Items total <span className="font-semibold text-brown">{fmtRs(order.items_total)}</span>
                </p>
                <p className="text-brown-muted">
                  Delivery <span className="font-semibold text-brown">{fmtRs(order.delivery_charge)}</span>
                </p>
                <p className="font-heading text-xl font-bold text-primary">Total {fmtRs(order.total)}</p>
              </div>
            </div>

            {order.notes && (
              <div className="rounded-2xl bg-gold-gradient/10 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-brown-muted">Order Notes</h3>
                <p className="mt-1 text-sm text-brown">{order.notes}</p>
              </div>
            )}

            <div className="rounded-2xl bg-white p-4">
              <Field label="Update Status">
                <div className="flex items-center gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(e.target.value)}
                    disabled={updatingStatus}
                    className="flex-1 rounded-xl border border-primary/15 bg-white px-3.5 py-2.5 text-sm text-brown focus:border-primary focus:outline-none"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                  {updatingStatus && <Loader2 size={18} className="animate-spin text-primary" />}
                </div>
              </Field>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
