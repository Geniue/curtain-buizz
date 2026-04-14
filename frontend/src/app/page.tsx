import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Gallery from '@/components/sections/Gallery'
import Process from '@/components/sections/Process'
import WhyUs from '@/components/sections/WhyUs'
import Testimonials from '@/components/sections/Testimonials'
import FAQSection from '@/components/sections/FAQSection'
import CTA from '@/components/sections/CTA'
import BlogCard from '@/components/blog/BlogCard'
import { getAllPosts } from '@/lib/blog'
import { SITE_CONFIG } from '@/lib/constants'
import type { FAQ } from '@/types'

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | تصنيع وبيع الركن والستائر بجودة عالية في مصر`,
  description: 'الأشقاء للركن والستائر — تصنيع وبيع الركن والستائر بجودة عالية. تصميمات عصرية – خامات مميزة – تنفيذ حسب الطلب. اتصل الآن 01151458667',
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  robots: { index: true, follow: true },
}

const HOME_FAQS: FAQ[] = [
  {
    question: 'كم تكلفة تفصيل ركنة في مصر؟',
    answer: 'تختلف تكلفة تفصيل الركنة حسب نوع القماش والخامات المستخدمة والحجم. في الأشقاء نقدم أسعار تنافسية تبدأ من أسعار مناسبة جداً. اتصل بنا على 01151458667 للحصول على معاينة مجانية وعرض سعر.',
  },
  {
    question: 'ما هي أفضل أنواع أقمشة الركن؟',
    answer: 'أفضل أنواع أقمشة الركن تشمل الشانيليا والجوبلان والقطيفة والكتان والجلد الطبيعي والصناعي. في الأشقاء نوفر مجموعة واسعة من أجود الأقمشة المستوردة والمحلية لتناسب جميع الأذواق والميزانيات.',
  },
  {
    question: 'كم يستغرق تصنيع الركنة؟',
    answer: 'عادة يستغرق تصنيع الركنة في الأشقاء من 5 إلى 10 أيام عمل حسب حجم العمل ونوع التصميم. نحرص على الالتزام بالمواعيد المحددة مع ضمان أعلى جودة في التنفيذ.',
  },
  {
    question: 'هل تخدمون جميع مناطق القاهرة والجيزة؟',
    answer: 'نعم، نقدم خدماتنا في جميع مناطق القاهرة والجيزة بما في ذلك 6 أكتوبر وحدائق الأهرام والتجمع والشيخ زايد والزقازيق وغيرها. اتصل بنا لتحديد موعد معاينة مجانية.',
  },
  {
    question: 'هل تقدمون ضمان على المنتجات؟',
    answer: 'نعم، نقدم ضمان شامل على جميع منتجاتنا من الركن والستائر. نحرص على استخدام أجود الخامات والأقمشة لضمان عمر افتراضي طويل للمنتجات.',
  },
]

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 6)

  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <Process />
      <WhyUs />

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="section-padding" aria-labelledby="latest-posts-heading">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 id="latest-posts-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  احدث تدوينات تنجيد الاثاث وعمل ستائر
                </h2>
                <p className="mt-3 text-lg text-gray-600">
                  اطلع على أحدث المقالات والتصميمات في عالم التنجيد والستائر
                </p>
              </div>
              <Link href="/المدونة" className="hidden sm:inline-flex btn-outline">
                عرض الكل
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link href="/المدونة" className="btn-outline">
                عرض جميع المقالات
              </Link>
            </div>
          </div>
        </section>
      )}

      <Testimonials />
      <FAQSection faqs={HOME_FAQS} />
      <CTA />
    </>
  )
}
