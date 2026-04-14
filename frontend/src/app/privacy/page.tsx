import type { Metadata } from 'next'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'سياسة الخصوصية',
  description: 'سياسة الخصوصية لموقع الأشقاء للركن والستائر. نحترم خصوصيتك ونحمي بياناتك الشخصية.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/سياسة-الخصوصية`,
  },
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'سياسة الخصوصية', href: '/سياسة-الخصوصية' }]} />

      <article className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl prose-arabic">
            <h1>سياسة الخصوصية</h1>

            <p>نحن في {SITE_CONFIG.name} نأخذ خصوصيتك على محمل الجد. توضح سياسة الخصوصية هذه كيف نجمع ونستخدم ونحمي المعلومات الشخصية التي تقدمها لنا.</p>

            <h2>المعلومات التي نجمعها</h2>
            <p>عند استخدامك لموقعنا أو التواصل معنا، قد نجمع المعلومات التالية:</p>
            <ul>
              <li>الاسم الكامل</li>
              <li>البريد الإلكتروني</li>
              <li>رقم الهاتف</li>
              <li>الرسائل المرسلة عبر نموذج الاتصال</li>
            </ul>

            <h2>كيف نستخدم معلوماتك</h2>
            <p>نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
            <ul>
              <li>الرد على استفساراتك وطلباتك</li>
              <li>تقديم خدماتنا وتحسينها</li>
              <li>التواصل معك بخصوص الخدمات المطلوبة</li>
            </ul>

            <h2>حماية المعلومات</h2>
            <p>نتخذ إجراءات أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف.</p>

            <h2>التواصل معنا</h2>
            <p>للاستفسار عن سياسة الخصوصية، تواصل معنا على {SITE_CONFIG.email} أو اتصل على {SITE_CONFIG.phone}.</p>
          </div>
        </div>
      </article>
    </>
  )
}
