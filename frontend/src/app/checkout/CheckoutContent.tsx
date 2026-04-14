'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CreditCard, Truck, Shield, CheckCircle2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/shop-data'
import { SITE_CONFIG } from '@/lib/constants'
import { getWhatsAppUrl } from '@/lib/utils'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'

const GOVERNORATES = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'الشرقية', 'الدقهلية', 'القليوبية',
  'الغربية', 'المنوفية', 'البحيرة', 'كفر الشيخ', 'دمياط', 'بورسعيد',
  'الإسماعيلية', 'السويس', 'شمال سيناء', 'جنوب سيناء', 'المنيا', 'أسيوط',
  'سوهاج', 'قنا', 'الأقصر', 'أسوان', 'الوادي الجديد', 'مطروح', 'البحر الأحمر',
  'الفيوم', 'بني سويف',
]

interface FormData {
  name: string
  phone: string
  email: string
  address: string
  city: string
  governorate: string
  notes: string
}

export default function CheckoutContent() {
  const router = useRouter()
  const { items, subtotal, shipping, total, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [formData, setFormData] = useState<FormData>({
    name: '', phone: '', email: '', address: '', city: '', governorate: '', notes: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validate = (): boolean => {
    const errs: Partial<FormData> = {}
    if (!formData.name.trim()) errs.name = 'الاسم مطلوب'
    if (!formData.phone.trim()) errs.phone = 'رقم الهاتف مطلوب'
    else if (!/^01[0125]\d{8}$/.test(formData.phone.trim())) errs.phone = 'رقم هاتف غير صحيح'
    if (!formData.address.trim()) errs.address = 'العنوان مطلوب'
    if (!formData.city.trim()) errs.city = 'المدينة مطلوبة'
    if (!formData.governorate) errs.governorate = 'المحافظة مطلوبة'
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'بريد إلكتروني غير صحيح'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || items.length === 0) return

    setIsSubmitting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/shop/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_email: formData.email || null,
          customer_address: formData.address,
          city: formData.city,
          governorate: formData.governorate,
          notes: formData.notes || null,
          payment_method: 'cod',
          items: items.map((i) => ({ product_id: i.id, quantity: i.quantity })),
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setOrderNumber(data.order?.order_number || 'ASH-' + Date.now())
        setOrderComplete(true)
        clearCart()
      } else {
        // Fallback: send via WhatsApp
        handleWhatsAppOrder()
      }
    } catch {
      // API not available, send via WhatsApp
      handleWhatsAppOrder()
    }
    setIsSubmitting(false)
  }

  const handleWhatsAppOrder = () => {
    const itemsList = items.map((i) => `• ${i.name} (×${i.quantity}) — ${formatPrice(i.price * i.quantity)} ج.م`).join('\n')
    const message = `🛒 طلب جديد من المتجر\n\n${itemsList}\n\nالمجموع: ${formatPrice(subtotal)} ج.م\nالشحن: ${shipping === 0 ? 'مجاني' : formatPrice(shipping) + ' ج.م'}\nالإجمالي: ${formatPrice(total)} ج.م\n\n👤 الاسم: ${formData.name}\n📱 الهاتف: ${formData.phone}\n📍 العنوان: ${formData.address}, ${formData.city}, ${formData.governorate}\n${formData.notes ? '📝 ملاحظات: ' + formData.notes : ''}`
    window.open(getWhatsAppUrl(message), '_blank')
    setOrderNumber('WA-' + Date.now())
    setOrderComplete(true)
    clearCart()
  }

  if (orderComplete) {
    return (
      <div className="section-padding">
        <div className="container-custom flex min-h-[400px] flex-col items-center justify-center text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6">
            <CheckCircle2 className="h-24 w-24 text-green-500" />
          </motion.div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">تم تأكيد طلبك بنجاح!</h1>
          <p className="mb-2 text-gray-600">رقم الطلب: <strong className="text-accent-600">{orderNumber}</strong></p>
          <p className="mb-6 text-sm text-gray-500">سنتواصل معك خلال 24 ساعة لتأكيد الطلب والموعد</p>
          <div className="flex gap-3">
            <Link href="/shop" className="btn-primary">
              <ShoppingBag className="h-4 w-4" />
              متابعة التسوق
            </Link>
            <a
              href={getWhatsAppUrl(`مرحباً، أريد الاستفسار عن الطلب رقم ${orderNumber}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white hover:bg-green-700"
            >
              <WhatsAppIcon className="h-4 w-4" />
              تواصل واتساب
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="section-padding">
        <div className="container-custom flex min-h-[400px] flex-col items-center justify-center text-center">
          <ShoppingBag className="mb-4 h-20 w-20 text-gray-300" />
          <h1 className="mb-2 text-2xl font-bold text-gray-900">السلة فارغة</h1>
          <p className="mb-6 text-gray-500">أضف منتجات للسلة أولاً</p>
          <Link href="/shop" className="btn-primary">تصفح المتجر</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">إتمام الشراء</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer info */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-900">بيانات التوصيل</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">الاسم بالكامل *</label>
                    <input
                      type="text" name="name" value={formData.name} onChange={handleChange}
                      className={`w-full rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} bg-gray-50 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200`}
                      placeholder="مثال: أحمد محمد"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">رقم الهاتف *</label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleChange} dir="ltr"
                      className={`w-full rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} bg-gray-50 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200`}
                      placeholder="01xxxxxxxxx"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">البريد الإلكتروني (اختياري)</label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleChange} dir="ltr"
                      className={`w-full rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-gray-50 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200`}
                      placeholder="example@email.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">العنوان بالتفصيل *</label>
                    <input
                      type="text" name="address" value={formData.address} onChange={handleChange}
                      className={`w-full rounded-xl border ${errors.address ? 'border-red-500' : 'border-gray-200'} bg-gray-50 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200`}
                      placeholder="الشارع — رقم العمارة — الدور — الشقة"
                    />
                    {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">المدينة *</label>
                    <input
                      type="text" name="city" value={formData.city} onChange={handleChange}
                      className={`w-full rounded-xl border ${errors.city ? 'border-red-500' : 'border-gray-200'} bg-gray-50 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200`}
                      placeholder="مثال: 6 أكتوبر"
                    />
                    {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">المحافظة *</label>
                    <select
                      name="governorate" value={formData.governorate} onChange={handleChange}
                      className={`w-full rounded-xl border ${errors.governorate ? 'border-red-500' : 'border-gray-200'} bg-gray-50 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none`}
                    >
                      <option value="">اختر المحافظة</option>
                      {GOVERNORATES.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                    {errors.governorate && <p className="mt-1 text-xs text-red-500">{errors.governorate}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">ملاحظات (اختياري)</label>
                    <textarea
                      name="notes" value={formData.notes} onChange={handleChange} rows={3}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                      placeholder="أي ملاحظات إضافية عن الطلب أو التوصيل"
                    />
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-900">طريقة الدفع</h2>
                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-navy-900 bg-navy-50 p-4">
                    <input type="radio" name="payment" value="cod" defaultChecked className="h-4 w-4 text-navy-900" />
                    <CreditCard className="h-6 w-6 text-navy-900" />
                    <div>
                      <p className="font-bold text-gray-900">الدفع عند الاستلام (كاش)</p>
                      <p className="text-xs text-gray-500">ادفع كاش لما المنتج يوصلك — الطريقة الأسرع والأسهل</p>
                    </div>
                    <span className="ms-auto rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">الأكثر استخداماً</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-900">ملخص الطلب</h2>

                <div className="max-h-60 space-y-3 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-500">×{item.quantity}</p>
                      </div>
                      <span className="text-xs font-bold text-gray-900">{formatPrice(item.price * item.quantity)} ج.م</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span className="font-medium">{formatPrice(subtotal)} ج.م</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">الشحن</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                      {shipping === 0 ? 'مجاني ✅' : `${formatPrice(shipping)} ج.م`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-4 mt-4 text-lg font-bold">
                  <span>الإجمالي</span>
                  <span className="text-accent-600">{formatPrice(total)} ج.م</span>
                </div>

                {/* Submit buttons */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
                >
                  {isSubmitting ? 'جاري إرسال الطلب...' : 'تأكيد الطلب — الدفع عند الاستلام'}
                </button>

                <button
                  type="button"
                  onClick={() => { if (validate()) handleWhatsAppOrder() }}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-green-700"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  اطلب عبر واتساب
                </button>

                {/* Trust */}
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> آمن 100%</span>
                  <span className="flex items-center gap-1"><Truck className="h-3 w-3" /> توصيل سريع</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
