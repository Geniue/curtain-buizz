import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'
import type { BlogPost, BlogPostMeta } from '@/types'

interface ApiBlogPost {
  id?: number
  slug?: string | null
  title?: string | null
  description?: string | null
  content?: string | null
  image?: string | null
  image_url?: string | null
  image_alt?: string | null
  category?: string | null
  tags?: unknown
  keywords?: unknown
  date?: string | null
  author?: string | null
  created_at?: string | null
}

type ApiListResponse = ApiBlogPost[] | { data?: ApiBlogPost[] }

const API_BASE_URLS = [
  process.env.NEXT_PUBLIC_API_URL,
  process.env.BACKEND_API_URL,
  'http://localhost:8001/api',
  'http://localhost:8000/api',
]
  .filter((url): url is string => Boolean(url))
  .map((url) => url.replace(/\/+$/, ''))

const DEFAULT_AUTHOR = 'الأشقاء'
const DEFAULT_CATEGORY = 'تنجيد'
const DEFAULT_IMAGE = '/images/blog/tanzid-kanab-baladi.svg'

async function fetchBlogJson<T>(path: string): Promise<T | null> {
  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        continue
      }

      return (await response.json()) as T
    } catch {
      continue
    }
  }

  return null
}

function normalizeImageUrl(image?: string | null): string {
  if (!image) return DEFAULT_IMAGE

  if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/')) {
    return image
  }

  return `/storage/${image.replace(/^public\//, '').replace(/^\/+/, '')}`
}

function normalizeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string' && item.trim() !== '')
  }

  if (typeof value === 'string' && value.trim() !== '') {
    return value.split(',').map((item) => item.trim()).filter(Boolean)
  }

  return []
}

function stripHtml(content: string): string {
  return content.replace(/<[^>]*>/g, ' ')
}

function getReadingTime(content: string): string {
  const minutes = Math.max(1, Math.ceil(readingTime(stripHtml(content)).minutes))

  return `${minutes} دقائق للقراءة`
}

function getPostDate(post: ApiBlogPost): string {
  return post.date ?? post.created_at ?? new Date().toISOString()
}

function normalizePostMeta(post: ApiBlogPost): BlogPostMeta | null {
  if (!post.slug || !post.title) return null

  const contentForStats = post.content ?? post.description ?? ''

  return {
    slug: post.slug,
    title: post.title,
    description: post.description ?? '',
    date: getPostDate(post),
    author: post.author ?? DEFAULT_AUTHOR,
    image: normalizeImageUrl(post.image_url ?? post.image),
    imageAlt: post.image_alt ?? post.title,
    category: post.category ?? DEFAULT_CATEGORY,
    tags: normalizeStringArray(post.tags),
    keywords: normalizeStringArray(post.keywords),
    readingTime: getReadingTime(contentForStats),
  }
}

async function renderContent(content: string): Promise<string> {
  const trimmedContent = content.trim()

  if (!trimmedContent) {
    return ''
  }

  if (/<[a-z][\s\S]*>/i.test(trimmedContent)) {
    return trimmedContent
  }

  return (await remark().use(html).process(trimmedContent)).toString()
}

function normalizeListResponse(response: ApiListResponse | null): ApiBlogPost[] {
  if (Array.isArray(response)) {
    return response
  }

  return response?.data ?? []
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts()

  return posts.map((post) => post.slug)
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const response = await fetchBlogJson<ApiListResponse>('/blogs')
  const posts = normalizeListResponse(response)
    .map(normalizePostMeta)
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export async function getPostMeta(slug: string): Promise<BlogPostMeta | null> {
  const post = await getPostBySlug(slug)

  if (!post) return null

  const { content: _content, ...meta } = post

  return meta
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const decodedSlug = decodeURIComponent(slug)
  const post = await fetchBlogJson<ApiBlogPost>(`/blogs/${encodeURIComponent(decodedSlug)}`)
  const meta = post ? normalizePostMeta(post) : null

  if (!post || !meta) return null

  return {
    ...meta,
    content: await renderContent(post.content ?? ''),
    readingTime: getReadingTime(post.content ?? post.description ?? ''),
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts()

  return posts.filter((post) => post.category === category)
}

export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<BlogPostMeta[]> {
  const decodedSlug = decodeURIComponent(currentSlug)
  const posts = await getAllPosts()
  const current = posts.find((post) => post.slug === decodedSlug)

  if (!current) return []

  return posts
    .filter((post) => post.slug !== decodedSlug)
    .filter((post) => (
      post.category === current.category ||
      post.tags.some((tag) => current.tags.includes(tag))
    ))
    .slice(0, limit)
}

export async function getCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categories = new Set(posts.map((post) => post.category))

  return Array.from(categories)
}
