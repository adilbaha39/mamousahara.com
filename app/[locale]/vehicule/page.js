import Image from 'next/image'
import Link from 'next/link'
import { WA } from '@/lib/constants'
import Breadcrumbs from '@/components/Breadcrumbs'
import { vehicleOfferSchema } from '@/lib/schema'
import { getDictionary, localePath, isValidLocale, defaultLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: dict.vehicle.metaTitle,
    description: dict.vehicle.metaDescription,
    alternates: { canonical: `https://mamou-sahara.com/${locale}/vehicule` },
  }
}

export default async function VehiculePage({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale)
  const t = dict.vehicle
  const lp = (p) => localePath(locale, p)
  const schema = vehicleOfferSchema({
    name: t.title,
    description: t.subtitle,
    image: '/images/ford-ranger-raptor.jpg',
    price: '1500',
    url: '/vehicule',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="hero hero-4x4 hero-sm">
        <div className="wrap">
          <Breadcrumbs items={[
            { name: dict.nav.home, url: lp('/') },
            { name: dict.nav.vehicles, url: lp('/vehicules') },
            { name: t.title },
          ]} />
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="serif">{t.title}</h1>
          <p className="sub">{t.subtitle}</p>
          <div className="cta">
            <a className="btn-wa" href={`https://wa.me/${WA}?text=${encodeURIComponent(dict.wa.raptor)}`} target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true"><use href="#wa" /></svg>
              {dict.common.bookWhatsApp}
            </a>
          </div>
        </div>
        <div className="hero-edge" />
      </section>
      <section className="content-section">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start', maxWidth: 1000 }}>
          <div>
            <Image src="/images/ford-ranger-raptor.jpg" alt={t.title} width={600} height={400} style={{ borderRadius: 8, width: '100%', height: 'auto' }} priority />
          </div>
          <div>
            <h2 className="serif" style={{ marginBottom: 16, marginTop: 0 }}>{t.features}</h2>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 12, marginBottom: 28 }}>
              <li>✓ {t.feature1}</li>
              <li>✓ {t.feature2}</li>
              <li>✓ {t.feature3}</li>
              <li>✓ {t.feature4}</li>
              <li>✓ {t.feature5}</li>
            </ul>
            <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>
              1 500 <small style={{ fontSize: 14, fontWeight: 400 }}>{dict.common.perDay}</small>
            </div>
            <a className="btn-wa" href={`https://wa.me/${WA}?text=${encodeURIComponent(dict.wa.raptor)}`} target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true"><use href="#wa" /></svg>
              {t.bookThis}
            </a>
            <p style={{ marginTop: 24, fontSize: 14, opacity: 0.8 }}>
              <Link href={lp('/4x4')}>{dict.nav.fourByFour}</Link> · <Link href={lp('/vehicules')}>{dict.nav.vehicles}</Link> · <Link href={lp('/merzouga')}>{dict.nav.merzouga}</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
