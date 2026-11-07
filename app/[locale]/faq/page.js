import { WA } from '@/lib/constants'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getDictionary, localePath, isValidLocale, defaultLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: dict.faq.metaTitle,
    description: dict.faq.metaDescription,
    alternates: { canonical: `https://mamou-sahara.com/${locale}/faq` },
  }
}

export default async function FaqPage({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale)
  const t = dict.faq
  const lp = (p) => localePath(locale, p)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="hero hero-sm">
        <div className="wrap">
          <Breadcrumbs items={[{ name: dict.nav.home, url: lp('/') }, { name: t.title }]} />
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="serif">{t.title}</h1>
          <p className="sub">{t.subtitle}</p>
        </div>
        <div className="hero-edge" />
      </section>
      <section className="content-section">
        <div className="wrap">
          {t.items.map((f, i) => (
            <div key={i} style={{ marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: 18, marginBottom: 10 }}>{f.q}</h2>
              <p style={{ opacity: 0.85, lineHeight: 1.6 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
