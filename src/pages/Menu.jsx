import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, Check, Search, List, Grid, Wine, ArrowRight } from 'lucide-react'
import { menuItems, wineList, categories } from '../data/menu'
import { useCart } from '../context/CartContext'
import { HerbSprig, OliveBranch, MilitaryStar } from '../components/illustrations'

const UNS = 'https://images.unsplash.com/photo-'
const q   = '?auto=format&fit=crop&w=700&q=80'

const mosaicPhotos = [
  { src: `${UNS}1546069901-ba9599a7e63c${q}`, label: 'Reveille' },
  { src: `${UNS}1604329760661-e71dc83f8f26${q}`, label: 'Okinawa' },
  { src: `${UNS}1551024506-0bccd828d307${q}`, label: 'At Ease' },
  { src: `${UNS}1510812431401-41d2bd2722f3${q}`, label: 'Wine Pairings' },
  { src: `${UNS}1540189549336-e6e99213a4a1${q}`, label: 'Stuttgart Root' },
  { src: `${UNS}1585937421612-70a008356fbe${q}`, label: 'Field Ration No. 7' },
]

const tagFilters = [
  { id: 'all',         label: 'All' },
  { id: 'gluten-free', label: 'Gluten-Free' },
]

// ── Shared add-to-cart hook ────────────────────────────────────────────────
function useAddItem(item) {
  const { addItem, cart } = useCart()
  const [added, setAdded] = useState(false)
  const inCart = cart.some(i => i.id === item.id)
  const qty = cart.find(i => i.id === item.id)?.quantity ?? 0

  const handleAdd = () => {
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }
  return { added, inCart, qty, handleAdd }
}

// ── Image with gradient fallback ──────────────────────────────────────────
function DishImage({ src, alt, gradient, className }) {
  const [err, setErr] = useState(false)
  return err || !src ? (
    <div className={`bg-gradient-to-br ${gradient} ${className}`} />
  ) : (
    <img
      src={src} alt={alt}
      loading="lazy"
      onError={() => setErr(true)}
      className={`object-cover ${className}`}
    />
  )
}

// ── Editorial row (Manhatta style) ────────────────────────────────────────
function EditorialItem({ item }) {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const { added, inCart, qty, handleAdd } = useAddItem(item)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="group grid grid-cols-[56px_1fr] gap-3 py-4 border-b border-cream-300 last:border-0"
    >
      {/* Thumbnail — tighter */}
      <DishImage
        src={item.image} alt={item.name} gradient={item.gradient}
        className="w-14 h-14 flex-shrink-0 object-cover"
      />

      {/* Content */}
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-base text-forest-900 leading-tight tracking-wide group-hover:text-terracotta-500 transition-colors duration-200">
            {item.name.toUpperCase()}
          </h3>
          <span className="font-sans font-medium text-forest-600 text-sm flex-shrink-0 tabular-nums">
            {item.price}
          </span>
        </div>

        <p className="text-xs text-forest-500 leading-relaxed line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between mt-1.5 gap-3">
          <div className="flex flex-wrap gap-1">
            {item.tags.map(t => (
              <span key={t} className="text-[8px] uppercase tracking-[0.18em] px-1.5 py-0.5 border border-sage-200 text-sage-400 font-sans">
                {t}
              </span>
            ))}
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1 px-2.5 py-1 text-[10px] tracking-widest uppercase font-sans font-medium transition-all duration-300 flex-shrink-0
              ${added ? 'bg-sage-300 text-white' : 'border border-forest-300 text-forest-500 hover:border-terracotta-400 hover:text-terracotta-500'}`}
            aria-label={`Add ${item.name} to order`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added
                ? <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1"><Check size={10} /> Added</motion.span>
                : <motion.span key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1"><Plus size={10} /> Add</motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Visual card (Cipriani style) ──────────────────────────────────────────
function VisualCard({ item }) {
  const ref    = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-40px' })
  const { added, inCart, qty, handleAdd } = useAddItem(item)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group bg-white border border-cream-200 hover:shadow-lg transition-shadow duration-400 overflow-hidden"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <DishImage
          src={item.image}
          alt={item.name}
          gradient={item.gradient}
          className="w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-forest-900/10 group-hover:bg-forest-900/0 transition-colors duration-500" />
        {item.story && (
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60">
            <p className="text-cream-200 text-[10px] italic leading-tight line-clamp-1">"{item.story}"</p>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg text-forest-900 leading-tight">{item.name}</h3>
          <span className="font-sans font-semibold text-terracotta-500 text-sm flex-shrink-0">{item.price}</span>
        </div>
        <p className="text-xs text-forest-500 leading-relaxed">{item.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map(t => (
            <span key={t} className="text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 border border-sage-200 text-sage-400">
              {t}
            </span>
          ))}
        </div>
        <button
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-2 py-2.5 text-xs tracking-widest uppercase font-sans font-medium transition-all duration-300
            ${added ? 'bg-sage-300 text-white' : 'bg-forest-900 text-cream-100 hover:bg-terracotta-400'}`}
          aria-label={`Add ${item.name} to order`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                <Check size={13} /> Added {inCart && `· ${qty} in cart`}
              </motion.span>
            ) : (
              <motion.span key="a" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                <Plus size={13} /> {inCart ? `${qty} in cart · Add more` : 'Add to order'}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  )
}

