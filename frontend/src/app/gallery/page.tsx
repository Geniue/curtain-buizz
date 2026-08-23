import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { getAllGalleryItems } from '@/lib/api/gallery'
import { GALLERY_PAGE_SIZE } from '@/lib/gallery-data'
import GalleryPageContent from './GalleryPageContent'

// CMS-managed records: resolved per request, never a build-time snapshot.
export const dynamic = 'force-dynamic'

const BASE_METADATA: Metadata = {
  title: 'معرض أعمالنا — صور ركنات وستائر وأثاث حقيقية | الأشقاء للركن والستائر',
  description: 'شاهد معرض أعمال الأشقاء للركن والستائر. صور حقيقية لركنات مودرن، ستائر فاخرة، انتريهات، صالونات، سراير كابتونيه. أكثر من 30 سنة خبرة في التنجيد والستائر.',
  keywords: [
    'معرض اعمال تنجيد', 'صور ركنات', 'صور ستائر مودرن', 'اعمال تنجيد انتريهات',
    'ركنات مودرن مصر', 'ستائر فاخرة مصر', 'تصميمات ركنات', 'تصميمات ستائر',
    'معرض اثاث', 'الأشقاء للركن والستائر', 'تنجيد مصر',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/معرض-اعمالنا`,
  },
}

export async function generateMetadata(): Promise<Metadata> {
  let images: { url: string; width: number; height: number; alt: string }[] = []

  try {
    const { items } = await getAllGalleryItems()
    images = items.slice(0, 4).map((item) => ({
      url: item.image,
      width: 1200,
      height: 800,
      alt: item.altText,
    }))
  } catch {
    // Metadata must not fail the page; omit the images rather than inventing them.
  }

  return {
    ...BASE_METADATA,
    openGraph: {
      title: 'معرض أعمالنا | الأشقاء للركن والستائر',
      description: 'شاهد أحدث أعمالنا في تصنيع الركنات والستائر. صور حقيقية من عملائنا.',
      url: `${SITE_CONFIG.url}/معرض-اعمالنا`,
      type: 'website',
      ...(images.length > 0 ? { images } : {}),
    },
  }
}

export default async function GalleryPage() {
  try {
    const { items, total } = await getAllGalleryItems()
    const totalPages = Math.max(1, Math.ceil(total / GALLERY_PAGE_SIZE))

    return <GalleryPageContent items={items} currentPage={1} totalPages={totalPages} />
  } catch {
    return <GalleryPageContent items={[]} currentPage={1} totalPages={1} />
  }
}
