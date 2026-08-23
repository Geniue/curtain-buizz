import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SITE_CONFIG } from '@/lib/constants'
import { getAllGalleryItems } from '@/lib/api/gallery'
import { GALLERY_PAGE_SIZE } from '@/lib/gallery-data'
import GalleryPageContent from '../../GalleryPageContent'

interface PageProps {
  params: Promise<{ num: string }>
}

/**
 * Page count follows the CMS record count, so routes are resolved per request
 * rather than frozen into generateStaticParams at build time.
 */
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { num } = await params
  const page = parseInt(num)

  return {
    title: `معرض أعمالنا — صفحة ${page} | الأشقاء للركن والستائر`,
    description: `صفحة ${page} من معرض أعمال الأشقاء للركن والستائر. صور حقيقية لركنات وستائر وأثاث مصري.`,
    alternates: {
      canonical: page === 1 ? `${SITE_CONFIG.url}/معرض-اعمالنا` : `${SITE_CONFIG.url}/معرض-اعمالنا/صفحة/${page}`,
    },
    robots: { index: true, follow: true },
  }
}

export default async function GalleryPaginatedPage({ params }: PageProps) {
  const { num } = await params
  const page = parseInt(num)

  if (isNaN(page) || page < 1) notFound()

  const { items, total } = await getAllGalleryItems()
  const totalPages = Math.max(1, Math.ceil(total / GALLERY_PAGE_SIZE))

  if (page > totalPages) notFound()

  return <GalleryPageContent items={items} currentPage={page} totalPages={totalPages} />
}
