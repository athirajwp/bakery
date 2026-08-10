import { useState } from 'react'
import { Link, NavLink, Navigate, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ExternalLink,
  FolderTree,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  Loader2,
  LogOut,
  Megaphone,
  Menu,
  MessageSquareQuote,
  Package,
  Settings,
  ShoppingBag,
  X,
} from 'lucide-react'
import { useAdminAuth } from '@/context/AdminAuthContext'

const NAV = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Orders', to: '/admin/orders', icon: ShoppingBag },
  { label: 'Products', to: '/admin/products', icon: Package },
  { label: 'Categories', to: '/admin/categories', icon: FolderTree },
  { label: 'Gallery', to: '/admin/gallery', icon: ImageIcon },
  { label: 'Reviews', to: '/admin/reviews', icon: MessageSquareQuote },
  { label: 'Banners', to: '/admin/banners', icon: Megaphone },
  { label: 'Enquiries', to: '/admin/enquiries', icon: Inbox },
  { label: 'Settings & SEO', to: '/admin/settings', icon: Settings },
]

function SidebarContent({ onNavigate }) {
  const { user, logout } = useAdminAuth()
  return (
    <>
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-heading text-lg font-bold text-gold">
          K
        </span>
        <div>
          <p className="font-heading text-lg font-bold leading-tight text-white">Kavitha Sweets</p>
          <p className="text-[11px] text-gold">Admin Panel</p>
        </div>
        <button onClick={onNavigate} className="ml-auto text-cream/70 hover:text-white lg:hidden" aria-label="Close menu">
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-primary text-gold' : 'text-cream/75 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <item.icon size={18} strokeWidth={1.9} /> {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="space-y-1 border-t border-white/10 px-4 py-4">
        <p className="px-2 pb-1 text-xs font-medium text-cream/50">{user?.name || user?.email}</p>
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-cream/75 hover:bg-white/5 hover:text-white"
        >
          <ExternalLink size={15} /> View Website
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-cream/75 hover:bg-red-900/60 hover:text-white"
        >
          <LogOut size={15} /> Logout
        </button>
      </div>
    </>
  )
}

export default function AdminLayout() {
  const { status } = useAdminAuth()
  const [open, setOpen] = useState(false)

  if (status === 'loading') {
    return (
      <div className="grid min-h-screen place-items-center bg-[#2a0000]">
        <Loader2 size={32} className="animate-spin text-gold" />
      </div>
    )
  }

  if (status === 'guest') {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="flex min-h-screen bg-[#f6efe6] font-body text-brown antialiased">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-[#2a0000] text-cream lg:flex">
        <SidebarContent onNavigate={() => {}} />
      </aside>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-sidebar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[50] bg-black/50 lg:hidden"
          >
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'tween', duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-full w-64 flex-col bg-[#2a0000] text-cream"
            >
              <SidebarContent onNavigate={() => setOpen(false)} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between bg-[#2a0000] px-5 py-3 text-white lg:hidden">
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid h-9 w-9 place-items-center">
            <Menu size={22} />
          </button>
          <p className="font-heading font-bold">Kavitha Sweets Admin</p>
          <span className="w-9" />
        </header>
        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
