import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock, Instagram } from 'lucide-react'
import { OliveBranch } from './illustrations'

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-cream-200">
      {/* Olive branch divider */}
      <div className="flex justify-center pt-10">
        <OliveBranch className="w-48 opacity-20 text-sage-300" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl text-cream-100 tracking-[0.15em]">GROUNDED</h2>
          <p className="text-sm text-cream-300 leading-relaxed max-w-xs">
            Where military discipline meets the healing earth. Chef Marcus Hale. East Nashville.
          </p>
          <div className="flex items-center gap-2 text-sage-300 hover:text-cream-100 transition-colors cursor-pointer">
            <Instagram size={16} strokeWidth={1.5} />
            <span className="text-xs tracking-wider">@groundednashville</span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-5">
          <p className="section-label text-sage-300">Visit Us</p>
          <div className="space-y-3 text-sm text-cream-300">
            <div className="flex items-start gap-2.5">
              <MapPin size={15} className="text-terracotta-400 mt-0.5 flex-shrink-0" />
              <span>1204 Fatherland St<br />East Nashville, TN 37206</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={15} className="text-terracotta-400 flex-shrink-0" />
              <span>(615) 555-0182</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock size={15} className="text-terracotta-400 mt-0.5 flex-shrink-0" />
              <span>Tue – Sat: 5:00 PM – 10:00 PM<br />Sun & Mon: Closed</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="space-y-5">
          <p className="section-label text-sage-300">Navigate</p>
          <div className="flex flex-col gap-2.5">
            {[
              { to: '/',             label: 'The Menu' },
              { to: '/about',        label: 'Our Story' },
              { to: '/reservations', label: 'Make a Reservation' },
              { to: '/order',        label: 'Order for Pickup' },
              { to: '/story',        label: 'The Brand' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-cream-300 hover:text-cream-100 transition-colors w-fit"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-forest-700 py-5 px-6">
        <p className="text-center text-xs text-forest-400 tracking-wider">
          © 2024 GROUNDED Nashville · All rights reserved · Plant-based fine dining
        </p>
      </div>
    </footer>
  )
}
