import Link from 'next/link'
import Image from 'next/image'
import { WA } from '@/lib/constants'
import { organizationSchema } from '@/lib/schema'
import { getDictionary, localePath, isValidLocale, defaultLocale } from '@/lib/i18n'
import { getCars } from '@/lib/cars'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateMetadata({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
    alternates: {
      canonical: `https://mamou-sahara.com/${locale}`,
      languages: {
        fr: 'https://mamou-sahara.com/fr',
        en: 'https://mamou-sahara.com/en',
        ar: 'https://mamou-sahara.com/ar',
        es: 'https://mamou-sahara.com/es',
      },
    },
  }
}

export default async function HomePage({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale)
  const t = dict.home
  const c = dict.common
  const lp = (p) => localePath(locale, p)
  const cars = await getCars({ limit: 4 })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <section className="hero" id="accueil">
        <div className="wrap">
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="serif">{t.title}</h1>
          <p className="sub">{t.subtitle}</p>
          <div className="cta">
            <a className="btn-wa" href={`https://wa.me/${WA}?text=${encodeURIComponent(dict.wa.default)}`} target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true"><use href="#wa" /></svg>
              {c.bookWhatsApp}
            </a>
            <Link className="round" href={lp('/vehicules')} aria-label={c.seeVehicles}>
              <svg className="i" aria-hidden="true"><use href="#arrow" /></svg>
            </Link>
          </div>
          <div className="perks">
            <div>
              <svg className="i" aria-hidden="true"><use href="#plane" /></svg>
              <span>{c.deliveryNationwide}</span>
            </div>
            <div>
              <svg className="i" aria-hidden="true"><use href="#clock" /></svg>
              <span>{c.assistance247}</span>
            </div>
            <div>
              <svg className="i" aria-hidden="true"><use href="#bolt" /></svg>
              <span>{c.fastBooking}</span>
            </div>
          </div>
        </div>
        <div className="tag-r">{t.tag}</div>
        <div className="hero-edge" />
      </section>

      <section className="fleet" id="vehicules">
        <div className="wrap">
          <div className="fleet-head">
            <div>
              <div className="eyebrow">{t.fleetEyebrow}</div>
              <h2 className="serif">{t.fleetTitle}</h2>
            </div>
            <p>{t.fleetText}</p>
            <Link href={lp('/vehicules')} className="all">
              {t.seeAll} <svg className="i" aria-hidden="true"><use href="#arrow" /></svg>
            </Link>
          </div>
          {cars.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px 16px', color: '#56607a', gridColumn: '1 / -1' }}>
              {c.noVehicles || 'Aucune voiture disponible pour le moment.'}
            </p>
          ) : (
          <div className="grid">
            {cars.map((car) => (
              <article className="card" key={car.id}>
                <Image
                  src={car.image}
                  alt={`${car.name} – Mamou Sahara`}
                  width={400}
                  height={500}
                  sizes="(max-width: 600px) 100vw, 25vw"
                  style={{ objectFit: 'cover' }}
                  unoptimized={car.image.startsWith('http')}
                />
                <span className="badge">{car.badge}</span>
                <div className="info">
                  <h3>{car.name}</h3>
                  <div className="yr">{car.year}</div>
                  <div className="spec">{car.specs.map((s, i) => <span key={i}>{s}</span>)}</div>
                  <div className="price">
                    <div><b>{car.priceDisplay}</b> <small>{c.perDay}</small></div>
                    <a className="round" href={`https://wa.me/${WA}?text=${encodeURIComponent(car.name)}`} target="_blank" rel="noopener noreferrer" aria-label={car.name}>
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

      <section className="steps">
        <div className="wrap">
          <div className="eyebrow">{t.stepsEyebrow}</div>
          <h2 className="serif">{t.stepsTitle}</h2>
          <div className="steps-grid">
            <div className="step"><div className="top"><span className="n">01</span><span className="ic"><svg aria-hidden="true"><use href="#car" /></svg></span></div><h4>{t.step1Title}</h4><p>{t.step1Text}</p></div>
            <div className="step"><div className="top"><span className="n">02</span><span className="ic"><svg aria-hidden="true"><use href="#cal" /></svg></span></div><h4>{t.step2Title}</h4><p>{t.step2Text}</p></div>
            <div className="step"><div className="top"><span className="n">03</span><span className="ic"><svg aria-hidden="true"><use href="#wa" /></svg></span></div><h4>{t.step3Title}</h4><p>{t.step3Text}</p></div>
          </div>
        </div>
      </section>

      <section className="content-section" style={{ paddingTop: 60, paddingBottom: 80 }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <h2 className="serif" style={{ marginBottom: 20, marginTop: 0 }}>{t.seoTitle}</h2>
          <p>{t.seoP1}</p>
          <p>{t.seoP2}</p>
          <p>{t.seoP3}</p>
        </div>
      </section>
    </>
  )
}
