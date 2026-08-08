import { MousePointerClick, MessageCircle, ClipboardCheck, Bike } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const STEPS = [
  {
    icon: MousePointerClick,
    step: '01',
    title: 'Choose Product',
    desc: 'Pick your favourite cake, sweet or snack from our menu.',
  },
  {
    icon: MessageCircle,
    step: '02',
    title: 'Call / WhatsApp',
    desc: 'Message or call us — we confirm your order instantly.',
  },
  {
    icon: ClipboardCheck,
    step: '03',
    title: 'Confirm Order',
    desc: 'We lock in the details, customisation and pickup time.',
  },
  {
    icon: Bike,
    step: '04',
    title: 'Pickup / Delivery',
    desc: 'Collect in store or get it delivered fresh to your door.',
  },
]

export default function OrderProcess() {
  return (
    <section id="order" className="bg-cream py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="How to Order"
          title="Order in Four Simple Steps"
          subtitle="Ordering your favourite sweets has never been easier — no apps, no queues."
        />

        <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            className="absolute left-0 right-0 top-10 hidden border-t-2 border-dashed border-primary/20 lg:block"
            aria-hidden="true"
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.12} className="relative">
              <div className="group relative flex h-full flex-col items-center rounded-3xl bg-white p-7 text-center shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <span className="relative z-10 grid h-20 w-20 place-items-center rounded-full bg-primary text-gold shadow-lift transition-transform duration-300 group-hover:scale-110">
                  <s.icon size={30} aria-hidden="true" />
                  <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-gold-gradient font-heading text-xs font-bold text-brown shadow-gold">
                    {s.step}
                  </span>
                </span>
                <h3 className="mt-6 font-heading text-lg font-bold text-brown">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-muted">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
