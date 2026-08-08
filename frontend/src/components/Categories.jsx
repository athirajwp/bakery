import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '@/data/categories'
import Img from './ui/Img'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Categories() {
  return (
    <section id="categories" className="relative bg-white py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Featured Categories"
          title="Cakes, Sweets & Snacks for Every Occasion"
          subtitle="From grand celebration cakes to everyday tea-time snacks — all baked and crafted fresh in our kitchen."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.06}>
              <Link
                to="/menu"
                className="group relative block overflow-hidden rounded-3xl shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                aria-label={`Browse ${cat.name}`}
              >
                <Img
                  src={cat.image}
                  alt={cat.name}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                    {cat.count} Items
                  </p>
                  <h3 className="mt-1 font-heading text-lg font-bold text-white sm:text-xl">{cat.name}</h3>
                  <p className="mt-0.5 hidden text-xs text-white/75 sm:block">{cat.desc}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Explore <ArrowUpRight size={14} />
                  </span>
                </div>
                <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-gold-gradient text-brown opacity-0 shadow-gold transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
