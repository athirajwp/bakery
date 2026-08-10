import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingCart, X, Minus, Plus, Star, CheckCircle2, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Img from './ui/Img'
import StarRating from './ui/StarRating'

export default function ProductModal({ product, onClose, onCheckoutNow }) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (!product) return
    setQty(1)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [product])

  if (!product) return null

  const handleAddToCart = () => {
    addToCart(product, qty)
    onClose()
  }

  const handleOrderNow = () => {
    addToCart(product, qty)
    onClose()
    if (onCheckoutNow) {
      onCheckoutNow()
    }
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Overlay Backdrop */}
          <motion.div
            key="product-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-brown/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            key="product-modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
          >
            <div className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-cream shadow-2xl border border-primary/10 text-brown">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-brown shadow-md backdrop-blur-md transition hover:bg-primary hover:text-cream"
                aria-label="Close details"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-64 md:h-full bg-white/50 overflow-hidden">
                  <Img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                  {product.tag && (
                    <span className="absolute left-3 top-3 rounded-full bg-gold-gradient px-3 py-1 text-xs font-bold uppercase tracking-wider text-brown shadow-gold">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-col p-5 sm:p-6">
                  {/* Category & Weight */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-bold uppercase tracking-widest text-primary">{product.category}</span>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary">
                      {product.weight}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-brown">{product.name}</h2>

                  {/* Star Rating */}
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <StarRating rating={product.rating} size={15} />
                    <span className="font-bold text-brown">{product.rating}</span>
                    <span className="text-brown-muted">({product.reviews} reviews)</span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-brown-muted leading-relaxed">
                    {product.description ||
                      `Deliciously prepared ${product.name} crafted fresh using traditional recipes and premium quality ingredients.`}
                  </p>

                  {/* Feature Highlights */}
                  <div className="mt-4 grid grid-cols-2 gap-2 border-y border-primary/10 py-3 text-[11px] text-brown-muted">
                    <div className="flex items-center gap-1.5">
                      <Sparkles size={14} className="text-primary shrink-0" />
                      <span>Baked Fresh Daily</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-primary shrink-0" />
                      <span>100% Hygienic</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-primary shrink-0" />
                      <span>Pure Ingredients</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Truck size={14} className="text-primary shrink-0" />
                      <span>Kuthalam Express</span>
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-brown-muted block">Price</span>
                      <p className="font-heading text-2xl font-bold text-primary">
                        ₹{product.price * qty}
                        {qty > 1 && <span className="text-xs font-normal text-brown-muted ml-1">(₹{product.price} × {qty})</span>}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full border border-primary/15 bg-white p-1.5 shadow-sm">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="grid h-7 w-7 place-items-center rounded-full bg-cream text-primary transition hover:bg-primary hover:text-cream"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-7 text-center font-bold text-sm text-brown">{qty}</span>
                      <button
                        onClick={() => setQty((q) => q + 1)}
                        className="grid h-7 w-7 place-items-center rounded-full bg-cream text-primary transition hover:bg-primary hover:text-cream"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    <button
                      onClick={handleAddToCart}
                      className="flex items-center justify-center gap-1.5 rounded-full border border-primary/20 bg-white py-3 text-xs font-semibold text-primary transition hover:bg-primary/5"
                    >
                      <ShoppingCart size={15} /> Add to Cart
                    </button>
                    <button
                      onClick={handleOrderNow}
                      className="btn-gold flex items-center justify-center gap-1.5 !py-3 text-xs"
                    >
                      Order Now <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
