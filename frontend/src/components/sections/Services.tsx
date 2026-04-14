'use client'

import Image from 'next/image'
import { Sofa, Armchair, LayoutGrid, BedDouble, RockingChair, Blinds } from 'lucide-react'
import MotionWrapper from '@/components/ui/MotionWrapper'
import StaggerChildren, { StaggerItem } from '@/components/ui/StaggerChildren'
import { SERVICES } from '@/lib/constants'

const SERVICE_ICONS: Record<string, JSX.Element> = {
  sofa: <Sofa className="h-6 w-6" />,
  armchair: <Armchair className="h-6 w-6" />,
  corner: <LayoutGrid className="h-6 w-6" />,
  bed: <BedDouble className="h-6 w-6" />,
  couch: <RockingChair className="h-6 w-6" />,
  curtains: <Blinds className="h-6 w-6" />,
}

const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  sofa: { src: '/images/work/sofa-modern-minimalist.jpg', alt: 'تنجيد انتريهات مودرن من الأشقاء' },
  armchair: { src: '/images/work/sofa-beige-gold-curtain.jpg', alt: 'تنجيد صالونات فاخرة من الأشقاء' },
  corner: { src: '/images/work/hero-sofa-curtain-luxury.jpg', alt: 'تنجيد ركنات مودرن من الأشقاء' },
  bed: { src: '/images/work/curtain-teal-ombre.jpg', alt: 'سراير كابتونيه مودرن من الأشقاء' },
  couch: { src: '/images/work/sofa-baladi-navy-gold.jpg', alt: 'تنجيد كنب بلدى من الأشقاء' },
  curtains: { src: '/images/work/curtain-blue-tassel.jpg', alt: 'ستائر مودرن من تصميم الأشقاء' },
}

export default function Services() {
  return (
    <section className="section-padding bg-gray-50" aria-labelledby="services-heading">
      <div className="container-custom">
        <MotionWrapper className="mx-auto max-w-2xl text-center">
          <h2 id="services-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">
            خدمات الأشقاء للركن والستائر
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            نقدم مجموعة متكاملة من خدمات التنجيد وتصميم الستائر بأجود الخامات المستوردة وأحدث التصميمات العالمية
          </p>
        </MotionWrapper>

        <StaggerChildren className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <StaggerItem key={service.slug}>
              <article className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-lg hover:ring-primary-200">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={SERVICE_IMAGES[service.icon].src}
                    alt={SERVICE_IMAGES[service.icon].alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-primary-600 backdrop-blur-sm">
                    {SERVICE_ICONS[service.icon]}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed text-sm">{service.description}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
