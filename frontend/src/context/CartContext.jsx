import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CART_KEY = 'ksb_cart'

function readCart() {
  try {
    const items = JSON.parse(localStorage.getItem(CART_KEY)) || []
    return Array.isArray(items) ? items : []
  } catch {
    return []
  }
}

const CartContext = createContext(null)

export default function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          weight: product.weight,
          image: product.image,
          qty,
        },
      ]
    })
    setIsOpen(true)
  }

  const setQty = (id, qty) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id))
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clear = () => setItems([])
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const { count, subtotal } = useMemo(
    () =>
      items.reduce(
        (acc, i) => {
          acc.count += i.qty
          acc.subtotal += i.price * i.qty
          return acc
        },
        { count: 0, subtotal: 0 }
      ),
    [items]
  )

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, isOpen, addToCart, setQty, removeItem, clear, openCart, closeCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
