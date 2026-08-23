import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { SITE_CONFIG, LOCATIONS } from '@/lib/constants'
import { getShopProducts } from '@/lib/api/shop'
import { getAllGalleryItems } from '@/lib/api/gallery'
import { GALLERY_PAGE_SIZE } from '@/lib/gallery-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()

  const blogEntries = posts.map((post) => ({
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const locationEntries = LOCATIONS.map((loc) => ({
    url: `${SITE_CONFIG.url}/مواقعنا/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Product URLs and gallery page count follow the CMS, so a newly published
  // product is listed without a rebuild. A backend outage drops those entries
  // rather than emitting URLs for products that may no longer exist.
  let shopEntries: MetadataRoute.Sitemap = []
  try {
    const { products } = await getShopProducts()
    shopEntries = products.map((product) => ({
      url: `${SITE_CONFIG.url}/المتجر/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  } catch {
    shopEntries = []
  }

  let galleryTotalPages = 1
  try {
    const { total } = await getAllGalleryItems()
    galleryTotalPages = Math.max(1, Math.ceil(total / GALLERY_PAGE_SIZE))
  } catch {
    galleryTotalPages = 1
  }
  const galleryEntries = Array.from({ length: galleryTotalPages }, (_, i) => ({
    url: i === 0 ? `${SITE_CONFIG.url}/معرض-اعمالنا` : `${SITE_CONFIG.url}/معرض-اعمالنا/صفحة/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_CONFIG.url}/المتجر`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${SITE_CONFIG.url}/مواقعنا`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/من-نحن`,
      lastModified: new Date('2023-08-09'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_CONFIG.url}/تواصل-معنا`,
      lastModified: new Date('2023-08-09'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_CONFIG.url}/سياسة-الخصوصية`,
      lastModified: new Date('2023-08-09'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...locationEntries,
    ...blogEntries,
    ...shopEntries,
    ...galleryEntries,
  ]
}
