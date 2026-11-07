import { NextResponse } from 'next/server'

const locales = ['fr', 'en', 'ar', 'es']
const defaultLocale = 'fr'

function getLocale(request) {
  const { pathname } = request.nextUrl
  const segment = pathname.split('/')[1]
  if (locales.includes(segment)) return segment

  const accept = request.headers.get('accept-language') || ''
  const preferred = accept
    .split(',')
    .map((p) => p.split(';')[0].trim().slice(0, 2).toLowerCase())
  for (const code of preferred) {
    if (locales.includes(code)) return code
  }
  return defaultLocale
}

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Skip static, API, admin dashboard, Next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  const locale = getLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|images|api|admin|.*\\..*).*)'],
}
