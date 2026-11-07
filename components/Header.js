'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { WA } from '@/lib/constants'
import { localePath } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function Header({ locale = 'fr', dict }) {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [destOpen, setDestOpen] = useState(false)
  const destRef = useRef(null)
  const t = dict?.nav || {}
  const waText = dict?.wa?.default || 'Bonjour, je souhaite réserver un véhicule'
  const lp = (p) => localePath(locale, p)

  const isActive = (href) => {
    const full = lp(href)
    if (href === '/') {
      return path === `/${locale}` || path === `/${locale}/` ? 'on' : ''
    }
    return path?.startsWith(full) ? 'on' : ''
  }

  const destActive =
    isActive('/merzouga') ||
    isActive('/marrakech') ||
    isActive('/casablanca') ||
    isActive('/agadir')

  useEffect(() => {
    setOpen(false)
    setDestOpen(false)
  }, [path])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close destinations dropdown on outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (destRef.current && !destRef.current.contains(e.target)) {
        setDestOpen(false)
      }
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  const destinations = [
    { href: '/merzouga', label: t.merzouga },
    { href: '/marrakech', label: t.marrakech },
    { href: '/casablanca', label: t.casablanca },
    { href: '/agadir', label: t.agadir },
  ]

  return (
    <header>
      <div className="wrap">
        <Link href={lp('/')} className="logo" onClick={() => setOpen(false)}>
          <img src="/images/logo.png" alt="Mamou Sahara" width={56} height={56} />
          <div>
            <b>MAMOU</b>
            <small>— SAHARA —</small>
          </div>
        </Link>

        <nav id="main-nav" className={open ? 'open' : ''} aria-label="Main">
          <Link href={lp('/')} className={isActive('/')} onClick={() => setOpen(false)}>
            {t.home}
          </Link>
          <Link href={lp('/vehicules')} className={isActive('/vehicules')} onClick={() => setOpen(false)}>
            {t.vehicles}
          </Link>

          {/* Destinations dropdown (desktop) + list (mobile) */}
          <div className={`nav-dropdown ${destOpen ? 'open' : ''} ${destActive ? 'on' : ''}`} ref={destRef}>
            <button
              type="button"
              className="nav-dropdown-btn"
              aria-expanded={destOpen}
              aria-haspopup="true"
              onClick={(e) => {
                e.stopPropagation()
                setDestOpen((v) => !v)
              }}
            >
              {t.destinations || 'Destinations'}
              <span className="nav-caret" aria-hidden="true">▾</span>
            </button>
            <div className="nav-dropdown-menu">
              {destinations.map((d) => (
                <Link
                  key={d.href}
                  href={lp(d.href)}
                  className={isActive(d.href)}
                  onClick={() => {
                    setOpen(false)
                    setDestOpen(false)
                  }}
                >
                  {d.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile-only flat destinations (visible when menu open on small screens) */}
          <div className="nav-dest-mobile">
            {destinations.map((d) => (
              <Link
                key={d.href}
                href={lp(d.href)}
                className={isActive(d.href)}
                onClick={() => setOpen(false)}
              >
                {d.label}
              </Link>
            ))}
          </div>

          <Link href={lp('/4x4')} className={isActive('/4x4')} onClick={() => setOpen(false)}>
            {t.fourByFour}
          </Link>
          <Link href={lp('/faq')} className={isActive('/faq')} onClick={() => setOpen(false)}>
            {t.faq}
          </Link>
          <Link href={lp('/blog')} className={isActive('/blog')} onClick={() => setOpen(false)}>
            {t.blog}
          </Link>
          <Link href={lp('/contact')} className={isActive('/contact')} onClick={() => setOpen(false)}>
            {t.contact}
          </Link>

          <div className="nav-lang">
            <LanguageSwitcher locale={locale} compact />
          </div>
        </nav>

        <div className="hdr-r">
          <div className="hdr-lang">
            <LanguageSwitcher locale={locale} compact />
          </div>
          <a
            className="btn-wa"
            href={`https://wa.me/${WA}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.book}
          >
            <svg aria-hidden="true"><use href="#wa" /></svg>
            <span>{t.book}</span>
          </a>
          <button
            type="button"
            className="burger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close' : 'Menu'}
            aria-expanded={open}
            aria-controls="main-nav"
          >
            {open ? (
              <span style={{ fontSize: 32, lineHeight: 1 }} aria-hidden="true">×</span>
            ) : (
              <span style={{ fontSize: 28, lineHeight: 1 }} aria-hidden="true">☰</span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
