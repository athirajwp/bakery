import { useCallback, useEffect, useState } from 'react'
import { Pencil, Plus, Upload } from 'lucide-react'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { apiFetch } from '@/lib/api'
import {
  btnPrimary,
  ConfirmButton,
  ErrorNote,
  Field,
  fmtRs,
  inputCls,
  Modal,
  PageHeader,
  Paginator,
  Spinner,
  Toggle,
} from './ui'

const EMPTY_FORM = {
  id: null,
  category_id: '',
  name: '',
  description: '',
  price: '',
  old_price: '',
  weight: '',
  rating: '4.5',
  reviews_count: '0',
  tags: '',
  is_best_seller: false,
  is_active: true,
}

export default function AdminProducts() {
  const { token } = useAdminAuth()
  const [list, setList] = useState({ data: [], page: 1, lastPage: 1, total: 0 })
  const [categories, setCategories] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState(EMPTY_FORM)
  const [imageFile, setImageFile] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const load = useCallback(
    async (page = 1, search = q) => {
      setLoading(true)
      setError('')
      try {
        const params = new URLSearchParams({ page, per_page: '20' })
        if (search) params.set('q', search)
        const d = await apiFetch(`/admin/products?${params}`, { token })
        setList({ data: d.data, page: d.current_page, lastPage: d.last_page, total: d.total })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    },
    [token, q]
  )

  useEffect(() => {
    load(1)
  }, [load])

  useEffect(() => {
    apiFetch('/admin/categories', { token })
      .then((d) => setCategories(d.data))
      .catch(() => {})
  }, [token])

  const openCreate = () => {
    setForm(EMPTY_FORM)
    setImageFile(null)
    setModalOpen(true)
  }

  const openEdit = (p) => {
    setForm({
      id: p.id,
      category_id: String(p.category_id ?? p.category?.id ?? ''),
      name: p.name || '',
      description: p.description || '',
      price: p.price ?? '',
      old_price: p.old_price ?? '',
      weight: p.weight || '',
      rating: p.rating ?? '4.5',
      reviews_count: p.reviews_count ?? '0',
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : p.tags || '',
      is_best_seller: !!p.is_best_seller,
      is_active: !!p.is_active,
    })
    setImageFile(null)
    setModalOpen(true)
  }

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const fd = new FormData()
    fd.append('category_id', form.category_id)
    fd.append('name', form.name)
    fd.append('description', form.description)
    fd.append('price', form.price)
    if (form.old_price) fd.append('old_price', form.old_price)
    fd.append('weight', form.weight)
    fd.append('rating', form.rating)
    fd.append('reviews_count', form.reviews_count)
    form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((t) => fd.append('tags[]', t))
    fd.append('is_best_seller', form.is_best_seller ? '1' : '0')
    fd.append('is_active', form.is_active ? '1' : '0')
    if (imageFile) fd.append('image', imageFile)

    try {
      if (form.id) {
        await apiFetch(`/admin/products/${form.id}`, { method: 'POST', token, formData: fd })
      } else {
        await apiFetch('/admin/products', { method: 'POST', token, formData: fd })
      }
      setModalOpen(false)
      load(list.page)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    try {
      await apiFetch(`/admin/products/${id}`, { method: 'DELETE', token })
      load(list.page)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle="Add and manage products shown on the website."
        action={
          <button onClick={openCreate} className={btnPrimary}>
            <Plus size={16} /> Add Product
          </button>
        }
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && load(1, e.target.value)}
          placeholder="Search products…"
          className="w-full rounded-full border border-primary/15 bg-white px-4 py-2 text-sm text-brown placeholder:text-brown-muted focus:border-primary focus:outline-none sm:max-w-xs"
        />
        <button onClick={() => load(1, q)} className={btnPrimary}>
          Search
        </button>
      </div>

      {error && <div className="mt-4"><ErrorNote message={error} /></div>}

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
        {loading ? (
          <Spinner label="Loading products…" />
        ) : list.data.length === 0 ? (
          <p className="py-16 text-center text-sm text-brown-muted">No products found.</p>
        ) : (
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-primary/10 text-xs uppercase tracking-wide text-brown-muted">
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Price</th>
                <th className="px-5 py-3 font-semibold">Weight</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.data.map((p) => (
                <tr key={p.id} className="border-b border-primary/5 last:border-0 hover:bg-primary/[0.02]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {p.image ? (
                        <img src={p.image} alt="" className="h-11 w-11 rounded-lg object-cover" />
                      ) : (
                        <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-xs text-primary">
                          NA
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-medium text-brown">{p.name}</p>
                        {p.is_best_seller && (
                          <span className="text-[11px] font-bold uppercase tracking-wide text-gold-dark">Bestseller</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-brown-muted">{p.category?.name || '—'}</td>
                  <td className="px-5 py-3 font-semibold text-brown">{fmtRs(p.price)}</td>
                  <td className="px-5 py-3 text-brown-muted">{p.weight || '—'}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        p.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {p.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-cream"
                      >
                        <Pencil size={13} /> Edit
                      </button>
                      <ConfirmButton
                        onConfirm={() => remove(p.id)}
                        title={`Delete "${p.name}"? This cannot be undone.`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Paginator page={list.page} lastPage={list.lastPage} onPage={load} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={form.id ? 'Edit Product' : 'Add Product'} wide>
        <form onSubmit={save} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <input type="text" required value={form.name} onChange={setField('name')} className={inputCls} />
            </Field>
            <Field label="Category">
              <select
                required
                value={form.category_id}
                onChange={setField('category_id')}
                className={inputCls}
              >
                <option value="">Select category…</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Price (₹)">
              <input type="number" required min="0" step="0.01" value={form.price} onChange={setField('price')} className={inputCls} />
            </Field>
            <Field label="Old Price (₹)" hint="Leave empty for none">
              <input type="number" min="0" step="0.01" value={form.old_price} onChange={setField('old_price')} className={inputCls} />
            </Field>
            <Field label="Weight">
              <input type="text" value={form.weight} onChange={setField('weight')} className={inputCls} placeholder="500 g" />
            </Field>
          </div>

          <Field label="Description">
            <textarea rows={2} value={form.description} onChange={setField('description')} className={inputCls} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Rating">
              <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={setField('rating')} className={inputCls} />
            </Field>
            <Field label="Review Count">
              <input type="number" min="0" value={form.reviews_count} onChange={setField('reviews_count')} className={inputCls} />
            </Field>
            <Field label="Tags" hint="Comma separated">
              <input type="text" value={form.tags} onChange={setField('tags')} className={inputCls} placeholder="Bestseller, Festive" />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Product Image" hint="JPG / PNG / WebP, up to 4 MB">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/25 bg-white px-4 py-3 text-sm font-medium text-primary transition hover:border-primary">
                <Upload size={16} /> {imageFile ? imageFile.name : 'Choose image'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </label>
            </Field>
            <div className="flex items-end gap-6 pb-2">
              <Toggle
                checked={form.is_best_seller}
                onChange={(v) => setForm((f) => ({ ...f, is_best_seller: v }))}
                label="Best seller"
              />
              <Toggle checked={form.is_active} onChange={(v) => setForm((f) => ({ ...f, is_active: v }))} label="Active" />
            </div>
          </div>

          {error && <ErrorNote message={error} />}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-full px-4 py-2 text-sm font-semibold text-brown-muted hover:text-primary">
              Cancel
            </button>
            <button type="submit" disabled={saving} className={btnPrimary}>
              {saving ? 'Saving…' : form.id ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
