export interface ShopCategory {
  id: number
  name: string
  slug: string
  description: string
  image?: string
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

export const SHOP_CATEGORIES: ShopCategory[] = [
  { id: 1, name: 'ركنات', slug: 'ركنات', description: 'ركنات مودرن وكلاسيك بأجود الخامات' },
  { id: 2, name: 'انتريهات', slug: 'انتريهات', description: 'انتريهات مودرن وكلاسيك' },
  { id: 3, name: 'صالونات', slug: 'صالونات', description: 'صالونات بتصميمات عصرية' },
  { id: 4, name: 'ستائر', slug: 'ستائر', description: 'ستائر مودرن وكلاسيك' },
  { id: 5, name: 'سراير كابتونيه', slug: 'سراير-كابتونيه', description: 'سراير كابتونيه مودرن' },
  { id: 6, name: 'كنب بلدي', slug: 'كنب-بلدي', description: 'كنب بلدي وتجديد الأثاث' },
]

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 1,
    name: 'ركنة حرف L مودرن قماش شامواه',
    slug: 'ركنة-حرف-l-مودرن-قماش-شامواه',
    shortDescription: 'ركنة حرف L مودرن بقماش شامواه مستورد عالي الجودة مع إسفنج 40 كثافة — توصيل وتركيب مجاني',
    description: '<h2>ركنة حرف L مودرن — الأشقاء للركن والستائر</h2><p>ركنة حرف L مودرن مصنوعة من أجود أنواع الأقمشة الشامواه المستوردة مع هيكل خشب زان طبيعي 100% وإسفنج كثافة 40 لراحة استثنائية.</p><h3>المواصفات</h3><ul><li>قماش شامواه مستورد مقاوم للبقع</li><li>هيكل خشب زان طبيعي</li><li>إسفنج كثافة 40</li><li>ألوان متعددة حسب الطلب</li><li>ضمان سنة على الهيكل</li></ul>',
    price: 12500,
    oldPrice: 15000,
    sku: 'ASH-RK-001',
    images: ['/images/work/hero-sofa-curtain-luxury.jpg', '/images/work/sofa-beige-gold-curtain.jpg'],
    categoryId: 1,
    categoryName: 'ركنات',
    categorySlug: 'ركنات',
    stock: 10,
    isFeatured: true,
    specifications: { 'المقاس': '280×200 سم', 'القماش': 'شامواه مستورد', 'الهيكل': 'خشب زان طبيعي', 'الإسفنج': 'كثافة 40', 'الضمان': 'سنة' },
    seoTitle: 'ركنة حرف L مودرن — أفضل ركنات في مصر | الأشقاء',
    seoDescription: 'اشتري ركنة حرف L مودرن بقماش شامواه مستورد من الأشقاء للركن والستائر. توصيل مجاني لجميع محافظات مصر.',
    seoKeywords: ['ركنة حرف L', 'ركنة مودرن', 'ركنات', 'اسعار الركنات في مصر'],
  },
  {
    id: 2,
    name: 'ركنة أمريكي قماش جلد صناعي',
    slug: 'ركنة-امريكي-جلد-صناعي',
    shortDescription: 'ركنة أمريكي فاخرة بجلد صناعي عالي الجودة مقاوم للخدش — تصميم عصري أنيق',
    description: '<h2>ركنة أمريكي بجلد صناعي فاخر</h2><p>ركنة أمريكي بتصميم عصري أنيق مصنوعة من الجلد الصناعي عالي الجودة المقاوم للخدش والبقع مع هيكل معدني ومعالج.</p>',
    price: 18000,
    oldPrice: 22000,
    sku: 'ASH-RK-002',
    images: ['/images/work/hero-dark-modern.jpg', '/images/work/sofa-modern-minimalist.jpg'],
    categoryId: 1,
    categoryName: 'ركنات',
    categorySlug: 'ركنات',
    stock: 5,
    isFeatured: true,
    specifications: { 'المقاس': '300×220 سم', 'القماش': 'جلد صناعي مستورد', 'الهيكل': 'خشب زان + معدن', 'الإسفنج': 'كثافة 45', 'الضمان': 'سنتين' },
    seoTitle: 'ركنة أمريكي جلد صناعي فاخر | الأشقاء للركن والستائر',
    seoDescription: 'ركنة أمريكي بجلد صناعي فاخر من الأشقاء. تصميم عصري أنيق وخامات مستوردة عالية الجودة.',
    seoKeywords: ['ركنة أمريكي', 'ركنة جلد', 'ركنات فاخرة'],
  },
  {
    id: 3,
    name: 'انتريه مودرن 3+2+1 قطيفة',
    slug: 'انتريه-مودرن-قطيفة',
    shortDescription: 'انتريه مودرن 3 قطع بقماش قطيفة ناعم وألوان عصرية — مريح وأنيق',
    description: '<h2>انتريه مودرن قطيفة — 3 قطع</h2><p>انتريه مودرن مكون من 3+2+1 بقماش قطيفة ناعم الملمس وألوان عصرية تناسب جميع الديكورات.</p>',
    price: 9500,
    oldPrice: 12000,
    sku: 'ASH-AN-001',
    images: ['/images/work/hero-living-room-wide.jpg', '/images/work/sofa-green-curtain.jpg'],
    categoryId: 2,
    categoryName: 'انتريهات',
    categorySlug: 'انتريهات',
    stock: 8,
    isFeatured: true,
    specifications: { 'عدد القطع': '3+2+1', 'القماش': 'قطيفة مستوردة', 'الهيكل': 'خشب زان', 'الإسفنج': 'كثافة 35' },
    seoTitle: 'انتريه مودرن قطيفة | الأشقاء للركن والستائر',
    seoDescription: 'انتريه مودرن 3+2+1 بقماش قطيفة ناعم من الأشقاء للركن والستائر. أجود الخامات وأفضل الأسعار.',
    seoKeywords: ['انتريه مودرن', 'انتريه قطيفة', 'اسعار الانتريهات'],
  },
  {
    id: 4,
    name: 'ستارة مودرن بلاك آوت مع شيفون',
    slug: 'ستارة-مودرن-بلاك-اوت-شيفون',
    shortDescription: 'ستارة مودرن بلاك آوت مع طبقة شيفون — حجب كامل للضوء مع تصميم أنيق',
    description: '<h2>ستارة مودرن بلاك آوت + شيفون</h2><p>ستارة مودرن بطبقتين — بلاك آوت لحجب الضوء بنسبة 100% مع طبقة شيفون أنيقة. تصميم عصري يناسب غرف النوم والصالونات.</p>',
    price: 850,
    oldPrice: 1200,
    sku: 'ASH-ST-001',
    images: ['/images/work/curtain-gold-modern.jpg', '/images/work/sofa-navy-silver-curtain.jpg'],
    categoryId: 4,
    categoryName: 'ستائر',
    categorySlug: 'ستائر',
    stock: 20,
    isFeatured: true,
    specifications: { 'العرض': 'حسب المقاس', 'الطول': 'حسب المقاس', 'القماش': 'بلاك آوت + شيفون', 'التركيب': 'مجاني' },
    seoTitle: 'ستارة مودرن بلاك آوت | الأشقاء للركن والستائر',
    seoDescription: 'ستارة مودرن بلاك آوت مع شيفون من الأشقاء. حجب كامل للضوء مع تصميم أنيق. التركيب مجاناً.',
    seoKeywords: ['ستارة بلاك آوت', 'ستائر مودرن', 'اسعار الستائر'],
  },
  {
    id: 5,
    name: 'ستائر قماش سادة مع بادرون ذهبي',
    slug: 'ستائر-سادة-بادرون-ذهبي',
    shortDescription: 'ستائر قماش سادة فاخرة مع بادرون ذهبي — تصميم كلاسيكي راقي',
    description: '<h2>ستائر قماش سادة مع بادرون ذهبي</h2><p>ستائر فاخرة بقماش سادة عالي الجودة مع بادرون ذهبي أنيق يضفي لمسة فخامة على أي غرفة.</p>',
    price: 1500,
    oldPrice: 2000,
    sku: 'ASH-ST-002',
    images: ['/images/work/sofa-navy-valance.jpg', '/images/work/curtain-gold-modern.jpg'],
    categoryId: 4,
    categoryName: 'ستائر',
    categorySlug: 'ستائر',
    stock: 15,
    isFeatured: false,
    specifications: { 'القماش': 'قماش سادة فاخر', 'البادرون': 'ذهبي', 'التركيب': 'مجاني' },
    seoTitle: 'ستائر سادة مع بادرون ذهبي | الأشقاء',
    seoDescription: 'ستائر قماش سادة فاخرة مع بادرون ذهبي من الأشقاء للركن والستائر.',
    seoKeywords: ['ستائر سادة', 'بادرون ذهبي', 'ستائر فاخرة'],
  },
  {
    id: 6,
    name: 'سرير كابتونيه مودرن مقاس 180',
    slug: 'سرير-كابتونيه-مودرن-180',
    shortDescription: 'سرير كابتونيه مودرن مقاس 180×200 بقماش مخمل — تصميم عصري فاخر',
    description: '<h2>سرير كابتونيه مودرن</h2><p>سرير كابتونيه بتصميم مودرن فاخر مصنوع من قماش مخمل ناعم وهيكل خشب زان متين مع دهان مقاوم للرطوبة.</p>',
    price: 8500,
    oldPrice: 11000,
    sku: 'ASH-SR-001',
    images: ['/images/work/curtain-beige-bedroom.jpg', '/images/work/curtain-olive-bedroom.jpg'],
    categoryId: 5,
    categoryName: 'سراير كابتونيه',
    categorySlug: 'سراير-كابتونيه',
    stock: 6,
    isFeatured: true,
    specifications: { 'المقاس': '180×200 سم', 'القماش': 'مخمل مستورد', 'الهيكل': 'خشب زان', 'الضمان': 'سنة' },
    seoTitle: 'سرير كابتونيه مودرن 180 | الأشقاء',
    seoDescription: 'سرير كابتونيه مودرن مقاس 180×200 من الأشقاء للركن والستائر. قماش مخمل فاخر وهيكل خشب زان.',
    seoKeywords: ['سرير كابتونيه', 'سراير مودرن', 'كابتونيه'],
  },
  {
    id: 7,
    name: 'صالون كلاسيك 7 مقاعد خشب زان',
    slug: 'صالون-كلاسيك-7-مقاعد',
    shortDescription: 'صالون كلاسيك 7 مقاعد مصنوع من خشب زان طبيعي — فخامة وأناقة',
    description: '<h2>صالون كلاسيك 7 مقاعد</h2><p>صالون كلاسيك فاخر مكون من 7 مقاعد مصنوع من خشب زان طبيعي مع تنجيد بأجود أقمشة الجاكار المستوردة.</p>',
    price: 16000,
    oldPrice: 20000,
    sku: 'ASH-SL-001',
    images: ['/images/work/sofa-curtain-showpiece.jpg', '/images/work/sofa-beige-gold-curtain.jpg'],
    categoryId: 3,
    categoryName: 'صالونات',
    categorySlug: 'صالونات',
    stock: 4,
    isFeatured: false,
    specifications: { 'عدد المقاعد': '7', 'الخشب': 'زان طبيعي', 'القماش': 'جاكار مستورد', 'الضمان': 'سنتين' },
    seoTitle: 'صالون كلاسيك 7 مقاعد | الأشقاء',
    seoDescription: 'صالون كلاسيك 7 مقاعد خشب زان من الأشقاء للركن والستائر.',
    seoKeywords: ['صالون كلاسيك', 'صالونات', 'اسعار الصالونات'],
  },
  {
    id: 8,
    name: 'كنبة بلدي 3 مقاعد تجديد كامل',
    slug: 'كنبة-بلدي-3-مقاعد-تجديد',
    shortDescription: 'خدمة تجديد كنبة بلدي 3 مقاعد — تغيير القماش والإسفنج بالكامل',
    description: '<h2>تجديد كنب بلدي — خدمة الأشقاء</h2><p>خدمة تجديد كنبتك البلدي القديمة بتغيير القماش والإسفنج بالكامل مع الاحتفاظ بالهيكل الخشبي الأصلي. نستخدم أجود أنواع الأقمشة والإسفنج.</p>',
    price: 3500,
    oldPrice: 5000,
    sku: 'ASH-KB-001',
    images: ['/images/work/sofa-baladi-navy-gold.jpg', '/images/work/sofa-modern-minimalist.jpg'],
    categoryId: 6,
    categoryName: 'كنب بلدي',
    categorySlug: 'كنب-بلدي',
    stock: 20,
    isFeatured: false,
    specifications: { 'الخدمة': 'تجديد كامل', 'يشمل': 'قماش + إسفنج + عمالة', 'المدة': '3-5 أيام' },
    seoTitle: 'تجديد كنب بلدي | الأشقاء للركن والستائر',
    seoDescription: 'خدمة تجديد الكنب البلدي من الأشقاء. تغيير القماش والإسفنج بالكامل بأفضل الأسعار.',
    seoKeywords: ['تجديد كنب', 'كنب بلدي', 'تنجيد كنب مستعمل'],
  },
]

export function getProductBySlug(slug: string): ShopProduct | undefined {
  return SHOP_PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): ShopProduct[] {
  return SHOP_PRODUCTS.filter((p) => p.categorySlug === categorySlug)
}

export function getFeaturedProducts(): ShopProduct[] {
  return SHOP_PRODUCTS.filter((p) => p.isFeatured)
}

export function getRelatedProducts(product: ShopProduct, limit = 4): ShopProduct[] {
  return SHOP_PRODUCTS.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, limit)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ar-EG').format(price)
}

export function getDiscountPercent(price: number, oldPrice: number | null): number | null {
  if (!oldPrice || oldPrice <= price) return null
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

export const FREE_SHIPPING_THRESHOLD = 5000
export const SHIPPING_COST = 150
