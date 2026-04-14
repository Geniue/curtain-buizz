'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        }),
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
          اسمك
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="أدخل اسمك الكامل"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
          بريدك الإلكتروني
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="example@email.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
          الموضوع
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="موضوع الرسالة"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
          رسالتك (اختياري)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="اكتب رسالتك هنا..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'جاري الإرسال...' : 'إرسال'}
      </button>

      {status === 'success' && (
        <p className="text-green-600 font-semibold text-center">تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 font-semibold text-center">حدث خطأ. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.</p>
      )}
    </form>
  )
}
