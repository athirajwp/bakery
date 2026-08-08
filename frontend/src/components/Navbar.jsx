import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Cake, Menu, X, Phone, MessageCircle } from 'lucide-react'
import { site, waLink } from '@/data/site'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Menu', to: '/menu' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

function isHashTarget(to) {
  return to.startsWith('/#')
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  const solid = scrolled || open || location.pathname !== '/'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-cream/95 shadow-card backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex items-center justify-between py-3.5" aria-label="Main navigation">
        <Link to="/" className="group flex items-center gap-3" aria-label="Kavitha Sweets & Bakery home">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-gold shadow-lift transition-transform duration-300 group-hover:scale-105">
            <Cake size={22} strokeWidth={1.8} />
          </span>
          <span className="leading-tight">
            <span
              className={`block font-heading text-lg font-bold tracking-tight sm:text-xl ${
                solid ? 'text-brown' : 'text-white'
              }`}
            >
              Kavitha Sweets
            </span>
            <span className={`block text-[11px] tracking-wide ${solid ? 'text-brown-muted' : 'text-cream/85'}`}>
              {site.tamilName}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            isHashTarget(item.to) ? (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    solid
                      ? activeSection === item.to.slice(2)
                        ? 'text-primary'
                        : 'text-brown hover:text-primary'
                      : activeSection === item.to.slice(2)
                        ? 'text-gold'
                        : 'text-white/90 hover:text-gold'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      solid
                        ? isActive
                          ? 'text-primary'
                          : 'text-brown hover:text-primary'
                        : isActive
                          ? 'text-gold'
                          : 'text-white/90 hover:text-gold'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
          )}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${site.phoneTel}`} className="btn-outline !px-4 !py-2" aria-label="Call the shop">
            <Phone size={16} />
            <span className="hidden xl:inline">Call Now</span>
          </a>
          <a href={waLink()} target="_blank" rel="noreferrer" className="btn-gold !px-4 !py-2">
            <MessageCircle size={16} />
            Order Now
          </a>
        </div>

        <button
          className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${
            solid ? 'bg-primary text-cream' : 'bg-white/15 text-white backdrop-blur-sm'
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-primary/10 bg-cream/98 backdrop-blur-md lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-brown transition-colors hover:bg-primary/5 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <li className="mt-2 flex gap-3 px-4 pb-2">
                <a href={`tel:${site.phoneTel}`} className="btn-outline flex-1">
                  <Phone size={16} /> Call Now
                </a>
                <a href={waLink()} target="_blank" rel="noreferrer" className="btn-gold flex-1">
                  <MessageCircle size={16} /> Order Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
