import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <p className="text-7xl font-bold text-primary-600">404</p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">الصفحة غير موجودة</h1>
        <p className="mt-4 text-lg text-gray-600">
          عذراً، لم نتمكن من العثور على الصفحة المطلوبة
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            العودة للرئيسية
          </Link>
          <Link href="/المدونة" className="btn-outline">
            تصفح المقالات
          </Link>
        </div>
      </div>
    </div>
  )
}
