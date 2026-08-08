import { MessageCircle } from 'lucide-react'
import { orderLink } from '@/data/site'
import Img from './Img'
import StarRating from './StarRating'

export default function ProductCard({ product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative overflow-hidden">
        <Img
          src={product.image}
          alt={product.name}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brown shadow-gold">
            {product.tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">{product.category}</p>
          <span className="text-[11px] font-medium text-brown-muted">{product.weight}</span>
        </div>

        <h3 className="mt-1.5 font-heading text-xl font-bold text-brown">{product.name}</h3>

        <div className="mt-1.5 flex items-center gap-2 text-xs text-brown-muted">
          <StarRating rating={product.rating} size={14} />
          <span className="font-semibold text-brown">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-primary/10 pt-4">
          <p className="font-heading text-2xl font-bold text-primary">
            ₹{product.price}
            <span className="ml-1 align-middle text-[11px] font-medium text-brown-muted">/ {product.weight}</span>
          </p>
          <a
            href={orderLink(product)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-cream transition-all duration-300 hover:bg-gold-gradient hover:text-brown hover:shadow-gold"
            aria-label={`Order ${product.name} on WhatsApp`}
          >
            <MessageCircle size={14} /> Order
          </a>
        </div>
      </div>
    </article>
  )
}
