const API_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.port === '8000'
    ? '/api'
    : 'http://localhost:8000/api')

export async function apiFetch(path, { method = 'GET', body, token, formData } = {}) {
  const headers = {}
  if (body && !formData) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: formData || (body ? JSON.stringify(body) : undefined),
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    // non-JSON response body
  }

  if (!res.ok) {
    const err = new Error(data?.message || `Request failed with status ${res.status}`)
    err.status = res.status
    err.data = data
    throw err
  }

  return data
}
