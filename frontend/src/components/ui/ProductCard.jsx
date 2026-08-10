import { useState } from 'react'
import { ShoppingCart, Eye } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Img from './Img'
import StarRating from './StarRating'
import ProductModal from '../ProductModal'

export default function ProductCard({ product, onCheckoutNow }) {
  const { addToCart } = useCart()
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <article
        onClick={() => setShowModal(true)}
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
      >
        <div className="relative overflow-hidden">
          <Img
            src={product.image}
            alt={product.name}
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.tag && (
            <span className="absolute left-2 top-2 sm:left-3 sm:top-3 rounded-full bg-gold-gradient px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[11px] font-bold uppercase tracking-wide text-brown shadow-gold">
              {product.tag}
            </span>
          )}
          <div className="absolute inset-0 bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-primary shadow-lg backdrop-blur-md">
              <Eye size={14} /> Quick View
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-3 sm:p-5">
          <div className="flex items-center justify-between gap-1">
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-primary truncate">{product.category}</p>
            <span className="text-[10px] sm:text-[11px] font-medium text-brown-muted shrink-0">{product.weight}</span>
          </div>

          <h3 className="mt-1 font-heading text-sm sm:text-xl font-bold text-brown line-clamp-1">{product.name}</h3>

          <div className="mt-1 flex items-center gap-1.5 text-[11px] sm:text-xs text-brown-muted">
            <StarRating rating={product.rating} size={12} />
            <span className="font-semibold text-brown text-[11px] sm:text-xs">{product.rating}</span>
            <span className="hidden sm:inline">({product.reviews})</span>
          </div>

          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-primary/10 pt-2.5 sm:pt-4">
            <p className="font-heading text-base sm:text-2xl font-bold text-primary">
              ₹{product.price}
              <span className="ml-0.5 align-middle text-[9px] sm:text-[11px] font-medium text-brown-muted">/ {product.weight}</span>
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                addToCart(product)
              }}
              className="inline-flex items-center justify-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-cream transition-all duration-300 hover:bg-gold-gradient hover:text-brown hover:shadow-gold w-full sm:w-auto"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart size={13} /> Add
            </button>
          </div>
        </div>
      </article>

      <ProductModal
        product={showModal ? product : null}
        onClose={() => setShowModal(false)}
        onCheckoutNow={onCheckoutNow}
      />
    </>
  )
}
