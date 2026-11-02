import type { CSSProperties } from 'react'

// Illustrations vectorielles dessinées pour le site : aucune photo, vidéo ni image de tiers.

// Fond du hero : halos qui dérivent lentement. Ce sont des calques HTML animés en CSS
// (transform), donc pris en charge par le GPU ; animer des éléments à l'intérieur d'un SVG
// forcerait le navigateur à tout repeindre à chaque image, ce qui ralentit le mobile.
export function HeroBackdrop() {
  return (
    <div className="hero__bg" aria-hidden="true">
      <span className="orb orb--1" />
      <span className="orb orb--2" />
      <span className="orb orb--3" />
    </div>
  )
}

const ringCenter = 320
const round = (value: number) => Math.round(value * 100) / 100

function polar(radius: number, degrees: number) {
  const radians = (degrees * Math.PI) / 180
  return [round(ringCenter + radius * Math.cos(radians)), round(ringCenter + radius * Math.sin(radians))]
}

// Arc de cercle entre deux angles (0° = 3 h, sens horaire). « reverse » le parcourt dans l'autre
// sens, pour que le texte posé dessus reste lisible dans la moitié basse de l'anneau.
function arc(radius: number, from: number, to: number, reverse = false) {
  const [x1, y1] = polar(radius, reverse ? to : from)
  const [x2, y2] = polar(radius, reverse ? from : to)
  const largeArc = to - from > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} ${reverse ? 0 : 1} ${x2} ${y2}`
}

type RingSegment = { key: 'risk' | 'efficiency' | 'strategy'; label: string }

// « L'anneau Wise » : le cercle du logo, partagé en trois arcs qui sont les trois offres du
// cabinet. Chaque arc reprend la couleur du panneau de l'offre plus bas dans la page.
// Les arcs se tracent une seule fois au chargement ; l'image reste ensuite immobile.
export function HeroRing({ segments }: { segments: readonly RingSegment[] }) {
  const span = 360 / segments.length
  const gap = 12
  return (
    <svg className="ring" viewBox="0 0 640 640" aria-hidden="true">
      <circle className="ring__inner" cx={ringCenter} cy={ringCenter} r="196" />
      <g className="ring__ticks">
        {Array.from({ length: 72 }, (_, index) => {
          const angle = index * 5
          const major = index % 6 === 0
          const [x1, y1] = polar(major ? 206 : 212, angle)
          const [x2, y2] = polar(222, angle)
          return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} className={major ? 'ring__tick--major' : undefined} />
        })}
      </g>
      {segments.map((segment, index) => {
        const from = -90 + index * span + gap / 2
        const to = from + span - gap
        const middle = (from + to) / 2
        // Dans la moitié basse, le texte suit l'arc à l'envers pour rester à l'endroit.
        const lower = middle > 0 && middle < 180
        return (
          <g key={segment.key} className={`ring__segment ring__segment--${segment.key}`} style={{ '--i': index } as CSSProperties}>
            <path className="ring__arc" d={arc(262, from, to)} pathLength={1} />
            <path id={`ring-label-${segment.key}`} d={arc(lower ? 296 : 284, from, to, lower)} fill="none" />
            <text className="ring__label">
              <textPath href={`#ring-label-${segment.key}`} startOffset="50%" textAnchor="middle">
                {segment.label}
              </textPath>
            </text>
          </g>
        )
      })}
      <image className="ring__logo" href="/wise-logo.png" x="245" y="245" width="150" height="150" />
    </svg>
  )
}

export function IntroArt() {
  return (
    <svg viewBox="0 0 630 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="intro-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--art-mist-1)" />
          <stop offset="1" stopColor="var(--art-mist-2)" />
        </linearGradient>
        <linearGradient id="intro-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--art-graphite)" />
          <stop offset="1" stopColor="var(--black)" />
        </linearGradient>
      </defs>
      <rect width="630" height="400" fill="url(#intro-bg)" />
      <ellipse cx="330" cy="330" rx="230" ry="26" fill="var(--black)" opacity="0.08" />
      {/* Anneau inspiré du cercle du logo Wise Associates. */}
      <ellipse cx="250" cy="225" rx="96" ry="112" fill="none" stroke="url(#intro-side)" strokeWidth="26" />
      <ellipse cx="250" cy="225" rx="96" ry="112" fill="none" stroke="var(--art-stone)" strokeWidth="2" />
      <g fill="url(#intro-side)">
        <polygon points="330,140 380,118 420,210 370,232" />
        <polygon points="390,112 440,90 480,182 430,204" />
        <polygon points="450,84 500,62 540,154 490,176" />
      </g>
      <g stroke="var(--black)" strokeWidth="1.4">
        <line x1="120" y1="300" x2="560" y2="60" />
        <line x1="150" y1="340" x2="590" y2="120" />
        <line x1="200" y1="360" x2="600" y2="160" />
      </g>
    </svg>
  )
}

const emblemPaths = {
  risk: 'M36 10l20 7.5v14c0 11.2-8.4 20.5-20 22.5-11.6-2-20-11.3-20-22.5v-14L36 10Z M28 35l6 6 11-12',
  efficiency: 'M18 52V34 M30 52V24 M42 52V30 M54 52V18 M14 56h44',
  strategy: 'M36 14v8 M36 50v8 M14 36h8 M50 36h8 M36 26a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z',
} as const

