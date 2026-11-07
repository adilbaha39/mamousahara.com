import Link from 'next/link'
import Image from 'next/image'
import { WA } from '@/lib/constants'
import Breadcrumbs from '@/components/Breadcrumbs'
import { vehicleOfferSchema } from '@/lib/schema'
import { getDictionary, localePath, isValidLocale, defaultLocale } from '@/lib/i18n'
import { getCars } from '@/lib/cars'
import { notFound } from 'next/navigation'

export const revalidate = 60 // refresh fleet from Supabase every 60s

export async function generateMetadata({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: dict.vehicles.metaTitle,
    description: dict.vehicles.metaDescription,
    alternates: { canonical: `https://mamou-sahara.com/${locale}/vehicules` },
  }
}

export default async function VehiculesPage({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale)
  const t = dict.vehicles
  const c = dict.common
  const lp = (p) => localePath(locale, p)

  const cars = await getCars()

  const schemas = cars.map((car) =>
    vehicleOfferSchema({
      name: car.name,
      description: `${car.name} – Mamou Sahara`,
      image: car.image,
      price: String(car.price),
      url: '/vehicules',
    })
  )

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <section className="hero hero-vehicules hero-sm">
        <div className="wrap">
          <Breadcrumbs items={[{ name: dict.nav.home, url: lp('/') }, { name: dict.nav.vehicles }]} />
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="serif">{t.title}</h1>
          <p className="sub">{t.subtitle}</p>
        </div>
        <div className="hero-edge" />
      </section>
      <section className="fleet" style={{ paddingTop: 60 }}>
        <div className="wrap">
          {cars.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '48px 16px', color: '#56607a', fontSize: 16 }}>
              {c.noVehicles || 'Aucune voiture disponible pour le moment.'}
            </p>
          ) : (
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {cars.map((car) => (
              <article className="card" key={car.id}>
                <Image
                  src={car.image}
                  alt={`${car.name} – Mamou Sahara`}
                  width={400}
                  height={500}
                  sizes="(max-width: 600px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  unoptimized={car.image.startsWith('http')}
                />
                <span className="badge">{car.badge}</span>
                <div className="info">
                  <h3>{car.name}</h3>
                  <div className="yr">{car.year}</div>
                  <div className="spec">
                    {car.specs.map((s, i) => (
                      <span key={i}>{s}</span>
                    ))}
                  </div>
                  <div className="price">
                    <div>
                      <b>{car.priceDisplay}</b> <small>{c.perDay}</small>
                    </div>
                    <a
                      className="round"
                      href={`https://wa.me/${WA}?text=${encodeURIComponent(car.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={car.name}
                    >
                      <svg className="i" aria-hidden="true"><use href="#arrow" /></svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          )}
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <div className="feat"><div className="ic"><svg className="i" aria-hidden="true"><use href="#plane" /></svg></div><div><b>{c.airportDelivery}</b><small>{c.errachidiaAirport}</small></div></div>
          <div className="feat"><div className="ic"><svg className="i" aria-hidden="true"><use href="#shield" /></svg></div><div><b>{c.insuranceIncluded}</b><small>{c.basicCoverage}</small></div></div>
          <div className="feat"><div className="ic"><svg className="i" aria-hidden="true"><use href="#clock" /></svg></div><div><b>{c.assistance247}</b><small>{c.alwaysAvailable}</small></div></div>
          <div className="feat"><div className="ic"><svg className="i" aria-hidden="true"><use href="#bolt" /></svg></div><div><b>{c.fastBooking}</b><small>{c.viaWhatsApp}</small></div></div>
        </div>
      </section>
      <section className="content-section" style={{ paddingTop: 40, paddingBottom: 60 }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <h2 className="serif" style={{ marginBottom: 16, marginTop: 0 }}>{t.chooseTitle}</h2>
          <p>
            {t.chooseText}{' '}
            <Link href={lp('/4x4')}>{dict.nav.fourByFour}</Link> ·{' '}
            <Link href={lp('/merzouga')}>{dict.nav.merzouga}</Link>
          </p>
        </div>
      </section>
    </>
  )
}
