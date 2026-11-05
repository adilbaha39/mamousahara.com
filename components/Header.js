'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { WA } from '@/lib/constants'

export default function Header() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href) => (path === href ? 'on' : '')

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [path])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header>
      <div className="wrap">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <img src="/images/logo.png" alt="Mamou Sahara – Location voiture Errachidia Merzouga" width={68} height={68} />
          <div>
            <b>MAMOU</b>
            <small>— SAHARA —</small>
          </div>
        </Link>

        <nav className={open ? 'open' : ''} aria-label="Navigation principale">
          <Link href="/" className={isActive('/')}>Accueil</Link>
          <Link href="/vehicules" className={isActive('/vehicules')}>Véhicules</Link>
          <Link href="/merzouga" className={isActive('/merzouga')}>Merzouga</Link>
          <Link href="/4x4" className={isActive('/4x4')}>4x4</Link>
          <Link href="/faq" className={isActive('/faq')}>FAQ</Link>
          <Link href="/blog" className={isActive('/blog')}>Blog</Link>
          <Link href="/contact" className={isActive('/contact')}>Contact</Link>
        </nav>

        <div className="hdr-r">
          <a
            className="btn-wa"
            href={`https://wa.me/${WA}?text=${encodeURIComponent('Bonjour, je souhaite réserver un véhicule')}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Réserver sur WhatsApp"
          >
            <svg aria-hidden="true"><use href="#wa"/></svg>
            <span>Réserver</span>
          </a>
          <button
            className="burger"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
          >
            {open ? '×' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}
