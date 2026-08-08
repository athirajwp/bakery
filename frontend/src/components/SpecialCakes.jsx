import { Sparkles, Palette } from 'lucide-react'
import { specialCakes } from '@/data/specialCakes'
import { waLink } from '@/data/site'
import Img from './ui/Img'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function SpecialCakes() {
  return (
    <section id="cakes" className="relative bg-white py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Special Cakes"
          title="Made Just for Your Special Moments"
          subtitle="Tell us your theme, occasion or photo — our cake artists will craft something unforgettable."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialCakes.map((cake, i) => (
            <Reveal key={cake.id} delay={(i % 3) * 0.08}>
              <a
                href={waLink(
                  `Hi Kavitha Sweets & Bakery! I would like to order a "${cake.title}" cake. Please share details.`
                )}
                target="_blank"
                rel="noreferrer"
                className="group relative block overflow-hidden rounded-3xl shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <Img
                  src={cake.image}
                  alt={`${cake.title} from Kavitha Sweets & Bakery`}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" aria-hidden="true" />
                <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold backdrop-blur-sm">
                  {cake.tag}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-heading text-2xl font-bold text-white">{cake.title}</h3>
                  <p className="mt-1.5 text-sm text-white/80">{cake.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold transition-transform duration-300 group-hover:translate-x-1">
                    <Sparkles size={14} /> Order This Cake
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 text-center">
          <a href={waLink()} target="_blank" rel="noreferrer" className="btn-gold !px-8 !py-4">
            <Palette size={18} /> Design Your Custom Cake
          </a>
        </Reveal>
      </div>
    </section>
  )
}
