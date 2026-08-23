import type { ShopCategory, ShopProduct } from '@/lib/shop-data'
import type { GalleryItem } from '@/lib/gallery-data'
import type { ApiCategory, ApiGalleryItem, ApiProduct } from './types'

/** Shown only when a CMS record genuinely has no image attached. */
export const PLACEHOLDER_IMAGE = '/images/logo.jpg'

/**
 * Laravel serializes `decimal:2` columns as strings ("22000.00").
 * Never let one reach the UI as NaN.
 */
export function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number') return Number.isFinite(value) ? value : fallback
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

/** Like toNumber, but preserves "no value" so discounts stay correct. */
export function toNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  const parsed = toNumber(value, Number.NaN)
  return Number.isFinite(parsed) ? parsed : null
}

/**
 * Resolve a stored image reference to a browser-usable path.
 *
 * Filament uploads store a disk-relative path ("products/x.jpeg"), while the
 * seeded records store a public asset path ("/images/work/x.jpg"). The public
 * server maps /storage to Laravel's public disk, so only the first form needs
 * a prefix, and it must never be applied twice.
 */
export function normalizeImagePath(raw: unknown): string | null {
  if (typeof raw !== 'string') return null

  const trimmed = raw.trim()
  if (!trimmed) return null

  // Absolute and protocol-relative URLs pass through untouched.
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('//')) return trimmed

  const withoutLeadingSlashes = trimmed.replace(/^\/+/, '')
  if (!withoutLeadingSlashes) return null

  // Already points at the public disk - do not produce /storage/storage/...
  if (withoutLeadingSlashes.startsWith('storage/')) return `/${withoutLeadingSlashes}`

  // Any other rooted path is a public asset that is already served as-is.
  if (trimmed.startsWith('/')) return `/${withoutLeadingSlashes}`

  // Disk-relative upload path.
  return `/storage/${withoutLeadingSlashes}`
}

function normalizeImageList(images: unknown): string[] {
  if (!Array.isArray(images)) return []
  return images
    .map(normalizeImagePath)
    .filter((path): path is string => path !== null)
}

export function normalizeCategory(raw: ApiCategory): ShopCategory {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    description: raw.description ?? '',
    image: normalizeImagePath(raw.image) ?? undefined,
    productsCount: typeof raw.products_count === 'number' ? raw.products_count : 0,
  }
}

/**
 * `related` products come back without their eager-loaded category, but the
 * backend already guarantees they share the parent's category, so the caller
 * passes it down rather than firing extra requests.
 */
export function normalizeProduct(
  raw: ApiProduct,
  categoryFallback?: { name: string; slug: string }
): ShopProduct {
  const images = normalizeImageList(raw.images)

  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    shortDescription: raw.short_description ?? '',
    description: raw.description ?? '',
    price: toNumber(raw.price),
    oldPrice: toNullableNumber(raw.old_price),
    sku: raw.sku ?? '',
    images: images.length > 0 ? images : [PLACEHOLDER_IMAGE],
    categoryId: raw.category_id ?? 0,
    categoryName: raw.category?.name ?? categoryFallback?.name ?? '',
    categorySlug: raw.category?.slug ?? categoryFallback?.slug ?? '',
    stock: toNumber(raw.stock),
    isFeatured: Boolean(raw.is_featured),
    specifications: raw.specifications ?? {},
    seoTitle: raw.seo_title ?? '',
    seoDescription: raw.seo_description ?? '',
    seoKeywords: Array.isArray(raw.seo_keywords) ? raw.seo_keywords : [],
  }
}

export function normalizeGalleryItem(raw: ApiGalleryItem): GalleryItem {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    description: raw.description ?? '',
    image: normalizeImagePath(raw.image) ?? PLACEHOLDER_IMAGE,
    category: raw.category,
    altText: raw.alt_text ?? raw.title,
    sortOrder: toNumber(raw.sort_order),
    showOnHome: Boolean(raw.show_on_home),
  }
}
