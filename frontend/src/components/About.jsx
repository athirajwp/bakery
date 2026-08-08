import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Star, Truck } from 'lucide-react'
import { img, waLink, site } from '@/data/site'
import Img from './ui/Img'
import Reveal from './ui/Reveal'
import useCountUp from '@/hooks/useCountUp'

const FEATURES = [
  'Fresh ingredients',
  'Traditional taste',
  'Quality service',
  'Delivery available',
  'Birthday cakes',
  'Custom cakes',
]

const STATS = [
  { value: 15, suffix: '+', label: 'Years of Taste' },
  { value: 50, suffix: '+', label: 'Cake Designs' },
  { value: 10000, suffix: '+', label: 'Happy Customers' },
  { value: 100, suffix: '%', label: 'Fresh Daily' },
]

function Stat({ value, suffix, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const count = useCountUp(value, { start: inView })

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-3xl font-bold text-primary sm:text-4xl">
        {Math.round(count)}
        <span className="text-gold">{suffix}</span>
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-widest text-brown-muted">{label}</p>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-20 lg:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-lift">
              <Img
                src={img('1578985545062-69928b1d9587', 900)}
                alt="Layers of a rich chocolate cake baked fresh at Kavitha Sweets"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-8 -right-4 hidden w-44 overflow-hidden rounded-3xl border-4 border-cream shadow-lift sm:block lg:-right-8"
            >
              <Img
                src={img('1464349095431-e9a21285b5f3', 500)}
                alt="Fresh cupcakes with berries"
                className="aspect-square w-full object-cover"
              />
            </motion.div>
            <div className="absolute -left-3 top-8 rounded-2xl bg-gold-gradient px-5 py-4 shadow-gold lg:-left-6">
              <p className="font-heading text-2xl font-bold text-brown">15+</p>
              <p className="text-xs font-semibold text-brown/80">Years of Taste</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="chip">
              <Star size={12} className="fill-gold text-gold" /> About Us
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-brown sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              A Taste of Tradition, <span className="italic text-primary">A Touch of Premium</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-brown-muted sm:text-base">
              Kavitha Sweets &amp; Bakery brings the finest cakes, traditional Tamil sweets and bakery
              treats to Lakshmangudi, Koothanallur. Every recipe is crafted with fresh ingredients and
              time-honoured methods — from rich birthday cakes and elegant wedding cakes to classic
              mysore pak and jangiri that taste just like home.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm font-medium text-brown">
                  <CheckCircle2 size={18} className="shrink-0 text-primary" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="mt-9 flex flex-wrap gap-4">
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-gold">
              Order on WhatsApp
            </a>
            <a href={`tel:${site.phoneTel}`} className="btn-outline">
              <Truck size={16} /> Get Delivery
            </a>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1} className="container-x mt-20">
        <div className="grid grid-cols-2 gap-8 rounded-[2rem] border border-primary/10 bg-white px-6 py-10 shadow-card sm:grid-cols-4">
          {STATS.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
