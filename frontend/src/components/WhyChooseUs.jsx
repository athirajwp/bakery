import {
  Sun,
  Wheat,
  ChefHat,
  Truck,
  Wallet,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { img } from '@/data/site'
import Img from './ui/Img'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const REASONS = [
  { icon: Sun, title: 'Fresh Every Day', desc: 'Everything is baked and prepared fresh every single morning.' },
  { icon: Wheat, title: 'Premium Ingredients', desc: 'Pure ghee, farm-fresh milk and the finest cocoa and flours.' },
  { icon: ChefHat, title: 'Experienced Bakers', desc: 'Master bakers and sweet makers with decades of expertise.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Quick and careful delivery across Kuthalam and nearby areas.' },
  { icon: Wallet, title: 'Affordable Price', desc: 'Premium taste at honest, family-friendly prices.' },
  { icon: ShieldCheck, title: 'Hygienic Kitchen', desc: 'Spotless, certified-hygienic kitchen and safe packaging.' },
  { icon: Sparkles, title: 'Custom Orders', desc: 'Theme cakes, photo cakes and bulk sweet orders on request.' },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-primary py-20 lg:py-28">
      <Img
        src={img('1527515637462-cff94eecc1ac', 1600)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-dark/95 to-[#4a0505]" aria-hidden="true" />

      <div className="container-x relative">
        <SectionHeading
          light
          eyebrow="Why Choose Us"
          title="Trusted by Families Across the Region"
          subtitle="Premium quality, traditional recipes and service that keeps our customers coming back for more."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={(i % 4) * 0.07}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-gradient text-brown shadow-gold transition-transform duration-300 group-hover:scale-110">
                  <r.icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold text-white">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/75">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
