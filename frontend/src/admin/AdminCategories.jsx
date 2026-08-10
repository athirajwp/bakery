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

const EMPTY_FORM = { id: null, name: '', description: '', is_active: true }

export default function AdminCategories() {
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
      const d = await apiFetch('/admin/categories', { token })
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

  const openEdit = (c) => {
    setForm({ id: c.id, name: c.name, description: c.description || '', is_active: !!c.is_active })
    setImageFile(null)
    setModalOpen(true)
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('description', form.description)
    fd.append('is_active', form.is_active ? '1' : '0')
    if (imageFile) fd.append('image', imageFile)

    try {
      if (form.id) {
        await apiFetch(`/admin/categories/${form.id}`, { method: 'POST', token, formData: fd })
      } else {
        await apiFetch('/admin/categories', { method: 'POST', token, formData: fd })
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
      await apiFetch(`/admin/categories/${id}`, { method: 'DELETE', token })
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <PageHeader
        title="Categories"
        subtitle="Organise products into menu categories."
        action={
          <button onClick={openCreate} className={btnPrimary}>
            <Plus size={16} /> Add Category
          </button>
        }
      />

      {error && <div className="mt-4"><ErrorNote message={error} /></div>}

      {loading ? (
        <Spinner label="Loading categories…" />
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.length === 0 ? (
            <p className="col-span-full py-16 text-center text-sm text-brown-muted">No categories yet.</p>
          ) : (
            list.map((c) => (
              <div key={c.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                {c.image ? (
                  <img src={c.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                ) : (
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-primary/10 font-heading text-lg font-bold text-primary">
                    {c.name.charAt(0)}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-brown">{c.name}</p>
                  <p className="text-xs text-brown-muted">
                    {c.products_count} product(s) · {c.is_active ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    onClick={() => openEdit(c)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-cream"
                    aria-label={`Edit ${c.name}`}
                  >
                    <Pencil size={14} />
                  </button>
                  <ConfirmButton
                    onConfirm={() => remove(c.id)}
                    title={`Delete "${c.name}"? Its products will also be deleted.`}
                    className="grid h-8 w-8 place-items-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={form.id ? 'Edit Category' : 'Add Category'}>
        <form onSubmit={save} className="space-y-4">
          <Field label="Name">
            <input type="text" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} />
          </Field>
          <Field label="Description">
            <textarea rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={inputCls} />
          </Field>
          <Field label="Category Image" hint="JPG / PNG / WebP, up to 2 MB">
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
              {saving ? 'Saving…' : form.id ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
