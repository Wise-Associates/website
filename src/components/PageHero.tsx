import Link from 'next/link'
import type { ReactNode } from 'react'

type Crumb = { href: string; label: string }

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs = [],
  children,
}: {
  eyebrow: string
  title: string
  lead?: string
  crumbs?: Crumb[]
  children?: ReactNode
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <nav aria-label="Fil d’Ariane">
          <ol className="breadcrumb">
            <li>
              <Link href="/">Accueil</Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.href}>
                <Link href={crumb.href}>{crumb.label}</Link>
              </li>
            ))}
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  )
}
