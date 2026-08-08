import { useState, useMemo } from 'react'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { waLink } from '@/data/site'
import ProductCard from '@/components/ui/ProductCard'
import Reveal from '@/components/ui/Reveal'
import { MessageCircle } from 'lucide-react'

const filters = ['All', ...categories.map((c) => c.name)]

export default function Menu() {
  const [filter, setFilter] = useState('All')

  const list = useMemo(
    () => (filter === 'All' ? products : products.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <>
      <section className="relative bg-primary py-28 text-center lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0000] via-primary to-[#4a0505]" aria-hidden="true" />
        <div className="container-x relative">
          <span className="chip bg-white/10 text-gold">Our Full Menu</span>
          <h1 className="mx-auto mt-4 max-w-3xl font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Fresh Cakes, Sweets &amp; <span className="italic text-gold">Snacks</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-cream/80 sm:text-base">
            Every item baked and crafted fresh daily. Prices shown are indicative — call for bulk and
            custom orders.
          </p>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-2.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300 ${
                  filter === f
                    ? 'bg-primary text-cream shadow-lift'
                    : 'bg-white text-brown shadow-card hover:bg-primary/10'
                }`}
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.05}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 text-center">
            <p className="text-sm text-brown-muted">
              Looking for something special or a bulk order?
            </p>
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-gold mt-4 !px-8 !py-4">
              <MessageCircle size={18} /> Chat With Us
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
