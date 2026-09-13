import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronDown, Volume2, VolumeX } from 'lucide-react'
import { HerbSprig, OliveBranch, MilitaryStar, CircleOrnament } from '../components/illustrations'
import { menuItems } from '../data/menu'
import { getRestaurantStatus } from '../utils/hours'

const featured = menuItems.filter(i => i.featured).slice(0, 3)

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.13 } },
}

function Section({ children, className = '' }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden"
      animate={inView ? 'show' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}

// Image w/ gradient fallback
function DishImg({ src, alt, gradient, className }) {
  const [err, setErr] = useState(false)
  return err || !src
    ? <div className={`bg-gradient-to-br ${gradient} ${className}`} />
    : <img src={src} alt={alt} loading="lazy" onError={() => setErr(true)}
        className={`object-cover ${className}`} />
}

// ── Video section ──────────────────────────────────────────────────────────
const VIDEO_SRC = '/Cinematic_K_restaurant_kitche.mp4'

function VideoSection() {
  const [muted,   setMuted]   = useState(true)
  const [videoOk, setVideoOk] = useState(true)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative h-[56vh] md:h-[72vh] overflow-hidden bg-forest-950">
      {videoOk ? (
        <video autoPlay loop muted={muted} playsInline
          onError={() => setVideoOk(false)}
          className="absolute inset-0 w-full h-full object-cover">
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-800 to-sage-500">
          <HerbSprig className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 text-sage-300 opacity-10 animate-float" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-900/40 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="absolute inset-0 flex flex-col items-center justify-end text-center pb-14 px-6"
      >
        <p className="section-label text-terracotta-300 mb-4">In the kitchen</p>
        <blockquote className="font-serif italic text-cream-100 text-2xl md:text-4xl max-w-2xl leading-tight mb-5">
          "Precision is not a technique.<br />
          <em className="text-sage-300">It's a standard."</em>
        </blockquote>
        <p className="text-cream-400 text-xs tracking-widest uppercase">Chef Marcus Hale · GROUNDED, East Nashville</p>
      </motion.div>

      {videoOk && (
        <button onClick={() => setMuted(v => !v)}
          className="absolute bottom-5 right-5 text-cream-300 hover:text-cream-100 transition-colors"
          aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? <VolumeX size={18} strokeWidth={1.5} /> : <Volume2 size={18} strokeWidth={1.5} />}
        </button>
      )}
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "I've been vegan for nine years. This is the first restaurant that felt like it was cooked for me — not just safe for me.",
    name: 'Amara T.',
    type: 'Longtime vegan',
  },
  {
    quote: "My girlfriend is vegan. I am not. I went back the next week without her. The celeriac schnitzel is not a compromise — it's a revelation.",
    name: 'James R.',
    type: 'Skeptic turned regular',
  },
  {
    quote: "We celebrated our anniversary here. Chef Marcus came out to the table. The story behind the food made the whole evening unforgettable.",
    name: 'Priya & Daniel',
    type: 'Date night guests',
  },
]

// ── Main ──────────────────────────────────────────────────────────────────
export default function Home() {
  const [status, setStatus] = useState(getRestaurantStatus)

  useEffect(() => {
    document.title = 'GROUNDED | Fine Vegan Dining | East Nashville'
    const id = setInterval(() => setStatus(getRestaurantStatus()), 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-forest-900 grain flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(124,158,142,0.07)_0%,transparent_60%)]" />
        <HerbSprig className="absolute left-4 bottom-32 w-10 text-sage-200 opacity-10 animate-float-slow hidden md:block" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <motion.div initial="hidden" animate="show" variants={stagger}>
              {/* Live status badge */}
              <motion.div variants={fadeUp} className="inline-flex flex-col gap-1 mb-8">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status.dot} opacity-60`} />
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${status.dot}`} />
                  </span>
                  <span className="text-[11px] text-cream-200 tracking-[0.22em] uppercase font-sans font-medium">
                    {status.badge}
                  </span>
                </div>
                <p className="text-[10px] text-cream-400 tracking-wide pl-4">{status.sub}</p>
              </motion.div>

              <motion.p variants={fadeUp} className="section-label text-terracotta-300 mb-5">
                Plant-Based Fine Dining · East Nashville
              </motion.p>

              <motion.h1 variants={fadeUp}
                className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream-100 leading-[1.05] mb-6">
                Where Discipline<br />
                <em className="text-sage-300">Meets the Earth.</em>
              </motion.h1>

              <motion.p variants={fadeUp}
                className="text-sm md:text-base text-cream-300 leading-relaxed max-w-md mb-3">
                Chef Marcus Hale. 22 years U.S. Army. A 38-seat plant-based dining room
                where military precision becomes the most honest food in Nashville.
              </motion.p>

              {/* Scarcity signal */}
              <motion.p variants={fadeUp} className="text-xs text-terracotta-300 mb-8 tracking-wide">
                38 seats total. Fridays &amp; Saturdays fill within 48 hours of opening.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link to="/reservations" className="btn-primary">
                  Reserve a Table <ArrowRight size={15} />
                </Link>
                <Link to="/menu" className="btn-outline text-cream-100 border-cream-100/30">
                  Explore the Menu
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — real food photo cards */}
            <motion.div initial="hidden" animate="show" variants={stagger}
              className="hidden lg:flex flex-col gap-3">
              <motion.p variants={fadeUp} className="section-label text-terracotta-300 mb-1">
                On the menu tonight
              </motion.p>

              {featured.map((item) => (
                <motion.div key={item.id} variants={fadeUp}
                  className="flex gap-0 bg-forest-800/60 border border-forest-700 hover:border-sage-400/50 transition-all duration-300 overflow-hidden group cursor-default">
                  {/* Real food photo */}
                  <DishImg
                    src={item.image} alt={item.name} gradient={item.gradient}
                    className="w-24 h-24 flex-shrink-0 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-center gap-1 px-4 py-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif text-cream-100 text-base group-hover:text-sage-200 transition-colors">{item.name}</h3>
                      <span className="text-terracotta-300 text-sm font-sans font-medium flex-shrink-0">${item.price}</span>
                    </div>
                    <p className="text-cream-400 text-xs leading-snug line-clamp-2">{item.description}</p>
                    {item.story && (
                      <p className="text-sage-400 text-[10px] italic mt-0.5 line-clamp-1">"{item.story}"</p>
                    )}
                  </div>
                </motion.div>
              ))}

              <motion.div variants={fadeUp}>
                <Link to="/menu"
                  className="flex items-center justify-between w-full border border-forest-600 hover:border-terracotta-400 px-4 py-3 text-cream-400 hover:text-terracotta-300 text-xs tracking-widest uppercase transition-colors duration-200 group">
                  <span>View full menu</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream-500">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
      <section className="bg-terracotta-400 py-5 overflow-hidden">
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-12 text-white/90 text-xs tracking-[0.3em] uppercase font-sans font-medium">
              <span>Plant-Based Fine Dining</span>
              <MilitaryStar className="w-3 h-3 text-white/60 inline" />
              <span>No Mock Meats · No Apologies</span>
              <MilitaryStar className="w-3 h-3 text-white/60 inline" />
              <span>Est. 2024 · East Nashville</span>
              <MilitaryStar className="w-3 h-3 text-white/60 inline" />
              <span>38 Seats · Seasonal Menu</span>
              <MilitaryStar className="w-3 h-3 text-white/60 inline" />
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── VIDEO ────────────────────────────────────────────────────────── */}
      <VideoSection />

      {/* ── THE EXPERIENCE — sells the feeling, not the features ─────────── */}
      <section className="bg-forest-900 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <Section>
            <motion.p variants={fadeUp} className="section-label text-terracotta-300 mb-6 text-center">
              What a night at GROUNDED feels like
            </motion.p>

            <div className="space-y-6">
              {[
                { time: '7:00', line: 'You arrive. The herb garden outside the kitchen window is lit from below.' },
                { time: '7:08', line: "Your server tells you what Marcus chose at the market this morning. It wasn't planned until 6 AM." },
                { time: '7:30', line: 'Reveille arrives. You didn\'t know smoked beet could do that.' },
                { time: '8:15', line: 'The Stuttgart Root lands — celeriac, fermented cabbage, apple. You go quiet for a moment.' },
                { time: '9:00', line: 'At Ease. Dark chocolate, cardamom, dried rose. You\'re already planning who to bring next week.' },
                { time: '9:40', line: 'You leave. Not full. Satisfied. There\'s a difference, and tonight you felt it.' },
              ].map(({ time, line }, i) => (
                <motion.div key={time} variants={fadeUp}
                  className="flex gap-5 md:gap-8 items-start border-l-2 border-forest-700 pl-5 md:pl-8 hover:border-terracotta-400 transition-colors duration-300 group">
                  <span className="font-sans text-xs text-forest-500 tracking-widest flex-shrink-0 pt-1 group-hover:text-terracotta-400 transition-colors">
                    {time}
                  </span>
                  <p className="font-serif text-lg md:text-xl text-cream-200 leading-relaxed group-hover:text-cream-100 transition-colors">
                    {line}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-12 text-center">
              <Link to="/reservations" className="btn-primary">
                Make this your evening <ArrowRight size={15} />
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── FEATURED DISHES — with real photos ───────────────────────────── */}
      <section className="bg-cream-100 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Section>
            <motion.div variants={fadeUp}
              className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <div>
                <p className="section-label mb-3">Signature Dishes</p>
                <h2 className="section-heading text-forest-900">
                  What the Earth<br /><em className="text-sage-400">Provides.</em>
                </h2>
              </div>
              <Link to="/menu"
                className="text-forest-500 text-sm tracking-widest uppercase font-sans hover:text-terracotta-400 transition-colors flex items-center gap-2">
                Full Menu <ArrowRight size={14} />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((item) => (
                <motion.div key={item.id} variants={fadeUp}
                  className="group cursor-default overflow-hidden bg-white border border-cream-200 hover:shadow-xl transition-shadow duration-500">
                  {/* Real food photo */}
                  <div className="relative h-64 overflow-hidden">
                    <DishImg
                      src={item.image} alt={item.name} gradient={item.gradient}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                      {item.tags.map(tag => (
                        <span key={tag}
                          className="text-[9px] tracking-[0.2em] uppercase bg-black/40 text-cream-200 px-2 py-0.5 backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-serif text-xl text-forest-900">{item.name}</h3>
                      <span className="text-terracotta-500 font-sans font-semibold text-sm">${item.price}</span>
                    </div>
                    <p className="text-sm text-forest-500 leading-relaxed">{item.description}</p>
                    {item.story && (
                      <p className="text-xs text-sage-400 italic mt-3 border-t border-cream-200 pt-3">
                        "{item.story}"
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ── TESTIMONIALS — up high, sells trust early ─────────────────────── */}
      <section className="bg-forest-800 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Section>
            <motion.div variants={fadeUp} className="mb-14">
              <p className="section-label text-terracotta-300 mb-3">Guest Voices</p>
              <h2 className="font-serif text-4xl md:text-5xl text-cream-100 max-w-xl leading-tight">
                You don't have to be vegan.<br />
                <em className="text-sage-300">You just have to be hungry.</em>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map(({ quote, name, type }) => (
                <motion.div key={name} variants={fadeUp}
                  className="border border-forest-700 p-7 flex flex-col gap-4 hover:border-sage-400/40 transition-colors duration-300">
                  <OliveBranch className="w-20 text-sage-400 opacity-40" />
                  <blockquote className="font-serif italic text-cream-200 text-base leading-relaxed flex-1">
                    "{quote}"
                  </blockquote>
                  <div>
                    <p className="font-sans font-medium text-sm text-cream-100">{name}</p>
                    <p className="text-xs text-terracotta-300 tracking-wide uppercase mt-0.5">{type}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ── MARCUS TEASER ────────────────────────────────────────────────── */}
      <section className="bg-cream-100 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeUp} className="order-2 lg:order-1 space-y-6">
                <p className="section-label">The Founder</p>
                <h2 className="section-heading text-forest-900">
                  He spent 22 years<br />feeding soldiers.<br />
                  <em className="text-sage-400">Now he feeds everyone.</em>
                </h2>
                <p className="text-base text-forest-600 leading-relaxed">
                  At 46, six months after retirement, a cardiac event. His doctor handed him
                  a list of what had to go. He walked out angry — then went to his garden.
                </p>
                <p className="text-base text-forest-600 leading-relaxed">
                  He pulled from Okinawa, Stuttgart, Jordan. The most healing food he'd ever
                  eaten had almost no meat in it. Within eight months he was off three medications.
                  His cardiologist called it remarkable. Marcus called it obvious.
                </p>
                <Link to="/about" className="btn-primary inline-flex mt-2">
                  Read the Full Story <ArrowRight size={16} />
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="order-1 lg:order-2 relative">
                <div className="relative aspect-[3/4] max-w-sm mx-auto bg-gradient-to-b from-forest-700 to-forest-900 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(124,158,142,0.2)_0%,transparent_60%)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-forest-950">
                    <p className="font-serif text-cream-100 text-xl">Chef Marcus Hale</p>
                    <p className="text-sage-300 text-xs tracking-widest uppercase mt-1">U.S. Army · 22 Years · Founder</p>
                  </div>
                  <HerbSprig className="absolute top-8 right-8 w-20 text-sage-300 opacity-25 animate-float" />
                  <CircleOrnament className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 text-sage-300 opacity-10" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-terracotta-400 text-white p-5 max-w-xs shadow-xl hidden lg:block">
                  <p className="font-serif italic text-sm leading-relaxed">
                    "The earth fed soldiers long before factories did."
                  </p>
                  <p className="text-xs mt-2 opacity-70">— Chef Marcus Hale</p>
                </div>
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── RESERVATION CTA ──────────────────────────────────────────────── */}
      <section className="relative bg-forest-900 py-24 lg:py-36 text-center overflow-hidden grain">
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950" />
        <HerbSprig className="absolute left-12 top-1/2 -translate-y-1/2 w-24 text-sage-300 opacity-10 hidden lg:block" />
        <HerbSprig className="absolute right-12 top-1/2 -translate-y-1/2 w-24 text-sage-300 opacity-10 hidden lg:block scale-x-[-1]" />

        <Section className="relative z-10">
          <motion.p variants={fadeUp} className="section-label text-terracotta-300 mb-4">
            Tuesday – Saturday · 5 PM – 10 PM
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-heading text-cream-100 mb-4 max-w-2xl mx-auto">
            38 seats. No walk-ins.<br />
            <em className="text-sage-300">Reserve yours.</em>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-terracotta-300 text-xs tracking-wider mb-4">
            Fridays &amp; Saturdays fill within 48 hours of opening. Don't wait.
          </motion.p>
          <motion.p variants={fadeUp}
            className="text-cream-300 text-sm max-w-md mx-auto mb-10 leading-relaxed">
            A small, intentional space. We keep it that way so every guest gets the evening
            they came for.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
            <Link to="/reservations" className="btn-primary">
              Book a Table <ArrowRight size={16} />
            </Link>
            <a href="tel:6155550182" className="btn-outline text-cream-100 border-cream-100/30">
              Call (615) 555-0182
            </a>
          </motion.div>
        </Section>
      </section>
    </>
  )
}
