'use client'

import { Phone } from 'lucide-react'
import MotionWrapper from '@/components/ui/MotionWrapper'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'
import { getPhoneUrl, getWhatsAppUrl } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'

export default function CTA() {
  return (
    <section className="bg-navy-900 text-white" aria-labelledby="cta-heading">
      <div className="container-custom section-padding">
        <MotionWrapper className="mx-auto max-w-3xl text-center">
          <h2 id="cta-heading" className="text-3xl font-bold sm:text-4xl">
            جاهز تجدد بيتك؟ تواصل معنا الآن
          </h2>
          <p className="mt-4 text-lg text-white/90">
            احصل على معاينة مجانية واستشارة من مهندسينا المتخصصين.
            نحن نضمن لك أجود الخامات وأفضل الأسعار في مصر.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={getPhoneUrl()} className="btn-primary bg-primary-500 text-navy-950 hover:bg-primary-400 w-full sm:w-auto text-lg px-8 py-4">
              <Phone className="h-5 w-5 rtl-flip" />
              اتصل الآن — {SITE_CONFIG.phone}
            </a>
            <a
              href={getWhatsAppUrl('مرحباً، أريد الاستفسار عن خدمات التنجيد والستائر')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto text-lg px-8 py-4"
            >
              <WhatsAppIcon className="h-5 w-5" />
              تواصل عبر الواتساب
            </a>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
