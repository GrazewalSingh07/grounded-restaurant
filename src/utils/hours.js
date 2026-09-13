// Restaurant schedule — day index: 0=Sun, 1=Mon … 6=Sat
const SCHEDULE = {
  2: { open: 17, close: 22 }, // Tuesday
  3: { open: 17, close: 22 }, // Wednesday
  4: { open: 17, close: 22 }, // Thursday
  5: { open: 17, close: 22 }, // Friday
  6: { open: 17, close: 22 }, // Saturday
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function fmt12(h) {
  if (h === 12) return '12 PM'
  if (h === 0)  return '12 AM'
  return h < 12 ? `${h} AM` : `${h - 12} PM`
}

/**
 * Returns the current restaurant status based on local time.
 * @returns {{
 *   status: 'open' | 'opening-today' | 'closed',
 *   badge:  string,   // short label for the nav/hero badge
 *   sub:    string,   // supporting detail line
 *   dot:    string,   // Tailwind bg color class for the pulsing dot
 * }}
 */
export function getRestaurantStatus() {
  const now   = new Date()
  const day   = now.getDay()
  const hour  = now.getHours() + now.getMinutes() / 60
  const hours = SCHEDULE[day]

  // Open right now
  if (hours && hour >= hours.open && hour < hours.close) {
    const minsLeft = Math.round((hours.close - hour) * 60)
    return {
      status: 'open',
      badge:  'Open Now',
      sub:    minsLeft <= 60 ? `Last orders in ${minsLeft} min` : `Closes at ${fmt12(hours.close)}`,
      dot:    'bg-emerald-400',
    }
  }

  // Opens later today
  if (hours && hour < hours.open) {
    const minsUntil = Math.round((hours.open - hour) * 60)
    return {
      status: 'opening-today',
      badge:  'Opening Tonight',
      sub:    minsUntil <= 90
        ? `Doors open in ${minsUntil} min · ${fmt12(hours.open)}`
        : `Doors open at ${fmt12(hours.open)}`,
      dot: 'bg-amber-400',
    }
  }

  // Closed — find next service day
  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = (day + offset) % 7
    if (SCHEDULE[nextDay]) {
      const name = offset === 1 ? 'Tomorrow' : DAY_NAMES[nextDay]
      return {
        status: 'closed',
        badge:  'Closed Today',
        sub:    `Next service: ${name} at ${fmt12(SCHEDULE[nextDay].open)}`,
        dot:    'bg-rose-400',
      }
    }
  }

  return { status: 'closed', badge: 'Closed', sub: 'Tue – Sat · 5 PM – 10 PM', dot: 'bg-rose-400' }
}
