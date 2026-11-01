import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ display: 'grid', gap: 'var(--space-5)', justifyItems: 'start' }}>
        <p className="eyebrow">Erreur 404</p>
        <h1 className="h2">Cette page n’existe pas ou a été déplacée</h1>
        <Link href="/" className="btn btn--primary">
          Retour à l’accueil
        </Link>
      </div>
    </section>
  )
}
