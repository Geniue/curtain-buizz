import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { SITE_CONFIG, NAV_LINKS, SERVICES, LOCATIONS } from '@/lib/constants'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'
import { getWhatsAppUrl, getPhoneUrl } from '@/lib/utils'

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-gray-300" role="contentinfo">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold text-white">
              {SITE_CONFIG.shortName}
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              {SITE_CONFIG.name} يوفر خدمات التنجيد للأثاث وعمل الستائر للمنازل بجميع أنواعها.
              بأكثر من {SITE_CONFIG.experienceYears} عاماً من الخبرة نقدم أجود الخامات وأفضل التصميمات.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/سياسة-الخصوصية" className="text-sm hover:text-white transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">خدماتنا</h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link href={`/المدونة?category=${service.slug}`} className="text-sm hover:text-white transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-4">
              <MapPin className="inline h-5 w-5 text-primary-400 ml-2" />
              مواقع الخدمة
            </h3>
            <ul className="grid grid-cols-3 gap-2">
              {LOCATIONS.slice(0, 15).map((loc) => (
                <li key={loc.slug}>
                  <Link href={`/مواقعنا/${loc.slug}`} className="text-xs hover:text-white transition-colors">
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/مواقعنا" className="mt-3 inline-block text-xs text-primary-400 hover:text-primary-300 transition-colors">
              عرض جميع المواقع ({LOCATIONS.length}) ←
            </Link>
          </div>
        </div>

        {/* Contact Row */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-12 pt-8 border-t border-navy-800">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">تواصل معنا</h3>
            <ul className="space-y-4">
              <li>
                <a href={getPhoneUrl()} className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <Phone className="h-5 w-5 text-primary-400 rtl-flip" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <WhatsAppIcon className="h-5 w-5 text-green-400" />
                  واتساب
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <Mail className="h-5 w-5 text-primary-400" />
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-navy-800 pt-8 text-center text-sm">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}
