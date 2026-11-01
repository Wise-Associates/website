import Link from 'next/link'

// Monogramme provisoire : remplacer par le logo officiel (fichier SVG dans /public) dès qu'il est fourni.
export function Logo() {
  return (
    <Link href="/" className="brand" aria-label="Wise Associates, accueil">
      <svg className="brand__mark" viewBox="0 0 36 36" aria-hidden="true">
        <rect width="36" height="36" rx="9" fill="var(--accent)" />
        <path
          d="M8 11l4.2 14L18 13.5 23.8 25 28 11"
          fill="none"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        Wise Associates
        <small>Conseil en management</small>
      </span>
    </Link>
  )
}
