'use client'

import { HelpCircle, Clock, Paintbrush, BadgeCheck } from 'lucide-react'
import MotionWrapper from '@/components/ui/MotionWrapper'
import StaggerChildren, { StaggerItem } from '@/components/ui/StaggerChildren'

const features = [
  {
    title: 'دعم متكامل',
    description: 'نقدم دعم متكامل لعملائنا من خلال فريق متخصص مستعد لتقديم المساعدة والإرشاد في كل خطوة من رحلتكم معنا.',
    icon: <HelpCircle className="h-7 w-7" />,
  },
  {
    title: 'دقة في المواعيد',
    description: 'الانضباط والدقة في المواعيد من أهم مميزاتنا. نلتزم بالوقت المحدد لتسليم المشاريع وتنفيذها دون تأخير.',
    icon: <Clock className="h-7 w-7" />,
  },
  {
    title: 'تصاميم جذابة',
    description: 'تصميمات الأشقاء تتمتع بجاذبية وأناقة فائقة تتناسب مع ذوقك الرفيع. نقدم مجموعة واسعة من الخيارات المميزة.',
    icon: <Paintbrush className="h-7 w-7" />,
  },
  {
    title: 'تركيب بدون أخطاء',
    description: 'نسعى دائماً لتجنب أي أخطاء أثناء عملية التركيب. فريقنا المتخصص يعمل بدقة متناهية لضمان نتائج مثالية.',
    icon: <BadgeCheck className="h-7 w-7" />,
  },
]

export default function WhyUs() {
  return (
    <section className="section-padding bg-primary-50" aria-labelledby="why-us-heading">
      <div className="container-custom">
        <MotionWrapper className="mx-auto max-w-2xl text-center">
          <h2 id="why-us-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">
            ليه تختار خدمات الأشقاء؟
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            استمتع بتجربة استثنائية في تجديد أثاث المنزل والانتريهات بالإضافة إلى تصميم الستائر
          </p>
        </MotionWrapper>

        <StaggerChildren className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="flex gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
