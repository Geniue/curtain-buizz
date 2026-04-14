import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { SITE_CONFIG, LOCATIONS } from '@/lib/constants'
import { SHOP_PRODUCTS, SHOP_CATEGORIES } from '@/lib/shop-data'
import { getTotalGalleryPages } from '@/lib/gallery-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const blogEntries = posts.map((post) => ({
    url: `${SITE_CONFIG.url}/المدونة/${post.slug}`,
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

  const shopEntries = SHOP_PRODUCTS.map((product) => ({
    url: `${SITE_CONFIG.url}/المتجر/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const galleryTotalPages = getTotalGalleryPages()
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
      url: `${SITE_CONFIG.url}/المدونة`,
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
