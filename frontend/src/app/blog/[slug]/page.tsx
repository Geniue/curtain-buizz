import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { ArticleSchema } from '@/components/seo/SchemaMarkup'
import BlogCard from '@/components/blog/BlogCard'
import { getPostBySlug, getAllSlugs, getRelatedPosts } from '@/lib/blog'
import { SITE_CONFIG } from '@/lib/constants'
import { formatDate, getWhatsAppUrl, getPhoneUrl } from '@/lib/utils'

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image.startsWith('http') ? post.image : `${SITE_CONFIG.url}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image.startsWith('http') ? post.image : `${SITE_CONFIG.url}${post.image}`],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/المدونة/${params.slug}`,
    },
    robots: { index: true, follow: true },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const relatedPosts = getRelatedPosts(params.slug, 3)

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.description}
        image={post.image}
        datePublished={post.date}
        author={post.author}
        slug={params.slug}
      />

      <Breadcrumbs
        items={[
          { name: 'المدونة', href: '/المدونة' },
          { name: post.title, href: `/المدونة/${params.slug}` },
        ]}
      />

      <article className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <header>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                  {post.category}
                </span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>

              <h1 className="mt-4 text-3xl font-bold text-gray-900 leading-tight sm:text-4xl lg:text-5xl text-balance">
                {post.title}
              </h1>

              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                {post.description}
              </p>
            </header>

            {/* Featured Image */}
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                unoptimized={post.image.endsWith('.svg')}
              />
            </div>

            {/* Content */}
            <div
              className="mt-10 prose-arabic"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA */}
            <div className="mt-12 rounded-2xl bg-primary-50 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">هل تحتاج خدمة تنجيد أو ستائر؟</h2>
              <p className="mt-2 text-gray-600">تواصل معنا الآن للحصول على معاينة مجانية واستشارة من مهندسينا المتخصصين</p>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href={getPhoneUrl()} className="btn-primary px-6 py-3">
                  اتصل بنا — {SITE_CONFIG.phone}
                </a>
                <a
                  href={getWhatsAppUrl(`مرحباً، أريد الاستفسار عن ${post.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp px-6 py-3"
                >
                  تواصل عبر الواتساب
                </a>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">مقالات ذات صلة</h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
