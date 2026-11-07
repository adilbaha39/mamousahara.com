export const locales = ['fr', 'en', 'ar', 'es']
export const defaultLocale = 'fr'

export const localeNames = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية',
  es: 'Español',
}

export const localeDirs = {
  fr: 'ltr',
  en: 'ltr',
  ar: 'rtl',
  es: 'ltr',
}

export function isValidLocale(locale) {
  return locales.includes(locale)
}

export async function getDictionary(locale) {
  const safe = isValidLocale(locale) ? locale : defaultLocale
  try {
    const dict = await import(`../messages/${safe}.json`)
    return dict.default || dict
  } catch {
    const fallback = await import(`../messages/${defaultLocale}.json`)
    return fallback.default || fallback
  }
}

/** Build localized path: /fr/vehicules, /ar/merzouga, etc. */
export function localePath(locale, path = '') {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (clean === '/') return `/${locale}`
  return `/${locale}${clean}`
}
