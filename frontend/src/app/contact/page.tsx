import type { Metadata } from 'next'
import { Phone, Mail } from 'lucide-react'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import ContactForm from '@/components/sections/ContactForm'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'
import { SITE_CONFIG } from '@/lib/constants'
import { getPhoneUrl, getWhatsAppUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'تواصل معنا — الأشقاء للركن والستائر',
  description: 'تواصل مع الأشقاء للركن والستائر — اتصل على 01105001387 أو تواصل عبر الواتساب للحصول على معاينة مجانية واستشارة من مهندسينا المتخصصين.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/تواصل-معنا`,
  },
  robots: { index: true, follow: true },
}

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'تواصل معنا', href: '/تواصل-معنا' }]} />

      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">تواصل معنا</h1>
            <p className="mt-4 text-lg text-gray-600">
              يمكنك التواصل معنا من خلال الاتصال هاتفياً أو عبر الواتساب أو من خلال النموذج أدناه.
              نسعد بخدمتكم والرد على جميع استفساراتكم.
            </p>
          </div>

          {/* Contact methods */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
            <a
              href={getPhoneUrl()}
              className="flex flex-col items-center gap-3 rounded-2xl bg-primary-50 p-6 text-center transition-colors hover:bg-primary-100"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white">
                <Phone className="h-6 w-6 rtl-flip" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">اتصل بنا</h3>
                <p className="text-primary-600 font-semibold mt-1">{SITE_CONFIG.phone}</p>
              </div>
            </a>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 rounded-2xl bg-green-50 p-6 text-center transition-colors hover:bg-green-100"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">
                <WhatsAppIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">واتساب</h3>
                <p className="text-green-600 font-semibold mt-1">تواصل الآن</p>
              </div>
            </a>

            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex flex-col items-center gap-3 rounded-2xl bg-gray-50 p-6 text-center transition-colors hover:bg-gray-100"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700 text-white">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">البريد الإلكتروني</h3>
                <p className="text-gray-600 font-semibold mt-1">{SITE_CONFIG.email}</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="mt-16 mx-auto max-w-2xl">
            <ContactForm />
          </div>

          {/* Why Contact Section */}
          <div className="mt-16 mx-auto max-w-3xl prose-arabic">
            <h2 className="text-center">لماذا يجب التواصل معنا</h2>
            <p>
              تقدم الأشقاء خدمات تصنيع الركن والانتريهات والستائر المتعددة. يمكن التواصل مع فني
              التركيب والتفصيل لتلبية احتياجاتك المختلفة في القاهرة.
            </p>
            <p>
              الفني يتعامل مع جميع أنواع الستائر بالإضافة إلى أننا نقدم خدمات تنجيد الصالونات
              والانتريهات حسب الطلب. نمتلك خبرة واسعة في تركيب وتفصيل الستائر بجودة عالية
              وتصميمات متنوعة.
            </p>
            <p>
              بالإضافة إلى ذلك، يتوفر فني متخصص في تنجيد الانتريهات والكنب. يقدم خدمة تصنيع
              وتنجيد الانتريهات حسب الطلب، بالإضافة إلى تركيب الستائر المناسبة للنوافذ والأبواب.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
