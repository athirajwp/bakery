import { useCallback, useEffect, useState } from 'react'
import { Pencil, Plus, Upload } from 'lucide-react'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { apiFetch } from '@/lib/api'
import {
  btnPrimary,
  ConfirmButton,
  ErrorNote,
  Field,
  inputCls,
  Modal,
  PageHeader,
  Spinner,
  Toggle,
} from './ui'

const EMPTY_FORM = { id: null, title: '', subtitle: '', link: '', sort_order: 0, is_active: true }

export default function AdminBanners() {
  const { token } = useAdminAuth()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState(EMPTY_FORM)
  const [imageFile, setImageFile] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const d = await apiFetch('/admin/banners', { token })
      setList(d.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    load()
  }, [load])

  const openCreate = () => {
    setForm(EMPTY_FORM)
    setImageFile(null)
    setModalOpen(true)
  }

  const openEdit = (b) => {
    setForm({
      id: b.id,
      title: b.title,
      subtitle: b.subtitle || '',
      link: b.link || '',
      sort_order: b.sort_order ?? 0,
      is_active: !!b.is_active,
    })
    setImageFile(null)
    setModalOpen(true)
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const fd = new FormData()
    fd.append('title', form.title)
    fd.append('subtitle', form.subtitle)
    fd.append('link', form.link)
    fd.append('sort_order', String(form.sort_order))
    fd.append('is_active', form.is_active ? '1' : '0')
    if (imageFile) fd.append('image', imageFile)

    try {
      if (form.id) {
        await apiFetch(`/admin/banners/${form.id}`, { method: 'POST', token, formData: fd })
      } else {
        await apiFetch('/admin/banners', { method: 'POST', token, formData: fd })
      }
      setModalOpen(false)
      load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    try {
      await apiFetch(`/admin/banners/${id}`, { method: 'DELETE', token })
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <PageHeader
        title="Banners"
        subtitle="Promotional banners for the website."
        action={
          <button onClick={openCreate} className={btnPrimary}>
            <Plus size={16} /> Add Banner
          </button>
        }
      />

      {error && <div className="mt-4"><ErrorNote message={error} /></div>}

      {loading ? (
        <Spinner label="Loading banners…" />
      ) : (
        <div className="mt-6 space-y-4">
          {list.length === 0 ? (
            <p className="py-16 text-center text-sm text-brown-muted">No banners yet.</p>
          ) : (
            list.map((b) => (
              <div key={b.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                {b.image ? (
                  <img src={b.image} alt="" className="h-16 w-28 shrink-0 rounded-xl object-cover" />
                ) : (
                  <span className="grid h-16 w-28 shrink-0 place-items-center rounded-xl bg-primary/10 text-xs text-primary">
                    No image
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-brown">{b.title}</p>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        b.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {b.is_active ? 'Active' : 'Hidden'}
                    </span>
                  </div>
                  {b.subtitle && <p className="truncate text-xs text-brown-muted">{b.subtitle}</p>}
                  {b.link && <p className="truncate text-xs text-primary">{b.link}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    onClick={() => openEdit(b)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-cream"
                    aria-label={`Edit ${b.title}`}
                  >
                    <Pencil size={14} />
                  </button>
                  <ConfirmButton onConfirm={() => remove(b.id)} title={`Delete "${b.title}"?`} />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={form.id ? 'Edit Banner' : 'Add Banner'}>
        <form onSubmit={save} className="space-y-4">
          <Field label="Title">
            <input type="text" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputCls} />
          </Field>
          <Field label="Subtitle">
            <input type="text" value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} className={inputCls} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Link" hint="Optional">
              <input type="url" value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))} className={inputCls} placeholder="https://…" />
            </Field>
            <Field label="Sort Order">
              <input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))} className={inputCls} />
            </Field>
          </div>
          <Field label="Banner Image" hint={form.id ? 'Optional — leave empty to keep current' : 'Optional · JPG / PNG / WebP, up to 4 MB'}>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/25 bg-white px-4 py-3 text-sm font-medium text-primary transition hover:border-primary">
              <Upload size={16} /> {imageFile ? imageFile.name : 'Choose image'}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            </label>
          </Field>
          <Toggle checked={form.is_active} onChange={(v) => setForm((f) => ({ ...f, is_active: v }))} label="Active" />
          {error && <ErrorNote message={error} />}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-full px-4 py-2 text-sm font-semibold text-brown-muted hover:text-primary">
              Cancel
            </button>
            <button type="submit" disabled={saving} className={btnPrimary}>
              {saving ? 'Saving…' : form.id ? 'Save Changes' : 'Add Banner'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
