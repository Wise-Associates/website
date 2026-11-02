import Image from 'next/image'
import Link from 'next/link'

// Logo officiel (cercle « WISE associates »), inversé en blanc sur fond sombre par la CSS.
export function Logo() {
  return (
    <Link href="/" className="brand" aria-label="Wise Associates, accueil">
      <Image src="/wise-logo.png" alt="" width={46} height={46} priority />
      <span>Wise Associates</span>
    </Link>
  )
}
