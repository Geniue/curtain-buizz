import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, MapPin, Star, CheckCircle } from 'lucide-react'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { SITE_CONFIG, LOCATIONS, SERVICES } from '@/lib/constants'
import { getPhoneUrl, getWhatsAppUrl } from '@/lib/utils'
import { notFound } from 'next/navigation'

function getLocation(slug: string) {
  return LOCATIONS.find((loc) => loc.slug === decodeURIComponent(slug))
}

export function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ slug: loc.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const location = getLocation(params.slug)
  if (!location) return {}

  const title = `تنجيد ركن وستائر في ${location.name} — الأشقاء | أفضل أسعار 2026`
  const description = `الأشقاء للركن والستائر في ${location.name} — تصنيع ركنات وانتريهات وتفصيل ستائر مودرن بأجود الخامات. خدمة توصيل وتركيب مجانية في ${location.name} و${location.region}. اتصل الآن ${SITE_CONFIG.phone}`

  return {
    title,
    description,
    keywords: [
      `تنجيد في ${location.name}`,
      `ركنات في ${location.name}`,
      `ستائر في ${location.name}`,
      `انتريهات ${location.name}`,
      `تفصيل ركنة ${location.name}`,
      `ستائر مودرن ${location.name}`,
      `اسعار تنجيد ${location.name}`,
      `كنب ${location.name}`,
      `صالونات ${location.name}`,
      `تنجيد كنب ${location.name}`,
      `ستائر ${location.region}`,
      'الأشقاء للركن والستائر',
    ],
    alternates: {
      canonical: `${SITE_CONFIG.url}/مواقعنا/${location.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/مواقعنا/${location.slug}`,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: 'website',
      images: [{ url: '/images/og-image.webp', width: 1200, height: 630, alt: title }],
    },
    robots: { index: true, follow: true },
  }
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const location = getLocation(params.slug)
  if (!location) notFound()

  const nearbyLocations = LOCATIONS.filter(
    (loc) => loc.slug !== location.slug && loc.region === location.region
  ).slice(0, 6)

  const otherLocations = LOCATIONS.filter(
    (loc) => loc.slug !== location.slug && loc.region !== location.region
  ).slice(0, 6)

  const locationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.url}/مواقعنا/${location.slug}#business`,
    name: `الأشقاء للركن والستائر - ${location.name}`,
    description: `تصنيع وبيع الركن والستائر في ${location.name}. أجود الخامات وأفضل الأسعار مع خدمة التوصيل والتركيب.`,
    url: `${SITE_CONFIG.url}/مواقعنا/${location.slug}`,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    priceRange: '$$',
    image: `${SITE_CONFIG.url}/images/og-image.webp`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.name,
      addressRegion: location.region,
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.lat,
      longitude: location.lng,
    },
    areaServed: [
      {
        '@type': 'City',
        name: location.name,
      },
      {
        '@type': 'State',
        name: location.region,
      },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '22:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
      bestRating: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `خدمات الأشقاء في ${location.name}`,
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${service.title} في ${location.name}`,
          description: service.description,
          areaServed: { '@type': 'City', name: location.name },
          provider: { '@type': 'LocalBusiness', name: SITE_CONFIG.name },
        },
      })),
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `كم سعر تفصيل ركنة في ${location.name}؟`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `أسعار تفصيل الركنات في ${location.name} تبدأ من أسعار مناسبة جداً حسب نوع القماش والمقاس. الأشقاء يقدمون أفضل الأسعار في ${location.name} و${location.region} مع خدمة معاينة مجانية. اتصل ${SITE_CONFIG.phone} للحصول على عرض سعر.`,
        },
      },
      {
        '@type': 'Question',
        name: `هل توصلون ستائر وركنات لمنطقة ${location.name}؟`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `نعم، الأشقاء للركن والستائر يوفرون خدمة التوصيل والتركيب المجاني في ${location.name} وجميع مناطق ${location.region}. فريقنا المتخصص يصل إليك في الموعد المحدد.`,
        },
      },
      {
        '@type': 'Question',
        name: `ما أفضل محل ركنات وستائر في ${location.name}؟`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `الأشقاء للركن والستائر من أفضل الأماكن في ${location.name} لتفصيل الركنات والستائر. خبرة أكثر من ${SITE_CONFIG.experienceYears} عاماً مع فريق من ${SITE_CONFIG.technicians} فني متخصص وأجود الخامات المستوردة.`,
        },
      },
      {
        '@type': 'Question',
        name: `كم يستغرق تنفيذ ركنة أو ستائر في ${location.name}؟`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `يستغرق تصنيع الركنة من 5 إلى 10 أيام عمل وتفصيل الستائر من 3 إلى 7 أيام. نلتزم بالمواعيد ونوفر التوصيل والتركيب في ${location.name} مجاناً.`,
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumbs items={[
        { name: 'مواقعنا', href: '/مواقعنا' },
        { name: location.name, href: `/مواقعنا/${location.slug}` },
      ]} />

      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-navy-950 via-navy-900 to-navy-800 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/work/hero-living-room-wide.jpg"
            alt={`ركن وستائر في ${location.name}`}
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container-custom relative py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <MapPin className="h-4 w-4 text-accent-400" />
              <span>{location.name} — {location.region}</span>
            </div>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              تنجيد ركن وستائر في {location.name}
            </h1>
            <p className="mt-4 text-lg text-white/90">
              الأشقاء للركن والستائر — أفضل خدمات تصنيع الركنات والانتريهات وتفصيل الستائر المودرن
              في {location.name} و{location.region}. أجود الخامات، أحدث التصميمات، التوصيل والتركيب مجاناً.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={getPhoneUrl()} className="btn-primary bg-accent-500 hover:bg-accent-600 text-gray-900 text-lg px-8 py-4">
                <Phone className="h-5 w-5 rtl-flip" />
                اتصل الآن — {SITE_CONFIG.phone}
              </a>
              <a
                href={getWhatsAppUrl(`مرحباً، أريد الاستفسار عن خدمات الركن والستائر في ${location.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-lg px-8 py-4"
              >
                <WhatsAppIcon className="h-5 w-5" />
                واتساب من {location.name}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services in this location */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              خدماتنا في {location.name}
            </h2>
            <p className="mt-4 text-lg text-gray-600 text-center">
              نقدم جميع خدمات تصنيع الركن والستائر في {location.name} مع التوصيل والتركيب المجاني
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <div key={service.slug} className="flex items-start gap-3 rounded-xl bg-gray-50 p-5">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">{service.title} في {location.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl prose-arabic">
            <h2>لماذا تختار الأشقاء للركن والستائر في {location.name}؟</h2>
            <p>
              إذا كنت تبحث عن أفضل محل ركنات وستائر في {location.name}، فإن الأشقاء هم الخيار الأمثل.
              بخبرة تمتد لأكثر من {SITE_CONFIG.experienceYears} عاماً في مجال تصنيع وبيع الركن والانتريهات
              وتصميم وتركيب الستائر المودرن، نقدم لعملائنا في {location.name} و{location.region} أجود
              الخامات المستوردة بأفضل الأسعار.
            </p>

            <h3>تفصيل ركنات في {location.name}</h3>
            <p>
              نصنع ركنات مودرن وأمريكي وكلاسيك حسب الطلب في {location.name}. تتوفر لدينا مجموعة واسعة
              من أقمشة الشانيليا والجوبلان والقطيفة والكتان بجميع الألوان والموديلات. أسعارنا في {location.name}
              تنافسية جداً مقارنة بالسوق مع ضمان أعلى جودة.
            </p>

            <h3>تفصيل وتركيب ستائر في {location.name}</h3>
            <p>
              فريقنا المتخصص في {location.name} يقدم خدمة تفصيل وتركيب الستائر المودرن والكلاسيك بأحدث
              الموديلات العالمية. نوفر ستائر بلاك أوت، ستائر فوال، ستائر رول، وستائر مع كورنيشات فخمة.
              التركيب في {location.name} مجاني تماماً.
            </p>

            <h3>تنجيد انتريهات وصالونات في {location.name}</h3>
            <p>
              تنجيد انتريهات مودرن وكلاسيك في {location.name} بأجود الخامات. نجدد الانتريهات والصالونات القديمة
              ونحولها لجديدة تماماً. خدمة تنجيد الكنب البلدي متاحة أيضاً لجميع مناطق {location.name} و{location.region}.
            </p>

            <h3>مميزاتنا في {location.name}</h3>
            <ul className="list-disc pr-5 space-y-2">
              <li>توصيل وتركيب مجاني في {location.name} وجميع مناطق {location.region}</li>
              <li>ضمان شامل على جميع المنتجات</li>
              <li>معاينة مجانية في المنزل في {location.name}</li>
              <li>أسعار تنافسية — أفضل سعر في {location.name}</li>
              <li>فريق من {SITE_CONFIG.technicians} فني متخصص</li>
              <li>خبرة أكثر من {SITE_CONFIG.experienceYears} عاماً</li>
              <li>حجز موعد معاينة عبر الواتساب أو الاتصال: {SITE_CONFIG.phone}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              الأسئلة الشائعة — ركن وستائر في {location.name}
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: `كم سعر تفصيل ركنة في ${location.name}؟`,
                  a: `أسعار تفصيل الركنات في ${location.name} تبدأ من أسعار مناسبة جداً وتختلف حسب نوع القماش والمقاس. في الأشقاء نقدم أفضل الأسعار في ${location.name} و${location.region} مع معاينة مجانية. اتصل ${SITE_CONFIG.phone} للحصول على عرض سعر مخصص.`,
                },
                {
                  q: `هل توصلون ستائر وركنات لمنطقة ${location.name}؟`,
                  a: `نعم، نوفر خدمة التوصيل والتركيب المجاني في ${location.name} وجميع مناطق ${location.region}. فريقنا المتخصص يصل إليك في الموعد المحدد بالظبط.`,
                },
                {
                  q: `ما أفضل محل ركنات وستائر في ${location.name}؟`,
                  a: `الأشقاء للركن والستائر من أفضل وأشهر الأماكن في ${location.name} لتفصيل الركنات والستائر المودرن. بخبرة أكثر من ${SITE_CONFIG.experienceYears} عاماً وفريق من ${SITE_CONFIG.technicians} فني متخصص، نقدم أجود الخامات المستوردة بأسعار تنافسية.`,
                },
                {
                  q: `كم يستغرق تنفيذ ركنة أو ستائر في ${location.name}؟`,
                  a: `يستغرق تصنيع الركنة من 5 إلى 10 أيام عمل وتفصيل الستائر من 3 إلى 7 أيام. نلتزم بالمواعيد ونوفر التوصيل والتركيب في ${location.name} مجاناً.`,
                },
              ].map((faq, idx) => (
                <details key={idx} className="group rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
                  <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
                    <span>{faq.q}</span>
                    <svg className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nearby locations internal linking */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            خدماتنا في مناطق أخرى قريبة من {location.name}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[...nearbyLocations, ...otherLocations].slice(0, 12).map((loc) => (
              <Link
                key={loc.slug}
                href={`/مواقعنا/${loc.slug}`}
                className="flex items-center gap-2 rounded-xl bg-white p-4 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md hover:ring-primary-200 hover:text-primary-700"
              >
                <MapPin className="h-4 w-4 shrink-0 text-primary-500" />
                ركن وستائر {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 text-white section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold">جاهز تجدد بيتك في {location.name}؟</h2>
          <p className="mt-4 text-lg text-white/90">
            احصل على معاينة مجانية في {location.name} — اتصل الآن أو تواصل عبر الواتساب
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={getPhoneUrl()} className="btn-primary bg-primary-500 text-navy-950 hover:bg-primary-400 text-lg px-8 py-4">
              <Phone className="h-5 w-5 rtl-flip" />
              اتصل الآن — {SITE_CONFIG.phone}
            </a>
            <a
              href={getWhatsAppUrl(`مرحباً، أنا من ${location.name} وأريد الاستفسار عن خدمات الركن والستائر`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-lg px-8 py-4"
            >
              <WhatsAppIcon className="h-5 w-5" />
              تواصل عبر الواتساب
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
