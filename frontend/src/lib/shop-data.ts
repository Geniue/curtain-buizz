/**
 * Shared storefront types and presentation helpers.
 *
 * Product and category records are CMS-managed and come from the Laravel API
 * via src/lib/api/shop.ts. Nothing catalogue-shaped may be hardcoded here:
 * a second copy of that data is exactly what disconnected the admin panel from
 * the public site.
 */

export interface ShopCategory {
  id: number
  name: string
  slug: string
  description: string
  image?: string
  /** Active products in this category, counted by the database. */
  productsCount: number
}

export interface ShopProduct {
  id: number
  name: string
  slug: string
  shortDescription: string
  description: string
  price: number
  oldPrice: number | null
  sku: string
  images: string[]
  categoryId: number
  categoryName: string
  categorySlug: string
  stock: number
  isFeatured: boolean
  specifications: Record<string, string>
  seoTitle: string
  seoDescription: string
  seoKeywords: string[]
}

export interface CartItem {
  id: number
  name: string
  slug: string
  price: number
  oldPrice: number | null
  image: string
  quantity: number
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ar-EG').format(price)
}

export function getDiscountPercent(price: number, oldPrice: number | null): number | null {
  if (!oldPrice || oldPrice <= price) return null
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

// Commercial rules, not CMS records.
export const FREE_SHIPPING_THRESHOLD = 5000
export const SHIPPING_COST = 150
