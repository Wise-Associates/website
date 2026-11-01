// Illustrations vectorielles générées dans le code : aucune image externe ni photo à licencier.

export function HeroArt() {
  return (
    <svg className="hero__bg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="hero-glow" cx="78%" cy="20%" r="60%">
          <stop offset="0" stopColor="#2f6bff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0b1626" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hero-glow-2" cx="10%" cy="100%" r="50%">
          <stop offset="0" stopColor="#c9a35b" stopOpacity="0.22" />
          <stop offset="1" stopColor="#0b1626" stopOpacity="0" />
        </radialGradient>
        <pattern id="hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0H0V56" fill="none" stroke="#ffffff" strokeOpacity="0.05" />
        </pattern>
      </defs>
      <rect width="1440" height="800" fill="#0b1626" />
      <rect width="1440" height="800" fill="url(#hero-grid)" />
      <rect width="1440" height="800" fill="url(#hero-glow)" />
      <rect width="1440" height="800" fill="url(#hero-glow-2)" />
      <g fill="none" stroke="#ffffff" strokeOpacity="0.14">
        <circle cx="1160" cy="260" r="180" />
        <circle cx="1160" cy="260" r="280" />
        <circle cx="1160" cy="260" r="380" strokeDasharray="4 10" />
      </g>
      <path
        d="M760 640 C 900 600, 960 470, 1080 470 S 1260 360, 1440 300"
        fill="none"
        stroke="#c9a35b"
        strokeWidth="2"
        strokeOpacity="0.7"
      />
      <circle cx="1080" cy="470" r="6" fill="#c9a35b" />
    </svg>
  )
}

const palettes = [
  ['#13233b', '#2f6bff'],
  ['#1d3352', '#c9a35b'],
  ['#0b1626', '#4f86ff'],
  ['#13233b', '#6aa29a'],
] as const

export function CoverArt({ variant }: { variant: number }) {
  const [base, tone] = palettes[variant % palettes.length]
  const id = `cover-${variant}`
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={base} />
          <stop offset="1" stopColor={tone} />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill={`url(#${id})`} />
      <g fill="none" stroke="#fff" strokeOpacity="0.22">
        {variant % 2 === 0 ? (
          <>
            <circle cx="320" cy="60" r="70" />
            <circle cx="320" cy="60" r="110" />
          </>
        ) : (
          <path d="M0 180 L80 140 L150 160 L230 90 L300 110 L400 40" strokeWidth="2" />
        )}
      </g>
    </svg>
  )
}

export function FeatureArt() {
  return (
    <svg viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="feature-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d3352" />
          <stop offset="1" stopColor="#2f6bff" />
        </linearGradient>
      </defs>
      <rect width="600" height="500" fill="url(#feature-bg)" />
      <g fill="none" stroke="#fff" strokeOpacity="0.25">
        <circle cx="300" cy="250" r="90" />
        <circle cx="300" cy="250" r="160" />
        <circle cx="300" cy="250" r="230" strokeDasharray="3 9" />
      </g>
      {/* Paris relié à la région Middle East Africa. */}
      <path d="M210 170 Q 330 160 420 330" fill="none" stroke="#c9a35b" strokeWidth="2.5" strokeDasharray="6 6" />
      <circle cx="210" cy="170" r="9" fill="#fff" />
      <circle cx="420" cy="330" r="9" fill="#c9a35b" />
      <text x="228" y="160" fill="#fff" fontFamily="sans-serif" fontSize="18" fontWeight="600">
        Paris
      </text>
      <text x="300" y="368" fill="#fff" fontFamily="sans-serif" fontSize="18" fontWeight="600">
        Middle East Africa
      </text>
    </svg>
  )
}
