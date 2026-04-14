'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronRight, ChevronLeft, ZoomIn } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  name: string
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const next = () => setActiveIndex((i) => (i + 1) % images.length)
  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length)

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={images[activeIndex]}
            alt={`${name} - صورة ${activeIndex + 1}`}
            fill
            className="object-cover cursor-zoom-in"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            onClick={() => setIsZoomed(true)}
          />
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute bottom-4 end-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-lg backdrop-blur transition-colors hover:bg-white"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute start-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-lg backdrop-blur transition-colors hover:bg-white">
                <ChevronRight className="h-5 w-5" />
              </button>
              <button onClick={next} className="absolute end-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-lg backdrop-blur transition-colors hover:bg-white">
                <ChevronLeft className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  i === activeIndex ? 'border-accent-600 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`${name} - مصغرة ${i + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 end-4 text-3xl text-white hover:text-gray-300"
            onClick={() => setIsZoomed(false)}
          >
            ✕
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute start-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute end-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </>
          )}
          <div className="relative h-[85vh] w-full max-w-4xl">
            <Image
              src={images[activeIndex]}
              alt={`${name} - صورة ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  )
}
