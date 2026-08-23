import { describe, expect, it } from 'vitest'
import {
  PLACEHOLDER_IMAGE,
  normalizeCategory,
  normalizeGalleryItem,
  normalizeImagePath,
  normalizeProduct,
  toNullableNumber,
  toNumber,
} from './normalize'
import { CATEGORY_1, GALLERY_UPLOADED, PRODUCT_9, PRODUCT_SEEDED } from './__fixtures__'
import type { ApiProduct } from './types'

describe('B. Laravel decimal prices', () => {
  it('turns decimal strings into usable numbers', () => {
    expect(toNumber('22000.00')).toBe(22000)
    expect(toNumber('0.50')).toBe(0.5)
    expect(toNumber(1500)).toBe(1500)
  })

  it('never produces NaN', () => {
    for (const bad of ['', 'abc', null, undefined, {}, []]) {
      expect(Number.isNaN(toNumber(bad))).toBe(false)
    }
    expect(toNumber('abc')).toBe(0)
  })

  it('keeps "no old price" distinct from zero so discounts stay correct', () => {
    expect(toNullableNumber(null)).toBeNull()
    expect(toNullableNumber('')).toBeNull()
    expect(toNullableNumber('abc')).toBeNull()
    expect(toNullableNumber('28000.00')).toBe(28000)
  })
})

describe('C/D/E. Image normalization', () => {
  it('C. prefixes a Filament upload path with /storage', () => {
    expect(normalizeImagePath('products/01M0Q00AETN6ATN29BAGTYT6SE.jpeg'))
      .toBe('/storage/products/01M0Q00AETN6ATN29BAGTYT6SE.jpeg')
  })

  it('C. never double-prefixes an already-normalized path', () => {
    expect(normalizeImagePath('/storage/products/a.jpeg')).toBe('/storage/products/a.jpeg')
    expect(normalizeImagePath('storage/products/a.jpeg')).toBe('/storage/products/a.jpeg')
    expect(normalizeImagePath('/storage/products/a.jpeg')).not.toContain('/storage/storage/')
  })

  it('D. leaves seeded public asset paths untouched', () => {
    expect(normalizeImagePath('/images/work/hero-dark-modern.jpg'))
      .toBe('/images/work/hero-dark-modern.jpg')
  })

  it('E. leaves absolute and protocol-relative URLs untouched', () => {
    expect(normalizeImagePath('https://external.example/file.jpg'))
      .toBe('https://external.example/file.jpg')
    expect(normalizeImagePath('//cdn.example/file.jpg')).toBe('//cdn.example/file.jpg')
  })

  it('rejects empty and non-string values instead of emitting a broken src', () => {
    for (const bad of ['', '   ', '/', null, undefined, 42]) {
      expect(normalizeImagePath(bad)).toBeNull()
    }
  })
})

describe('A/G. Product normalization', () => {
  const product = normalizeProduct(PRODUCT_9)

  it('G. maps the Filament-created product with no build-time constant involved', () => {
    expect(product.id).toBe(9)
    expect(product.slug).toBe('modern-l-shape-velvet-corner-sofa')
    expect(product.name).toBe('ركنة مودرن حرف L قماش قطيفة')
  })

  it('A. maps every snake_case field onto the camelCase UI shape', () => {
    expect(product.shortDescription).toBe(PRODUCT_9.short_description)
    expect(product.oldPrice).toBe(28000)
    expect(product.price).toBe(22000)
    expect(product.categoryId).toBe(1)
    expect(product.categoryName).toBe('ركنات')
    expect(product.categorySlug).toBe('ركنات')
    expect(product.isFeatured).toBe(true)
    expect(product.stock).toBe(10)
    expect(product.sku).toBe('RK-L-VELVET-001')
  })

  it('M. carries the CMS SEO fields through for generateMetadata', () => {
    expect(product.seoTitle).toBe(PRODUCT_9.seo_title)
    expect(product.seoDescription).toBe(PRODUCT_9.seo_description)
    expect(product.seoKeywords).toEqual(['ركنة مودرن', 'ركنة حرف L'])
  })

  it('resolves uploaded images to servable /storage paths', () => {
    expect(product.images).toEqual([
      '/storage/products/01M0Q00AETN6ATN29BAGTYT6SE.jpeg',
      '/storage/products/01M0Q00AEVMKPX94CFM6QZH88V.jpeg',
    ])
  })

  it('D. keeps seeded product images working', () => {
    const seeded = normalizeProduct(PRODUCT_SEEDED)
    expect(seeded.images).toEqual(['/images/work/hero-sofa-curtain-luxury.jpg'])
    expect(seeded.oldPrice).toBeNull()
  })

  it('always yields a usable image so the card cannot render an empty src', () => {
    const noImages = normalizeProduct({ ...PRODUCT_9, images: null })
    expect(noImages.images).toEqual([PLACEHOLDER_IMAGE])
  })

  it('survives a related product that has no eager-loaded category', () => {
    const { category, ...withoutCategory } = PRODUCT_9
    const related = normalizeProduct(withoutCategory as ApiProduct, {
      name: 'ركنات',
      slug: 'ركنات',
    })
    expect(related.categoryName).toBe('ركنات')
    expect(related.categorySlug).toBe('ركنات')
  })

  it('I. reflects edited CMS values rather than any cached copy', () => {
    const edited = normalizeProduct({
      ...PRODUCT_9,
      name: 'اسم بعد التعديل',
      price: '19500.00',
      old_price: '25000.00',
      is_featured: false,
      stock: 3,
    })
    expect(edited.name).toBe('اسم بعد التعديل')
    expect(edited.price).toBe(19500)
    expect(edited.oldPrice).toBe(25000)
    expect(edited.isFeatured).toBe(false)
    expect(edited.stock).toBe(3)
  })
})

describe('K. Category normalization', () => {
  it('carries the database product count', () => {
    expect(normalizeCategory(CATEGORY_1).productsCount).toBe(3)
  })

  it('defaults to zero when the endpoint omits the count', () => {
    const { products_count, ...withoutCount } = CATEGORY_1
    expect(normalizeCategory(withoutCount).productsCount).toBe(0)
  })
})

describe('Gallery normalization', () => {
  it('maps snake_case fields and resolves an uploaded image', () => {
    const item = normalizeGalleryItem(GALLERY_UPLOADED)
    expect(item.altText).toBe('ركنة جديدة مرفوعة من لوحة التحكم')
    expect(item.showOnHome).toBe(true)
    expect(item.image).toBe('/storage/gallery/01M0Q00NEWUPLOAD.jpeg')
  })

  it('falls back to the title when alt text is missing', () => {
    const item = normalizeGalleryItem({ ...GALLERY_UPLOADED, alt_text: null })
    expect(item.altText).toBe(GALLERY_UPLOADED.title)
  })
})
