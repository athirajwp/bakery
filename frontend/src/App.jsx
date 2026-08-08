import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import ScrollManager from '@/components/ScrollManager'
import Home from '@/pages/Home'
import Menu from '@/pages/Menu'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import NotFound from '@/pages/NotFound'

const TITLES = {
  '/': 'Kavitha Sweets & Bakery | Fresh Cakes & Traditional Sweets in Lakshmangudi',
  '/menu': 'Menu | Kavitha Sweets & Bakery — Cakes, Sweets & Snacks',
  '/about': 'About Us | Kavitha Sweets & Bakery',
  '/contact': 'Contact | Kavitha Sweets & Bakery',
}

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES['/']
  }, [pathname])

  return (
    <div className="min-h-screen bg-cream">
      <ScrollManager />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-cream"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  )
}
