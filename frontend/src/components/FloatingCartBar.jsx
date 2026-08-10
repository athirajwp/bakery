import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function FloatingCartBar({ onCheckout }) {
  const { count, subtotal, openCart } = useCart()
  const [pulse, setPulse] = useState(false)
  const [addedToast, setAddedToast] = useState(false)
  const prevCount = useRef(count)

  useEffect(() => {
    if (count > prevCount.current) {
      setPulse(true)
      setAddedToast(true)

      const timer1 = setTimeout(() => setPulse(false), 600)
      const timer2 = setTimeout(() => setAddedToast(false), 2200)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
    prevCount.current = count
  }, [count])

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          key="floating-cart-bar"
          initial={{ y: 120, opacity: 0, scale: 0.85 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: pulse ? [1, 1.05, 0.97, 1] : 1,
          }}
          exit={{ y: 120, opacity: 0, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          className="fixed bottom-4 left-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2"
        >
          {/* Item Added Banner Toast */}
          <AnimatePresence>
            {addedToast && (
              <motion.div
                initial={{ y: 10, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -10, opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="mx-auto mb-2 flex w-max items-center gap-1.5 rounded-full bg-gold-gradient px-4 py-1 text-xs font-bold text-brown shadow-gold"
              >
                <CheckCircle2 size={14} className="text-brown shrink-0" />
                <span>Item Added to Cart!</span>
                <Sparkles size={14} className="text-brown shrink-0" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Floating Cart Card */}
          <motion.div
            onClick={openCart}
            animate={{
              boxShadow: pulse
                ? '0 0 30px rgba(234,179,8,0.7), 0 12px 36px rgba(139,0,0,0.5)'
                : '0 12px 36px rgba(139,0,0,0.45)',
            }}
            transition={{ duration: 0.3 }}
            className="flex cursor-pointer items-center justify-between gap-3 rounded-full bg-primary/95 px-4 py-3 text-cream backdrop-blur-md border border-gold/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Left Info with Bouncing Badge */}
            <div className="flex items-center gap-3 min-w-0">
              <motion.div
                animate={pulse ? { scale: [1, 1.35, 0.9, 1.1, 1], rotate: [0, -12, 12, -6, 0] } : {}}
                transition={{ duration: 0.5 }}
                className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-gradient text-brown shadow-gold"
              >
                <ShoppingBag size={21} />
                <motion.span
                  key={count}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-cream text-[10px] font-extrabold text-primary shadow-md border border-primary/20"
                >
                  {count}
                </motion.span>
              </motion.div>

              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gold truncate flex items-center gap-1">
                  {count} {count === 1 ? 'Item' : 'Items'} in Cart
                </p>
                <motion.p
                  key={subtotal}
                  initial={{ opacity: 0.5, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-heading text-lg font-bold text-white"
                >
                  ₹{subtotal}
                </motion.p>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  openCart()
                }}
                className="btn-gold !px-4 !py-2 text-xs flex items-center gap-1 shadow-gold"
              >
                View Cart <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
