import type { GalleryItem } from '@/lib/gallery-data'
import { apiGet } from './client'
import { normalizeGalleryItem } from './normalize'
import type { ApiGalleryCategoryCount, ApiGalleryItem, ApiPaginated } from './types'

/**
 * Every active gallery record.
 *
 * The gallery page filters by category across the whole set and paginates only
 * the unfiltered view, so it needs the full list rather than one page. Kept
 * well above the real record count.
 */
const GALLERY_MAX_ITEMS = 200

export async function getAllGalleryItems(): Promise<{ items: GalleryItem[]; total: number }> {
  const response = await apiGet<ApiPaginated<ApiGalleryItem>>(
    `/gallery?limit=${GALLERY_MAX_ITEMS}`
  )

  const items = (response.data ?? []).map(normalizeGalleryItem)

  return { items, total: response.total ?? items.length }
}

/** Records the admin flagged for the homepage, already limited by the backend. */
export async function getHomeGalleryItems(): Promise<GalleryItem[]> {
  const response = await apiGet<ApiGalleryItem[]>('/gallery/home')

  return (Array.isArray(response) ? response : []).map(normalizeGalleryItem)
}

export interface GalleryCategoryCount {
  category: string
  count: number
}

export async function getGalleryCategoryCounts(): Promise<GalleryCategoryCount[]> {
  const response = await apiGet<ApiGalleryCategoryCount[]>('/gallery/categories')

  return (Array.isArray(response) ? response : []).map((entry) => ({
    category: entry.category,
    count: typeof entry.count === 'number' ? entry.count : 0,
  }))
}
