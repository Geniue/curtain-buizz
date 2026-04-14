'use client'

import { Star } from 'lucide-react'
import MotionWrapper from '@/components/ui/MotionWrapper'
import StaggerChildren, { StaggerItem } from '@/components/ui/StaggerChildren'
import { TESTIMONIALS } from '@/lib/constants'

export default function Testimonials() {
  return (
    <section className="section-padding" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <MotionWrapper className="mx-auto max-w-2xl text-center">
          <h2 id="testimonials-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">
            شاهد تجارب وآراء حقيقية للعملاء
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            ثقة عملائنا هي أغلى ما نملك — اقرأ آراء من تعاملوا معنا
          </p>
        </MotionWrapper>

        <StaggerChildren className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((testimonial) => (
            <StaggerItem key={testimonial.name}>
              <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent-500" fill="currentColor" />
                  ))}
                </div>

                <blockquote className="mt-4">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </blockquote>

                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
