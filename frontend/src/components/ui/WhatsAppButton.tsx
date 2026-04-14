'use client'

import WhatsAppIcon from '@/components/icons/WhatsAppIcon'
import { getWhatsAppUrl } from '@/lib/utils'

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl('مرحباً، أريد الاستفسار عن خدمات التنجيد والستائر')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر الواتساب"
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:bg-green-600 hover:scale-110 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  )
}
