'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { expertises } from '@/content/site'
import { Caret, Mail, Menu } from './Icons'
import { Logo } from './Logo'

type NavMenu = { id: string; label: string; links: { href: string; label: string }[] }

const menus: NavMenu[] = [
  {
    id: 'expertises',
    label: 'Nos expertises',
    links: [
      { href: '/expertises', label: 'Toutes nos expertises' },
      ...expertises.map((expertise) => ({ href: `/expertises/${expertise.slug}`, label: expertise.title })),
    ],
  },
  {
    id: 'cabinet',
    label: 'À propos',
    links: [
      { href: '/a-propos', label: 'Wise Associates en bref' },
      { href: '/contact', label: 'Nos bureaux et contacts' },
    ],
  },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  const navRef = useRef<HTMLElement>(null)

  // Referme les menus à chaque changement de page.
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
    setOpenMenu(null)
  }

  // L'en-tête est translucide sur le hero, puis devient opaque au défilement.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null)
        setOpen(false)
      }
    }
    const onClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="site-header" data-solid={scrolled || open}>
      <div className="container site-header__inner">
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
        <Logo />
        <nav id="site-nav" ref={navRef} className="nav" data-open={open} aria-label="Navigation principale">
          <ul className="nav__list">
            <li className="nav__item">
              <Link
                href="/publications"
                className="nav__link"
                aria-current={isCurrent('/publications') ? 'page' : undefined}
              >
                Nos publications
              </Link>
            </li>
            {menus.map((menu) => (
              <li key={menu.id} className="nav__item">
                <button
                  type="button"
                  className="nav__link"
                  aria-expanded={openMenu === menu.id}
                  aria-controls={`menu-${menu.id}`}
                  onClick={() => setOpenMenu((current) => (current === menu.id ? null : menu.id))}
                >
                  {menu.label}
                  <Caret />
                </button>
                <div id={`menu-${menu.id}`} className="dropdown" hidden={openMenu !== menu.id}>
                  {menu.links.map((link) => (
                    <Link key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
            <li className="nav__item">
              <Link
                href="/recrutement"
                className="nav__link"
                aria-current={isCurrent('/recrutement') ? 'page' : undefined}
              >
                Nous rejoindre
              </Link>
            </li>
          </ul>
          <div className="nav__actions">
            <Link href="/contact" className="icon-link" aria-label="Nous contacter">
              <Mail />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
