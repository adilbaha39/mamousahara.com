import Link from 'next/link'
import { WA, EMAIL, PHONE_DISPLAY } from '@/lib/constants'
import { localePath } from '@/lib/i18n'

export default function Footer({ locale = 'fr', dict }) {
  const year = new Date().getFullYear()
  const t = dict?.footer || {}
  const n = dict?.nav || {}
  const lp = (p) => localePath(locale, p)

  return (
    <footer>
      <div className="wrap">
        <div className="cols">
          <div className="col brand">
            <Link href={lp('/')} className="logo">
              <img src="/images/logo.png" alt="Mamou Sahara" width={44} height={44} />
              <div>
                <b>MAMOU</b>
                <small>— SAHARA —</small>
              </div>
            </Link>
            <p>{t.brandText}</p>
          </div>

          <div className="col">
            <h6>{t.zones}</h6>
            <ul>
              <li><Link href={lp('/')}><svg aria-hidden="true"><use href="#pin" /></svg>Errachidia</Link></li>
              <li><Link href={lp('/merzouga')}><svg aria-hidden="true"><use href="#pin" /></svg>{n.merzouga}</Link></li>
              <li><Link href={lp('/marrakech')}><svg aria-hidden="true"><use href="#pin" /></svg>{n.marrakech}</Link></li>
              <li><Link href={lp('/casablanca')}><svg aria-hidden="true"><use href="#pin" /></svg>{n.casablanca}</Link></li>
              <li><Link href={lp('/agadir')}><svg aria-hidden="true"><use href="#pin" /></svg>{n.agadir}</Link></li>
            </ul>
          </div>

          <div className="col">
            <h6>{t.links}</h6>
            <ul>
              <li><Link href={lp('/vehicules')}>{n.vehicles}</Link></li>
              <li><Link href={lp('/merzouga')}>{n.merzouga}</Link></li>
              <li><Link href={lp('/marrakech')}>{n.marrakech}</Link></li>
              <li><Link href={lp('/casablanca')}>{n.casablanca}</Link></li>
              <li><Link href={lp('/agadir')}>{n.agadir}</Link></li>
              <li><Link href={lp('/4x4')}>{n.fourByFour}</Link></li>
              <li><Link href={lp('/faq')}>{n.faq}</Link></li>
              <li><Link href={lp('/blog')}>{n.blog}</Link></li>
              <li><Link href={lp('/contact')}>{n.contact}</Link></li>
            </ul>
          </div>

          <div className="col contact">
            <h6>{t.contact}</h6>
            <a className="ct" href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true"><use href="#wa" /></svg>
              <span>
                <b>{PHONE_DISPLAY}</b>
                <small>{dict?.common?.bookWhatsApp}</small>
              </span>
            </a>
            <a className="ct" href={`mailto:${EMAIL}`}>
              <svg className="i" aria-hidden="true"><use href="#mail" /></svg>
              <span><b>{EMAIL}</b></span>
            </a>
            <div className="ct">
              <svg className="i" aria-hidden="true"><use href="#pin" /></svg>
              <span><b>Errachidia, Maroc</b></span>
            </div>
          </div>
        </div>

        <div className="bottom">
          <span>© {year} Mamou Sahara. {t.rights}</span>
          <span>{t.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
