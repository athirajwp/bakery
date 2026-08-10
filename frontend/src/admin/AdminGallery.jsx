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

const EMPTY_FORM = { id: null, title: '', category: '', sort_order: 0, is_active: true }

export default function AdminGallery() {
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
      const d = await apiFetch('/admin/gallery', { token })
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

  const openEdit = (g) => {
    setForm({ id: g.id, title: g.title, category: g.category, sort_order: g.sort_order ?? 0, is_active: !!g.is_active })
    setImageFile(null)
    setModalOpen(true)
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const fd = new FormData()
    fd.append('title', form.title)
    fd.append('category', form.category)
    fd.append('sort_order', String(form.sort_order))
    fd.append('is_active', form.is_active ? '1' : '0')
    if (imageFile) fd.append('image', imageFile)

    try {
      if (form.id) {
        await apiFetch(`/admin/gallery/${form.id}`, { method: 'POST', token, formData: fd })
      } else {
        await apiFetch('/admin/gallery', { method: 'POST', token, formData: fd })
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
      await apiFetch(`/admin/gallery/${id}`, { method: 'DELETE', token })
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <PageHeader
        title="Gallery"
        subtitle="Photos shown on the website gallery."
        action={
          <button onClick={openCreate} className={btnPrimary}>
            <Plus size={16} /> Add Image
          </button>
        }
      />

      {error && <div className="mt-4"><ErrorNote message={error} /></div>}

      {loading ? (
        <Spinner label="Loading gallery…" />
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {list.length === 0 ? (
            <p className="col-span-full py-16 text-center text-sm text-brown-muted">No gallery images yet.</p>
          ) : (
            list.map((g) => (
              <div key={g.id} className="group overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="relative">
                  {g.image ? (
                    <img src={g.image} alt={g.title} className="aspect-[4/3] w-full object-cover" />
                  ) : (
                    <span className="grid aspect-[4/3] w-full place-items-center text-xs text-brown-muted">No image</span>
                  )}
                  <span
                    className={`absolute left-2 top-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      g.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {g.is_active ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-semibold text-brown">{g.title}</p>
                  <p className="text-xs text-brown-muted">{g.category}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <button
                      onClick={() => openEdit(g)}
                      className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-cream"
                      aria-label={`Edit ${g.title}`}
                    >
                      <Pencil size={14} />
                    </button>
                    <ConfirmButton onConfirm={() => remove(g.id)} title={`Remove "${g.title}"?`} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={form.id ? 'Edit Gallery Image' : 'Add Gallery Image'}>
        <form onSubmit={save} className="space-y-4">
          <Field label="Title">
            <input type="text" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputCls} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category">
              <input type="text" required value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className={inputCls} placeholder="Cakes, Sweets…" />
            </Field>
            <Field label="Sort Order">
              <input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))} className={inputCls} />
            </Field>
          </div>
          <Field label="Image" hint={form.id ? 'Optional — leave empty to keep current' : 'Required · JPG / PNG / WebP, up to 4 MB'}>
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
              {saving ? 'Saving…' : form.id ? 'Save Changes' : 'Add Image'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
