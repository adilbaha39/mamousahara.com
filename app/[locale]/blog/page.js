import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getDictionary, localePath, isValidLocale, defaultLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: dict.blog.metaTitle,
    description: dict.blog.metaDescription,
    alternates: { canonical: `https://mamou-sahara.com/${locale}/blog` },
  }
}

export default async function BlogPage({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale)
  const t = dict.blog
  const lp = (p) => localePath(locale, p)

  return (
    <>
      <section className="hero hero-sm">
        <div className="wrap">
          <Breadcrumbs items={[{ name: dict.nav.home, url: lp('/') }, { name: dict.nav.blog }]} />
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="serif">{t.title}</h1>
          <p className="sub">{t.subtitle}</p>
        </div>
        <div className="hero-edge" />
      </section>
      <section className="content-section">
        <div className="wrap" style={{ maxWidth: 800, display: 'grid', gap: 28 }}>
          {t.posts.map((p) => (
            <article key={p.slug} style={{ paddingBottom: 28, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div className="eyebrow" style={{ marginBottom: 8, color: '#666' }}>{p.date}</div>
              <h2 style={{ fontSize: 22, marginBottom: 10 }}>
                <Link href={lp(`/blog/${p.slug}`)} style={{ color: 'inherit' }}>{p.title}</Link>
              </h2>
              <p style={{ opacity: 0.85, lineHeight: 1.6, marginBottom: 12 }}>{p.excerpt}</p>
              <Link href={lp(`/blog/${p.slug}`)} style={{ fontSize: 14, fontWeight: 500 }}>{t.readMore} →</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
