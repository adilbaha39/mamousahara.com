import { WA, EMAIL, PHONE_DISPLAY } from '@/lib/constants'

export const metadata = {
  title: 'Contact – Location voiture aéroport Errachidia',
  description:
    'Contactez Mamou Sahara à Merzouga et Errachidia. WhatsApp, téléphone et réservation rapide. Livraison aéroport Errachidia. Disponible 7j/7.',
  alternates: { canonical: 'https://mamou-sahara.com/contact' },
}

export default function ContactPage() {
  return (
    <>
      <section className="hero hero-sm">
        <div className="wrap">
          <div className="eyebrow">Contact</div>
          <h1 className="serif">
            Une question ?<br />
            Nous sommes là.
          </h1>
          <p className="sub">
            Réponse rapide sur WhatsApp. Livraison aéroport Errachidia et dans la région.
          </p>
          <div className="cta">
            <a
              className="btn-wa"
              href={`https://wa.me/${WA}`}
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
            maxWidth: 900,
          }}
        >
          <div>
            <h2 className="serif" style={{ marginBottom: 24, marginTop: 0 }}>
              Nos coordonnées
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <svg className="i" style={{ width: 24, height: 24, marginTop: 4 }} aria-hidden="true">
                  <use href="#phone" />
                </svg>
                <div>
                  <b>Téléphone & WhatsApp</b>
                  <br />
                  <span>{PHONE_DISPLAY}</span>
                  <br />
                  <small style={{ opacity: 0.7 }}>Réponse rapide sur WhatsApp</small>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <svg className="i" style={{ width: 24, height: 24, marginTop: 4 }} aria-hidden="true">
                  <use href="#mail" />
                </svg>
                <div>
                  <b>Email</b>
                  <br />
                  <span>{EMAIL}</span>
                  <br />
                  <small style={{ opacity: 0.7 }}>Nous répondons sous 24h</small>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <svg className="i" style={{ width: 24, height: 24, marginTop: 4 }} aria-hidden="true">
                  <use href="#pin" />
                </svg>
                <div>
                  <b>Notre agence</b>
                  <br />
                  <span>Errachidia, Maroc</span>
                  <br />
                  <small style={{ opacity: 0.7 }}>Livraison aéroport Errachidia</small>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="serif" style={{ marginBottom: 16, marginTop: 0 }}>
              Réservez maintenant
            </h2>
            <p style={{ marginBottom: 24, opacity: 0.85 }}>
              Contactez-nous sur WhatsApp pour une réservation rapide et personnalisée.
            </p>
            <a
              className="btn-wa"
              href={`https://wa.me/${WA}?text=${encodeURIComponent('Bonjour, je souhaite réserver un véhicule')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg aria-hidden="true"><use href="#wa"/></svg>
              Écrire sur WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
