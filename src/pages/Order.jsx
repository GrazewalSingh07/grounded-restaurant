import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Trash2, CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { HerbSprig, OliveBranch } from '../components/illustrations'

const pickupTimes = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM']

export default function Order() {
  const { cart, updateQuantity, removeItem, clearCart, total, itemCount } = useCart()
  const [form, setForm]         = useState({ name: '', email: '', phone: '', time: '', notes: '' })
  const [errors, setErrors]     = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => { document.title = 'Your Order | GROUNDED Nashville' }, [])

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name  = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Phone number required'
    if (!form.time)         e.time  = 'Please select a pickup time'
    if (cart.length === 0)  e.cart  = 'Your cart is empty'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }

    const order = {
      id: `GR-${Date.now()}`,
      items: cart,
      total: (total * 1.0925).toFixed(2),
      customer: form,
      placedAt: new Date().toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem('grounded-orders') || '[]')
    localStorage.setItem('grounded-orders', JSON.stringify([order, ...existing]))
    clearCart()
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="max-w-md space-y-6"
        >
          <CheckCircle size={60} className="text-sage-400 mx-auto" strokeWidth={1.2} />
          <h1 className="font-serif text-4xl text-forest-900">Order Received.</h1>
          <p className="text-forest-600 leading-relaxed">
            Thank you, {form.name}. Your pickup order has been confirmed for <strong>{form.time}</strong>.
            We'll see you at 1204 Fatherland St.
          </p>
          <OliveBranch className="w-32 mx-auto text-sage-300 opacity-50" />
          <p className="text-xs text-forest-400 italic">
            "Arrive hungry. Leave different." — Chef Marcus Hale
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link to="/menu" className="btn-primary text-sm">
              Order Again <ArrowRight size={14} />
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
      <section className="bg-forest-900 grain pt-28 pb-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950 to-forest-900 opacity-80" />
        <HerbSprig className="absolute right-10 top-20 w-12 text-sage-300 opacity-15 hidden lg:block" />
        <div className="relative z-10 px-6">
          <p className="section-label text-terracotta-300 mb-3">Pickup Order</p>
          <h1 className="font-serif text-5xl text-cream-100">Your Order</h1>
          <p className="text-cream-300 text-sm mt-3">
            Ready in 25–35 minutes. Pickup only at 1204 Fatherland St.
          </p>
        </div>
      </section>

      <div className="bg-cream-100 py-14 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <ShoppingBag size={52} className="text-sage-200" strokeWidth={1} />
              <h2 className="font-serif text-3xl text-forest-700">Nothing here yet.</h2>
              <p className="text-forest-500 text-sm max-w-sm">
                Browse the menu and add dishes you'd like to take home.
              </p>
              <Link to="/menu" className="btn-primary mt-2">
                Browse the Menu <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Cart items */}
                <div className="lg:col-span-7 space-y-4">
                  <h2 className="font-serif text-2xl text-forest-900 mb-6">
                    {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                  </h2>

                  <AnimatePresence>
                    {cart.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 bg-white p-4 border border-cream-200"
                      >
                        <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-serif text-forest-900">{item.name}</p>
                              <p className="text-xs text-forest-500 mt-0.5 line-clamp-1">{item.description}</p>
                            </div>
                            <p className="font-medium text-forest-900 text-sm flex-shrink-0">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2 border border-cream-300">
                              <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-cream-200 transition-colors" aria-label="Decrease">
                                <Minus size={12} />
                              </button>
                              <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                              <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-cream-200 transition-colors" aria-label="Increase">
                                <Plus size={12} />
                              </button>
                            </div>
                            <button type="button" onClick={() => removeItem(item.id)} className="text-forest-400 hover:text-red-500 transition-colors text-xs flex items-center gap-1" aria-label={`Remove ${item.name}`}>
                              <Trash2 size={13} /> Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Order summary */}
                  <div className="bg-white border border-cream-200 p-5 space-y-2.5 mt-4">
                    <div className="flex justify-between text-sm text-forest-600">
                      <span>Subtotal</span><span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-forest-600">
                      <span>Tennessee Tax (9.25%)</span><span>${(total * 0.0925).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-serif text-lg text-forest-900 border-t border-cream-200 pt-3">
                      <span>Total</span><span>${(total * 1.0925).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Order form */}
                <div className="lg:col-span-5 space-y-6">
                  <h2 className="font-serif text-2xl text-forest-900">Your Details</h2>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="section-label block mb-1.5" htmlFor="name">Full Name</label>
                      <input
                        id="name" type="text" value={form.name}
                        onChange={e => set('name', e.target.value)}
                        className={`w-full border px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest-400 transition-colors
                          ${errors.name ? 'border-red-400' : 'border-cream-300'}`}
                        placeholder="Marcus Hale"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="section-label block mb-1.5" htmlFor="email">Email</label>
                      <input
                        id="email" type="email" value={form.email}
                        onChange={e => set('email', e.target.value)}
                        className={`w-full border px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest-400 transition-colors
                          ${errors.email ? 'border-red-400' : 'border-cream-300'}`}
                        placeholder="you@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="section-label block mb-1.5" htmlFor="phone">Phone</label>
                      <input
                        id="phone" type="tel" value={form.phone}
                        onChange={e => set('phone', e.target.value)}
                        className={`w-full border px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest-400 transition-colors
                          ${errors.phone ? 'border-red-400' : 'border-cream-300'}`}
                        placeholder="(615) 555-0100"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Pickup time */}
                    <div>
                      <label className="section-label block mb-2">Pickup Time</label>
                      <div className="grid grid-cols-3 gap-2">
                        {pickupTimes.map(t => (
                          <button
                            key={t} type="button"
                            onClick={() => set('time', t)}
                            className={`py-2.5 text-xs font-sans font-medium tracking-wide border transition-all duration-150
                              ${form.time === t
                                ? 'bg-forest-900 text-cream-100 border-forest-900'
                                : 'border-cream-300 text-forest-600 hover:border-forest-400'
                              }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="section-label block mb-1.5" htmlFor="notes">Special Instructions</label>
                      <textarea
                        id="notes" value={form.notes}
                        onChange={e => set('notes', e.target.value)}
                        rows={3}
                        className="w-full border border-cream-300 px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest-400 transition-colors resize-none"
                        placeholder="Allergies, preferences, or anything Marcus should know..."
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full btn-primary justify-center text-sm py-4">
                    Place Order · ${(total * 1.0925).toFixed(2)}
                  </button>

                  <p className="text-xs text-center text-forest-400 leading-relaxed">
                    Payment is taken at pickup. Orders confirmed by phone if needed.
                    Please arrive within 10 minutes of your selected time.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
