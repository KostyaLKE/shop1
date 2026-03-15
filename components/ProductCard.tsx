"use client"

import { useCart } from "@/context/CartContext"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart()
  const [hovered, setHovered] = useState(false)

  const hasSecondImage = product.images && product.images.length > 1
  const displayImage = hovered && hasSecondImage ? product.images[1] : product.image

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-200 flex flex-col h-full">

      {/* Image */}
      <Link
        href={`/product/${encodeURIComponent(product.id)}`}
        className="relative block aspect-square bg-[#F8FAFC] overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-contain p-3 transition-all duration-300 group-hover:scale-105"
        />

        {/* Out of stock badge */}
        {product.available === false && (
          <span className="absolute top-2 left-2 bg-[#EF4444] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
            Немає
          </span>
        )}

        {/* Add to cart — hidden desktop until hover, always visible mobile */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            addToCart(product)
            toast.success("Додано до кошика", { duration: 1500 })
          }}
          className="absolute bottom-2 right-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 opacity-100 md:opacity-0 md:translate-y-1 md:group-hover:opacity-100 md:group-hover:translate-y-0 btn-ripple"
          title="В кошик"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </Link>

      {/* Info */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <Link href={`/product/${encodeURIComponent(product.id)}`}>
          <h3 className="text-[13px] md:text-[15px] font-medium text-[#0F172A] line-clamp-2 leading-snug mb-3 hover:text-[#2563EB] transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-[18px] md:text-[20px] font-bold text-[#0F172A] leading-none">
            {product.price.toFixed(0)}{" "}
            <span className="text-xs font-medium text-[#64748B]">грн</span>
          </span>

          {/* Quick buy — lightning bolt, always visible */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              addToCart(product)
              toast.success("Додано до кошика", { duration: 1500 })
            }}
            className="shrink-0 bg-[#10B981] hover:bg-emerald-600 text-white w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm btn-ripple"
            title="Швидка покупка"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
