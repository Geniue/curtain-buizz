import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SHOP_PRODUCTS, getProductBySlug } from '@/lib/shop-data'
import { SITE_CONFIG } from '@/lib/constants'
import ProductDetailContent from './ProductDetailContent'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SHOP_PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(decodeURIComponent(slug))
  if (!product) return {}

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
  const product = getProductBySlug(decodeURIComponent(slug))
  if (!product) notFound()

  return <ProductDetailContent product={product} />
}
