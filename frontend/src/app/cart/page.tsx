import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import CartContent from './CartContent'

export const metadata: Metadata = {
  title: 'سلة التسوق | متجر الأشقاء',
  description: 'راجع منتجاتك في سلة التسوق وأكمل الشراء. الدفع عند الاستلام — توصيل لجميع محافظات مصر.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${SITE_CONFIG.url}/سلة-التسوق`,
  },
}

export default function CartPage() {
  return <CartContent />
}
