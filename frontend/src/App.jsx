import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import AuthProvider from '@/context/AuthContext'
import CartProvider from '@/context/CartContext'
import AdminAuthProvider from '@/context/AdminAuthContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import ScrollManager from '@/components/ScrollManager'
import CartDrawer from '@/components/CartDrawer'
import CheckoutModal from '@/components/CheckoutModal'
import AdminLogin from '@/admin/AdminLogin'
import AdminLayout from '@/admin/AdminLayout'
import AdminDashboard from '@/admin/AdminDashboard'
import AdminOrders from '@/admin/AdminOrders'
import AdminProducts from '@/admin/AdminProducts'
import AdminCategories from '@/admin/AdminCategories'
import AdminGallery from '@/admin/AdminGallery'
import AdminReviews from '@/admin/AdminReviews'
import AdminBanners from '@/admin/AdminBanners'
import AdminEnquiries from '@/admin/AdminEnquiries'
import AdminSettings from '@/admin/AdminSettings'
import Home from '@/pages/Home'
import Menu from '@/pages/Menu'
import AboutPage from '@/pages/AboutPage'
import GalleryPage from '@/pages/GalleryPage'
import ContactPage from '@/pages/ContactPage'
import NotFound from '@/pages/NotFound'

const TITLES = {
  '/': 'Kavitha Sweets & Bakery | Fresh Cakes & Traditional Sweets in Kuthalam',
  '/menu': 'Menu | Kavitha Sweets & Bakery — Cakes, Sweets & Snacks',
  '/about': 'About Us | Kavitha Sweets & Bakery',
  '/gallery': 'Gallery | Kavitha Sweets & Bakery',
  '/contact': 'Contact | Kavitha Sweets & Bakery',
}

function PublicLayout() {
  const [checkoutOpen, setCheckoutOpen] = useState(false)

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
        <Outlet />
      </main>
      <Footer />
      <FloatingButtons />
      <CartDrawer
        onCheckout={() => {
          setCheckoutOpen(true)
        }}
      />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  )
}

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname.startsWith('/admin')) {
      document.title = 'Admin Panel | Kavitha Sweets & Bakery'
    } else {
      document.title = TITLES[pathname] ?? TITLES['/']
    }
  }, [pathname])

  return (
    <AuthProvider>
      <CartProvider>
        <AdminAuthProvider>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="banners" element={<AdminBanners />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            <Route path="*" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AdminAuthProvider>
      </CartProvider>
    </AuthProvider>
  )
}
