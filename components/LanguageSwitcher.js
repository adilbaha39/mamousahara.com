'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localeNames } from '@/lib/i18n'

const shortNames = {
  fr: 'FR',
  en: 'EN',
  ar: 'AR',
  es: 'ES',
}

export default function LanguageSwitcher({ locale, compact = false }) {
  const pathname = usePathname() || '/'

  const segments = pathname.split('/')
  const maybeLocale = segments[1]
  const rest = locales.includes(maybeLocale)
    ? '/' + segments.slice(2).join('/')
    : pathname
  const pathWithoutLocale = rest === '/' ? '' : rest.replace(/\/$/, '')

  return (
    <div className={`lang-switch${compact ? ' compact' : ''}`} role="navigation" aria-label="Language">
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
            aria-current={active ? 'true' : undefined}
            title={localeNames[l]}
          >
            {compact ? shortNames[l] : localeNames[l]}
          </Link>
        )
      })}
    </div>
  )
}
