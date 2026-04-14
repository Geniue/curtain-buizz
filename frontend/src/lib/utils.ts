export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function slugify(text: string): string {
  return text
    .toString()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\u0600-\u06FF\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

export function getWhatsAppUrl(message?: string): string {
  const base = 'https://wa.me/+201151458667'
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`
  }
  return base
}

export function getPhoneUrl(): string {
  return 'tel:01151458667'
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}
