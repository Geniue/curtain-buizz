import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { BlogPostMeta } from '@/types'

interface BlogCardProps {
  post: BlogPostMeta
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-lg hover:ring-primary-200">
      <Link href={`/المدونة/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized={post.image.endsWith('.svg')}
          />
          <div className="absolute top-3 right-3">
            <span className="inline-block rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>

          <h3 className="mt-3 text-xl font-bold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-2">
            {post.description}
          </p>

          <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary-600">
            <span>اقرأ المزيد</span>
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  )
}
