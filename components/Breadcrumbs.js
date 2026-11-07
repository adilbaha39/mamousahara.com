import Link from 'next/link'
import { breadcrumbSchema } from '@/lib/schema'

/**
 * @param {{ items: Array<{ name: string, url?: string }> }} props
 */
export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null

  const schema = breadcrumbSchema(items)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav className="breadcrumbs" aria-label="Fil d'Ariane">
        <ol>
          {items.map((item, i) => (
            <li key={i}>
              {item.url && i < items.length - 1 ? (
                <Link href={item.url}>{item.name}</Link>
              ) : (
                <span aria-current="page">{item.name}</span>
              )}
              {i < items.length - 1 && <span className="sep" aria-hidden="true">/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
