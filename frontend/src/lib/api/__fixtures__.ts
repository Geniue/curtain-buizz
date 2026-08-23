import type { ApiCategory, ApiGalleryItem, ApiProduct } from './types'

/** Verbatim shape of the Filament-created product from the production API. */
export const PRODUCT_9: ApiProduct = {
  id: 9,
  name: 'ركنة مودرن حرف L قماش قطيفة',
  slug: 'modern-l-shape-velvet-corner-sofa',
  short_description: 'ركنة مودرن حرف L بقماش قطيفة فاخر',
  description: '<p>تم تصميم الركنة</p>',
  price: '22000.00',
  old_price: '28000.00',
  sku: 'RK-L-VELVET-001',
  images: [
    'products/01M0Q00AETN6ATN29BAGTYT6SE.jpeg',
    'products/01M0Q00AEVMKPX94CFM6QZH88V.jpeg',
  ],
  category_id: 1,
  stock: 10,
  is_featured: true,
  is_active: true,
  seo_title: 'ركنة مودرن حرف L قماش قطيفة | الأشقاء للركن والستائر',
  seo_description: 'اشتري ركنة مودرن حرف L بقماش قطيفة فاخر',
  seo_keywords: ['ركنة مودرن', 'ركنة حرف L'],
  specifications: { 'النوع': 'ركنة مودرن حرف L', 'القماش': 'قطيفة بوليفار' },
  sort_order: 1,
  created_at: '2026-08-23T09:42:37.000000Z',
  category: {
    id: 1,
    name: 'ركنات',
    slug: 'ركنات',
    description: 'ركنات مودرن وكلاسيك بأجود الخامات',
    image: null,
    sort_order: 1,
    is_active: true,
  },
}

/** A seeded product, whose images are public asset paths, not uploads. */
export const PRODUCT_SEEDED: ApiProduct = {
  ...PRODUCT_9,
  id: 1,
  name: 'ركنة حرف L مودرن قماش شامواه',
  slug: 'ركنة-حرف-l-مودرن-قماش-شامواه',
  price: '12500.00',
  old_price: null,
  images: ['/images/work/hero-sofa-curtain-luxury.jpg'],
  is_featured: false,
  sku: 'RK-001',
}

export const CATEGORY_1: ApiCategory = {
  id: 1,
  name: 'ركنات',
  slug: 'ركنات',
  description: 'ركنات مودرن وكلاسيك بأجود الخامات',
  image: null,
  sort_order: 1,
  is_active: true,
  products_count: 3,
}

export const GALLERY_UPLOADED: ApiGalleryItem = {
  id: 21,
  title: 'ركنة جديدة من الادارة',
  slug: 'ركنة-جديدة',
  description: 'صورة مرفوعة من لوحة التحكم',
  image: 'gallery/01M0Q00NEWUPLOAD.jpeg',
  category: 'ركنات',
  alt_text: 'ركنة جديدة مرفوعة من لوحة التحكم',
  sort_order: 0,
  is_active: true,
  show_on_home: true,
}
