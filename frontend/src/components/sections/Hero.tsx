'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Phone, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'
import { getPhoneUrl, getWhatsAppUrl } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'

const HERO_IMAGES = [
  { src: '/images/work/hero-sofa-curtain-luxury.jpg', alt: 'ركنة فاخرة مع ستائر ذهبية من تنفيذ الأشقاء' },
  { src: '/images/work/hero-living-room-wide.jpg', alt: 'غرفة معيشة كاملة ركنة وستائر من الأشقاء' },
  { src: '/images/work/hero-dark-modern.jpg', alt: 'ركنة مودرن مع ستائر أنيقة من تصميم الأشقاء' },
  { src: '/images/work/sofa-curtain-showpiece.jpg', alt: 'تصميم صالون فاخر مع ستائر وركنة من الأشقاء' },
]

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextImage, 5000)
    return () => clearInterval(timer)
  }, [nextImage])

  return (
    <section className="relative overflow-hidden bg-navy-900 text-white min-h-[600px] lg:min-h-[700px]">
      {/* Background image slideshow */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_IMAGES[currentImage].src}
            alt={HERO_IMAGES[currentImage].alt}
            fill
            priority={currentImage === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentImage ? 'w-8 bg-accent-400' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`عرض الصورة ${idx + 1}`}
          />
        ))}
      </div>

      <div className="container-custom relative z-10 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur"
          >
            <Star className="h-5 w-5 text-accent-400" fill="currentColor" />
            <span>خبرة أكثر من {SITE_CONFIG.experienceYears} عاماً — {SITE_CONFIG.technicians} فني متخصص</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-balance"
          >
            الأشقاء للركن والستائر
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg leading-relaxed text-white/90 sm:text-xl"
          >
            جدد بيتك وأنت في بيتك — نوفر خدمات تصنيع وبيع الركن والانتريهات
            وتصميم وتركيب الستائر المودرن بأجود الخامات وأفضل الأسعار في مصر
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href={getPhoneUrl()}
              className="btn-primary bg-accent-500 hover:bg-accent-600 text-gray-900 w-full sm:w-auto text-lg px-8 py-4"
            >
              <Phone className="h-5 w-5 rtl-flip" />
              اتصل الآن — {SITE_CONFIG.phone}
            </a>
            <a
              href={getWhatsAppUrl('مرحباً، أريد الاستفسار عن خدمات التنجيد والستائر')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto text-lg px-8 py-4"
            >
              <WhatsAppIcon className="h-5 w-5" />
              تواصل عبر الواتساب
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-6 border-t border-white/20 pt-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-400">{SITE_CONFIG.experienceYears}</div>
              <div className="mt-1 text-sm text-white/70">عاماً من الخبرة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-400">{SITE_CONFIG.technicians}</div>
              <div className="mt-1 text-sm text-white/70">فني متخصص</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-400">1000+</div>
              <div className="mt-1 text-sm text-white/70">عميل سعيد</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
