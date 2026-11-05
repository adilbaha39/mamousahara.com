# Mamou Sahara – Next.js

Site de location de voitures à Errachidia et Merzouga.

## Installation

```bash
cd mamou-sahara
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Build production

```bash
npm run build
npm start
```

## Structure

- `app/` – Pages (App Router)
- `components/` – Header (burger mobile), Footer
- `lib/constants.js` – WhatsApp, email, site URL (modifier ici seulement)
- `public/images/` – Logo + heroes + véhicules
- `public/robots.txt` + `sitemap.xml`

## Contact

- WhatsApp : +212 6 19 21 32 38
- Email : mamou-sahara@gmail.com

## SEO & Performance

- Titles, meta, canonical, Open Graph
- Schema.org CarRental + FAQPage
- Fonts display: swap
- Images lazy-loaded
- Mobile-first responsive + burger menu fonctionnel
- CSS optimisé, reduced motion support

## Images manquantes

Remplacez les fichiers temporaires dans `public/images/` par de vraies photos :
- mercedes-classe-e.jpg
- vw-t-roc.jpg
- renault-clio.jpg
- ford-ranger-raptor.jpg
- toyota-rav4.jpg
- audi-q8.jpg
