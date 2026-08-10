import { useCallback, useEffect, useState } from 'react'
import { Check, Loader2, X } from 'lucide-react'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { apiFetch } from '@/lib/api'
import { ConfirmButton, ErrorNote, fmtDate, PageHeader, Paginator, Spinner, Stars } from './ui'

export default function AdminReviews() {
  const { token } = useAdminAuth()
  const [list, setList] = useState({ data: [], page: 1, lastPage: 1, total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toggling, setToggling] = useState(null)

  const load = useCallback(
    async (page = 1) => {
      setLoading(true)
      setError('')
      try {
        const d = await apiFetch(`/admin/reviews?page=${page}`, { token })
        setList({ data: d.data, page: d.current_page, lastPage: d.last_page, total: d.total })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    },
    [token]
  )

  useEffect(() => {
    load(1)
  }, [load])

  const toggle = async (review) => {
    setToggling(review.id)
    try {
      await apiFetch(`/admin/reviews/${review.id}`, {
        method: 'PATCH',
        token,
        body: { is_approved: !review.is_approved },
      })
      load(list.page)
    } catch (err) {
      setError(err.message)
    } finally {
      setToggling(null)
    }
  }

  const remove = async (id) => {
    try {
      await apiFetch(`/admin/reviews/${id}`, { method: 'DELETE', token })
      load(list.page)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <PageHeader title="Reviews" subtitle="Approve or remove customer reviews." />

      {error && <div className="mt-4"><ErrorNote message={error} /></div>}

      <div className="mt-6 space-y-4">
        {loading ? (
          <Spinner label="Loading reviews…" />
        ) : list.data.length === 0 ? (
          <p className="py-16 text-center text-sm text-brown-muted">No reviews yet.</p>
        ) : (
          list.data.map((r) => (
            <div key={r.id} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-brown">{r.customer_name}</p>
                    <Stars rating={r.rating} />
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        r.is_approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {r.is_approved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-brown-muted">
                    {r.place || '—'} · {fmtDate(r.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggle(r)}
                    disabled={toggling === r.id}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      r.is_approved
                        ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    {toggling === r.id ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : r.is_approved ? (
                      <X size={13} />
                    ) : (
                      <Check size={13} />
                    )}
                    {r.is_approved ? 'Unapprove' : 'Approve'}
                  </button>
                  <ConfirmButton onConfirm={() => remove(r.id)} title={`Delete review by ${r.customer_name}?`} />
                </div>
              </div>
              <p className="mt-3 text-sm text-brown">{r.comment}</p>
            </div>
          ))
        )}
      </div>

      <Paginator page={list.page} lastPage={list.lastPage} onPage={load} />
    </div>
  )
}
