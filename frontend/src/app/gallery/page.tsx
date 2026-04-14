import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import GalleryPageContent from './GalleryPageContent'
import { GALLERY_ITEMS, getTotalGalleryPages } from '@/lib/gallery-data'

export const metadata: Metadata = {
  title: 'معرض أعمالنا — صور ركنات وستائر وأثاث حقيقية | الأشقاء للركن والستائر',
  description: 'شاهد معرض أعمال الأشقاء للركن والستائر. صور حقيقية لركنات مودرن، ستائر فاخرة، انتريهات، صالونات، سراير كابتونيه. أكثر من 30 سنة خبرة في التنجيد والستائر.',
  keywords: [
    'معرض اعمال تنجيد', 'صور ركنات', 'صور ستائر مودرن', 'اعمال تنجيد انتريهات',
    'ركنات مودرن مصر', 'ستائر فاخرة مصر', 'تصميمات ركنات', 'تصميمات ستائر',
    'معرض اثاث', 'الأشقاء للركن والستائر', 'تنجيد مصر',
  ],
  openGraph: {
    title: 'معرض أعمالنا | الأشقاء للركن والستائر',
    description: 'شاهد أحدث أعمالنا في تصنيع الركنات والستائر. صور حقيقية من عملائنا.',
    url: `${SITE_CONFIG.url}/معرض-اعمالنا`,
    type: 'website',
    images: GALLERY_ITEMS.slice(0, 4).map((item) => ({
      url: item.image,
      width: 1200,
      height: 800,
      alt: item.altText,
    })),
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/معرض-اعمالنا`,
  },
}

export default function GalleryPage() {
  const totalPages = getTotalGalleryPages()
  return <GalleryPageContent currentPage={1} totalPages={totalPages} />
}
