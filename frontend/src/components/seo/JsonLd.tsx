import { SITE_CONFIG, LOCATIONS, SERVICES } from '@/lib/constants'

export default function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: [SITE_CONFIG.shortName, 'Al Ashqaa Sofas & Curtains', 'الاشقاء للركن والستائر'],
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/og-image.webp`,
    image: [
      `${SITE_CONFIG.url}/images/og-image.webp`,
      `${SITE_CONFIG.url}/images/work/hero-sofa-curtain-luxury.jpg`,
      `${SITE_CONFIG.url}/images/work/hero-living-room-wide.jpg`,
    ],
    telephone: [SITE_CONFIG.phone, SITE_CONFIG.phone2],
    email: SITE_CONFIG.email,
    foundingDate: SITE_CONFIG.foundedYear.toString(),
    priceRange: '$$',
    currenciesAccepted: 'EGP',
    paymentAccepted: 'Cash',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
      addressLocality: 'القاهرة',
      addressRegion: 'القاهرة الكبرى',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.0444,
      longitude: 31.2357,
    },
    areaServed: LOCATIONS.map((loc) => ({
      '@type': 'City',
      name: loc.name,
      containedInPlace: {
        '@type': 'State',
        name: loc.region,
      },
    })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '22:00',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phone,
        contactType: 'customer service',
        availableLanguage: 'Arabic',
        areaServed: 'EG',
      },
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phone2,
        contactType: 'sales',
        availableLanguage: 'Arabic',
        areaServed: 'EG',
      },
    ],
    sameAs: [
      SITE_CONFIG.facebook,
      `https://wa.me/${SITE_CONFIG.whatsapp}`,
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات الأشقاء',
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          provider: { '@id': `${SITE_CONFIG.url}/#organization` },
          areaServed: { '@type': 'Country', name: 'مصر' },
        },
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '237',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'أحمد محمد' },
        datePublished: '2026-01-15',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'تعاملت مع الأشقاء في تفصيل ركنة وكانت النتيجة ممتازة. الخامات ممتازة والشغل نظيف جداً.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'سارة علي' },
        datePublished: '2026-02-20',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'عملت ستائر للشقة كلها من الأشقاء والتصميمات كانت رائعة. الفني كان محترف جداً.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'محمد حسن' },
        datePublished: '2026-03-10',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'اشتريت ركنة من الأشقاء وبقت أحلى حاجة في الصالون. الأسعار كويسة جداً مقارنة بالسوق.',
      },
    ],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 20,
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: 'ar',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/المدونة?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
