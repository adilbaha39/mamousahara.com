import Link from 'next/link'
import { WA, EMAIL, PHONE_DISPLAY } from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="wrap">
        <div className="cols">
          <div className="col brand">
            <Link href="/" className="logo">
              <img src="/images/logo.png" alt="Mamou Sahara" width={44} height={44} />
              <div>
                <b>MAMOU</b>
                <small>— SAHARA —</small>
              </div>
            </Link>
            <p>
              Location de voitures à Errachidia et Merzouga. 4x4, SUV et véhicules premium
              pour explorer le Sahara en toute confiance.
            </p>
          </div>

          <div className="col">
            <h6>Nos villes</h6>
            <ul>
              <li><svg aria-hidden="true"><use href="#pin"/></svg>Errachidia</li>
              <li><svg aria-hidden="true"><use href="#pin"/></svg>Merzouga</li>
              <li><svg aria-hidden="true"><use href="#pin"/></svg>Erfoud</li>
              <li><svg aria-hidden="true"><use href="#pin"/></svg>Rissani</li>
              <li><svg aria-hidden="true"><use href="#pin"/></svg>Ouarzazate</li>
            </ul>
          </div>

          <div className="col">
            <h6>Liens utiles</h6>
            <ul>
              <li><Link href="/vehicules">Véhicules</Link></li>
              <li><Link href="/merzouga">Merzouga</Link></li>
              <li><Link href="/4x4">Location 4x4</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/apropos">À propos</Link></li>
              <li><Link href="/conditions">Conditions</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="col contact">
            <h6>Contact</h6>
            <a className="ct" href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true"><use href="#wa"/></svg>
              <span>
                <b>{PHONE_DISPLAY}</b>
                <small>Réserver sur WhatsApp</small>
              </span>
            </a>
            <a className="ct" href={`mailto:${EMAIL}`}>
              <svg className="i" aria-hidden="true"><use href="#mail"/></svg>
              <span><b>{EMAIL}</b></span>
            </a>
            <div className="ct">
              <svg className="i" aria-hidden="true"><use href="#pin"/></svg>
              <span><b>Errachidia, Maroc</b></span>
            </div>
          </div>
        </div>

        <div className="bottom">
          <span>© {year} Mamou Sahara. Tous droits réservés.</span>
          <span>Location voiture Errachidia · Merzouga · Sahara</span>
        </div>
      </div>
    </footer>
  )
}
