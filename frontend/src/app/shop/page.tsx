import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { getShopCatalogue } from '@/lib/api/shop'
import ShopContent from './ShopContent'

// CMS-managed catalogue: never freeze this page into a build-time snapshot.
export const dynamic = 'force-dynamic'

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

export default async function ShopPage() {
  try {
    const { products, categories, total } = await getShopCatalogue()

    return <ShopContent products={products} categories={categories} total={total} />
  } catch {
    // Surface the backend outage instead of falling back to stale fake records.
    return <ShopContent products={[]} categories={[]} total={0} loadFailed />
  }
}
