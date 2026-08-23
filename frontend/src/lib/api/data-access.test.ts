import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApiNotFoundError, ApiUnavailableError, apiGet } from './client'
import { getProductWithRelated, getShopCatalogue, getShopProducts } from './shop'
import { getAllGalleryItems, getGalleryCategoryCounts, getHomeGalleryItems } from './gallery'
import { CATEGORY_1, GALLERY_UPLOADED, PRODUCT_9, PRODUCT_SEEDED } from './__fixtures__'

const requestedUrls: string[] = []

function mockJson(payload: unknown, status = 200) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => {
      requestedUrls.push(String(url))
      return {
        ok: status >= 200 && status < 300,
        status,
        json: async () => payload,
      } as Response
    })
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
  requestedUrls.length = 0
})

describe('F. Products returned by the API reach the store', () => {
  it('unwraps the Laravel paginator and normalizes every record', async () => {
    mockJson({ current_page: 1, data: [PRODUCT_9, PRODUCT_SEEDED], last_page: 1, per_page: 200, total: 2 })

    const { products, total } = await getShopProducts()

    expect(total).toBe(2)
    expect(products.map((p) => p.id)).toEqual([9, 1])
    expect(products[0].price).toBe(22000)
    expect(products[0].images[0]).toBe('/storage/products/01M0Q00AETN6ATN29BAGTYT6SE.jpeg')
  })

  it('K. builds the sidebar from database category counts', async () => {
    let call = 0
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        call += 1
        const payload = call === 1
          ? { current_page: 1, data: [PRODUCT_9], last_page: 1, per_page: 200, total: 1 }
          : [CATEGORY_1]
        return { ok: true, status: 200, json: async () => payload } as Response
      })
    )

    const catalogue = await getShopCatalogue()

    expect(catalogue.total).toBe(1)
    expect(catalogue.categories[0].productsCount).toBe(3)
  })

  it('does not crash on an empty catalogue', async () => {
    mockJson({ current_page: 1, data: [], last_page: 1, per_page: 200, total: 0 })

    const { products, total } = await getShopProducts()

    expect(products).toEqual([])
    expect(total).toBe(0)
  })
})

describe('H/L. Product detail is resolved from the API by slug', () => {
  it('L. requests the slug endpoint and normalizes the payload', async () => {
    mockJson({ product: PRODUCT_9, related: [] })

    const { product } = await getProductWithRelated('modern-l-shape-velvet-corner-sofa')

    expect(requestedUrls[0]).toContain('/shop/products/modern-l-shape-velvet-corner-sofa')
    expect(product.id).toBe(9)
  })

  it('H. resolves a slug that exists in no build-time constant', async () => {
    const brandNew = { ...PRODUCT_9, id: 42, slug: 'a-slug-created-after-the-build' }
    mockJson({ product: brandNew, related: [] })

    const { product } = await getProductWithRelated('a-slug-created-after-the-build')

    expect(product.slug).toBe('a-slug-created-after-the-build')
  })

  it('gives related products the parent category the backend omitted', async () => {
    const { category, ...relatedRaw } = PRODUCT_SEEDED
    mockJson({ product: PRODUCT_9, related: [relatedRaw] })

    const { related } = await getProductWithRelated('modern-l-shape-velvet-corner-sofa')

    expect(related[0].categoryName).toBe('ركنات')
  })

  it('surfaces a real 404 so the page can call notFound()', async () => {
    mockJson({ message: 'المنتج غير موجود' }, 404)

    await expect(getProductWithRelated('does-not-exist')).rejects.toBeInstanceOf(ApiNotFoundError)
  })
})

describe('N/O. Gallery reads come from the API', () => {
  it('N. loads the gallery page from /gallery', async () => {
    mockJson({ current_page: 1, data: [GALLERY_UPLOADED], last_page: 1, per_page: 200, total: 1 })

    const { items, total } = await getAllGalleryItems()

    expect(requestedUrls[0]).toContain('/gallery?')
    expect(total).toBe(1)
    expect(items[0].image).toBe('/storage/gallery/01M0Q00NEWUPLOAD.jpeg')
  })

  it('O. loads the homepage gallery from /gallery/home', async () => {
    mockJson([GALLERY_UPLOADED])

    const items = await getHomeGalleryItems()

    expect(requestedUrls[0]).toContain('/gallery/home')
    expect(items[0].showOnHome).toBe(true)
  })

  it('loads gallery category counts from the API', async () => {
    mockJson([{ category: 'ستائر', count: 9 }])

    const counts = await getGalleryCategoryCounts()

    expect(counts).toEqual([{ category: 'ستائر', count: 9 }])
  })
})

describe('P. A backend outage never yields fake CMS data', () => {
  it('throws instead of returning records when every base URL fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('ECONNREFUSED') }))

    await expect(getShopProducts()).rejects.toBeInstanceOf(ApiUnavailableError)
    await expect(getAllGalleryItems()).rejects.toBeInstanceOf(ApiUnavailableError)
    await expect(getHomeGalleryItems()).rejects.toBeInstanceOf(ApiUnavailableError)
  })

  it('throws on a 500 rather than degrading to placeholder content', async () => {
    mockJson({ message: 'Server Error' }, 500)

    await expect(apiGet('/shop/products')).rejects.toBeInstanceOf(ApiUnavailableError)
  })

  it('rejects with no product payload attached to the error', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('ECONNREFUSED') }))

    const error = await getShopProducts().catch((e) => e)

    expect(error).toBeInstanceOf(ApiUnavailableError)
    expect((error as { products?: unknown }).products).toBeUndefined()
  })
})
