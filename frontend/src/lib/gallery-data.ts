/**
 * Shared gallery types and layout constants.
 *
 * Gallery records are CMS-managed and come from the Laravel API via
 * src/lib/api/gallery.ts. No image records are hardcoded here.
 */

export interface GalleryItem {
  id: number
  title: string
  slug: string
  description: string
  image: string
  category: string
  altText: string
  sortOrder: number
  showOnHome: boolean
}

/** Must match the `limit` the gallery endpoint is queried with. */
export const GALLERY_PAGE_SIZE = 12

export const ALL_CATEGORIES_LABEL = 'الكل'
