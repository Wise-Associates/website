import Link from 'next/link'
import type { ReactNode } from 'react'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbLd } from '@/lib/structured-data'

type Crumb = { href: string; label: string }

export function PageHero({
  eyebrow,
  title,
  path,
  lead,
  crumbs = [],
  children,
}: {
  eyebrow: string
  title: string
  // Chemin de la page courante, pour le fil d'Ariane lu par les moteurs de recherche.
  path: string
  lead?: string
  crumbs?: Crumb[]
  children?: ReactNode
}) {
  const trail = [
    { name: 'Accueil', path: '/' },
    ...crumbs.map((crumb) => ({ name: crumb.label, path: crumb.href })),
    { name: title, path },
  ]
  return (
    <section className="page-hero">
      <JsonLd data={breadcrumbLd(trail)} />
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
