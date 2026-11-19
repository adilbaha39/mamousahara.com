'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { locales, localeNames } from '@/lib/i18n'

const shortNames = {
  fr: 'FR',
  en: 'EN',
  ar: 'AR',
  es: 'ES',
}

export default function LanguageSwitcher({ locale, compact = false }) {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const segments = pathname.split('/')
  const maybeLocale = segments[1]
  const rest = locales.includes(maybeLocale)
    ? '/' + segments.slice(2).join('/')
    : pathname
  const pathWithoutLocale = rest === '/' ? '' : rest.replace(/\/$/, '')

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const currentLabel = compact ? shortNames[locale] || locale.toUpperCase() : localeNames[locale] || locale

  return (
    <div className="lang-dropdown" ref={ref}>
      <button
        type="button"
        className="lang-btn"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Language"
      >
        <span className="lang-current">{currentLabel}</span>
        <span className={`lang-caret ${open ? 'open' : ''}`} aria-hidden="true">▾</span>
      </button>

      {open && (
        <div className="lang-menu" role="menu">
          {locales.map((l) => {
            const href = `/${l}${pathWithoutLocale}`
            const active = l === locale
            return (
              <Link
                key={l}
                href={href}
                className={active ? 'on' : ''}
                hrefLang={l}
                lang={l}
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                {localeNames[l]}
                {active && <span className="check" aria-hidden="true">✓</span>}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
