import Link from 'next/link'
import { WA } from '@/lib/constants'

export const metadata = {
  title: 'Errachidia → Merzouga : distance, durée et conseils',
  description:
    'Distance Errachidia Merzouga, temps de trajet, état de la route et quel type de voiture louer. Guide pratique Mamou Sahara.',
  alternates: { canonical: 'https://mamou-sahara.com/blog/errachidia-merzouga' },
}

export default function Article1() {
  return (
    <>
      <section className="hero hero-merzouga hero-sm">
        <div className="wrap">
          <div className="eyebrow">Guide</div>
          <h1 className="serif">Errachidia → Merzouga : distance, durée et conseils</h1>
          <p className="sub">Route, temps de trajet et véhicule adapté pour rejoindre les dunes.</p>
        </div>
        <div className="hero-edge" />
      </section>

      <section className="content-section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <p>
            La liaison <strong>Errachidia – Merzouga</strong> est l’un des trajets les plus demandés
            du sud-est marocain. Elle permet de rejoindre les dunes de l’Erg Chebbi depuis l’aéroport
            ou la ville d’Errachidia.
          </p>

          <h2 style={{ margin: '28px 0 12px', fontSize: 20 }}>Distance et durée</h2>
          <p>
            Comptez environ <strong>130 km</strong> et <strong>1h45 à 2h</strong> de route selon le
            trafic et les arrêts. La route principale (via Erfoud / Rissani) est{' '}
            <strong>goudronnée</strong> jusqu’aux abords de Merzouga.
          </p>

          <h2 style={{ margin: '28px 0 12px', fontSize: 20 }}>Quel véhicule choisir ?</h2>
          <p>
            Pour le trajet principal, une voiture classique (citadine ou berline) suffit. Un{' '}
            <strong>SUV</strong> ou un <strong>4x4</strong> est plus confortable si vous prévoyez des
            pistes autour des dunes, des bivouacs ou des tracks dans la région.
          </p>

          <h2 style={{ margin: '28px 0 12px', fontSize: 20 }}>Conseils pratiques</h2>
          <ul style={{ marginBottom: 24, paddingLeft: 20 }}>
            <li>Partez de préférence de jour pour profiter du paysage (vallée du Ziz).</li>
            <li>Faites le plein à Errachidia ou Erfoud : les stations se raréfient ensuite.</li>
            <li>Réservez votre véhicule à l’avance en haute saison (automne, vacances).</li>
          </ul>

          <p>
            Mamou Sahara assure la location depuis Errachidia, avec possibilité de livraison selon
            disponibilité.
          </p>

          <a
            className="btn-wa"
            href={`https://wa.me/${WA}?text=${encodeURIComponent('Location pour Merzouga')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 12 }}
          >
            <svg aria-hidden="true"><use href="#wa"/></svg>
            Réserver un véhicule
          </a>
          <p style={{ marginTop: 32 }}>
            <Link href="/blog">← Retour au blog</Link>
          </p>
        </div>
      </section>
    </>
  )
}