// ── Wine section ──────────────────────────────────────────────────────────
function WineSection() {
  const ref    = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mt-16 pt-10 border-t-2 border-forest-900"
    >
      <div className="flex items-center gap-3 mb-2">
        <Wine size={18} className="text-terracotta-400" strokeWidth={1.5} />
        <h2 className="font-serif text-2xl md:text-3xl text-forest-900 tracking-[0.12em]">WINE &amp; PAIRINGS</h2>
      </div>
      <p className="text-xs text-forest-500 tracking-wider mb-1">All wines are vegan-certified · Natural, unfined &amp; unfiltered</p>
      <OliveBranch className="w-32 text-sage-300 opacity-40 mb-8" />

      <div className="space-y-0">
        {wineList.map((wine, i) => (
          <motion.div
            key={wine.id}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.07, duration: 0.45 }}
            className="grid grid-cols-[64px_1fr] md:grid-cols-[80px_1fr] gap-4 md:gap-6 py-6 border-b border-cream-300 last:border-0"
          >
            {/* Wine image */}
            <DishImage
              src={wine.image}
              alt={wine.name}
              gradient="from-stone-800 to-stone-950"
              className="w-16 h-16 md:w-20 md:h-20 object-cover"
            />

            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <h3 className="font-serif text-base md:text-lg text-forest-900 leading-tight">
                  {wine.name}
                </h3>
                <span className="font-sans text-sm text-forest-700 tabular-nums flex-shrink-0">
                  {wine.glass && <span>{wine.glass} / glass</span>}
                  {wine.bottle && <span className="ml-2 text-forest-400">· {wine.bottle} / bottle</span>}
                </span>
              </div>

              <p className="text-xs text-terracotta-400 tracking-wider uppercase">{wine.region} · {wine.style}</p>
              <p className="text-sm text-forest-500 leading-relaxed">{wine.description}</p>
              <p className="text-xs text-sage-400">Pairs with: <span className="italic">{wine.pairing}</span></p>

              <div className="flex flex-wrap gap-1.5 mt-1">
                {wine.tags.map(t => (
                  <span key={t} className="text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 border border-sage-200 text-sage-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// ── Main component ────────────────────────────────────────────────────────
export default function Menu() {
  const [view,            setView]           = useState('editorial')
  const [activeCategory,  setActiveCategory]  = useState('all')
  const [activeTag,       setActiveTag]       = useState('all')
  const [search,          setSearch]          = useState('')
  const { itemCount, total, setIsOpen }       = useCart()

  useEffect(() => { document.title = 'Menu | GROUNDED Nashville' }, [])

  const showWine = activeCategory === 'all' || activeCategory === 'wine'

  const filtered = menuItems.filter(item => {
    const catMatch  = activeCategory === 'all' || item.category === activeCategory
    const tagMatch  = activeTag === 'all' || item.tags.includes(activeTag)
    const srchMatch = !search
      || item.name.toLowerCase().includes(search.toLowerCase())
      || item.description.toLowerCase().includes(search.toLowerCase())
    return catMatch && tagMatch && srchMatch
  })

  const grouped = ['starters', 'mains', 'sides', 'desserts', 'drinks'].map(cat => ({
    cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
    items: filtered.filter(i => i.category === cat),
  })).filter(g => g.items.length > 0)

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-forest-900 grain pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 to-forest-900/60" />

        {/* Cipriani-style photo mosaic */}
        <div className="relative z-10 grid grid-cols-3 md:grid-cols-6 h-36 md:h-48">
          {mosaicPhotos.map(({ src, label }) => (
            <div key={label} className="relative overflow-hidden group">
              <DishImage
                src={src} alt={label} gradient="from-forest-700 to-forest-900"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-forest-900/50 group-hover:bg-forest-900/20 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-cream-100 text-[9px] tracking-widest uppercase">{label}</p>
              </div>
            </div>
          ))}

          {/* Restaurant identity overlay — centre of mosaic */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center px-6 py-4 bg-forest-950/60 backdrop-blur-sm border border-cream-100/10">
              <p className="text-[10px] text-terracotta-300 tracking-[0.35em] uppercase font-sans mb-1">
                Plant-Based Fine Dining
              </p>
              <h1 className="font-serif text-2xl md:text-3xl text-cream-100 tracking-[0.15em]">
                GROUNDED
              </h1>
              <p className="text-[10px] text-cream-400 tracking-[0.25em] uppercase font-sans mt-1">
                East Nashville · Est. 2024
              </p>
            </div>
          </div>
        </div>

        {/* Title overlay */}
        <div className="relative z-10 bg-forest-900/90 py-4 px-6 text-center">
          <p className="section-label text-terracotta-300">Seasonal Menu</p>
          <h1 className="font-serif text-3xl md:text-4xl text-cream-100">The Menu</h1>
        </div>

        {/* Scroll arrow — fixed to bottom-right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-4 right-6 z-20 flex flex-col items-center gap-1"
        >
          <span className="text-[8px] text-cream-500 tracking-[0.3em] uppercase font-sans">Scroll</span>
          <div className="flex flex-col items-center gap-0.5">
            {[0, 1, 2].map(i => (
              <motion.svg
                key={i}
                width="16" height="9" viewBox="0 0 18 10" fill="none"
                animate={{ opacity: [0.2, 1, 0.2], y: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.18, ease: 'easeInOut' }}
              >
                <path d="M2 2l7 6 7-6" stroke="#7A9E8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Chef's Note ── */}
      <div className="bg-cream-200 py-5 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <MilitaryStar className="w-5 h-5 text-terracotta-400 mx-auto mb-3" />
          <p className="font-serif italic text-forest-700 text-base md:text-lg leading-relaxed">
            "Build your evening: one starter, one main, one dessert.
            Add a wine pairing. That's the meal I'd cook for someone I care about."
          </p>
          <p className="text-xs text-forest-500 mt-3 tracking-wider">— Chef Marcus Hale</p>
          <p className="text-xs text-terracotta-400 mt-2">Suggested three-course dinner from $54 · Wine pairing +$55</p>
        </div>
      </div>

      {/* ── Sticky filter bar ── */}
      <div className="sticky top-16 lg:top-20 z-30 bg-cream-100/95 backdrop-blur-md border-b border-cream-300 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 lg:px-12">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`flex-shrink-0 px-4 py-1.5 text-xs tracking-widest uppercase font-sans font-medium transition-all duration-200
                  ${activeCategory === id
                    ? 'text-forest-900 border-b-2 border-terracotta-400'
                    : 'text-forest-400 hover:text-forest-700 border-b-2 border-transparent'
                  }`}
              >
                {label}
              </button>
            ))}

            <div className="h-4 w-px bg-cream-300 mx-2 flex-shrink-0" />

            {tagFilters.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTag(id)}
                className={`flex-shrink-0 px-3 py-1 text-[10px] tracking-widest uppercase font-sans transition-all duration-150 border
                  ${activeTag === id
                    ? 'border-sage-400 bg-sage-50 text-sage-500'
                    : 'border-cream-300 text-forest-400 hover:border-sage-300'
                  }`}
              >
                {label}
              </button>
            ))}

            {/* Search */}
            <div className="ml-auto flex-shrink-0 relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-400" />
              <input
                type="text" placeholder="Search…" value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-cream-300 bg-white focus:outline-none focus:border-sage-400 w-32 transition-colors"
              />
            </div>

            {/* View toggle */}
            <div className="flex-shrink-0 flex border border-cream-300 ml-2">
              <button
                onClick={() => setView('editorial')}
                className={`p-2 transition-colors ${view === 'editorial' ? 'bg-forest-900 text-cream-100' : 'text-forest-400 hover:text-forest-700'}`}
                title="Editorial list"
                aria-label="Switch to editorial list view"
              >
                <List size={14} />
              </button>
              <button
                onClick={() => setView('visual')}
                className={`p-2 transition-colors ${view === 'visual' ? 'bg-forest-900 text-cream-100' : 'text-forest-400 hover:text-forest-700'}`}
                title="Visual cards"
                aria-label="Switch to visual card view"
              >
                <Grid size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Menu content ── */}
      <section className="bg-cream-100 py-12 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <AnimatePresence mode="wait">
            {filtered.length === 0 && !showWine ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-24 gap-4 text-center"
              >
                <HerbSprig className="w-10 text-sage-200" />
                <p className="font-serif text-2xl text-forest-700">Nothing found.</p>
                <button
                  onClick={() => { setActiveCategory('all'); setActiveTag('all'); setSearch('') }}
                  className="text-xs text-terracotta-400 underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : view === 'editorial' ? (
              /* ── EDITORIAL list ── */
              <motion.div
                key={`editorial-${activeCategory}-${activeTag}-${search}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-12"
              >
                {grouped.map(({ cat, label, items }) => (
                  <div key={cat}>
                    {/* Category header — Manhatta style */}
                    <div className="flex items-center gap-4 mb-0 pb-4 border-b-2 border-forest-900">
                      <h2 className="font-serif text-2xl text-forest-900 tracking-[0.12em]">
                        {label.toUpperCase()}
                      </h2>
                      <div className="flex-1 h-px bg-cream-300" />
                      <span className="text-xs text-forest-400 tracking-widest uppercase">{items.length} dishes</span>
                    </div>

                    <div>
                      {items.map(item => (
                        <EditorialItem key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                ))}

                {showWine && <WineSection />}
              </motion.div>
            ) : (
              /* ── VISUAL grid ── */
              <motion.div
                key={`visual-${activeCategory}-${activeTag}-${search}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-14"
              >
                {grouped.map(({ cat, label, items }) => (
                  <div key={cat}>
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-forest-900">
                      <h2 className="font-serif text-2xl text-forest-900 tracking-[0.12em]">{label.toUpperCase()}</h2>
                      <div className="flex-1 h-px bg-cream-300" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {items.map(item => (
                        <VisualCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                ))}

                {showWine && (
                  <div className="max-w-3xl">
                    <WineSection />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Chef's footer note ── */}
      <section className="bg-forest-800 py-10">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-2">
          <OliveBranch className="w-24 mx-auto text-sage-300 opacity-30 mb-4" />
          <p className="text-sage-300 font-serif italic text-base">
            "Everything on this menu is plant-based. If you came expecting compromise, leave expecting revelation."
          </p>
          <p className="text-cream-400 text-xs tracking-wider">— Chef Marcus Hale</p>
          <p className="text-cream-500 text-xs mt-3">Please inform your server of any allergies. Consuming raw or undercooked ingredients may increase risk of foodborne illness.</p>
        </div>
      </section>

      {/* ── Sticky cart bar ── */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-forest-900 border-t border-forest-700 px-4 py-3 md:px-8"
          >
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-terracotta-400 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                  {itemCount}
                </span>
                <div>
                  <p className="text-cream-100 text-sm font-sans font-medium">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'} in your order
                  </p>
                  <p className="text-cream-400 text-xs">${total.toFixed(2)} before tax</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-sage-300 text-xs tracking-widest uppercase hidden sm:block hover:text-cream-100 transition-colors"
                >
                  Review
                </button>
                <Link to="/order"
                  className="btn-primary text-xs py-2.5 px-5">
                  Order Now <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
