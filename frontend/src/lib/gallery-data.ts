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

export const GALLERY_CATEGORIES = ['الكل', 'ركن وستائر', 'ستائر', 'انتريهات', 'ركنات', 'صالونات', 'سراير كابتونيه', 'كنب بلدي', 'فريق العمل']

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: 'ركنة فاخرة مع ستائر ذهبية', slug: 'ركنة-فاخرة-ستائر-ذهبية', description: 'ركنة فاخرة مع ستائر ذهبية - الأشقاء للركن والستائر', image: '/images/work/hero-sofa-curtain-luxury.jpg', altText: 'ركنة فاخرة مع ستائر ذهبية - الأشقاء للركن والستائر', category: 'ركن وستائر', sortOrder: 1, showOnHome: true },
  { id: 2, title: 'ركنة كحلى مع ستائر فضية', slug: 'ركنة-كحلى-ستائر-فضية', description: 'ركنة كحلى مع ستائر فضية أنيقة - الأشقاء', image: '/images/work/sofa-navy-silver-curtain.jpg', altText: 'ركنة كحلى مع ستائر فضية أنيقة - الأشقاء', category: 'ركن وستائر', sortOrder: 2, showOnHome: true },
  { id: 3, title: 'ستارة زرقاء مع شراشيب', slug: 'ستارة-زرقاء-شراشيب', description: 'ستارة زرقاء فاخرة مع شراشيب ذهبية - الأشقاء', image: '/images/work/curtain-blue-tassel.jpg', altText: 'ستارة زرقاء فاخرة مع شراشيب ذهبية - الأشقاء', category: 'ستائر', sortOrder: 3, showOnHome: true },
  { id: 4, title: 'ركنة مودرن مع ستائر زرقاء', slug: 'ركنة-مودرن-ستائر-زرقاء', description: 'ركنة مودرن داكنة مع ستائر زرقاء - الأشقاء', image: '/images/work/hero-dark-modern.jpg', altText: 'ركنة مودرن داكنة مع ستائر زرقاء - الأشقاء', category: 'ركن وستائر', sortOrder: 4, showOnHome: true },
  { id: 5, title: 'ستارة زيتونى لغرفة النوم', slug: 'ستارة-زيتونى-غرفة-نوم', description: 'ستارة زيتونى أنيقة لغرفة النوم - الأشقاء', image: '/images/work/curtain-olive-bedroom.jpg', altText: 'ستارة زيتونى أنيقة لغرفة النوم - الأشقاء', category: 'ستائر', sortOrder: 5, showOnHome: true },
  { id: 6, title: 'انتريه مودرن مينيمال', slug: 'انتريه-مودرن-مينيمال', description: 'انتريه مودرن مينيمال بتصميم عصري - الأشقاء', image: '/images/work/sofa-modern-minimalist.jpg', altText: 'انتريه مودرن مينيمال بتصميم عصري - الأشقاء', category: 'انتريهات', sortOrder: 6, showOnHome: true },
  { id: 7, title: 'ركنة مع ستائر فاخرة عرض كامل', slug: 'ركنة-ستائر-فاخرة-عرض-كامل', description: 'ركنة مع ستائر فاخرة عرض كامل - الأشقاء', image: '/images/work/sofa-curtain-showpiece.jpg', altText: 'ركنة مع ستائر فاخرة عرض كامل - الأشقاء', category: 'ركن وستائر', sortOrder: 7, showOnHome: true },
  { id: 8, title: 'ستائر تركواز متدرجة', slug: 'ستائر-تركواز-متدرجة', description: 'ستائر تركواز متدرجة أنيقة - الأشقاء', image: '/images/work/curtain-teal-ombre.jpg', altText: 'ستائر تركواز متدرجة أنيقة - الأشقاء', category: 'ستائر', sortOrder: 8, showOnHome: true },
  { id: 9, title: 'ركنة خضراء مع ستائر', slug: 'ركنة-خضراء-ستائر', description: 'ركنة خضراء مع ستائر خضراء متناسقة - الأشقاء', image: '/images/work/sofa-green-curtain.jpg', altText: 'ركنة خضراء مع ستائر خضراء متناسقة - الأشقاء', category: 'ركن وستائر', sortOrder: 9, showOnHome: true },
  { id: 10, title: 'ستائر ذهبية مع فوال كريستال', slug: 'ستائر-ذهبية-فوال-كريستال', description: 'ستائر ذهبية فاخرة مع فوال كريستال - الأشقاء', image: '/images/work/curtain-gold-crystal.jpg', altText: 'ستائر ذهبية فاخرة مع فوال كريستال - الأشقاء', category: 'ستائر', sortOrder: 10, showOnHome: true },
  { id: 11, title: 'ركنة بيج مع ستائر ذهبية', slug: 'ركنة-بيج-ستائر-ذهبية', description: 'ركنة بيج أنيقة مع ستائر ذهبية - الأشقاء', image: '/images/work/sofa-beige-gold-curtain.jpg', altText: 'ركنة بيج أنيقة مع ستائر ذهبية - الأشقاء', category: 'ركن وستائر', sortOrder: 11, showOnHome: true },
  { id: 12, title: 'ستائر كلاسيك مع كورنيش ذهبى', slug: 'ستائر-كلاسيك-كورنيش-ذهبى', description: 'ستائر كلاسيك فاخرة مع كورنيش ذهبى - الأشقاء', image: '/images/work/curtain-teal-classic.jpg', altText: 'ستائر كلاسيك فاخرة مع كورنيش ذهبى - الأشقاء', category: 'ستائر', sortOrder: 12, showOnHome: true },
  { id: 13, title: 'ستارة بيج لغرفة النوم', slug: 'ستارة-بيج-غرفة-نوم', description: 'ستارة بيج مودرن لغرفة النوم - الأشقاء', image: '/images/work/curtain-beige-bedroom.jpg', altText: 'ستارة بيج مودرن لغرفة النوم - الأشقاء', category: 'ستائر', sortOrder: 13, showOnHome: false },
  { id: 14, title: 'ستارة ذهبية مودرن', slug: 'ستارة-ذهبية-مودرن', description: 'ستارة ذهبية مودرن أنيقة - الأشقاء', image: '/images/work/curtain-gold-modern.jpg', altText: 'ستارة ذهبية مودرن أنيقة - الأشقاء', category: 'ستائر', sortOrder: 14, showOnHome: false },
  { id: 15, title: 'تركيب ستائر فريق عمل الأشقاء', slug: 'تركيب-ستائر-فريق-عمل', description: 'فريق عمل الأشقاء أثناء تركيب الستائر', image: '/images/work/installation-work.jpg', altText: 'فريق عمل الأشقاء أثناء تركيب الستائر', category: 'فريق العمل', sortOrder: 15, showOnHome: false },
  { id: 16, title: 'ركنة مع ستائر كحلى', slug: 'ركنة-ستائر-كحلى', description: 'ركنة كحلى مع ستائر وبادرون أنيق - الأشقاء', image: '/images/work/sofa-navy-valance.jpg', altText: 'ركنة كحلى مع ستائر وبادرون أنيق - الأشقاء', category: 'ركن وستائر', sortOrder: 16, showOnHome: false },
  { id: 17, title: 'ستارة زيتونى بسيطة', slug: 'ستارة-زيتونى-بسيطة', description: 'ستارة زيتونى بسيطة وأنيقة - الأشقاء', image: '/images/work/curtain-olive-simple.jpg', altText: 'ستارة زيتونى بسيطة وأنيقة - الأشقاء', category: 'ستائر', sortOrder: 17, showOnHome: false },
  { id: 18, title: 'ستارة زيتونى شيفون', slug: 'ستارة-زيتونى-شيفون', description: 'ستارة زيتونى شيفون خفيفة - الأشقاء', image: '/images/work/curtain-olive-sheer.jpg', altText: 'ستارة زيتونى شيفون خفيفة - الأشقاء', category: 'ستائر', sortOrder: 18, showOnHome: false },
  { id: 19, title: 'كنبة بلدي نيفي ذهبي', slug: 'كنبة-بلدي-نيفي-ذهبي', description: 'كنبة بلدي نيفي مع تشطيبات ذهبية - الأشقاء', image: '/images/work/sofa-baladi-navy-gold.jpg', altText: 'كنبة بلدي نيفي مع تشطيبات ذهبية - الأشقاء', category: 'كنب بلدي', sortOrder: 19, showOnHome: false },
  { id: 20, title: 'غرفة معيشة واسعة مع ركنة', slug: 'غرفة-معيشة-واسعة-ركنة', description: 'غرفة معيشة واسعة بركنة وستائر فاخرة - الأشقاء', image: '/images/work/hero-living-room-wide.jpg', altText: 'غرفة معيشة واسعة بركنة وستائر فاخرة - الأشقاء', category: 'ركن وستائر', sortOrder: 20, showOnHome: false },
]

export const ITEMS_PER_PAGE = 12

export function getHomeGalleryItems(): GalleryItem[] {
  return GALLERY_ITEMS.filter((i) => i.showOnHome).sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getGalleryPage(page: number, category?: string): { items: GalleryItem[]; totalPages: number; total: number } {
  let items = [...GALLERY_ITEMS]
  if (category && category !== 'الكل') {
    items = items.filter((i) => i.category === category)
  }
  const total = items.length
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)
  const start = (page - 1) * ITEMS_PER_PAGE
  return {
    items: items.slice(start, start + ITEMS_PER_PAGE),
    totalPages,
    total,
  }
}

export function getTotalGalleryPages(): number {
  return Math.ceil(GALLERY_ITEMS.length / ITEMS_PER_PAGE)
}

export function getActiveCategories(): string[] {
  const cats = new Set(GALLERY_ITEMS.map((i) => i.category))
  return ['الكل', ...Array.from(cats)]
}
