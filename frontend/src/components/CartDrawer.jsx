import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Img from './ui/Img'

export default function CartDrawer({ onCheckout }) {
  const { items, count, subtotal, isOpen, closeCart, setQty, removeItem } = useCart()

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-brown/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.aside
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-primary/10 px-6 py-4">
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-brown">
                <ShoppingBag size={20} className="text-primary" />
                Your Cart
                {count > 0 && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {count}
                  </span>
                )}
              </h2>
              <button
                onClick={closeCart}
                className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-cream"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
                  <ShoppingBag size={36} />
                </span>
                <h3 className="font-heading text-xl font-bold text-brown">Your cart is empty</h3>
                <p className="max-w-xs text-sm text-brown-muted">
                  Add some freshly baked goodies and they will show up here.
                </p>
                <Link
                  to="/menu"
                  onClick={closeCart}
                  className="btn-gold mt-2 !px-6 !py-3"
                >
                  Browse Menu <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 rounded-2xl bg-white p-3 shadow-card"
                    >
                      <Img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover"
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="truncate font-heading text-sm font-bold text-brown">{item.name}</h3>
                            <p className="text-xs text-brown-muted">{item.weight}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-brown-muted transition-colors hover:text-primary"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                          <div className="flex items-center gap-1 rounded-full border border-primary/15 bg-cream p-1">
                            <button
                              onClick={() => setQty(item.id, item.qty - 1)}
                              className="grid h-6 w-6 place-items-center rounded-full bg-white text-primary shadow-sm transition-colors hover:bg-primary hover:text-cream"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-sm font-bold text-brown">{item.qty}</span>
                            <button
                              onClick={() => setQty(item.id, item.qty + 1)}
                              className="grid h-6 w-6 place-items-center rounded-full bg-white text-primary shadow-sm transition-colors hover:bg-primary hover:text-cream"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="font-heading text-lg font-bold text-primary">
                            ₹{item.price * item.qty}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="space-y-4 border-t border-primary/10 bg-white px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-brown-muted">Subtotal</span>
                    <span className="font-heading text-2xl font-bold text-primary">₹{subtotal}</span>
                  </div>
                  <p className="text-xs text-brown-muted">
                    Delivery charges and payment are confirmed at checkout.
                  </p>
                  <button
                    onClick={() => {
                      closeCart()
                      onCheckout()
                    }}
                    className="btn-gold w-full !py-4"
                  >
                    Proceed to Checkout <ArrowRight size={18} />
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
