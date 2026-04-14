import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { SITE_CONFIG, LOCATIONS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'مواقعنا — الأشقاء للركن والستائر في جميع مناطق مصر',
  description: `الأشقاء للركن والستائر — نخدم جميع مناطق مصر: القاهرة، الجيزة، الإسكندرية، الزقازيق، المنصورة و30+ منطقة أخرى. تصنيع ركنات وستائر مع التوصيل والتركيب. اتصل ${SITE_CONFIG.phone}`,
  keywords: [
    ...LOCATIONS.map((loc) => `ركنات في ${loc.name}`),
    ...LOCATIONS.map((loc) => `ستائر في ${loc.name}`),
    'تنجيد في مصر', 'ركنات في القاهرة', 'ستائر في الجيزة',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/مواقعنا`,
  },
  openGraph: {
    title: 'مواقعنا — الأشقاء للركن والستائر في جميع مناطق مصر',
    description: `نخدم 30+ منطقة في مصر. اتصل ${SITE_CONFIG.phone}`,
    url: `${SITE_CONFIG.url}/مواقعنا`,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function LocationsPage() {
  const regions = [...new Set(LOCATIONS.map((loc) => loc.region))]

  return (
    <>
      <Breadcrumbs items={[{ name: 'مواقعنا', href: '/مواقعنا' }]} />

      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              مواقع خدمة الأشقاء للركن والستائر
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              نقدم خدمات تصنيع الركنات والانتريهات وتفصيل وتركيب الستائر في جميع مناطق مصر.
              اختر منطقتك لمعرفة تفاصيل الخدمات المتاحة.
            </p>
          </div>

          {regions.map((region) => (
            <div key={region} className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary-600" />
                {region}
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {LOCATIONS.filter((loc) => loc.region === region).map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/مواقعنا/${loc.slug}`}
                    className="flex items-center gap-2 rounded-xl bg-white p-4 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md hover:ring-primary-300 hover:text-primary-700"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-primary-500" />
                    ركن وستائر {loc.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-16 mx-auto max-w-3xl prose-arabic">
            <h2>الأشقاء للركن والستائر — خدمة في كل مكان في مصر</h2>
            <p>
              بفضل خبرتنا الممتدة لأكثر من {SITE_CONFIG.experienceYears} عاماً وفريقنا المتخصص المكون من
              {SITE_CONFIG.technicians} فني، نقدم خدمات تصنيع وبيع الركنات والانتريهات والصالونات وتفصيل
              وتركيب الستائر المودرن في جميع محافظات ومدن مصر.
            </p>
            <p>
              سواء كنت في القاهرة الكبرى ({LOCATIONS.filter(l => l.region === 'القاهرة').map(l => l.name).join(' — ')})
              أو في الجيزة ({LOCATIONS.filter(l => l.region === 'الجيزة').map(l => l.name).join(' — ')})
              أو في أي منطقة أخرى في مصر — فريقنا جاهز لخدمتك بأعلى جودة وأفضل سعر.
            </p>
            <p>
              اتصل الآن على <strong>{SITE_CONFIG.phone}</strong> أو تواصل عبر الواتساب لحجز معاينة
              مجانية في منطقتك.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
