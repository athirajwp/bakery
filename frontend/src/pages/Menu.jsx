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
      <section className="relative bg-primary pt-28 pb-12 text-center sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0000] via-primary to-[#4a0505]" aria-hidden="true" />
        <div className="container-x relative">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Our Full <span className="italic text-gold">Menu</span>
          </h1>
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

          <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
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
