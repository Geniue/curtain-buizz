import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SITE_CONFIG } from '@/lib/constants'
import { getTotalGalleryPages } from '@/lib/gallery-data'
import GalleryPageContent from '../../GalleryPageContent'

interface PageProps {
  params: Promise<{ num: string }>
}

export async function generateStaticParams() {
  const totalPages = getTotalGalleryPages()
  return Array.from({ length: totalPages }, (_, i) => ({ num: String(i + 1) }))
}

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
  const totalPages = getTotalGalleryPages()

  if (isNaN(page) || page < 1 || page > totalPages) notFound()

  return <GalleryPageContent currentPage={page} totalPages={totalPages} />
}
