import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'
import type { BlogPost, BlogPostMeta } from '@/types'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

function ensureBlogDir(): void {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
  }
}

export function getAllSlugs(): string[] {
  ensureBlogDir()
  const files = fs.readdirSync(BLOG_DIR)
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getAllSlugs()
  const posts = slugs
    .map((slug) => getPostMeta(slug))
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return posts
}

export function getPostMeta(slug: string): BlogPostMeta | null {
  const decodedSlug = decodeURIComponent(slug)
  const filePath = path.join(BLOG_DIR, `${decodedSlug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    author: data.author ?? 'الأشقاء',
    image: data.image ?? '/images/blog/default.webp',
    imageAlt: data.imageAlt ?? data.title ?? '',
    category: data.category ?? 'تنجيد',
    tags: data.tags ?? [],
    keywords: data.keywords ?? [],
    readingTime: stats.text.replace('min read', 'دقائق للقراءة'),
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const decodedSlug = decodeURIComponent(slug)
  const filePath = path.join(BLOG_DIR, `${decodedSlug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const stats = readingTime(content)

  const processedContent = await remark().use(html).process(content)
  const htmlContent = processedContent.toString()

  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    author: data.author ?? 'الأشقاء',
    image: data.image ?? '/images/blog/default.webp',
    imageAlt: data.imageAlt ?? data.title ?? '',
    category: data.category ?? 'تنجيد',
    tags: data.tags ?? [],
    keywords: data.keywords ?? [],
    content: htmlContent,
    readingTime: stats.text.replace('min read', 'دقائق للقراءة'),
  }
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.category === category)
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPostMeta[] {
  const current = getPostMeta(currentSlug)
  if (!current) return []

  return getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => 
      post.category === current.category ||
      post.tags.some((tag) => current.tags.includes(tag))
    )
    .slice(0, limit)
}

export function getCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories)
}
