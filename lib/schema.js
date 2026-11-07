import { SITE_URL, EMAIL } from './constants'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'CarRental',
  '@id': `${SITE_URL}/#organization`,
  name: 'Mamou Sahara',
  alternateName: 'Mamou Sahara Location Voiture',
  description:
    'Location de voitures à Errachidia, Merzouga et dans tout le Maroc. 4x4, SUV et véhicules premium. Livraison aéroport Errachidia et dans toutes les villes du Maroc.',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/logo.png`,
  telephone: '+212619213238',
  email: EMAIL,
  priceRange: '$$',
  currenciesAccepted: 'MAD',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Errachidia',
    addressRegion: 'Drâa-Tafilalet',
    addressCountry: 'MA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.9314,
    longitude: -4.4269,
  },
  areaServed: [
    { '@type': 'Country', name: 'Morocco' },
    { '@type': 'City', name: 'Errachidia' },
    { '@type': 'City', name: 'Merzouga' },
    { '@type': 'City', name: 'Marrakech' },
    { '@type': 'City', name: 'Casablanca' },
    { '@type': 'City', name: 'Rabat' },
    { '@type': 'City', name: 'Fès' },
    { '@type': 'City', name: 'Agadir' },
    { '@type': 'City', name: 'Ouarzazate' },
    { '@type': 'City', name: 'Erfoud' },
    { '@type': 'City', name: 'Rissani' },
    { '@type': 'City', name: 'Tinghir' },
    { '@type': 'City', name: 'Zagora' },
    { '@type': 'City', name: 'Meknès' },
    { '@type': 'City', name: 'Tanger' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '08:00',
    closes: '22:00',
  },
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+212619213238',
    contactType: 'reservations',
    availableLanguage: ['French', 'Arabic', 'English', 'Spanish'],
    areaServed: 'MA',
  },
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  }
}

export function vehicleOfferSchema({ name, description, image, price, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    brand: {
      '@type': 'Brand',
      name: name.split(' ')[0],
    },
    offers: {
      '@type': 'Offer',
      url: url ? `${SITE_URL}${url}` : SITE_URL,
      priceCurrency: 'MAD',
      price: String(price).replace(/\s/g, ''),
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Mamou Sahara',
      },
    },
  }
}

export function articleSchema({ title, description, url, datePublished, dateModified, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: `${SITE_URL}${url}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: 'Mamou Sahara',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mamou Sahara',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    image: image
      ? image.startsWith('http')
        ? image
        : `${SITE_URL}${image}`
      : `${SITE_URL}/images/logo.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${url}`,
    },
  }
}

export function localBusinessSchema() {
  return {
    ...organizationSchema,
    '@type': ['CarRental', 'LocalBusiness'],
  }
}
