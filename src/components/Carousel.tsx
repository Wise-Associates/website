'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from './Icons'

// Défilement horizontal natif (scroll-snap) : fonctionne au doigt, au trackpad et au clavier ;
// les boutons ne font que déplacer la piste d'une carte.
export function Carousel({ label, children }: { label: string; children: ReactNode }) {
  const track = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const move = (direction: 1 | -1) => {
    const el = track.current
    const first = el?.firstElementChild as HTMLElement | null
    if (!el || !first) return
    el.scrollBy({ left: direction * (first.offsetWidth + 24), behavior: 'smooth' })
  }

  return (
    <div className="carousel" role="region" aria-roledescription="carrousel" aria-label={label}>
      <div className="carousel__controls" style={{ justifyContent: 'flex-end', marginBottom: 'var(--space-5)' }}>
        <button type="button" className="icon-btn" onClick={() => move(-1)} disabled={!canPrev}>
          <ArrowLeft />
          <span className="visually-hidden">Précédent</span>
        </button>
        <button type="button" className="icon-btn" onClick={() => move(1)} disabled={!canNext}>
          <ArrowRight />
          <span className="visually-hidden">Suivant</span>
        </button>
      </div>
      <ul className="carousel__track" ref={track} tabIndex={0}>
        {children}
      </ul>
    </div>
  )
}