export function ServiceEmblem({ name, label }: { name: keyof typeof emblemPaths; label: string }) {
  return (
    <div className="service__emblem" aria-hidden="true">
      <svg viewBox="0 0 72 72">
        <circle cx="36" cy="36" r="33" fill="none" stroke="var(--tone)" strokeWidth="3" />
        <path d={emblemPaths[name]} fill="none" stroke="var(--text-on-dark)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{label}</span>
    </div>
  )
}

const coverPalettes = [
  ['var(--brand-deep)', 'var(--art-green)', 'var(--accent)'],
  ['var(--black)', 'var(--art-slate)', 'var(--art-slate-light)'],
  ['var(--ink-2)', 'var(--art-amber)', 'var(--art-amber-light)'],
  ['var(--black)', 'var(--brand)', 'var(--accent)'],
] as const

export function CoverArt({ variant }: { variant: number }) {
  const [base, mid, light] = coverPalettes[variant % coverPalettes.length]
  const id = `cover-${variant}`
  return (
    <svg viewBox="0 0 392 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="70%" cy="40%" r="80%">
          <stop offset="0" stopColor={mid} />
          <stop offset="1" stopColor={base} />
        </radialGradient>
      </defs>
      <rect width="392" height="200" fill={`url(#${id})`} />
      <g fill="none" stroke={light} strokeOpacity="0.55">
        {variant % 2 === 0 ? (
          <>
            <rect x="200" y="40" width="90" height="90" transform="rotate(20 245 85)" />
            <rect x="225" y="65" width="90" height="90" transform="rotate(32 270 110)" strokeOpacity="0.35" />
            <rect x="250" y="90" width="90" height="90" transform="rotate(44 295 135)" strokeOpacity="0.2" />
          </>
        ) : (
          <>
            <path d="M0 160 L70 120 L130 138 L200 80 L262 96 L392 30" strokeWidth="2" />
            <path d="M0 180 L70 150 L130 160 L200 120 L262 128 L392 80" strokeOpacity="0.3" />
          </>
        )}
      </g>
    </svg>
  )
}

export function OrbitArt({ labels }: { labels: readonly string[] }) {
  const cx = 327
  const cy = 320
  const radius = 210
  return (
    <svg viewBox="0 0 654 640" aria-hidden="true">
      <circle cx={cx} cy={cy} r="228" fill="none" stroke="var(--accent)" strokeOpacity="0.8" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="180" fill="none" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="2" />
      <g className="orbit">
        {labels.map((label, index) => {
          const angle = (index / labels.length) * Math.PI * 2 - Math.PI / 2
          const x = cx + Math.cos(angle) * radius
          const y = cy + Math.sin(angle) * radius
          return (
            <g key={label}>
              <circle cx={x} cy={y} r="52" fill="var(--brand)" stroke="var(--black)" strokeWidth="6" />
              <text
                x={x}
                y={y}
                fill="var(--text-on-dark)"
                fontFamily="var(--font-sans)"
                fontSize="16"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {label.length > 12 ? (
                  <>
                    <tspan x={x} dy="-0.6em">
                      {label.split(' ').slice(0, Math.ceil(label.split(' ').length / 2)).join(' ')}
                    </tspan>
                    <tspan x={x} dy="1.2em">
                      {label.split(' ').slice(Math.ceil(label.split(' ').length / 2)).join(' ')}
                    </tspan>
                  </>
                ) : (
                  label
                )}
              </text>
            </g>
          )
        })}
      </g>
      <text
        x={cx}
        y={cy}
        fill="var(--text-on-dark)"
        fontFamily="var(--font-display)"
        fontSize="30"
        fontWeight="600"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        WISE
      </text>
    </svg>
  )
}

export function FeatureArt() {
  return (
    <svg viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="feature-bg" cx="60%" cy="45%" r="75%">
          <stop offset="0" stopColor="var(--art-green)" />
          <stop offset="1" stopColor="var(--black)" />
        </radialGradient>
      </defs>
      <rect width="600" height="500" fill="url(#feature-bg)" />
      <g fill="none" stroke="var(--accent)" strokeOpacity="0.4">
        <circle cx="300" cy="250" r="90" />
        <circle cx="300" cy="250" r="160" />
        <circle cx="300" cy="250" r="230" strokeDasharray="3 9" />
      </g>
      {/* Paris relié à la région Middle East Africa. */}
      <path d="M210 170 Q 330 160 420 330" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="6 6" />
      <circle cx="210" cy="170" r="9" fill="var(--text-on-dark)" />
      <circle cx="420" cy="330" r="9" fill="var(--accent)" />
      <text x="228" y="160" fill="var(--text-on-dark)" fontFamily="var(--font-sans)" fontSize="18" fontWeight="500">
        Paris
      </text>
      <text x="300" y="368" fill="var(--text-on-dark)" fontFamily="var(--font-sans)" fontSize="18" fontWeight="500">
        Middle East Africa
      </text>
    </svg>
  )
}
