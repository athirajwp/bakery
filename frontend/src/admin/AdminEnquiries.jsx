import { useCallback, useEffect, useState } from 'react'
import { Mail, Phone } from 'lucide-react'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { apiFetch } from '@/lib/api'
import { ConfirmButton, ErrorNote, fmtDate, PageHeader, Paginator, Spinner, StatusPill } from './ui'

const STATUSES = ['new', 'read', 'replied']

export default function AdminEnquiries() {
  const { token } = useAdminAuth()
  const [list, setList] = useState({ data: [], page: 1, lastPage: 1, total: 0 })
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(
    async (page = 1, status = statusFilter) => {
      setLoading(true)
      setError('')
      try {
        const params = new URLSearchParams({ page, per_page: '15' })
        if (status) params.set('status', status)
        const d = await apiFetch(`/admin/enquiries?${params}`, { token })
        setList({ data: d.data, page: d.current_page, lastPage: d.last_page, total: d.total })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    },
    [token, statusFilter]
  )

  useEffect(() => {
    load(1)
  }, [load])

  const updateStatus = async (id, status) => {
    try {
      const updated = await apiFetch(`/admin/enquiries/${id}`, {
        method: 'PATCH',
        token,
        body: { status },
      })
      setList((prev) => ({
        ...prev,
        data: prev.data.map((e) => (e.id === updated.id ? updated : e)),
      }))
    } catch (err) {
      setError(err.message)
    }
  }

  const remove = async (id) => {
    try {
      await apiFetch(`/admin/enquiries/${id}`, { method: 'DELETE', token })
      load(list.page)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <PageHeader title="Enquiries" subtitle="Messages submitted through the contact form." />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            load(1, e.target.value)
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
      </div>

      {error && <div className="mt-4"><ErrorNote message={error} /></div>}

      <div className="mt-6 space-y-4">
        {loading ? (
          <Spinner label="Loading enquiries…" />
        ) : list.data.length === 0 ? (
          <p className="py-16 text-center text-sm text-brown-muted">No enquiries found.</p>
        ) : (
          list.data.map((e) => (
            <div key={e.id} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-brown">{e.name}</p>
                    <StatusPill status={e.status} />
                    <span className="text-xs text-brown-muted">{fmtDate(e.created_at)}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-brown-muted">
                    <a href={`tel:${e.phone}`} className="inline-flex items-center gap-1.5 hover:text-primary">
                      <Phone size={13} /> {e.phone}
                    </a>
                    {e.email && (
                      <a href={`mailto:${e.email}`} className="inline-flex items-center gap-1.5 hover:text-primary">
                        <Mail size={13} /> {e.email}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <select
                    value={e.status}
                    onChange={(ev) => updateStatus(e.id, ev.target.value)}
                    className="rounded-full border border-primary/15 bg-cream px-3 py-1.5 text-xs font-semibold text-brown focus:outline-none"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                  <ConfirmButton onConfirm={() => remove(e.id)} title={`Delete enquiry from ${e.name}?`} />
                </div>
              </div>
              <p className="mt-3 whitespace-pre-line text-sm text-brown">{e.message}</p>
            </div>
          ))
        )}
      </div>

      <Paginator page={list.page} lastPage={list.lastPage} onPage={load} />
    </div>
  )
}
