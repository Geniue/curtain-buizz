'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatPrice, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '@/lib/shop-data'

export default function CartContent() {
  const { items, removeItem, updateQuantity, subtotal, shipping, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="section-padding">
        <div className="container-custom flex min-h-[400px] flex-col items-center justify-center text-center">
          <ShoppingBag className="mb-4 h-20 w-20 text-gray-300" />
          <h1 className="mb-2 text-2xl font-bold text-gray-900">سلة التسوق فارغة</h1>
          <p className="mb-6 text-gray-500">لم تضف أي منتجات بعد. تصفح المتجر واختر ما يعجبك!</p>
          <Link href="/shop" className="btn-primary">
            <ShoppingBag className="h-5 w-5" />
            تصفح المتجر
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">سلة التسوق</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                {/* Image */}
                <Link href={`/shop/${item.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                </Link>

                {/* Info */}
                <div className="flex flex-1 flex-col">
                  <Link href={`/shop/${item.slug}`} className="text-sm font-bold text-gray-900 hover:text-accent-600 line-clamp-2">
                    {item.name}
                  </Link>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm font-bold text-accent-600">{formatPrice(item.price)} ج.م</span>
                    {item.oldPrice && (
                      <span className="text-xs text-gray-400 line-through">{formatPrice(item.oldPrice)} ج.م</span>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center rounded-lg border border-gray-200">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-700" disabled={item.quantity <= 1}>
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="flex h-8 w-8 items-center justify-center border-x border-gray-200 text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-700">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-900">{formatPrice(item.price * item.quantity)} ج.م</span>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label="حذف">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">ملخص الطلب</h2>

              <div className="space-y-3 border-b border-gray-100 pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span className="font-medium">{formatPrice(subtotal)} ج.م</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">الشحن</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'مجاني' : `${formatPrice(shipping)} ج.م`}
                  </span>
                </div>
                {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
                  <p className="text-xs text-primary-600">
                    أضف {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} ج.م لتحصل على شحن مجاني!
                  </p>
                )}
              </div>

              <div className="flex justify-between py-4 text-lg font-bold">
                <span>الإجمالي</span>
                <span className="text-accent-600">{formatPrice(total)} ج.م</span>
              </div>

              <Link
                href="/checkout"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-800"
              >
                إتمام الشراء
                <ArrowRight className="h-4 w-4 rtl-flip" />
              </Link>

              <Link href="/shop" className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-primary-600">
                <ShoppingBag className="h-4 w-4" />
                متابعة التسوق
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
