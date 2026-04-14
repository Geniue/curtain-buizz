import type { Metadata } from 'next'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import BlogList from '@/components/blog/BlogList'
import { getAllPosts } from '@/lib/blog'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'المدونة — أحدث مقالات تنجيد الأثاث والستائر',
  description: 'اطلع على أحدث المقالات والتصميمات في عالم تنجيد الانتريهات والصالونات والركنات وأقمشة التنجيد والستائر المودرن. الأشقاء للركن والستائر.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/المدونة`,
  },
  robots: { index: true, follow: true },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <Breadcrumbs items={[{ name: 'المدونة', href: '/المدونة' }]} />

      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              المدونة — أحدث مقالات التنجيد والستائر
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              اطلع على أحدث المقالات والمنشورات التي تحتوي على مجموعة واسعة ومتنوعة
              من أروع التصميمات وأحدث الكتالوجات في مجال الستائر وتنجيد الانتريهات
            </p>
          </div>

          <BlogList posts={posts} />
        </div>
      </section>
    </>
  )
}
