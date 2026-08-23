/**
 * Raw shapes returned by the Laravel API.
 *
 * These mirror the database columns exactly (snake_case, decimal strings,
 * relative storage paths). Nothing outside src/lib/api should import them:
 * everything is normalized once at the API boundary in normalize.ts.
 */

export interface ApiCategory {
  id: number
  name: string
  slug: string
  description: string | null
  image: string | null
  sort_order: number
  is_active: boolean
  /** Present only on GET /api/shop/categories (withCount). */
  products_count?: number
}

export interface ApiProduct {
  id: number
  name: string
  slug: string
  short_description: string | null
  description: string | null
  /** Laravel decimal:2 cast serializes as a string, e.g. "22000.00". */
  price: string | number
  old_price: string | number | null
  sku: string | null
  images: string[] | null
  category_id: number | null
  stock: number
  is_featured: boolean
  is_active: boolean
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string[] | null
  specifications: Record<string, string> | null
  sort_order: number
  created_at: string | null
  /** Eager-loaded on the listing and detail endpoints, absent on `related`. */
  category?: ApiCategory | null
}

export interface ApiGalleryItem {
  id: number
  title: string
  slug: string
  description: string | null
  image: string | null
  category: string
  alt_text: string | null
  sort_order: number
  is_active: boolean
  show_on_home: boolean
}

/** GET /api/gallery/categories */
export interface ApiGalleryCategoryCount {
  category: string
  count: number
}

/** Laravel paginator envelope. */
export interface ApiPaginated<T> {
  current_page: number
  data: T[]
  last_page: number
  per_page: number
  total: number
}
