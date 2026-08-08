import { Link } from 'react-router-dom'
import { Cake, Phone, MapPin, Instagram, Facebook, MessageCircle, Mail, ArrowRight } from 'lucide-react'
import { site, waLink } from '@/data/site'

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Full Menu', to: '/menu' },
  { label: 'Contact', to: '/contact' },
]

const PRODUCT_LINKS = [
  'Birthday Cakes',
  'Wedding Cakes',
  'Traditional Sweets',
  'Bakery Snacks',
  'Cookies',
  'Gift Boxes',
]

export default function Footer() {
  return (
    <footer className="bg-[#2a0000] text-cream/80">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-gold">
              <Cake size={22} />
            </span>
            <span>
              <span className="block font-heading text-lg font-bold text-white">Kavitha Sweets</span>
              <span className="block text-[11px] text-gold">{site.tamilName}</span>
            </span>
          </Link>
          <p className="mt-5 text-sm leading-relaxed">
            A premium bakery &amp; sweets shop serving fresh cakes and traditional Tamil sweets with love
            since years. Baked fresh, delivered with care.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-gold-gradient hover:text-brown"
            >
              <Instagram size={18} />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-gold-gradient hover:text-brown"
            >
              <Facebook size={18} />
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-gold-gradient hover:text-brown"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <nav aria-label="Quick links">
          <h3 className="font-heading text-lg font-bold text-white">Quick Links</h3>
          <ul className="mt-5 space-y-3">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="inline-flex items-center gap-2 text-sm transition-colors hover:text-gold"
                >
                  <ArrowRight size={14} className="text-gold" /> {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-heading text-lg font-bold text-white">Our Products</h3>
          <ul className="mt-5 space-y-3">
            {PRODUCT_LINKS.map((p) => (
              <li key={p}>
                <Link to="/menu" className="inline-flex items-center gap-2 text-sm transition-colors hover:text-gold">
                  <ArrowRight size={14} className="text-gold" /> {p}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg font-bold text-white">Get in Touch</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
              <span>
                {site.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </span>
            </li>
            <li>
              <a href={`tel:${site.phoneTel}`} className="flex gap-3 transition-colors hover:text-gold">
                <Phone size={18} className="shrink-0 text-gold" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 transition-colors hover:text-gold">
                <Mail size={18} className="shrink-0 text-gold" /> {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.tamilName}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Made with <span className="text-primary">♥</span> in Kuthalam
          </p>
        </div>
      </div>
    </footer>
  )
}
