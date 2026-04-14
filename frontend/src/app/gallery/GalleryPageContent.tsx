'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react'
import { GALLERY_ITEMS, ITEMS_PER_PAGE, getActiveCategories } from '@/lib/gallery-data'
import { SITE_CONFIG } from '@/lib/constants'
import { getWhatsAppUrl } from '@/lib/utils'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'

interface GalleryPageContentProps {
  currentPage: number
  totalPages: number
}

export default function GalleryPageContent({ currentPage, totalPages }: GalleryPageContentProps) {
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const categories = getActiveCategories()

  const filteredItems = useMemo(() => {
    let items = [...GALLERY_ITEMS]
    if (activeCategory !== 'الكل') {
      items = items.filter((i) => i.category === activeCategory)
    }
    return items
  }, [activeCategory])

  // When filtering by category, show all filtered. When "الكل", paginate.
  const displayItems = activeCategory === 'الكل'
    ? filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : filteredItems

  const showPagination = activeCategory === 'الكل' && totalPages > 1

  return (
    <>
      {/* JSON-LD ImageGallery */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: `معرض أعمال الأشقاء للركن والستائر${currentPage > 1 ? ` — صفحة ${currentPage}` : ''}`,
            description: 'معرض صور حقيقية لأعمال الأشقاء في تصنيع الركنات والستائر والأثاث',
            url: currentPage === 1 ? `${SITE_CONFIG.url}/معرض-اعمالنا` : `${SITE_CONFIG.url}/معرض-اعمالنا/صفحة/${currentPage}`,
            image: displayItems.map((item) => ({
              '@type': 'ImageObject',
              contentUrl: `${SITE_CONFIG.url}${item.image}`,
              name: item.title,
              description: item.altText,
              caption: item.altText,
            })),
            isPartOf: { '@type': 'WebSite', name: SITE_CONFIG.name, url: SITE_CONFIG.url },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE_CONFIG.url },
                { '@type': 'ListItem', position: 2, name: 'معرض أعمالنا', item: `${SITE_CONFIG.url}/معرض-اعمالنا` },
                ...(currentPage > 1 ? [{ '@type': 'ListItem', position: 3, name: `صفحة ${currentPage}` }] : []),
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
            معرض <span className="text-primary-400">أعمالنا</span>
          </motion.h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            شاهد مجموعة من أحدث أعمالنا الحقيقية في تصنيع الركن والستائر — كل صورة تمثل عمل نفذناه لعملائنا بخبرة أكثر من {SITE_CONFIG.experienceYears} عاماً
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
            <Camera className="h-4 w-4" />
            <span>{GALLERY_ITEMS.length} صورة حقيقية من أعمالنا</span>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {/* Category filters */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
                <span className="ms-1 text-xs opacity-70">
                  ({cat === 'الكل' ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((i) => i.category === cat).length})
                </span>
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {displayItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
              >
                <button
                  onClick={() => setLightboxIndex(GALLERY_ITEMS.findIndex((g) => g.id === item.id))}
                  className="group relative aspect-square w-full overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label={`عرض صورة: ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.altText}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading={idx < 8 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <h3 className="text-xs font-bold text-white drop-shadow-lg line-clamp-2">{item.title}</h3>
                    <span className="mt-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-gray-900">
                      {item.category}
                    </span>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* SEO-friendly Pagination */}
          {showPagination && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="تصفح صفحات المعرض">
              {/* Prev */}
              {currentPage > 1 ? (
                <Link
                  href={currentPage === 2 ? '/gallery' : `/gallery/page/${currentPage - 1}`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50"
                  aria-label="الصفحة السابقة"
                >
                  <ChevronRight className="h-5 w-5" />
                </Link>
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 text-gray-300">
                  <ChevronRight className="h-5 w-5" />
                </span>
              )}

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={page === 1 ? '/gallery' : `/gallery/page/${page}`}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                    page === currentPage
                      ? 'bg-navy-900 text-white shadow-md'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                  aria-label={`صفحة ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </Link>
              ))}

              {/* Next */}
              {currentPage < totalPages ? (
                <Link
                  href={`/gallery/page/${currentPage + 1}`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50"
                  aria-label="الصفحة التالية"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 text-gray-300">
                  <ChevronLeft className="h-5 w-5" />
                </span>
              )}
            </nav>
          )}

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-bl from-navy-900 to-navy-950 p-8 text-center text-white">
            <h2 className="mb-2 text-2xl font-bold">عايز تشوف شغل زي ده عندك؟</h2>
            <p className="mb-6 text-gray-300">تواصل معنا الآن واحصل على معاينة مجانية وتصميم حسب ذوقك</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={getWhatsAppUrl('مرحباً، شفت معرض الأعمال وعايز أستفسر عن تفصيل ركنة/ستائر')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white hover:bg-green-700"
              >
                <WhatsAppIcon className="h-5 w-5" />
                تواصل واتساب
              </a>
              <a href="tel:01105001387" className="flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-bold text-white hover:bg-primary-600">
                اتصل الآن: {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 end-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
              aria-label="إغلاق"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Nav arrows */}
            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1) }}
                className="absolute start-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
            {lightboxIndex < GALLERY_ITEMS.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1) }}
                className="absolute end-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_ITEMS[lightboxIndex].image}
                alt={GALLERY_ITEMS[lightboxIndex].altText}
                width={1200}
                height={800}
                className="max-h-[85vh] w-auto rounded-lg object-contain"
              />
              <div className="mt-3 text-center">
                <p className="text-sm font-bold text-white">{GALLERY_ITEMS[lightboxIndex].title}</p>
                <p className="text-xs text-white/60">{GALLERY_ITEMS[lightboxIndex].category} • {lightboxIndex + 1}/{GALLERY_ITEMS.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
