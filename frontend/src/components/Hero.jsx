import { motion } from 'framer-motion'
import { MessageCircle, Phone, Star, ChevronDown, Truck, Sparkles, CakeSlice } from 'lucide-react'
import { site, waLink, img } from '@/data/site'
import Img from './ui/Img'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const MARQUEE = [
  'Birthday Cakes',
  'Wedding Cakes',
  'Custom Cakes',
  'Traditional Sweets',
  'Fresh Bakery',
  'Snacks',
  'Cookies',
  'Gift Boxes',
]

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh flex-col overflow-hidden bg-primary-dark">
      <div className="absolute inset-0">
        <Img
          src={img('1486427944299-d1955d23e34d', 1920)}
          alt="Fresh celebration cake with sparklers at Kavitha Sweets & Bakery"
          className="h-full w-full object-cover"
          eager
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2a0000]/95 via-[#4a0505]/80 to-[#2a0000]/40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a0000]/90 via-transparent to-[#2a0000]/50" aria-hidden="true" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-x relative z-10 flex flex-1 flex-col justify-center pb-24 pt-36 text-center lg:pt-40"
      >
        <motion.div variants={item} className="mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/25 px-4 py-1.5 text-xs font-medium text-gold backdrop-blur-sm sm:text-sm">
            <Star size={14} className="fill-gold text-gold" />
            {site.rating} Rated · {site.reviewCount} Google Reviews
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mx-auto mt-6 max-w-4xl font-heading text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
        >
          Fresh Cakes &amp;
          <span className="mt-1 block italic text-gold drop-shadow-[0_2px_12px_rgba(255,215,0,0.35)]">
            Traditional Sweets
          </span>
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-cream/85 sm:text-lg">
          {site.tagline} — handcrafted every morning with premium ingredients, old-world recipes and a
          whole lot of love. <span className="text-gold">கவிதா இனிப்புகள் மற்றும் அடுமனை</span>
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href={waLink()} target="_blank" rel="noreferrer" className="btn-gold !px-8 !py-4 !text-base">
            <MessageCircle size={18} /> Order Now
          </a>
          <a href={`tel:${site.phoneTel}`} className="btn-ghost-light !px-8 !py-4 !text-base">
            <Phone size={18} /> Call Now
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-cream/80 sm:text-sm"
        >
          <span className="inline-flex items-center gap-2">
            <Truck size={16} className="text-gold" /> Delivery Available
          </span>
          <span className="inline-flex items-center gap-2">
            <Sparkles size={16} className="text-gold" /> Custom Cakes
          </span>
          <span className="inline-flex items-center gap-2">
            <CakeSlice size={16} className="text-gold" /> Fresh Every Day
          </span>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 rounded-full border border-white/30 p-2 text-white/80 transition-colors hover:text-gold sm:block"
      >
        <ChevronDown size={20} className="animate-bounce" />
      </motion.a>

      <div className="relative z-10 border-t border-white/15 bg-black/30 py-3.5 backdrop-blur-sm">
        <div className="overflow-hidden" aria-hidden="true">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-10 text-xs font-semibold uppercase tracking-[0.25em] text-gold/90">
                {m} <span className="text-white/40">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
