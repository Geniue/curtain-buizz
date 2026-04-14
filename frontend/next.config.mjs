/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      { source: '/%D9%85%D9%86-%D9%86%D8%AD%D9%86', destination: '/about' },
      { source: '/من-نحن', destination: '/about' },
      { source: '/%D8%AA%D9%88%D8%A7%D8%B5%D9%84-%D9%85%D8%B9%D9%86%D8%A7', destination: '/contact' },
      { source: '/تواصل-معنا', destination: '/contact' },
      { source: '/%D8%A7%D9%84%D9%85%D8%AF%D9%88%D9%86%D8%A9', destination: '/blog' },
      { source: '/المدونة', destination: '/blog' },
      { source: '/%D8%A7%D9%84%D9%85%D8%AF%D9%88%D9%86%D8%A9/:slug', destination: '/blog/:slug' },
      { source: '/المدونة/:slug', destination: '/blog/:slug' },
      { source: '/%D8%B3%D9%8A%D8%A7%D8%B3%D8%A9-%D8%A7%D9%84%D8%AE%D8%B5%D9%88%D8%B5%D9%8A%D8%A9', destination: '/privacy' },
      { source: '/سياسة-الخصوصية', destination: '/privacy' },
      { source: '/مواقعنا', destination: '/locations' },
      { source: '/%D9%85%D9%88%D8%A7%D9%82%D8%B9%D9%86%D8%A7', destination: '/locations' },
      { source: '/مواقعنا/:slug', destination: '/locations/:slug' },
      { source: '/%D9%85%D9%88%D8%A7%D9%82%D8%B9%D9%86%D8%A7/:slug', destination: '/locations/:slug' },
      { source: '/المتجر', destination: '/shop' },
      { source: '/%D8%A7%D9%84%D9%85%D8%AA%D8%AC%D8%B1', destination: '/shop' },
      { source: '/المتجر/:slug', destination: '/shop/:slug' },
      { source: '/%D8%A7%D9%84%D9%85%D8%AA%D8%AC%D8%B1/:slug', destination: '/shop/:slug' },
      { source: '/سلة-التسوق', destination: '/cart' },
      { source: '/%D8%B3%D9%84%D8%A9-%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%82', destination: '/cart' },
      { source: '/اتمام-الشراء', destination: '/checkout' },
      { source: '/%D8%A7%D8%AA%D9%85%D8%A7%D9%85-%D8%A7%D9%84%D8%B4%D8%B1%D8%A7%D8%A1', destination: '/checkout' },
      { source: '/معرض-اعمالنا', destination: '/gallery' },
      { source: '/%D9%85%D8%B9%D8%B1%D8%B6-%D8%A7%D8%B9%D9%85%D8%A7%D9%84%D9%86%D8%A7', destination: '/gallery' },
      { source: '/معرض-اعمالنا/صفحة/:num', destination: '/gallery/page/:num' },
      { source: '/%D9%85%D8%B9%D8%B1%D8%B6-%D8%A7%D8%B9%D9%85%D8%A7%D9%84%D9%86%D8%A7/%D8%B5%D9%81%D8%AD%D8%A9/:num', destination: '/gallery/page/:num' },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
