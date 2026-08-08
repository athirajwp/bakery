const ADDRESS = '9 Park Road, Kuthalam, Mayiladuthurai, Tamil Nadu'

export const site = {
  name: 'Kavitha Sweets & Bakery',
  tamilName: 'கவிதா இனிப்புகள் மற்றும் அடுமனை',
  tagline: 'Serving Happiness Since Years',
  type: 'Bakery · Cake Shop · Sweets & Snacks',
  phone: '+91 89037 49300',
  phoneTel: '+918903749300',
  whatsapp: '918903749300',
  email: 'kavithasweetsbakery@gmail.com',
  rating: 4.1,
  reviewCount: 394,
  address: ADDRESS,
  addressLines: ['9 Park Road', 'Kuthalam, Mayiladuthurai', 'Tamil Nadu'],
  hours: [
    { days: 'Monday – Sunday', time: '9:00 AM – 10:00 PM' },
    { days: 'Special Festive Hours', time: 'Open till late' },
  ],
  mapsEmbed:
    'https://www.google.com/maps?q=' +
    encodeURIComponent(ADDRESS) +
    '&z=15&output=embed',
  mapsDirections:
    'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(ADDRESS),
  social: {
    instagram: 'https://www.instagram.com',
    facebook: 'https://www.facebook.com',
  },
}

export const WA_ORDER_MESSAGE = 'Hi Kavitha Sweets & Bakery! I would like to place an order.'

export function waLink(message = WA_ORDER_MESSAGE) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export function orderLink(product) {
  return waLink(
    `Hi Kavitha Sweets & Bakery! I would like to order the "${product.name}" (₹${product.price}). Please confirm the availability.`
  )
}

export function img(id, w = 800) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`
}
