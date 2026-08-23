import type { ShopCategory, ShopProduct } from '@/lib/shop-data'
import { apiGet } from './client'
import { normalizeCategory, normalizeProduct } from './normalize'
import type { ApiCategory, ApiPaginated, ApiProduct } from './types'

/**
 * The storefront filters and sorts on the client for instant feedback, so the
 * catalogue is fetched once per render. Kept well above the real catalogue size
 * to avoid a partial listing; revisit if the catalogue ever approaches this.
 */
const CATALOGUE_PAGE_SIZE = 200

export interface ShopCatalogue {
  products: ShopProduct[]
  categories: ShopCategory[]
  /** Authoritative active-product count from the database. */
  total: number
}

export async function getShopProducts(): Promise<{ products: ShopProduct[]; total: number }> {
  const response = await apiGet<ApiPaginated<ApiProduct>>(
    `/shop/products?limit=${CATALOGUE_PAGE_SIZE}`
  )

  return {
    products: (response.data ?? []).map((product) => normalizeProduct(product)),
    total: typeof response.total === 'number' ? response.total : (response.data ?? []).length,
  }
}

export async function getShopCategories(): Promise<ShopCategory[]> {
  const response = await apiGet<ApiCategory[]>('/shop/categories')

  return (Array.isArray(response) ? response : []).map(normalizeCategory)
}

/** Both halves of the storefront in one place, fetched concurrently. */
export async function getShopCatalogue(): Promise<ShopCatalogue> {
  const [{ products, total }, categories] = await Promise.all([
    getShopProducts(),
    getShopCategories(),
  ])

  return { products, categories, total }
}

export interface ProductWithRelated {
  product: ShopProduct
  related: ShopProduct[]
}

/**
 * Throws ApiNotFoundError when the slug does not exist or is inactive, so the
 * page can render a real 404 instead of inventing a product.
 */
export async function getProductWithRelated(slug: string): Promise<ProductWithRelated> {
  const response = await apiGet<{ product: ApiProduct; related: ApiProduct[] }>(
    `/shop/products/${encodeURIComponent(slug)}`
  )

  const product = normalizeProduct(response.product)

  // The backend selects `related` from the same category but does not eager-load
  // it, so reuse the parent's category rather than firing a request per card.
  const related = (response.related ?? []).map((item) =>
    normalizeProduct(item, { name: product.categoryName, slug: product.categorySlug })
  )

  return { product, related }
}
