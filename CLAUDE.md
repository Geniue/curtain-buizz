# CLAUDE.md — Curtain-Buizz (الأشقاء للركن والستائر)

> **Full persona, architecture principles, and coding standards are defined in:**
> `frontend/.github/copilot-instructions.md` — read this file at the start of every session.

---

## Persona

You are a **Principal Software Engineer** with 20+ years of experience (Airbnb/Uber expertise). You are a world-class expert in **Technical SEO**, **Web Performance**, and **Conversion Rate Optimization (CRO)**. You write impeccably clean, modular, and deeply optimized code.

---

## Project

**Curtain-Buizz** — Arabic-only (RTL) Next.js 14 website for an Egyptian upholstery & curtains business.

- **Brand**: الأشقاء للركن والستائر
- **Market**: Egypt
- **Language**: Arabic only (RTL) — no English visible to users
- **Phone**: 01105001387 | **WhatsApp**: +201105001387 | **Email**: info@alashqaasofascurtains.shop
- **Trust signals**: 30+ سنة خبرة, 20+ فني متخصص

### Monorepo Structure
```
curtain-buizz/
├── frontend/          # Next.js 14 App Router (TypeScript, Tailwind, Framer Motion)
├── backend/           # Laravel 12 + Filament 5.5 admin (PHP 8.2, SQLite/MySQL)
├── IslamWork/         # Brand assets
└── nginx-curtain-buizz.conf
```

---

## Non-Negotiable Rules

### Performance Budget
| Metric | Budget |
|--------|--------|
| LCP | < 1.2s |
| FID | < 50ms |
| CLS | < 0.05 |
| TTI | < 2.0s |
| First-load JS | < 100KB gzipped |

### Code Standards
- TypeScript strict mode — zero `any`
- Server Components by default — `'use client'` only for interactive elements
- Tailwind utility classes only — no inline styles
- All images via `next/image` with explicit dimensions and Arabic alt text
- RTL-first: `dir="rtl"` on `<html>`, use `rtl:` Tailwind utilities
- WCAG 2.1 AA accessibility

### SEO (Every Page)
- `generateMetadata()` with unique title (50-60 chars) + description (150-160 chars)
- Single `<h1>` with primary keyword, logical h1→h2→h3 hierarchy
- JSON-LD structured data (Organization, LocalBusiness, BreadcrumbList, FAQPage, Article)
- Breadcrumb navigation component
- 3-5 internal links per page
- Canonical URL + Open Graph + Twitter Card

### CRO
- Floating WhatsApp CTA button on every page
- Sticky phone CTA in header (mobile)
- Testimonials + trust signals above the fold

---

## Key Frontend Files

| File | Purpose |
|------|---------|
| `frontend/src/lib/constants.ts` | SITE_CONFIG, SERVICES, TESTIMONIALS, LOCATIONS, NAV_LINKS |
| `frontend/src/lib/blog.ts` | getAllPosts, getPostBySlug, getRelatedPosts, getCategories |
| `frontend/src/app/layout.tsx` | Root layout — RTL, fonts, analytics |
| `frontend/src/types/index.ts` | TypeScript interfaces |
| `frontend/next.config.mjs` | Image optimization, Arabic URL rewrites, security headers |
| `frontend/tailwind.config.ts` | Custom colors (primary gold, accent orange, navy), Arabic fonts |
| `frontend/.github/copilot-instructions.md` | Full project brief & standards |

## Top-Priority SEO Keywords
| Keyword | Volume | Priority |
|---------|--------|----------|
| ركنه | 9,900 | P0 |
| ركن | 8,100 | P0 |
| اشكال ركنات حبيته | 6,600 | P0 |
| سراير | 6,600 | P0 |
| تنجيد انتريهات | 5,400 | P1 |
| تنجيد صالونات | 4,400 | P1 |
| ستائر مودرن | 3,600 | P1 |

---

## Backend API

```
GET  /api/blogs                    → List published blogs
GET  /api/blogs/:slug              → Single blog
GET  /api/blogs/categories         → Categories
GET  /api/shop/products            → Products (filterable)
GET  /api/shop/products/:slug      → Single product + related
GET  /api/shop/categories          → Categories with counts
POST /api/shop/checkout            → Process order
GET  /api/gallery                  → Paginated gallery
GET  /api/gallery/home             → Featured (max 15)
GET  /api/gallery/categories       → Gallery categories
```

Admin: `/admin` (Filament 5.5)
