import { WA } from '@/lib/constants'

export const metadata = {
  title: 'Location Ford Ranger Raptor Merzouga',
  description:
    'Louez le Ford Ranger Raptor à Errachidia et Merzouga. Idéal pour le désert et les pistes du Sahara.',
  alternates: { canonical: 'https://mamou-sahara.com/vehicule' },
}

export default function VehiculePage() {
  return (
    <>
      <section className="hero hero-4x4 hero-sm">
        <div className="wrap">
          <div className="eyebrow">4x4 Premium</div>
          <h1 className="serif">Ford Ranger Raptor</h1>
          <p className="sub">
            Puissance et confort pour explorer Merzouga et les pistes du Sahara. Location depuis
            Errachidia.
          </p>
          <div className="cta">
            <a
              className="btn-wa"
              href={`https://wa.me/${WA}?text=${encodeURIComponent('Ford Ranger Raptor')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg aria-hidden="true"><use href="#wa"/></svg>
              Réserver sur WhatsApp
            </a>
          </div>
        </div>
        <div className="hero-edge" />
      </section>

      <section className="content-section">
        <div
          className="wrap"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            alignItems: 'start',
            maxWidth: 1000,
          }}
        >
          <div>
            <img
              src="/images/ford-ranger-raptor.jpg"
              alt="Ford Ranger Raptor – location 4x4 Merzouga"
              style={{ borderRadius: 8, width: '100%' }}
              loading="lazy"
              width={600}
              height={400}
            />
          </div>
          <div>
            <h2 className="serif" style={{ marginBottom: 16, marginTop: 0 }}>
              Caractéristiques
            </h2>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 12, marginBottom: 28 }}>
              <li>✓ Boîte automatique</li>
              <li>✓ 5 places</li>
              <li>✓ Diesel – 4x4</li>
              <li>✓ Idéal désert & pistes</li>
              <li>✓ Climatisation</li>
            </ul>
            <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>
              1 500 <small style={{ fontSize: 14, fontWeight: 400 }}>DH / jour</small>
            </div>
            <a
              className="btn-wa"
              href={`https://wa.me/${WA}?text=${encodeURIComponent('Ford Ranger Raptor')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg aria-hidden="true"><use href="#wa"/></svg>
              Réserver ce véhicule
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
