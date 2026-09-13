export function HerbSprig({ className = '' }) {
  return (
    <svg viewBox="0 0 80 180" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 175 Q39 140 37 110 Q35 80 38 20" strokeWidth="1.2" />
      <path d="M37 145 Q18 128 10 108 Q28 114 37 130" strokeWidth="0.9" fill="currentColor" fillOpacity="0.25" />
      <path d="M36 118 Q15 100 8 78  Q28 86  36 103" strokeWidth="0.9" fill="currentColor" fillOpacity="0.25" />
      <path d="M36 90  Q16 70  10 48  Q30 58  37 76"  strokeWidth="0.9" fill="currentColor" fillOpacity="0.25" />
      <path d="M38 150 Q58 133 66 112 Q48 118 39 136" strokeWidth="0.9" fill="currentColor" fillOpacity="0.25" />
      <path d="M37 122 Q56 103 63 80  Q44 88  38 106" strokeWidth="0.9" fill="currentColor" fillOpacity="0.25" />
      <path d="M37 94  Q55 72  61 48  Q43 58  38 78"  strokeWidth="0.9" fill="currentColor" fillOpacity="0.25" />
      <circle cx="38" cy="20" r="2.5" fill="currentColor" fillOpacity="0.6" />
    </svg>
  )
}

export function OliveBranch({ className = '' }) {
  return (
    <svg viewBox="0 0 220 80" className={className} fill="none" stroke="currentColor" strokeLinecap="round">
      <path d="M10 40 Q60 20 110 40 Q160 60 210 40" strokeWidth="1.2" />
      <ellipse cx="35"  cy="28" rx="10" ry="5" transform="rotate(-30 35 28)"  fill="currentColor" fillOpacity="0.3" strokeWidth="0.8" />
      <ellipse cx="60"  cy="22" rx="10" ry="5" transform="rotate(-15 60 22)"  fill="currentColor" fillOpacity="0.3" strokeWidth="0.8" />
      <ellipse cx="85"  cy="24" rx="10" ry="5" transform="rotate(5 85 24)"    fill="currentColor" fillOpacity="0.3" strokeWidth="0.8" />
      <ellipse cx="110" cy="38" rx="10" ry="5" transform="rotate(0 110 38)"   fill="currentColor" fillOpacity="0.3" strokeWidth="0.8" />
      <ellipse cx="135" cy="50" rx="10" ry="5" transform="rotate(-5 135 50)"  fill="currentColor" fillOpacity="0.3" strokeWidth="0.8" />
      <ellipse cx="160" cy="52" rx="10" ry="5" transform="rotate(15 160 52)"  fill="currentColor" fillOpacity="0.3" strokeWidth="0.8" />
      <ellipse cx="185" cy="46" rx="10" ry="5" transform="rotate(30 185 46)"  fill="currentColor" fillOpacity="0.3" strokeWidth="0.8" />
      <circle cx="35"  cy="34" r="3.5" fill="currentColor" fillOpacity="0.5" strokeWidth="0" />
      <circle cx="85"  cy="30" r="3"   fill="currentColor" fillOpacity="0.5" strokeWidth="0" />
      <circle cx="160" cy="58" r="3.5" fill="currentColor" fillOpacity="0.5" strokeWidth="0" />
    </svg>
  )
}

export function MilitaryStar({ className = '' }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="currentColor">
      <polygon
        points="30,2 33,24 54,18 36,32 54,46 33,40 30,62 27,40 6,46 24,32 6,18 27,24"
        fillOpacity="0.8"
      />
      <circle cx="30" cy="30" r="4" fill="white" fillOpacity="0.6" />
    </svg>
  )
}

export function LeafCluster({ className = '' }) {
  return (
    <svg viewBox="0 0 160 160" className={className} fill="none" stroke="currentColor" strokeLinecap="round">
      <path d="M80 150 Q78 100 70 60 Q60 20 80 5" strokeWidth="1.5" />
      <path d="M70 110 Q30 90 15 60 Q50 70 70 95" fill="currentColor" fillOpacity="0.2" strokeWidth="1" />
      <path d="M72 80  Q32 58 20 28 Q56 40 73 65"  fill="currentColor" fillOpacity="0.2" strokeWidth="1" />
      <path d="M73 120 Q115 100 128 70 Q92 80 74 108" fill="currentColor" fillOpacity="0.2" strokeWidth="1" />
      <path d="M72 88  Q112 64  122 32 Q88 48 73 74"  fill="currentColor" fillOpacity="0.2" strokeWidth="1" />
      <path d="M74 55  Q100 30  110 10 Q84 28 75 48"  fill="currentColor" fillOpacity="0.2" strokeWidth="1" />
    </svg>
  )
}

export function CircleOrnament({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
      <circle cx="50" cy="50" r="44" strokeWidth="0.8" strokeDasharray="4 4" />
      <circle cx="50" cy="50" r="36" strokeWidth="0.5" />
      <path d="M50 6 L50 14 M50 86 L50 94 M6 50 L14 50 M86 50 L94 50" strokeWidth="1.2" />
      <path d="M21 21 L27 27 M73 73 L79 79 M79 21 L73 27 M27 73 L21 79" strokeWidth="1" />
      <circle cx="50" cy="50" r="4" fill="currentColor" fillOpacity="0.6" />
    </svg>
  )
}
