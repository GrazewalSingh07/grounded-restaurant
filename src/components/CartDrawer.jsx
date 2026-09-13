import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, updateQuantity, removeItem, total, itemCount } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-forest-900/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-cream-50 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream-300">
              <div>
                <h2 className="font-serif text-xl text-forest-900">Your Order</h2>
                <p className="text-xs text-forest-600 mt-0.5">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-forest-600 hover:text-forest-900 transition-colors"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-sage-200" strokeWidth={1} />
                  <p className="font-serif text-xl text-forest-700">Your table is empty.</p>
                  <p className="text-sm text-forest-500">Browse the menu and add something that speaks to you.</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-2 btn-primary text-sm"
                    aria-label="Browse menu"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {cart.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4"
                    >
                      {/* Gradient thumbnail */}
                      <div className={`w-16 h-16 rounded-sm bg-gradient-to-br ${item.gradient} flex-shrink-0`} />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-serif text-forest-900 leading-tight">{item.name}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-forest-400 hover:text-red-500 transition-colors flex-shrink-0"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-forest-500 mt-0.5 line-clamp-1">{item.description}</p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 border border-cream-300 rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-cream-200 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-cream-200 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-sm font-medium text-forest-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-cream-300 space-y-4">
                <div className="flex justify-between text-sm text-forest-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-forest-600">
                  <span>Tax (9.25%)</span>
                  <span>${(total * 0.0925).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-serif text-lg text-forest-900 border-t border-cream-300 pt-3">
                  <span>Total</span>
                  <span>${(total * 1.0925).toFixed(2)}</span>
                </div>
                <Link
                  to="/order"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center btn-primary justify-center"
                >
                  Review Order
                </Link>
                <p className="text-xs text-center text-forest-400">
                  Orders are for pickup only — ready in 25–35 min.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
