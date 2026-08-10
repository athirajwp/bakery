import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Inbox, Package, ShoppingBag, Star, TrendingUp } from 'lucide-react'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { apiFetch } from '@/lib/api'
import { ErrorNote, fmtDate, fmtRs, PageHeader, Spinner, StatusPill } from './ui'

const CARDS = [
  { label: 'Total Products', key: 'products', sub: 'active_count', icon: Package, to: '/admin/products' },
  { label: 'Total Orders', key: 'orders', sub: 'pending_orders', icon: ShoppingBag, to: '/admin/orders' },
  { label: 'Revenue', key: 'revenue', sub: 'revenue_note', icon: TrendingUp, to: '/admin/orders' },
  { label: 'Reviews', key: 'reviews', sub: 'approved_reviews', icon: Star, to: '/admin/reviews' },
  { label: 'New Enquiries', key: 'new_enquiries', sub: 'enquiry_note', icon: Inbox, to: '/admin/enquiries' },
]

export default function AdminDashboard() {
  const { token } = useAdminAuth()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    apiFetch('/admin/dashboard', { token })
      .then((d) => active && setData(d))
      .catch((err) => active && setError(err.message))
    return () => {
      active = false
    }
  }, [token])

  if (error) return <ErrorNote message={error} />
  if (!data) return <Spinner label="Loading dashboard…" />

  const stats = data.stats

  const cards = CARDS.map((c) => ({
    ...c,
    value:
      c.key === 'revenue'
        ? fmtRs(stats[c.key])
        : Number(stats[c.key] ?? 0).toLocaleString('en-IN'),
    subText:
      c.sub === 'active_count'
        ? `${stats.active_products} active`
        : c.sub === 'pending_orders'
          ? `${stats.pending_orders} pending`
          : c.sub === 'revenue_note'
            ? 'excl. cancelled'
            : c.sub === 'approved_reviews'
              ? `${stats.approved_reviews} approved`
              : 'awaiting reply',
  }))

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Welcome back! Here is what is happening today." />

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="group rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-gold">
              <card.icon size={20} strokeWidth={1.8} />
            </span>
            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-brown-muted">{card.label}</p>
            <p className="font-heading text-2xl font-bold text-brown">{card.value}</p>
            <p className="mt-0.5 text-[11px] text-brown-muted">{card.subText}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-brown">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-3">
            {data.recent_orders.length === 0 ? (
              <p className="py-6 text-sm text-brown-muted">No orders yet.</p>
            ) : (
              data.recent_orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between gap-3 border-b border-primary/5 py-3 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-brown">{order.order_number}</p>
                    <p className="truncate text-xs text-brown-muted">
                      {order.customer_name} · {order.items?.length ?? 0} item(s) · {fmtRs(order.total)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusPill status={order.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-brown">Latest Enquiries</h2>
            <Link to="/admin/enquiries" className="text-xs font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-3">
            {data.recent_enquiries.length === 0 ? (
              <p className="py-6 text-sm text-brown-muted">No enquiries yet.</p>
            ) : (
              data.recent_enquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="flex items-center justify-between gap-3 border-b border-primary/5 py-3 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-brown">{enquiry.name}</p>
                    <p className="truncate text-xs text-brown-muted">
                      {enquiry.phone} · {fmtDate(enquiry.created_at)}
                    </p>
                  </div>
                  <StatusPill status={enquiry.status} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
