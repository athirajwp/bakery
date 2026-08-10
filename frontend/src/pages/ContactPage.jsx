import Contact from '@/components/Contact'
import { site } from '@/data/site'

export default function ContactPage() {
  return (
    <>
      <section className="relative bg-primary pt-28 pb-12 text-center sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0000] via-primary to-[#4a0505]" aria-hidden="true" />
        <div className="container-x relative">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Contact <span className="italic text-gold">Us</span>
          </h1>
        </div>
      </section>

      <Contact />
    </>
  )
}
