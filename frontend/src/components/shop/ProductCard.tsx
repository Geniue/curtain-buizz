'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShopProduct, formatPrice, getDiscountPercent } from '@/lib/shop-data'
import { useCart } from '@/lib/cart-context'
import { ShoppingCart, Eye } from 'lucide-react'

export default function ProductCard({ product }: { product: ShopProduct }) {
  const { addItem } = useCart()
  const discount = getDiscountPercent(product.price, product.oldPrice)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.images[0],
    })
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Discount badge */}
        {discount && (
          <span className="absolute top-3 start-3 rounded-full bg-accent-600 px-3 py-1 text-xs font-bold text-white">
            خصم {discount}%
          </span>
        )}
        {/* Featured badge */}
        {product.isFeatured && (
          <span className="absolute top-3 end-3 rounded-full bg-primary-500 px-3 py-1 text-xs font-bold text-white">
            مميز
          </span>
        )}
        {/* Quick actions overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-navy-900/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy-900 shadow-lg transition-transform hover:scale-110">
            <Eye className="h-5 w-5" />
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/shop/${product.slug}`}>
          <span className="mb-1 text-xs font-medium text-primary-600">{product.categoryName}</span>
          <h3 className="mb-2 line-clamp-2 text-sm font-bold text-gray-900 transition-colors group-hover:text-accent-600">
            {product.name}
          </h3>
        </Link>
        <p className="mb-3 line-clamp-2 text-xs text-gray-500">{product.shortDescription}</p>

        {/* Price */}
        <div className="mt-auto flex items-center gap-2">
          <span className="text-lg font-bold text-accent-600">{formatPrice(product.price)} ج.م</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          <ShoppingCart className="h-4 w-4" />
          أضف للسلة
        </button>
      </div>
    </div>
  )
}
