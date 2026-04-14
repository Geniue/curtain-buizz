'use client'

import { Phone } from 'lucide-react'
import MotionWrapper from '@/components/ui/MotionWrapper'
import StaggerChildren, { StaggerItem } from '@/components/ui/StaggerChildren'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'
import { PROCESS_STEPS, SITE_CONFIG } from '@/lib/constants'
import { getPhoneUrl, getWhatsAppUrl } from '@/lib/utils'

export default function Process() {
  return (
    <section className="section-padding" aria-labelledby="process-heading">
      <div className="container-custom">
        <MotionWrapper className="mx-auto max-w-2xl text-center">
          <h2 id="process-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">
            ازاي تتعامل مع الأشقاء بسهولة
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            اتصل بنا واحجز موعداً وسنكون سعداء بتقديم خدماتنا وتحقيق تطلعاتكم
            في إضافة لمسة جمالية وراحة إلى مساحتكم
          </p>
        </MotionWrapper>

        <StaggerChildren className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <StaggerItem key={step.step}>
              <div className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
                  {step.step}
                </div>
                <h3 className="mt-6 text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <MotionWrapper delay={0.4} className="mt-12 text-center">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={getPhoneUrl()} className="btn-primary text-lg px-8 py-4">
              <Phone className="h-5 w-5 rtl-flip" />
              اتصل بنا — {SITE_CONFIG.phone}
            </a>
            <a
              href={getWhatsAppUrl('مرحباً، أريد حجز موعد معاينة')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-lg px-8 py-4"
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
