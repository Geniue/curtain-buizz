'use client'

import { ChevronDown } from 'lucide-react'
import MotionWrapper from '@/components/ui/MotionWrapper'
import StaggerChildren, { StaggerItem } from '@/components/ui/StaggerChildren'
import { FAQSchema } from '@/components/seo/SchemaMarkup'
import type { FAQ } from '@/types'

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
}

export default function FAQSection({ faqs, title = 'الأسئلة الشائعة' }: FAQSectionProps) {
  return (
    <section className="section-padding bg-gray-50" aria-labelledby="faq-heading">
      <FAQSchema faqs={faqs} />
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <MotionWrapper className="text-center">
            <h2 id="faq-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {title}
            </h2>
          </MotionWrapper>

          <StaggerChildren className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <StaggerItem key={index}>
                <details className="group rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
                  <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  )
}
