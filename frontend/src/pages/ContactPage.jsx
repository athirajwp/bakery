import Contact from '@/components/Contact'
import { site } from '@/data/site'

export default function ContactPage() {
  return (
    <>
      <section className="relative bg-primary py-28 text-center lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0000] via-primary to-[#4a0505]" aria-hidden="true" />
        <div className="container-x relative">
          <span className="chip bg-white/10 text-gold">Get in Touch</span>
          <h1 className="mx-auto mt-4 max-w-3xl font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            We Are <span className="italic text-gold">Here for You</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-cream/80 sm:text-base">
            Call us, message us on WhatsApp, or drop by the shop — {site.phone}
          </p>
        </div>
      </section>

      <Contact />
    </>
  )
}
