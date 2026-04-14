'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, Package } from 'lucide-react'
import { SHOP_PRODUCTS, SHOP_CATEGORIES, formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/shop-data'
import { SITE_CONFIG } from '@/lib/constants'
import ProductCard from '@/components/shop/ProductCard'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'
import { getWhatsAppUrl } from '@/lib/utils'

type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'name'

export default function ShopContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('newest')

  const filteredProducts = useMemo(() => {
    let products = [...SHOP_PRODUCTS]

    if (selectedCategory) {
      products = products.filter((p) => p.categorySlug === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      products = products.filter(
        (p) => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)
      )
    }

    switch (sortBy) {
      case 'price_asc':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        products.sort((a, b) => b.price - a.price)
        break
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name, 'ar'))
        break
      default:
        products.sort((a, b) => b.id - a.id)
    }

    return products
  }, [selectedCategory, searchQuery, sortBy])

  return (
    <>
      {/* JSON-LD for Shop */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'متجر الأشقاء للركن والستائر',
            description: 'تسوق ركنات وستائر وأثاث اونلاين من الأشقاء',
            url: `${SITE_CONFIG.url}/المتجر`,
            isPartOf: { '@type': 'WebSite', name: SITE_CONFIG.name, url: SITE_CONFIG.url },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE_CONFIG.url },
                { '@type': 'ListItem', position: 2, name: 'المتجر', item: `${SITE_CONFIG.url}/المتجر` },
              ],
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-bl from-navy-900 via-navy-950 to-navy-900 py-12 text-white">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            متجر <span className="text-primary-400">الأشقاء</span> للركن والستائر
          </motion.h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            تسوق اونلاين من أجود الركنات والستائر والأثاث. توصيل لجميع محافظات مصر — شحن مجاني للطلبات فوق {formatPrice(FREE_SHIPPING_THRESHOLD)} ج.م
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              <Package className="h-4 w-4 text-primary-400" />
              توصيل لكل مصر
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              💰 الدفع عند الاستلام
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              ✅ ضمان على جميع المنتجات
            </span>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {/* Filters bar */}
          <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pe-4 ps-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
              >
                <option value="newest">الأحدث</option>
                <option value="price_asc">السعر: الأقل</option>
                <option value="price_desc">السعر: الأعلى</option>
                <option value="name">الاسم</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Categories sidebar */}
            <aside className="w-full shrink-0 lg:w-64">
              <div className="sticky top-28 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-900">التصنيفات</h2>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full rounded-xl px-3 py-2 text-start text-sm font-medium transition-colors ${
                        !selectedCategory
                          ? 'bg-navy-900 text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      جميع المنتجات
                      <span className="ms-1 text-xs opacity-70">({SHOP_PRODUCTS.length})</span>
                    </button>
                  </li>
                  {SHOP_CATEGORIES.map((cat) => {
                    const count = SHOP_PRODUCTS.filter((p) => p.categorySlug === cat.slug).length
                    return (
                      <li key={cat.id}>
                        <button
                          onClick={() => setSelectedCategory(cat.slug)}
                          className={`w-full rounded-xl px-3 py-2 text-start text-sm font-medium transition-colors ${
                            selectedCategory === cat.slug
                              ? 'bg-navy-900 text-white'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {cat.name}
                          <span className="ms-1 text-xs opacity-70">({count})</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>

                {/* WhatsApp CTA */}
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <p className="mb-2 text-xs text-gray-500">محتاج مساعدة في الاختيار؟</p>
                  <a
                    href={getWhatsAppUrl('مرحباً، أريد المساعدة في اختيار منتج من المتجر')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    تواصل واتساب
                  </a>
                </div>
              </div>
            </aside>

            {/* Products grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 text-center">
                  <Package className="mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-lg font-bold text-gray-700">لا توجد منتجات</h3>
                  <p className="text-sm text-gray-500">جرب تغيير التصنيف أو البحث</p>
                </div>
              ) : (
                <>
                  <p className="mb-4 text-sm text-gray-500">
                    عرض {filteredProducts.length} منتج
                    {selectedCategory && (
                      <> في <strong>{SHOP_CATEGORIES.find((c) => c.slug === selectedCategory)?.name}</strong></>
                    )}
                  </p>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
