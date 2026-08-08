import About from '@/components/About'
import WhyChooseUs from '@/components/WhyChooseUs'
import OrderProcess from '@/components/OrderProcess'
import Contact from '@/components/Contact'
import { img, waLink } from '@/data/site'
import Img from '@/components/ui/Img'
import Reveal from '@/components/ui/Reveal'
import { MessageCircle, Cake, Award, Leaf } from 'lucide-react'

const VALUES = [
  { icon: Leaf, title: 'Fresh & Natural', desc: 'No preservatives — everything made fresh the same day.' },
  { icon: Cake, title: 'Family Recipes', desc: 'Time-honoured recipes passed down through generations.' },
  { icon: Award, title: 'Celebrated Quality', desc: 'Rated 4.1★ by 394 happy customers on Google.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-primary py-28 text-center lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0000] via-primary to-[#4a0505]" aria-hidden="true" />
        <div className="container-x relative">
          <span className="chip bg-white/10 text-gold">About Us</span>
          <h1 className="mx-auto mt-4 max-w-3xl font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Our Story of <span className="italic text-gold">Sweetness</span>
          </h1>
        </div>
      </section>

      <About />

      <section className="bg-white py-20 lg:py-24">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-primary/10 bg-cream p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-gold">
                    <v.icon size={26} />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-bold text-brown">{v.title}</h3>
                  <p className="mt-2 text-sm text-brown-muted">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 lg:py-28">
        <Img
          src={img('1556910103-1c02745aae4d', 1600)}
          alt="Inside our bakery kitchen"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/85" aria-hidden="true" />
        <div className="container-x relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold text-white sm:text-4xl">
              Come Taste the Difference <span className="italic text-gold">Fresh Makes</span>
            </h2>
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-gold mt-8 !px-8 !py-4">
              <MessageCircle size={18} /> Order Now
            </a>
          </Reveal>
        </div>
      </section>

      <WhyChooseUs />
      <OrderProcess />
      <Contact />
    </>
  )
}
