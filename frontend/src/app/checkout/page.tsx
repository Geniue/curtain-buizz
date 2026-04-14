import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import CheckoutContent from './CheckoutContent'

export const metadata: Metadata = {
  title: 'إتمام الشراء | متجر الأشقاء',
  description: 'أكمل بيانات الشحن وطريقة الدفع. الدفع عند الاستلام — توصيل لجميع محافظات مصر.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${SITE_CONFIG.url}/اتمام-الشراء`,
  },
}

export default function CheckoutPage() {
  return <CheckoutContent />
}
