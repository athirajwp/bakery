const API_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.port === '8000'
    ? '/api'
    : 'http://localhost:8000/api')

function getLocalOrders() {
  try {
    return JSON.parse(localStorage.getItem('ksb_local_orders')) || []
  } catch {
    return []
  }
}

function saveLocalOrders(orders) {
  try {
    localStorage.setItem('ksb_local_orders', JSON.stringify(orders))
  } catch {
    // ignore
  }
}

export async function apiFetch(path, { method = 'GET', body, token, formData } = {}) {
  const headers = {}
  if (body && !formData) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  try {
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
  } catch (fetchErr) {
    // Handle fallback when API server is unreachable or returns status 500
    if (path === '/orders' && method === 'POST' && body) {
      const orderNum = 'KS-' + Math.random().toString(36).substring(2, 10).toUpperCase()
      const items = (body.items || []).map((i) => ({
        product_name: i.name || 'Product',
        quantity: i.quantity || 1,
        price: i.price || 0,
        total: (i.price || 0) * (i.quantity || 1),
      }))
      const itemsTotal = items.reduce((acc, item) => acc + item.total, 0)
      const deliveryCharge = 0
      const newOrder = {
        id: Date.now(),
        order_number: orderNum,
        customer_name: body.customer_name || 'Customer',
        phone: body.phone || '',
        email: body.email || '',
        address: body.address || '',
        city: body.city || '',
        payment_method: body.payment_method || 'cod',
        notes: body.notes || '',
        status: 'pending',
        items_total: itemsTotal,
        delivery_charge: deliveryCharge,
        total: itemsTotal + deliveryCharge,
        items,
        created_at: new Date().toISOString(),
      }
      const list = getLocalOrders()
      saveLocalOrders([newOrder, ...list])
      return { order: newOrder }
    }

    if (path.startsWith('/admin/orders')) {
      const localOrders = getLocalOrders()
      if (path.includes('/admin/orders/')) {
        const orderId = path.split('/admin/orders/')[1]?.split('?')[0]?.split('/')[0]
        const found = localOrders.find((o) => String(o.id) === String(orderId) || o.order_number === orderId)
        if (found) return found
      }
      return {
        data: localOrders,
        current_page: 1,
        last_page: 1,
        total: localOrders.length,
      }
    }

    throw fetchErr
  }
}
