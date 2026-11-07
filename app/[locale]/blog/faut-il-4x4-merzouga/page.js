import Link from 'next/link'
import { WA } from '@/lib/constants'
import Breadcrumbs from '@/components/Breadcrumbs'
import { articleSchema } from '@/lib/schema'
import { getDictionary, localePath, isValidLocale, defaultLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  const post = dict.blog.posts.find((p) => p.slug === 'faut-il-4x4-merzouga') || dict.blog.posts[0]
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://mamou-sahara.com/${locale}/blog/faut-il-4x4-merzouga` },
  }
}

export default async function ArticlePage({ params }) {
  const locale = params?.locale || defaultLocale
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale)
  const post = dict.blog.posts.find((p) => p.slug === 'faut-il-4x4-merzouga') || dict.blog.posts[0]
  const lp = (p) => localePath(locale, p)
  const body = post.body || [post.excerpt]
  const schema = articleSchema({
    title: post.title,
    description: post.excerpt,
    url: '/blog/faut-il-4x4-merzouga',
    datePublished: post.date,
    image: '/images/hero-merzouga.webp',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="hero hero-sm">
        <div className="wrap">
          <Breadcrumbs items={[
            { name: dict.nav.home, url: lp('/') },
            { name: dict.nav.blog, url: lp('/blog') },
            { name: post.title },
          ]} />
          <div className="eyebrow">{dict.blog.eyebrow}</div>
          <h1 className="serif">{post.title}</h1>
          <p className="sub">{post.excerpt}</p>
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
          <p style={{ marginTop: 28 }}>
            <Link href={lp('/vehicules')}>{dict.nav.vehicles}</Link>
            {' · '}<Link href={lp('/4x4')}>{dict.nav.fourByFour}</Link>
            {' · '}<Link href={lp('/merzouga')}>{dict.nav.merzouga}</Link>
            {' · '}<Link href={lp('/contact')}>{dict.nav.contact}</Link>
          </p>
          <a
            className="btn-wa"
            href={`https://wa.me/${WA}?text=${encodeURIComponent(dict.wa.default)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 24 }}
          >
            <svg aria-hidden="true"><use href="#wa" /></svg>
            {dict.common.bookWhatsApp}
          </a>
        </div>
      </section>
    </>
  )
}
