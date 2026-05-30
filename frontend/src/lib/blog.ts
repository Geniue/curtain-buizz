import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
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

interface StaticBlogFrontmatter {
  slug?: string
  title?: string
  description?: string
  date?: string
  author?: string
  image?: string
  imageAlt?: string
  image_alt?: string
  category?: string
  tags?: unknown
  keywords?: unknown
}

type ApiListResponse = ApiBlogPost[] | { data?: ApiBlogPost[] }

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')
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

function ensureBlogDir(): void {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
  }
}

function getMarkdownFileNames(): string[] {
  ensureBlogDir()

  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.md'))
}

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

function normalizeApiPostMeta(post: ApiBlogPost): BlogPostMeta | null {
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

function normalizeStaticPostMeta(
  slug: string,
  data: StaticBlogFrontmatter,
  content: string,
): BlogPostMeta | null {
  if (!data.title) return null

  return {
    slug,
    title: data.title,
    description: data.description ?? '',
    date: data.date ?? new Date().toISOString(),
    author: data.author ?? DEFAULT_AUTHOR,
    image: normalizeImageUrl(data.image),
    imageAlt: data.imageAlt ?? data.image_alt ?? data.title,
    category: data.category ?? DEFAULT_CATEGORY,
    tags: normalizeStringArray(data.tags),
    keywords: normalizeStringArray(data.keywords),
    readingTime: getReadingTime(content),
  }
}

function getStaticPostFromFile(fileName: string): { meta: BlogPostMeta; content: string } | null {
  const filePath = path.join(BLOG_DIR, fileName)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const frontmatter = data as StaticBlogFrontmatter
  const fileSlug = fileName.replace(/\.md$/, '')
  const slug = frontmatter.slug ?? fileSlug
  const meta = normalizeStaticPostMeta(slug, frontmatter, content)

  if (!meta) return null

  return { meta, content }
}

async function renderMarkdownContent(content: string): Promise<string> {
  return (await remark().use(html).process(content)).toString()
}

async function renderApiContent(content: string): Promise<string> {
  const trimmedContent = content.trim()

  if (!trimmedContent) {
    return ''
  }

  if (/<[a-z][\s\S]*>/i.test(trimmedContent)) {
    return trimmedContent
  }

  return renderMarkdownContent(trimmedContent)
}

function normalizeListResponse(response: ApiListResponse | null): ApiBlogPost[] {
  if (Array.isArray(response)) {
    return response
  }

  return response?.data ?? []
}

function mergePosts(staticPosts: BlogPostMeta[], apiPosts: BlogPostMeta[]): BlogPostMeta[] {
  const postsBySlug = new Map<string, BlogPostMeta>()

  for (const post of staticPosts) {
    postsBySlug.set(post.slug, post)
  }

  for (const post of apiPosts) {
    postsBySlug.set(post.slug, post)
  }

  return Array.from(postsBySlug.values())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getStaticPosts(): BlogPostMeta[] {
  return getMarkdownFileNames()
    .map(getStaticPostFromFile)
    .filter((post): post is { meta: BlogPostMeta; content: string } => post !== null)
    .map((post) => post.meta)
}

export async function getApiPosts(): Promise<BlogPostMeta[]> {
  const response = await fetchBlogJson<ApiListResponse>('/blogs')

  return normalizeListResponse(response)
    .map(normalizeApiPostMeta)
    .filter((post): post is BlogPostMeta => post !== null)
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts()

  return posts.map((post) => post.slug)
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const staticPosts = getStaticPosts()
  const apiPosts = await getApiPosts()

  return mergePosts(staticPosts, apiPosts)
}

export async function getPostMeta(slug: string): Promise<BlogPostMeta | null> {
  const post = await getPostBySlug(slug)

  if (!post) return null

  const { content: _content, ...meta } = post

  return meta
}

export async function getStaticPostBySlug(slug: string): Promise<BlogPost | null> {
  const decodedSlug = decodeURIComponent(slug)

  for (const fileName of getMarkdownFileNames()) {
    const post = getStaticPostFromFile(fileName)

    if (!post || post.meta.slug !== decodedSlug) {
      continue
    }

    return {
      ...post.meta,
      content: await renderMarkdownContent(post.content),
    }
  }

  return null
}

export async function getApiPostBySlug(slug: string): Promise<BlogPost | null> {
  const decodedSlug = decodeURIComponent(slug)
  const post = await fetchBlogJson<ApiBlogPost>(`/blogs/${encodeURIComponent(decodedSlug)}`)
  const meta = post ? normalizeApiPostMeta(post) : null

  if (!post || !meta) return null

  return {
    ...meta,
    content: await renderApiContent(post.content ?? ''),
    readingTime: getReadingTime(post.content ?? post.description ?? ''),
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const apiPost = await getApiPostBySlug(slug)

  if (apiPost) return apiPost

  return getStaticPostBySlug(slug)
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
