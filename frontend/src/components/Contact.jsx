import { useState } from 'react'
import { Phone, MessageCircle, MapPin, Clock, Navigation, Send, Mail } from 'lucide-react'
import { site, waLink } from '@/data/site'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `Hi Kavitha Sweets & Bakery!%0AName: ${form.name}%0APhone: ${form.phone}%0AMessage: ${form.message}`
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, '_blank', 'noopener')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact Us"
          title="Visit Us or Order Online"
          subtitle="We are just a call or a WhatsApp message away."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-5">
              <div className="rounded-3xl bg-cream p-6">
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-brown">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-gold">
                    <MapPin size={18} />
                  </span>
                  Our Address
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brown-muted">
                  {site.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>
              </div>

              <div className="rounded-3xl bg-cream p-6">
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-brown">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-gold">
                    <Clock size={18} />
                  </span>
                  Working Hours
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-brown-muted">
                  {site.hours.map((h) => (
                    <li key={h.days} className="flex items-center justify-between gap-3">
                      <span>{h.days}</span>
                      <span className="font-semibold text-brown">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-primary p-6 text-cream">
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-white">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-gradient text-brown">
                    <Phone size={18} />
                  </span>
                  Quick Contact
                </h3>
                <a href={`tel:${site.phoneTel}`} className="mt-3 block text-lg font-semibold text-gold">
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="mt-1 inline-flex items-center gap-2 text-sm text-cream/85 hover:text-gold">
                  <Mail size={15} /> {site.email}
                </a>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={`tel:${site.phoneTel}`} className="btn-gold !px-4 !py-2">
                    <Phone size={15} /> Call
                  </a>
                  <a href={waLink()} target="_blank" rel="noreferrer" className="btn-ghost-light !px-4 !py-2">
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                  <a
                    href={site.mapsDirections}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost-light !px-4 !py-2"
                  >
                    <Navigation size={15} /> Directions
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="grid h-full gap-5">
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-primary/10 bg-cream p-7"
                aria-label="Send enquiry via WhatsApp"
              >
                <h3 className="font-heading text-xl font-bold text-brown">Send Us an Enquiry</h3>
                <p className="mt-1 text-sm text-brown-muted">
                  Fill this quick form — it opens WhatsApp with your message ready to send.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brown-muted">Your Name</span>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Priya Ramesh"
                      className="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm text-brown placeholder:text-brown-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brown-muted">Phone Number</span>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 98765 43210"
                      className="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm text-brown placeholder:text-brown-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brown-muted">Your Message</span>
                    <textarea
                      required
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="e.g. I need a 1kg chocolate theme cake for my daughter's birthday this Saturday."
                      className="mt-1.5 w-full resize-none rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm text-brown placeholder:text-brown-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                </div>
                <button type="submit" className="btn-gold mt-5 w-full sm:w-auto">
                  <Send size={16} /> Send via WhatsApp
                </button>
                {sent && (
                  <p className="mt-3 text-sm font-medium text-primary" role="status">
                    WhatsApp opened — just press send! ✓
                  </p>
                )}
              </form>

              <div className="min-h-[280px] flex-1 overflow-hidden rounded-3xl border border-primary/10 shadow-card">
                <iframe
                  src={site.mapsEmbed}
                  title="Kavitha Sweets & Bakery location on Google Maps"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-full min-h-[280px] w-full border-0"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
