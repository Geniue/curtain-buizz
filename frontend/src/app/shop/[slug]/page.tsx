import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ApiNotFoundError } from '@/lib/api/client'
import { getProductWithRelated, type ProductWithRelated } from '@/lib/api/shop'
import { SITE_CONFIG } from '@/lib/constants'
import ProductDetailContent from './ProductDetailContent'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Products are CMS-managed, so routes are resolved per request. A product
 * created in Filament is reachable immediately, with no rebuild and no
 * build-time slug list to keep in sync.
 */
export const dynamic = 'force-dynamic'

async function loadProduct(slug: string): Promise<ProductWithRelated | null> {
  try {
    return await getProductWithRelated(decodeURIComponent(slug))
  } catch (error) {
    if (error instanceof ApiNotFoundError) return null
    throw error
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await loadProduct(slug)
  if (!result) return {}

  const { product } = result

  return {
    title: product.seoTitle || `${product.name} | متجر الأشقاء`,
    description: product.seoDescription || product.shortDescription,
    keywords: product.seoKeywords,
    openGraph: {
      title: product.seoTitle || product.name,
      description: product.seoDescription || product.shortDescription,
      url: `${SITE_CONFIG.url}/المتجر/${product.slug}`,
      type: 'website',
      images: product.images.map((img) => ({ url: img, alt: product.name })),
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/المتجر/${product.slug}`,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const result = await loadProduct(slug)
  if (!result) notFound()

  return <ProductDetailContent product={result.product} related={result.related} />
}
