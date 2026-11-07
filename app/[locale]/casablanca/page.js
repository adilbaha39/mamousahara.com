import Link from 'next/link'
import { WA } from '@/lib/constants'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getDictionary, localePath, isValidLocale, defaultLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  const t = dict.casablanca
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `https://mamou-sahara.com/${locale}/casablanca` },
  }
}

export default async function Page({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale)
  const t = dict.casablanca
  const lp = (p) => localePath(locale, p)
  const waMsg = dict.wa.casablanca

  return (
    <>
      <section className="hero hero-sm">
        <div className="wrap">
          <Breadcrumbs items={[{ name: dict.nav.home, url: lp('/') }, { name: dict.nav.casablanca || t.title }]} />
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="serif">{t.title}</h1>
          <p className="sub">{t.subtitle}</p>
          <div className="cta">
            <a className="btn-wa" href={`https://wa.me/${WA}?text=${encodeURIComponent(waMsg)}`} target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true"><use href="#wa" /></svg>
              {t.bookCta}
            </a>
            <Link className="round" href={lp('/vehicules')} aria-label={dict.common.seeVehicles}>
              <svg className="i" aria-hidden="true"><use href="#arrow" /></svg>
            </Link>
          </div>
        </div>
        <div className="hero-edge" />
      </section>
      <section className="content-section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <h2 className="serif" style={{ marginBottom: 20, marginTop: 0 }}>{t.whyTitle || t.introTitle}</h2>
          <p>{t.whyP1 || t.introP1}</p>
          <p>{t.whyP2 || t.introP2}</p>
          {t.whyP3 && <p>{t.whyP3}</p>}
          <h2 className="serif" style={{ marginBottom: 16, marginTop: 40 }}>{t.recommendedTitle}</h2>
          <ul style={{ lineHeight: 1.9, marginBottom: 28 }}>
            <li><Link href={lp('/vehicule')}><strong>{dict.fleet.raptor.name}</strong></Link></li>
            <li><strong>{dict.fleet.rav4.name}</strong> · {dict.fleet.troc.name}</li>
            <li><strong>{dict.fleet.mercedes.name}</strong> · {dict.fleet.q8.name}</li>
          </ul>
          <h2 className="serif" style={{ marginBottom: 16 }}>{t.howTitle}</h2>
          <p>{t.howText}</p>
          <a className="btn-wa" href={`https://wa.me/${WA}?text=${encodeURIComponent(waMsg)}`} target="_blank" rel="noopener noreferrer" style={{ marginTop: 16 }}>
            <svg aria-hidden="true"><use href="#wa" /></svg>
            {t.askCta}
          </a>
          <p style={{ marginTop: 28, fontSize: 14, opacity: 0.85 }}>
            <Link href={lp('/vehicules')}>{dict.nav.vehicles}</Link>
            {' · '}<Link href={lp('/4x4')}>{dict.nav.fourByFour}</Link>
            {' · '}<Link href={lp('/merzouga')}>{dict.nav.merzouga}</Link>
            {' · '}<Link href={lp('/marrakech')}>{dict.nav.marrakech}</Link>
            {' · '}<Link href={lp('/casablanca')}>{dict.nav.casablanca}</Link>
            {' · '}<Link href={lp('/agadir')}>{dict.nav.agadir}</Link>
          </p>
        </div>
      </section>
    </>
  )
}
