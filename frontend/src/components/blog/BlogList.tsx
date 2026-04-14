'use client'

import { useState, useMemo } from 'react'
import BlogCard from './BlogCard'
import type { BlogPostMeta } from '@/types'

interface BlogListProps {
  posts: BlogPostMeta[]
  title?: string
}

export default function BlogList({ posts, title }: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState<string>('الكل')

  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category)))
    return ['الكل', ...cats]
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'الكل') return posts
    return posts.filter((p) => p.category === activeCategory)
  }, [posts, activeCategory])

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">لا توجد مقالات حالياً</p>
      </div>
    )
  }

  return (
    <div>
      {title && (
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
      )}

      {/* Category Filter Tabs */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              activeCategory === cat
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد مقالات في هذا التصنيف</p>
        </div>
      )}
    </div>
  )
}
