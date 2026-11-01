'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { expertises, navigation } from '@/content/site'
import { Chevron, Menu } from './Icons'
import { Logo } from './Logo'

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)

  // Referme le menu mobile à chaque changement de page.
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo />
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <Menu open={open} />
          <span className="visually-hidden">{open ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
        </button>
        <nav id="site-nav" className="nav" data-open={open} aria-label="Navigation principale">
          <ul className="nav__list">
            {navigation.map((item) => (
              <li key={item.href} className="nav__item">
                <Link
                  href={item.href}
                  className="nav__link"
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                >
                  {item.label}
                  {item.href === '/expertises' && <Chevron />}
                </Link>
                {item.href === '/expertises' && (
                  <div className="mega">
                    {expertises.map((expertise) => (
                      <Link key={expertise.slug} href={`/expertises/${expertise.slug}`}>
                        <strong>{expertise.title}</strong>
                        <span>{expertise.short}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn btn--primary">
            Nous contacter
          </Link>
        </nav>
      </div>
    </header>
  )
}
