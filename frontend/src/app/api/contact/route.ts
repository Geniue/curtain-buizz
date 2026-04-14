import { NextResponse } from 'next/server'

interface ContactRequest {
  name: string
  email: string
  subject: string
  message?: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(input: string): string {
  return input.replace(/[<>]/g, '').trim().slice(0, 1000)
}

export async function POST(request: Request) {
  try {
    const body: ContactRequest = await request.json()

    const name = sanitize(body.name ?? '')
    const email = sanitize(body.email ?? '')
    const subject = sanitize(body.subject ?? '')
    const message = sanitize(body.message ?? '')

    if (!name || !email || !subject) {
      return NextResponse.json(
        { error: 'الاسم والبريد الإلكتروني والموضوع مطلوبين' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني غير صحيح' },
        { status: 400 }
      )
    }

    // In production, you would send an email or save to a database here
    console.log('Contact form submission:', { name, email, subject, message })

    return NextResponse.json({ success: true, message: 'تم إرسال رسالتك بنجاح' })
  } catch {
    return NextResponse.json(
      { error: 'حدث خطأ. يرجى المحاولة مرة أخرى.' },
      { status: 500 }
    )
  }
}
