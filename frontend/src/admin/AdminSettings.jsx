import { useCallback, useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { apiFetch } from '@/lib/api'
import { btnPrimary, ErrorNote, Field, inputCls, PageHeader, Spinner } from './ui'

const GENERAL_FIELDS = [
  { key: 'site_name', label: 'Site Name' },
  { key: 'site_tamil_name', label: 'Tamil Name' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'phone', label: 'Phone' },
  { key: 'whatsapp', label: 'WhatsApp Number' },
  { key: 'email', label: 'Email' },
  { key: 'address', label: 'Address', textarea: true },
  { key: 'working_hours', label: 'Working Hours' },
  { key: 'rating', label: 'Google Rating' },
  { key: 'review_count', label: 'Review Count' },
  { key: 'map_embed', label: 'Map Embed URL', textarea: true },
  { key: 'social_instagram', label: 'Instagram URL' },
  { key: 'social_facebook', label: 'Facebook URL' },
]

const SEO_FIELDS = [
  { key: 'meta_title', label: 'Meta Title' },
  { key: 'meta_description', label: 'Meta Description', textarea: true },
  { key: 'meta_keywords', label: 'Meta Keywords', textarea: true },
  { key: 'og_image', label: 'OG Image URL' },
]

export default function AdminSettings() {
  const { token } = useAdminAuth()
  const [general, setGeneral] = useState({})
  const [seo, setSeo] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(null)
  const [saved, setSaved] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const d = await apiFetch('/admin/settings', { token })
      setGeneral(d.settings?.general || {})
      setSeo(d.settings?.seo || {})
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    load()
  }, [load])

  const save = async (group, values) => {
    setSaving(group)
    setSaved('')
    setError('')
    try {
      const payload = {}
      for (const field of group === 'general' ? GENERAL_FIELDS : SEO_FIELDS) {
        payload[field.key] = values[field.key] ?? ''
      }
      await apiFetch('/admin/settings', { method: 'POST', token, body: { settings: payload, group } })
      setSaved(`${group === 'general' ? 'General' : 'SEO'} settings saved.`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(null)
    }
  }

  const renderFields = (fields, values, setValues) =>
    fields.map((f) => (
      <Field key={f.key} label={f.label}>
        {f.textarea ? (
          <textarea
            rows={2}
            value={values[f.key] ?? ''}
            onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
            className={inputCls}
          />
        ) : (
          <input
            type="text"
            value={values[f.key] ?? ''}
            onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
            className={inputCls}
          />
        )}
      </Field>
    ))

  if (loading) return <Spinner label="Loading settings…" />

  return (
    <div>
      <PageHeader title="Settings & SEO" subtitle="Manage site-wide settings." />

      {error && <div className="mt-4"><ErrorNote message={error} /></div>}
      {saved && (
        <p className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          ✓ {saved}
        </p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-brown">General</h2>
          <p className="text-sm text-brown-muted">Business details shown across the website.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">{renderFields(GENERAL_FIELDS, general, setGeneral)}</div>
          <div className="mt-5 flex justify-end">
            <button onClick={() => save('general', general)} disabled={saving === 'general'} className={btnPrimary}>
              <Save size={16} /> {saving === 'general' ? 'Saving…' : 'Save General'}
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-brown">SEO</h2>
          <p className="text-sm text-brown-muted">Search engine and social sharing metadata.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">{renderFields(SEO_FIELDS, seo, setSeo)}</div>
          <div className="mt-5 flex justify-end">
            <button onClick={() => save('seo', seo)} disabled={saving === 'seo'} className={btnPrimary}>
              <Save size={16} /> {saving === 'seo' ? 'Saving…' : 'Save SEO'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
