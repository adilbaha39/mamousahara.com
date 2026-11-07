import Link from 'next/link'
import { WA } from '@/lib/constants'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getDictionary, localePath, isValidLocale, defaultLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: dict.fourByFour.metaTitle,
    description: dict.fourByFour.metaDescription,
    alternates: { canonical: `https://mamou-sahara.com/${locale}/4x4` },
  }
}

export default async function QuatreX4Page({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale)
  const t = dict.fourByFour
  const lp = (p) => localePath(locale, p)

  return (
    <>
      <section className="hero hero-4x4 hero-sm">
        <div className="wrap">
          <Breadcrumbs items={[{ name: dict.nav.home, url: lp('/') }, { name: dict.nav.fourByFour }]} />
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="serif">{t.title}</h1>
          <p className="sub">{t.subtitle}</p>
          <div className="cta">
            <a className="btn-wa" href={`https://wa.me/${WA}?text=${encodeURIComponent(dict.wa.fourByFour)}`} target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true"><use href="#wa" /></svg>
              {t.bookCta}
            </a>
            <Link className="round" href={lp('/vehicule')} aria-label="Raptor">
              <svg className="i" aria-hidden="true"><use href="#arrow" /></svg>
            </Link>
          </div>
        </div>
        <div className="hero-edge" />
      </section>
      <section className="content-section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <h2 className="serif" style={{ marginBottom: 20, marginTop: 0 }}>{t.whenTitle}</h2>
          <p>{t.whenP1}</p>
          <h2 className="serif" style={{ marginBottom: 16, marginTop: 40 }}>{t.recommendedTitle}</h2>
          <ul style={{ lineHeight: 1.9, marginBottom: 28 }}>
            <li><Link href={lp('/vehicule')}><strong>{dict.fleet.raptor.name}</strong></Link></li>
            <li><strong>{dict.fleet.rav4.name}</strong> · {dict.fleet.troc.name}</li>
          </ul>
          <h2 className="serif" style={{ marginBottom: 16 }}>{t.pickupTitle}</h2>
          <p>{t.pickupText}</p>
          <a className="btn-wa" href={`https://wa.me/${WA}?text=${encodeURIComponent(dict.wa.fourByFour)}`} target="_blank" rel="noopener noreferrer" style={{ marginTop: 12 }}>
            <svg aria-hidden="true"><use href="#wa" /></svg>
            {t.askCta}
          </a>
        </div>
      </section>
    </>
  )
}
