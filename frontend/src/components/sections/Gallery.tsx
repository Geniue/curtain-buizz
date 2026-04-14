'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import MotionWrapper from '@/components/ui/MotionWrapper'
import StaggerChildren, { StaggerItem } from '@/components/ui/StaggerChildren'
import { getHomeGalleryItems, getActiveCategories } from '@/lib/gallery-data'

const HOME_ITEMS = getHomeGalleryItems()
const CATEGORIES = ['الكل', ...new Set(HOME_ITEMS.map((i) => i.category))]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [lightboxImage, setLightboxImage] = useState<number | null>(null)

  const filtered = activeCategory === 'الكل'
    ? HOME_ITEMS
    : HOME_ITEMS.filter((item) => item.category === activeCategory)

  return (
    <section className="section-padding" aria-labelledby="gallery-heading">
      <div className="container-custom">
        <MotionWrapper className="mx-auto max-w-2xl text-center">
          <h2 id="gallery-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">
            من أعمالنا
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            شاهد مجموعة من أحدث أعمالنا في تصنيع الركن والستائر — كل صورة تمثل عمل حقيقي نفذناه لعملائنا
          </p>
        </MotionWrapper>

        {/* Category filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <StaggerChildren className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((item, idx) => (
            <StaggerItem key={item.id}>
              <button
                onClick={() => setLightboxImage(HOME_ITEMS.findIndex((g) => g.id === item.id))}
                className="group relative aspect-square w-full overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <Image
                  src={item.image}
                  alt={item.altText}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-end p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Link to full gallery */}
        <div className="mt-8 text-center">
          <Link
            href="/معرض-اعمالنا"
            className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-800"
          >
            شاهد كل أعمالنا
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 end-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
              aria-label="إغلاق"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={HOME_ITEMS[lightboxImage].image}
                alt={HOME_ITEMS[lightboxImage].altText}
                width={1200}
                height={800}
                className="max-h-[85vh] w-auto rounded-lg object-contain"
              />
              <p className="mt-3 text-center text-sm text-white/80">{HOME_ITEMS[lightboxImage].altText}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
