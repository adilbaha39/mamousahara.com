import { WA, EMAIL, PHONE_DISPLAY } from '@/lib/constants'
import Breadcrumbs from '@/components/Breadcrumbs'
import { localBusinessSchema } from '@/lib/schema'
import { getDictionary, localePath, isValidLocale, defaultLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    alternates: { canonical: `https://mamou-sahara.com/${locale}/contact` },
  }
}

export default async function ContactPage({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale)
  const t = dict.contact
  const lp = (p) => localePath(locale, p)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
      <section className="hero hero-sm">
        <div className="wrap">
          <Breadcrumbs items={[{ name: dict.nav.home, url: lp('/') }, { name: dict.nav.contact }]} />
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="serif" style={{ whiteSpace: 'pre-line' }}>{t.title}</h1>
          <p className="sub">{t.subtitle}</p>
          <div className="cta">
            <a className="btn-wa" href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true"><use href="#wa" /></svg>
              {dict.common.bookWhatsApp}
            </a>
          </div>
        </div>
        <div className="hero-edge" />
      </section>
      <section className="content-section">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, maxWidth: 900 }}>
          <div>
            <h2 className="serif" style={{ marginBottom: 24, marginTop: 0 }}>{t.coordsTitle}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <svg className="i" style={{ width: 24, height: 24, marginTop: 4 }} aria-hidden="true"><use href="#phone" /></svg>
                <div><b>{t.phoneLabel}</b><br /><span>{PHONE_DISPLAY}</span><br /><small style={{ opacity: 0.7 }}>{t.phoneNote}</small></div>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <svg className="i" style={{ width: 24, height: 24, marginTop: 4 }} aria-hidden="true"><use href="#mail" /></svg>
                <div><b>{t.emailLabel}</b><br /><span>{EMAIL}</span><br /><small style={{ opacity: 0.7 }}>{t.emailNote}</small></div>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <svg className="i" style={{ width: 24, height: 24, marginTop: 4 }} aria-hidden="true"><use href="#pin" /></svg>
                <div><b>{t.agencyLabel}</b><br /><span>{t.agencyPlace}</span><br /><small style={{ opacity: 0.7 }}>{t.agencyNote}</small></div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="serif" style={{ marginBottom: 16, marginTop: 0 }}>{t.bookNow}</h2>
            <p style={{ marginBottom: 24, opacity: 0.85 }}>{t.bookText}</p>
            <a className="btn-wa" href={`https://wa.me/${WA}?text=${encodeURIComponent(dict.wa.default)}`} target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true"><use href="#wa" /></svg>
              {t.writeWa}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
