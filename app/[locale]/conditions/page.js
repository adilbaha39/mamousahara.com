import Breadcrumbs from '@/components/Breadcrumbs'
import { getDictionary, localePath, isValidLocale, defaultLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: dict.conditions.metaTitle,
    description: dict.conditions.metaDescription,
    alternates: { canonical: `https://mamou-sahara.com/${locale}/conditions` },
  }
}

export default async function ConditionsPage({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale)
  const t = dict.conditions
  const lp = (p) => localePath(locale, p)
  const body = t.body || [t.subtitle]

  return (
    <>
      <section className="hero hero-sm">
        <div className="wrap">
          <Breadcrumbs items={[{ name: dict.nav.home, url: lp('/') }, { name: dict.nav.conditions }]} />
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="serif">{t.title}</h1>
          <p className="sub">{t.subtitle}</p>
        </div>
        <div className="hero-edge" />
      </section>
      <section className="content-section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          {body.map((block, i) => {
            if (typeof block === 'string' && block.startsWith('## ')) {
              return (
                <h2 key={i} style={{ margin: '28px 0 12px', fontSize: 20 }}>
                  {block.replace(/^## /, '')}
                </h2>
              )
            }
            return (
              <p key={i} style={{ marginBottom: 16, lineHeight: 1.7, opacity: 0.92 }}>
                {block}
              </p>
            )
          })}
        </div>
      </section>
    </>
  )
}
