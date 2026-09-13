import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Minus, CheckCircle, ArrowRight, Clock, MapPin, Phone } from 'lucide-react'
import { HerbSprig, OliveBranch, CircleOrnament } from '../components/illustrations'

const timeSlots = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM']

const today = new Date().toISOString().split('T')[0]

export default function Reservations() {
  const [form, setForm]           = useState({ date: '', partySize: 2, time: '', name: '', email: '', phone: '', requests: '' })
  const [errors, setErrors]       = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => { document.title = 'Reserve a Table | GROUNDED Nashville' }, [])

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  const adjustParty = (delta) => {
    const next = Math.max(1, Math.min(10, form.partySize + delta))
    set('partySize', next)
  }

  const validate = () => {
    const e = {}
    if (!form.date)         e.date  = 'Please select a date'
    if (!form.time)         e.time  = 'Please select a time'
    if (!form.name.trim())  e.name  = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Phone number required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }

    const reservation = {
      id:       `RES-${Date.now()}`,
      ...form,
      placedAt: new Date().toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem('grounded-reservations') || '[]')
    localStorage.setItem('grounded-reservations', JSON.stringify([reservation, ...existing]))
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180 }}
          className="max-w-md space-y-6"
        >
          <CheckCircle size={60} className="text-sage-400 mx-auto" strokeWidth={1.2} />
          <h1 className="font-serif text-4xl text-forest-900">Table Reserved.</h1>
          <div className="bg-forest-900 text-cream-100 p-6 text-left space-y-2">
            <p className="text-sm"><span className="text-sage-300 text-xs uppercase tracking-widest">Guest</span><br />{form.name}</p>
            <p className="text-sm mt-3"><span className="text-sage-300 text-xs uppercase tracking-widest">Date & Time</span><br />{form.date} at {form.time}</p>
            <p className="text-sm mt-3"><span className="text-sage-300 text-xs uppercase tracking-widest">Party Size</span><br />{form.partySize} {form.partySize === 1 ? 'guest' : 'guests'}</p>
            <p className="text-sm mt-3"><span className="text-sage-300 text-xs uppercase tracking-widest">Address</span><br />1204 Fatherland St, East Nashville, TN 37206</p>
          </div>
          <OliveBranch className="w-32 mx-auto text-sage-300 opacity-40" />
          <p className="text-xs text-forest-400 italic max-w-xs mx-auto">
            A confirmation will be sent to {form.email}. We look forward to feeding you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/menu" className="btn-primary text-sm">
              Preview the Menu <ArrowRight size={14} />
            </Link>
            <Link to="/" className="btn-outline border-forest-300 text-forest-600 text-sm">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-forest-900 grain pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-950 to-forest-800 opacity-80" />
        <HerbSprig className="absolute right-16 top-24 w-16 text-sage-300 opacity-15 hidden lg:block" />
        <CircleOrnament className="absolute left-10 bottom-10 w-24 text-sage-300 opacity-10 hidden lg:block" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <p className="section-label text-terracotta-300 mb-4">Book a Table</p>
          <h1 className="font-serif text-5xl md:text-6xl text-cream-100 mb-4">
            Reserve Your Seat.
          </h1>
          <p className="text-cream-300 text-sm leading-relaxed max-w-md mx-auto">
            GROUNDED seats 38. We don't take walk-ins. We do this intentionally —
            so every guest gets an evening worth remembering.
          </p>
        </div>
      </section>

      {/* Info strip */}
      <div className="bg-terracotta-400 py-4">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-white text-xs tracking-widest uppercase">
          <span className="flex items-center gap-2"><Clock size={13} /> Tue – Sat · 5 PM – 10 PM</span>
          <span className="flex items-center gap-2"><MapPin size={13} /> 1204 Fatherland St, Nashville</span>
          <span className="flex items-center gap-2"><Phone size={13} /> (615) 555-0182</span>
        </div>
      </div>

      {/* Form */}
      <section className="bg-cream-100 py-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="lg:col-span-7 space-y-8">
              {/* Date */}
              <div>
                <label className="section-label block mb-2" htmlFor="date">Date</label>
                <input
                  id="date" type="date" min={today}
                  value={form.date}
                  onChange={e => set('date', e.target.value)}
                  className={`w-full border px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest-400 transition-colors
                    ${errors.date ? 'border-red-400' : 'border-cream-300'}`}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>

              {/* Party size */}
              <div>
                <label className="section-label block mb-2">Party Size</label>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => adjustParty(-1)} className="w-10 h-10 border border-cream-300 flex items-center justify-center hover:bg-cream-200 transition-colors" aria-label="Decrease party size">
                    <Minus size={14} />
                  </button>
                  <span className="font-serif text-3xl text-forest-900 w-10 text-center">{form.partySize}</span>
                  <button type="button" onClick={() => adjustParty(+1)} className="w-10 h-10 border border-cream-300 flex items-center justify-center hover:bg-cream-200 transition-colors" aria-label="Increase party size">
                    <Plus size={14} />
                  </button>
                  <span className="text-sm text-forest-500">{form.partySize === 1 ? 'guest' : 'guests'}</span>
                </div>
                <p className="text-xs text-forest-400 mt-2">For parties over 8, please call us directly.</p>
              </div>

              {/* Time */}
              <div>
                <label className="section-label block mb-3">Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(t => (
                    <button
                      key={t} type="button"
                      onClick={() => set('time', t)}
                      className={`py-3 text-xs font-sans font-medium tracking-wide border transition-all duration-150
                        ${form.time === t
                          ? 'bg-forest-900 text-cream-100 border-forest-900'
                          : 'border-cream-300 text-forest-600 hover:border-sage-300 hover:bg-sage-50'
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {errors.time && <p className="text-red-500 text-xs mt-2">{errors.time}</p>}
              </div>

              <hr className="border-cream-300" />

              {/* Contact info */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-forest-900">Your Information</h3>

                <div>
                  <label className="section-label block mb-1.5" htmlFor="res-name">Full Name</label>
                  <input
                    id="res-name" type="text" value={form.name}
                    onChange={e => set('name', e.target.value)}
                    className={`w-full border px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest-400 transition-colors
                      ${errors.name ? 'border-red-400' : 'border-cream-300'}`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="section-label block mb-1.5" htmlFor="res-email">Email</label>
                    <input
                      id="res-email" type="email" value={form.email}
                      onChange={e => set('email', e.target.value)}
                      className={`w-full border px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest-400 transition-colors
                        ${errors.email ? 'border-red-400' : 'border-cream-300'}`}
                      placeholder="you@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="section-label block mb-1.5" htmlFor="res-phone">Phone</label>
                    <input
                      id="res-phone" type="tel" value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      className={`w-full border px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest-400 transition-colors
                        ${errors.phone ? 'border-red-400' : 'border-cream-300'}`}
                      placeholder="(615) 555-0100"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="section-label block mb-1.5" htmlFor="res-requests">Special Requests</label>
                  <textarea
                    id="res-requests" value={form.requests}
                    onChange={e => set('requests', e.target.value)}
                    rows={3}
                    className="w-full border border-cream-300 px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest-400 transition-colors resize-none"
                    placeholder="Dietary needs, celebrations, or anything Chef Marcus should know…"
                  />
                </div>
              </div>

              <button type="submit" className="w-full btn-primary justify-center py-4 text-sm">
                Confirm Reservation
              </button>
              <p className="text-xs text-center text-forest-400 leading-relaxed">
                Reservations are held for 15 minutes. We'll send a confirmation to your email.
                Cancellations accepted up to 24 hours before your booking.
              </p>
            </form>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="bg-forest-900 text-cream-100 p-7 space-y-5">
                <p className="section-label text-terracotta-300">Good to Know</p>
                {[
                  { title: 'No walk-ins',       body: 'We keep it at 38 seats so every reservation gets the kitchen\'s full attention.' },
                  { title: 'All plant-based',    body: 'Every dish on the menu is vegan. No exceptions. No modifications needed.' },
                  { title: 'BYOB welcome',        body: 'We\'re still working on our wine licence. You\'re welcome to bring your own for now.' },
                  { title: 'Communal table',     body: 'Walk-ins go to our 10-seat communal table in the center — first come, first seated.' },
                ].map(({ title, body }) => (
                  <div key={title} className="border-l-2 border-terracotta-500 pl-4">
                    <p className="font-sans font-medium text-sm text-cream-100">{title}</p>
                    <p className="text-xs text-cream-300 mt-1 leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>

              <div className="relative bg-gradient-to-br from-sage-400 to-forest-700 aspect-video overflow-hidden flex items-center justify-center">
                <OliveBranch className="w-40 text-cream-100 opacity-30" />
                <div className="absolute inset-0 flex items-end p-5">
                  <div>
                    <p className="text-cream-100 font-sans text-xs tracking-widest uppercase">Location</p>
                    <p className="text-cream-50 font-serif text-lg mt-0.5">1204 Fatherland St</p>
                    <p className="text-cream-200 text-xs">East Nashville, TN 37206</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
