'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Menu, X } from 'lucide-react'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants'
import { getPhoneUrl } from '@/lib/utils'
import CartIcon from '@/components/shop/CartIcon'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Top bar with phone CTA */}
      <div className="bg-navy-900 text-white">
        <div className="container-custom flex items-center justify-between py-2 text-sm">
          <a href={getPhoneUrl()} className="flex items-center gap-2 font-semibold hover:text-accent-300 transition-colors">
            <Phone className="h-4 w-4 rtl-flip" />
            <span>{SITE_CONFIG.phone}</span>
          </a>
          <span className="hidden sm:block">خبرة أكثر من {SITE_CONFIG.experienceYears} عاماً في الركن والستائر</span>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-custom" aria-label="التنقل الرئيسي">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="الرئيسية - الأشقاء">
            <div className="relative h-14 w-14 shrink-0 rounded-full border-[3px] border-accent-600 overflow-hidden shadow-md">
              <Image
                src="/images/logo.jpg"
                alt="شعار الأشقاء للركن والستائر"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-accent-600 leading-tight">{SITE_CONFIG.shortName}</span>
              <span className="hidden text-xs text-gray-500 sm:block">للركن والستائر</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <div className="hidden md:flex items-center gap-3">
            <CartIcon />
            <a href={getPhoneUrl()} className="btn-primary text-sm">
              <Phone className="h-4 w-4 rtl-flip" />
              اتصل الآن
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="القائمة"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 pb-4">
            <ul className="space-y-1 pt-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2 px-3">
              <a href={getPhoneUrl()} className="btn-primary flex-1 text-center text-sm">اتصل الآن</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
