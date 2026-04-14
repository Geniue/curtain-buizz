import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import ShopContent from './ShopContent'

export const metadata: Metadata = {
  title: 'المتجر — اشتري ركنات وستائر وأثاث اونلاين | الأشقاء للركن والستائر',
  description: 'تسوق اونلاين من الأشقاء للركن والستائر. ركنات مودرن، انتريهات، ستائر بلاك آوت، سراير كابتونيه، صالونات. توصيل لجميع محافظات مصر. الدفع عند الاستلام.',
  keywords: [
    'شراء ركنات اونلاين', 'متجر اثاث مصر', 'ستائر اونلاين', 'ركنات مودرن للبيع',
    'انتريهات اونلاين', 'اسعار الركنات في مصر', 'شراء ستائر مودرن', 'اثاث مصري',
    'سراير كابتونيه', 'صالونات كلاسيك', 'توصيل اثاث مصر', 'الدفع عند الاستلام',
  ],
  openGraph: {
    title: 'المتجر — اشتري ركنات وستائر اونلاين | الأشقاء',
    description: 'تسوق اونلاين من الأشقاء. ركنات، ستائر، انتريهات بأفضل الأسعار. توصيل مجاني للطلبات فوق 5000 ج.م',
    url: `${SITE_CONFIG.url}/المتجر`,
    type: 'website',
    images: [{
      url: '/images/og-image.webp',
      width: 1200,
      height: 630,
      alt: 'المتجر - اشتري ركنات وستائر | الأشقاء للركن والستائر',
    }],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/المتجر`,
  },
}

export default function ShopPage() {
  return <ShopContent />
}
