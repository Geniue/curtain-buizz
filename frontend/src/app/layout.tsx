import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { SITE_CONFIG } from '@/lib/constants'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import JsonLd from '@/components/seo/JsonLd'
import { CartProvider } from '@/lib/cart-context'
import './globals.css'

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-arabic',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | تصنيع وبيع الركن والستائر بجودة عالية في مصر`,
    template: `%s | ${SITE_CONFIG.shortName}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'تنجيد', 'ركن', 'ركنات', 'ستائر مودرن',
    'الأشقاء', 'الأشقاء للركن والستائر', 'سراير كابتونيه', 'تنجيد كنب',
    'اقمشة تنجيد', 'اسعار تنجيد', 'كنب بلدى', 'ركنة',
    'تنجيد 6 اكتوبر', 'ستائر الشيخ زايد', 'ركنات التجمع الخامس',
    'تنجيد مدينة نصر', 'ستائر المعادي', 'ركنات الرحاب',
    'تنجيد المهندسين', 'تنجيد فيصل', 'تنجيد الهرم',
    'ستائر الاسكندرية', 'ركنات المنصورة', 'تنجيد العاصمة الادارية',
    'تنجيد حدائق الاهرام', 'ستائر مصر الجديدة', 'ركنات العبور',
    'افضل تنجيد في مصر', 'ارخص تنجيد في القاهرة', 'تنجيد انتريه مودرن',
    'تفصيل ركنة', 'تفصيل ستائر', 'تنجيد كنب مستعمل',
  ],
  authors: [{ name: SITE_CONFIG.shortName }],
  creator: SITE_CONFIG.shortName,
  publisher: SITE_CONFIG.shortName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | تصنيع وبيع الركن والستائر`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: '/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} | تصنيع وبيع الركن والستائر`,
    description: SITE_CONFIG.description,
    images: ['/images/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      'ar-EG': SITE_CONFIG.url,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  other: {
    'color-scheme': 'light',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={ibmPlexArabic.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-arabic antialiased">
        <CartProvider>
          <JsonLd />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}
