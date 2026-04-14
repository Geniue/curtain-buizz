'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Minus, Plus, Truck, Shield, CreditCard, ChevronLeft } from 'lucide-react'
import { ShopProduct, formatPrice, getDiscountPercent, getRelatedProducts, FREE_SHIPPING_THRESHOLD } from '@/lib/shop-data'
import { SITE_CONFIG } from '@/lib/constants'
import { useCart } from '@/lib/cart-context'
import { getWhatsAppUrl } from '@/lib/utils'
import ProductGallery from '@/components/shop/ProductGallery'
import ProductCard from '@/components/shop/ProductCard'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'

export default function ProductDetailContent({ product }: { product: ShopProduct }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'shipping'>('description')
  const [addedFeedback, setAddedFeedback] = useState(false)

  const discount = getDiscountPercent(product.price, product.oldPrice)
  const related = getRelatedProducts(product)

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.images[0],
      },
      quantity
    )
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
  }

  const whatsAppMessage = `مرحباً، أريد الاستفسار عن:\n${product.name}\nالسعر: ${formatPrice(product.price)} ج.م\nالرابط: ${SITE_CONFIG.url}/المتجر/${product.slug}`

  return (
    <>
      {/* JSON-LD Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.shortDescription,
            image: product.images.map((img) => `${SITE_CONFIG.url}${img}`),
            sku: product.sku,
            brand: { '@type': 'Brand', name: SITE_CONFIG.name },
            offers: {
              '@type': 'Offer',
              url: `${SITE_CONFIG.url}/المتجر/${product.slug}`,
              priceCurrency: 'EGP',
              price: product.price,
              availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
              seller: { '@type': 'Organization', name: SITE_CONFIG.name },
              shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: { '@type': 'MonetaryAmount', value: product.price >= FREE_SHIPPING_THRESHOLD ? '0' : '150', currency: 'EGP' },
                shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'EG' },
              },
            },
            category: product.categoryName,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE_CONFIG.url },
                { '@type': 'ListItem', position: 2, name: 'المتجر', item: `${SITE_CONFIG.url}/المتجر` },
                { '@type': 'ListItem', position: 3, name: product.categoryName, item: `${SITE_CONFIG.url}/المتجر?category=${product.categorySlug}` },
                { '@type': 'ListItem', position: 4, name: product.name },
              ],
            },
          }),
        }}
      />

      <div className="section-padding">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500" aria-label="مسار التنقل">
            <Link href="/" className="hover:text-primary-600">الرئيسية</Link>
            <ChevronLeft className="h-3 w-3" />
            <Link href="/shop" className="hover:text-primary-600">المتجر</Link>
            <ChevronLeft className="h-3 w-3" />
            <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-primary-600">{product.categoryName}</Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="font-medium text-gray-900 line-clamp-1">{product.name}</span>
          </nav>

          {/* Product grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Gallery */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <ProductGallery images={product.images} name={product.name} />
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col">
              <span className="mb-2 text-sm font-medium text-primary-600">{product.categoryName}</span>
              <h1 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">{product.name}</h1>
              <p className="mb-4 text-gray-600">{product.shortDescription}</p>

              {/* Price section */}
              <div className="mb-6 flex items-center gap-4">
                <span className="text-3xl font-bold text-accent-600">{formatPrice(product.price)} ج.م</span>
                {product.oldPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">{formatPrice(product.oldPrice)} ج.م</span>
                    {discount && (
                      <span className="rounded-full bg-accent-600 px-3 py-1 text-sm font-bold text-white">
                        وفر {discount}%
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* SKU */}
              <p className="mb-4 text-xs text-gray-400">كود المنتج: {product.sku}</p>

              {/* Stock */}
              {product.stock > 0 ? (
                <span className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  متوفر ({product.stock} قطعة)
                </span>
              ) : (
                <span className="mb-6 text-sm font-medium text-red-600">غير متوفر حالياً</span>
              )}

              {/* Quantity & Add to cart */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                <div className="flex items-center rounded-xl border border-gray-200">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-11 w-11 items-center justify-center text-gray-500 hover:text-gray-700">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex h-11 w-12 items-center justify-center border-x border-gray-200 text-sm font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="flex h-11 w-11 items-center justify-center text-gray-500 hover:text-gray-700">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all ${
                    addedFeedback
                      ? 'bg-green-600'
                      : product.stock === 0
                      ? 'cursor-not-allowed bg-gray-400'
                      : 'bg-navy-900 hover:bg-navy-800 hover:shadow-lg'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {addedFeedback ? 'تمت الإضافة ✓' : 'أضف للسلة'}
                </button>
              </div>

              {/* WhatsApp Order */}
              <a
                href={getWhatsAppUrl(whatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-green-700"
              >
                <WhatsAppIcon className="h-5 w-5" />
                اطلب عبر واتساب مباشرة
              </a>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <CreditCard className="h-6 w-6 shrink-0 text-primary-600" />
                  <div>
                    <p className="text-xs font-bold text-gray-900">الدفع عند الاستلام</p>
                    <p className="text-[10px] text-gray-500">ادفع لما تستلم</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <Truck className="h-6 w-6 shrink-0 text-primary-600" />
                  <div>
                    <p className="text-xs font-bold text-gray-900">شحن لكل مصر</p>
                    <p className="text-[10px] text-gray-500">مجاني فوق {formatPrice(FREE_SHIPPING_THRESHOLD)} ج.م</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <Shield className="h-6 w-6 shrink-0 text-primary-600" />
                  <div>
                    <p className="text-xs font-bold text-gray-900">ضمان الجودة</p>
                    <p className="text-[10px] text-gray-500">ضمان على الهيكل والخامات</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <WhatsAppIcon className="h-6 w-6 shrink-0 text-green-600" />
                  <div>
                    <p className="text-xs font-bold text-gray-900">دعم 24/7</p>
                    <p className="text-[10px] text-gray-500">واتساب طول اليوم</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <div className="flex gap-1 border-b border-gray-200">
              {[
                { key: 'description' as const, label: 'الوصف' },
                { key: 'specs' as const, label: 'المواصفات' },
                { key: 'shipping' as const, label: 'الشحن والتوصيل' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-3 text-sm font-semibold transition-colors ${
                    activeTab === tab.key
                      ? 'border-b-2 border-accent-600 text-accent-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-6">
              {activeTab === 'description' && (
                <div className="prose-arabic max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
              )}
              {activeTab === 'specs' && (
                <table className="w-full max-w-xl">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="px-4 py-3 text-sm font-bold text-gray-700">{key}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === 'shipping' && (
                <div className="max-w-xl space-y-4 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <Truck className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                    <div>
                      <p className="font-bold text-gray-900">التوصيل لجميع محافظات مصر</p>
                      <p>شحن مجاني للطلبات فوق {formatPrice(FREE_SHIPPING_THRESHOLD)} ج.م — رسوم الشحن 150 ج.م للطلبات الأقل</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                    <div>
                      <p className="font-bold text-gray-900">الدفع عند الاستلام</p>
                      <p>ادفع كاش لما المنتج يوصلك — لا حاجة لبيانات بنكية</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                    <div>
                      <p className="font-bold text-gray-900">ضمان مع كل منتج</p>
                      <p>ضمان على الهيكل والخامات. استبدال فوري في حالة وجود عيب صناعة</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-12 border-t border-gray-100 pt-12">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">منتجات مشابهة</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
