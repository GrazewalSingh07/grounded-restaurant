import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { HerbSprig, OliveBranch, CircleOrnament, MilitaryStar } from '../components/illustrations'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
}

function Section({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const timeline = [
  { year: '2001',  title: 'Enlisted, Fort Bragg',         body: 'Marcus joined the U.S. Army at 22 as a culinary specialist. He fed 400 soldiers a day on a budget that demanded respect for every ingredient.' },
  { year: '2006',  title: 'Stationed — Okinawa, Japan',   body: 'First exposure to a plant-centered culture. He watched centenarians eat purple sweet potato, miso, and seaweed. Nothing else. He was 27. He filed it away.' },
  { year: '2010',  title: 'Stuttgart, Germany',            body: 'Fermentation. Root vegetables. Discipline in simplicity. He learned that German cuisine wasn\'t heavy — it was precise. And most of it was from the earth.' },
  { year: '2014',  title: 'Deployment — Jordan',           body: 'A family in Amman invited him to eat. Lentil kofta, tahini, Aleppo tomatoes. No meat. He said it was the best meal of his life. He\'s been trying to recreate it since.' },
  { year: '2023',  title: 'Retirement & Cardiac Event',    body: 'Six months after 22 years of service, a minor cardiac event. His doctor handed him a list. He walked out angry. Then he went to his garden. Then he started cooking differently.' },
  { year: '2024',  title: 'GROUNDED Opens',                body: '38 seats on Fatherland Street, East Nashville. A communal table in the center. An herb garden visible from every seat. No mock meats. No apologies. Just the plant.' },
]

const philosophy = [
  {
    num: '01',
    title: 'Precision Over Perfection',
    body: 'Military cooking taught Marcus that perfection is a myth, but precision is achievable every time. Every sauce is reduced to exact measure. Every knife cut is intentional.',
  },
  {
    num: '02',
    title: 'The Plant Is Not Second',
    body: 'The misconception is that plant-based means something missing. We reframe this: the carrot, given proper technique, reveals complexity a steak cannot. This is not a constraint. It is an opportunity.',
  },
  {
    num: '03',
    title: 'Food as Medicine',
    body: 'This is not a metaphor. Marcus ate his way back to health. The menu is designed around what heals — fermented, whole, seasonal, anti-inflammatory. The body knows the difference.',
  },
  {
    num: '04',
    title: 'Waste Is Failure',
    body: 'Military logistics instilled this. Every trim becomes a broth. Every citrus skin becomes a powder. GROUNDED produces less than a liter of food waste per service. We consider that a score.',
  },
]

export default function About() {
  useEffect(() => {
    document.title = 'Our Story | GROUNDED Nashville'
  }, [])

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative bg-forest-900 grain pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800" />
        <HerbSprig className="absolute right-16 top-24 w-20 text-sage-300 opacity-15 hidden lg:block" />
        <CircleOrnament className="absolute left-8 bottom-8 w-28 text-sage-300 opacity-10 hidden lg:block" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label text-terracotta-300 mb-5"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl text-cream-100 leading-tight mb-6"
          >
            The Man<br />
            Behind<br />
            <em className="text-sage-300">The Plate.</em>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <OliveBranch className="w-48 text-sage-300 opacity-30" />
          </motion.div>
        </div>
      </section>

      {/* ── OPENING QUOTE ─────────────────────────────────────────────── */}
      <section className="bg-terracotta-400 py-14 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-serif text-2xl md:text-3xl text-white italic leading-relaxed">
            "The earth fed soldiers long before factories did. I just needed a cardiac event to pay attention."
          </p>
          <p className="text-white/70 text-xs tracking-widest uppercase mt-5">— Chef Marcus Hale, Founder</p>
        </div>
      </section>

      {/* ── THE STORY ─────────────────────────────────────────────────── */}
      <section className="bg-cream-100 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* Story text */}
              <div className="lg:col-span-7 space-y-8">
                <motion.div variants={fadeUp}>
                  <p className="section-label mb-4">The Beginning</p>
                  <p className="text-lg text-forest-700 leading-relaxed">
                    Marcus Hale enlisted in the U.S. Army at 22. He didn't set out to be a chef.
                    He set out to serve. The kitchen found him.
                  </p>
                  <p className="text-base text-forest-600 leading-relaxed mt-4">
                    Over the next 22 years, he rose to become executive chef across three bases —
                    Fort Bragg, Okinawa, Stuttgart — feeding thousands of people who were far from home,
                    exhausted, and sometimes afraid. Food, he learned, is morale. It is medicine.
                    It is the closest thing to comfort you can offer a person who has none.
                  </p>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <p className="section-label mb-4">The World in His Kitchen</p>
                  <p className="text-base text-forest-600 leading-relaxed">
                    Military service took Marcus across four continents. In Okinawa, he watched people
                    in their nineties tend to their own fields. They ate purple sweet potato, miso soup,
                    bitter melon — and almost nothing else. They were the healthiest people he had ever seen.
                  </p>
                  <p className="text-base text-forest-600 leading-relaxed mt-4">
                    In Stuttgart, he discovered fermentation — the German patience with sauerkraut, with brine,
                    with time as an ingredient. In Jordan, a family fed him lentil kofta at a kitchen table
                    that had never seen a microwave. He said it was the greatest meal of his life.
                  </p>
                  <p className="text-base text-forest-600 leading-relaxed mt-4">
                    He was taking notes the whole time. He just didn't know what for yet.
                  </p>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <p className="section-label mb-4">The Wake-Up Call</p>
                  <p className="text-base text-forest-600 leading-relaxed">
                    At 46, six months after retirement, Marcus had a minor cardiac event. His doctor
                    handed him a laminated list of foods he had to eliminate. Marcus walked out of that
                    office angry. Not at the doctor. At himself. At 22 years of convenience, stress,
                    and ignoring what he already knew.
                  </p>
                  <p className="text-base text-forest-600 leading-relaxed mt-4">
                    He went to his garden — the small plot he'd maintained at every base he'd ever been
                    stationed at. He started cooking from it. He pulled from everything he'd seen:
                    the Okinawan centenarians, the Stuttgart root cellars, the Jordanian family table.
                    Within eight months, he was off three medications. His cardiologist called it
                    remarkable. Marcus called it obvious.
                  </p>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <p className="section-label mb-4">GROUNDED</p>
                  <p className="text-base text-forest-600 leading-relaxed">
                    GROUNDED opened in 2024 on Fatherland Street in East Nashville. Thirty-eight seats.
                    A long communal table in the center for walk-ins. Linen napkins. Exposed wood beams.
                    A small herb garden visible through the kitchen window from every seat.
                  </p>
                  <p className="text-base text-forest-600 leading-relaxed mt-4">
                    The menu rotates seasonally and is written in Marcus's own handwriting every Sunday.
                    Nothing here is processed. Nothing here is apologetic. The celeriac schnitzel will
                    make a meat-eater question everything they think they know about food.
                    That's the point.
                  </p>
                </motion.div>
              </div>

              {/* Sidebar: stats + image */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                {/* Portrait */}
                <motion.div variants={fadeUp} className="relative bg-gradient-to-br from-forest-700 to-forest-900 aspect-square overflow-hidden">
                  <HerbSprig className="absolute top-6 right-6 w-16 text-sage-300 opacity-20 animate-float" />
                  <CircleOrnament className="absolute bottom-6 left-6 w-24 text-sage-300 opacity-10" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <p className="font-serif text-2xl text-cream-100">Chef Marcus Hale</p>
                      <p className="text-sage-300 text-xs tracking-widest uppercase mt-1">Founder · Executive Chef</p>
                      <p className="text-cream-400 text-xs mt-1">U.S. Army Culinary Specialist, Retired</p>
                    </div>
                  </div>
                </motion.div>

                {/* Key stats */}
                <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
                  {[
                    { num: '22', label: 'Years in service' },
                    { num: '38', label: 'Seats. Intentional.' },
                    { num: '4',  label: 'Continents of influence' },
                    { num: '0',  label: 'Mock meats on the menu' },
                  ].map(({ num, label }) => (
                    <div key={label} className="bg-cream-200 p-4 text-center">
                      <p className="font-serif text-4xl text-terracotta-500">{num}</p>
                      <p className="text-xs text-forest-500 mt-1 leading-tight">{label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────── */}
      <section className="bg-forest-900 py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <Section>
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <p className="section-label text-terracotta-300 mb-3">The Journey</p>
              <h2 className="section-heading text-cream-100">From Field to Table.</h2>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-forest-700" />

              <div className="space-y-12">
                {timeline.map(({ year, title, body }, idx) => (
                  <motion.div
                    key={year}
                    variants={fadeUp}
                    className={`relative flex gap-8 md:gap-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start`}
                  >
                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-terracotta-400 rounded-full -translate-x-1/2 mt-1.5" />

                    {/* Spacer for opposite side on desktop */}
                    <div className="hidden md:block md:w-1/2" />

                    <div className={`ml-14 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:text-right'}`}>
                      <span className="text-terracotta-400 text-xs font-sans tracking-[0.25em] font-medium">{year}</span>
                      <h3 className="font-serif text-lg text-cream-100 mt-1 mb-2">{title}</h3>
                      <p className="text-sm text-cream-300 leading-relaxed">{body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── PHILOSOPHY ────────────────────────────────────────────────── */}
      <section className="bg-cream-100 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Section>
            <motion.div variants={fadeUp} className="mb-14">
              <p className="section-label mb-3">Cooking Philosophy</p>
              <h2 className="section-heading text-forest-900 max-w-xl">
                Four principles.<br />
                <em className="text-sage-400">Written in the kitchen.</em>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {philosophy.map(({ num, title, body }) => (
                <motion.div
                  key={num}
                  variants={fadeUp}
                  className="flex gap-6 p-6 border border-cream-300 hover:border-sage-200 transition-colors"
                >
                  <span className="font-serif text-5xl text-cream-300 leading-none flex-shrink-0">{num}</span>
                  <div>
                    <h3 className="font-serif text-xl text-forest-900 mb-2">{title}</h3>
                    <p className="text-sm text-forest-600 leading-relaxed">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ── THE SPACE ─────────────────────────────────────────────────── */}
      <section className="bg-forest-800 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeUp} className="space-y-6">
                <p className="section-label text-terracotta-300">The Space</p>
                <h2 className="section-heading text-cream-100">
                  38 seats.<br />
                  <em className="text-sage-300">Every one intentional.</em>
                </h2>
                <p className="text-cream-300 leading-relaxed">
                  GROUNDED is small by design. Marcus has fed thousands — he knows what happens
                  when scale becomes the goal. The food suffers. The guests become numbers.
                </p>
                <p className="text-cream-300 leading-relaxed">
                  Thirty-eight seats means every plate leaves the kitchen within two minutes of plating.
                  It means Marcus knows what table four ordered before they finish asking.
                  It means the herb garden in the back window isn't decoration — it's dinner.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {['Exposed oak beams', 'Linen napkins', 'Herb garden', 'Communal table', 'Open kitchen', 'No loud music'].map(feat => (
                    <div key={feat} className="flex items-start gap-2">
                      <MilitaryStar className="w-3 h-3 text-terracotta-400 mt-0.5 flex-shrink-0" />
                      <span className="text-cream-300 text-xs">{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
                {[
                  { bg: 'from-forest-700 to-forest-900', label: 'The dining room' },
                  { bg: 'from-sage-400 to-forest-700',   label: 'The herb garden' },
                  { bg: 'from-terracotta-600 to-forest-800', label: 'Open kitchen' },
                  { bg: 'from-forest-600 to-forest-900', label: 'Communal table' },
                ].map(({ bg, label }) => (
                  <div key={label} className={`relative aspect-square bg-gradient-to-br ${bg} overflow-hidden group`}>
                    <div className="absolute inset-0 bg-forest-900/30 group-hover:bg-forest-900/10 transition-colors duration-300" />
                    <div className="absolute bottom-2 left-2">
                      <span className="text-cream-200 text-[10px] tracking-wider uppercase">{label}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-terracotta-400 py-16 text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <OliveBranch className="w-32 mx-auto text-white opacity-40" />
          <h2 className="font-serif text-3xl md:text-4xl text-white">
            Come and eat with us.
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            You don't have to be vegan. You don't have to agree with us.
            You just have to sit down and give the food a chance.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/reservations" className="btn-outline text-white border-white/60 hover:bg-white/10">
              Reserve a Table <ArrowRight size={16} />
            </Link>
            <Link to="/menu" className="bg-white text-terracotta-500 btn-primary hover:bg-cream-100">
              See the Menu
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
