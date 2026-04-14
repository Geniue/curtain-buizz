export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image: string
  imageAlt: string
  category: string
  tags: string[]
  keywords: string[]
  content: string
  readingTime: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image: string
  imageAlt: string
  category: string
  tags: string[]
  keywords: string[]
  readingTime: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface Service {
  title: string
  description: string
  icon: string
  slug: string
}

export interface Testimonial {
  name: string
  location: string
  text: string
  rating: number
}

export interface BreadcrumbItem {
  name: string
  href: string
}
