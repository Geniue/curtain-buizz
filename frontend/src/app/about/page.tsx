import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { SITE_CONFIG } from '@/lib/constants'
import { getPhoneUrl, getWhatsAppUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'من نحن — الأشقاء للركن والستائر',
  description: 'تعرف على الأشقاء للركن والستائر - أكثر من 30 عاماً من الخبرة في تصنيع الركن والانتريهات والستائر. تأسست عام 2007 مع فريق من 20+ فني متخصص.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/من-نحن`,
  },
  robots: { index: true, follow: true },
}

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'من نحن', href: '/من-نحن' }]} />

      <article className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl text-balance">
              من نحن — الأشقاء للركن والستائر
            </h1>

            {/* Hero images grid */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src="/images/work/installation-work.jpg"
                  alt="فني من فريق الأشقاء أثناء تركيب ستائر"
                  fill
                  sizes="(max-width: 768px) 50vw, 350px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src="/images/work/hero-sofa-curtain-luxury.jpg"
                    alt="ركنة فاخرة مع ستائر من تنفيذ الأشقاء"
                    fill
                    sizes="(max-width: 768px) 50vw, 350px"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src="/images/work/sofa-curtain-showpiece.jpg"
                    alt="غرفة معيشة كاملة من تنفيذ الأشقاء"
                    fill
                    sizes="(max-width: 768px) 50vw, 350px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 prose-arabic">
              <p>
                بأكثر من {SITE_CONFIG.experienceYears} عاماً من الخبرة تعتبر شركة الأشقاء واحدة من أكبر
                رواد تصنيع وبيع الركن والانتريهات والستائر المنزلية لغرف المعيشة
                والاستقبال بشكل أساسي.
              </p>

              <p>
                تأسست شركة الأشقاء عام {SITE_CONFIG.foundedYear} حيث تبدأ الرحلة داخل الشركة بانتقاء
                الخيوط والخامات بدقة بالغة، ينتج عنها قطعة فنية من حيث المنظر والملمس والجوهر
                وهذا ما يجعل كل ما تنتجه الشركة عالية الجودة.
              </p>

              <p>
                بمجموعة مميزة من المصممين والمبدعين تتميز شركة الأشقاء بابتكار التصاميم والأشكال
                الفنية المختلفة لمواكبة أحدث خطوط الموضة العالمية، لتكون بذلك لوحات فنية من
                الديكورات والتصميمات عالية الجودة ترضي بها جميع الأذواق ومختلف الرغبات.
              </p>

              <p>
                من خلال موقعنا الإلكتروني يمكنك التسوق والاختيار بين كل ما هو جديد ومميز في عالم
                الديكور الداخلي للمنزل وطلب خدماتنا أو الاتصال بنا بشكل مباشر من خلال أرقام
                خدمة العملاء الخاصة بنا.
              </p>

              <p>
                تهدف شركة الأشقاء إلى توفير حلول متكاملة لمنزلك، حيث نسعى جاهدين لجعله أكثر
                دفئاً وراحة. إذا كنت تبحث عن طرق لتحقيق الراحة والدفء في منزلك، فقد وجدت
                المكان المناسب.
              </p>

              <h2>هدفنا</h2>
              <p>
                هدفنا في الأشقاء هو الارتقاء بالذوق العام لأثاث المنزل وتقديم أحدث وأفضل
                تصميمات الموضة العالمية بأجود الخامات والوصول إلى كل بيت وتلبية احتياجات أكبر
                قطاع ممكن من المستخدمين بمختلف الأذواق والتوجهات.
              </p>

              <h2>رؤيتنا</h2>
              <p>
                نحن نقدم أعلى جودة للخامات في السوق المصري بأسعار مناسبة جداً. نحرص على التفاصيل
                الدقيقة في تصنيع الركن والأثاث وتصميم وتنفيذ الستائر.
              </p>

              <h2>سمعتنا</h2>
              <p>
                تصاميمنا تتميز بالأناقة والابتكار، مما يجعلها خياراً مثالياً للعملاء الذين
                يبحثون عن الجمال والأناقة في منازلهم. سواء كنت تبحث عن تجديد أثاث المنزل
                أو عمل وتصميم الستائر المنزلية، فإن الأشقاء توفر لك أفضل الحلول التصميمية
                والجودة العالية.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={getPhoneUrl()} className="btn-primary text-lg px-8 py-4">
                اتصل بنا — {SITE_CONFIG.phone}
              </a>
              <a
                href={getWhatsAppUrl('مرحباً، أريد الاستفسار عن خدماتكم')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-lg px-8 py-4"
              >
                تواصل عبر الواتساب
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
