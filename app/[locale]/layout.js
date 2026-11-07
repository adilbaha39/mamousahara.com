import { Inter, Playfair_Display, Noto_Sans_Arabic } from 'next/font/google'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/constants'
import { organizationSchema } from '@/lib/schema'
import {
  locales,
  defaultLocale,
  isValidLocale,
  localeDirs,
  getDictionary,
} from '@/lib/i18n'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-playfair',
  display: 'swap',
})
const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.defaultTitle,
      template: `%s | ${dict.meta.siteName}`,
    },
    description: dict.meta.defaultDescription,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}`])
      ),
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_MA' : locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : 'fr_FR',
      url: `${SITE_URL}/${locale}`,
      siteName: dict.meta.siteName,
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
      images: [
        {
          url: '/images/location-voiture-sahara-maroc-hero.webp',
          width: 1200,
          height: 630,
          alt: dict.meta.siteName,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [{ url: '/images/logo.png', type: 'image/png' }],
      apple: [{ url: '/images/logo.png', type: 'image/png' }],
    },
  }
}

export default async function LocaleLayout({ children, params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale)
  const dir = localeDirs[locale] || 'ltr'

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {locales.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`${SITE_URL}/${l}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/fr`} />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${notoArabic.variable}${locale === 'ar' ? ' font-ar' : ''}`}>
        <Header locale={locale} dict={dict} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict} />
        <svg
          aria-hidden="true"
          focusable="false"
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            overflow: 'hidden',
            visibility: 'hidden',
          }}
        >
          <symbol id="wa" viewBox="0 0 24 24">
            <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.7-2.7-1.3-3.7-2.9-.3-.5.3-.5.8-1.5.1-.2 0-.4-.1-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 1.8.8 2.5.8 3.4.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.1-1.3-.1-.1-.3-.2-.6-.3z"/>
            <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3C4.4 15 4 13.5 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8.2-8 8.2z"/>
          </symbol>
          <symbol id="arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
          <symbol id="plane" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.8-.7-1.5-1.5-1.5S10 2.7 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></symbol>
          <symbol id="clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></symbol>
          <symbol id="bolt" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></symbol>
          <symbol id="pin" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></symbol>
          <symbol id="phone" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2.1z"/></symbol>
          <symbol id="mail" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></symbol>
          <symbol id="car" viewBox="0 0 24 24"><path d="M5 17h14v2H5zM7 9l2-4h6l2 4"/><path d="M5 9h14l1 5H4l1-5z"/><circle cx="7.5" cy="14" r="1.5"/><circle cx="16.5" cy="14" r="1.5"/></symbol>
          <symbol id="shield" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></symbol>
          <symbol id="check" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></symbol>
          <symbol id="star" viewBox="0 0 24 24"><path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 7-6.2-3.3L5.8 21 7 14.2 2 9.3l6.9-1z"/></symbol>
          <symbol id="cal" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></symbol>
          <symbol id="doc" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></symbol>
        </svg>
      </body>
    </html>
  )
}
