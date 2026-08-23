import { getHomeGalleryItems } from '@/lib/api/gallery'
import GalleryContent from './GalleryContent'

/**
 * Homepage gallery. The records are CMS-managed, so they are read from the
 * Laravel API per request instead of a build-time constant. If the API is
 * unavailable the section renders nothing rather than stale placeholder work.
 */
export default async function Gallery() {
  try {
    const items = await getHomeGalleryItems()

    return <GalleryContent items={items} />
  } catch {
    return null
  }
}
