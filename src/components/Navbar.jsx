import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/',             label: 'Menu' },
  { to: '/about',        label: 'Our Story' },
  { to: '/reservations', label: 'Reserve' },
  { to: '/story',        label: 'The Brand' },
]

export default function Navbar() {
  const { itemCount, setIsOpen } = useCart()
  const [scrolled,  setScrolled]  = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  // Only go transparent on the /story page (which has a dark full-screen hero)
  const isDarkHero = pathname === '/story'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const solidNav = scrolled || !isDarkHero
  const textColor  = solidNav ? 'text-forest-900' : 'text-cream-50'
  const navBg      = solidNav
    ? 'bg-cream-100/95 backdrop-blur-md shadow-sm'
    : 'bg-transparent'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className={`flex flex-col leading-none ${textColor}`}>
            <span className="font-serif text-2xl font-semibold tracking-[0.15em]">GROUNDED</span>
            <span className="text-[9px] tracking-[0.35em] uppercase font-sans opacity-60">Est. 2024 · Nashville</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-xs tracking-[0.2em] uppercase font-sans font-medium transition-colors duration-200
                  ${textColor}
                  ${isActive ? 'opacity-100 border-b border-current pb-0.5' : 'opacity-60 hover:opacity-100'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open cart"
              className={`relative flex items-center gap-1.5 ${textColor} transition-opacity hover:opacity-70`}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-terracotta-400 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu toggle */}
            <button
              className={`md:hidden ${textColor}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-forest-900 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `font-serif text-3xl text-cream-100 transition-opacity
                  ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/reservations"
              className="mt-4 btn-primary text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Reserve a Table
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
