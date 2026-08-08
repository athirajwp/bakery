import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { galleryItems, galleryFilters } from '@/data/gallery'
import Img from './ui/Img'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const items = filter === 'All' ? galleryItems : galleryItems.filter((g) => g.category === filter)

  return (
    <section id="gallery" className="bg-white py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Gallery"
          title="A Peek Inside Our Kitchen"
          subtitle="Cakes, sweets, fresh bakes and the warm heart of our shop."
        />

        <Reveal className="mt-8 flex flex-wrap justify-center gap-2.5">
          {galleryFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300 ${
                filter === f
                  ? 'bg-primary text-cream shadow-lift'
                  : 'bg-cream text-brown hover:bg-primary/10'
              }`}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="masonry mt-10">
          <AnimatePresence mode="popLayout">
            {items.map((g) => (
              <motion.figure
                key={g.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35 }}
                className="masonry-item group relative overflow-hidden rounded-3xl"
              >
                <Img
                  src={g.image}
                  alt={`${g.title} at Kavitha Sweets & Bakery`}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    g.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'
                  }`}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <figcaption className="p-5">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gold">{g.category}</span>
                    <p className="font-heading text-lg font-bold text-white">{g.title}</p>
                  </figcaption>
                </div>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
