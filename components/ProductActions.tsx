"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import toast from "react-hot-toast"

export default function ProductActions({ product }: { product: any }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAdd = () => {
    addToCart(product, quantity)
    toast.success(`Додано: ${product.name} (${quantity} шт.)`, { duration: 2000 })
  }

  const total = (product.price * quantity).toFixed(0)

  return (
    <div className="flex flex-col gap-5">
      {/* Quantity + total */}
      <div className="flex items-center gap-5">
        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-11 h-11 flex items-center justify-center text-xl text-[#64748B] hover:bg-slate-100 transition-all duration-200"
          >
            −
          </button>
          <div className="w-11 h-11 flex items-center justify-center font-bold text-[#0F172A] border-x border-slate-200">
            {quantity}
          </div>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="w-11 h-11 flex items-center justify-center text-xl text-[#64748B] hover:bg-slate-100 transition-all duration-200"
          >
            +
          </button>
        </div>

        <div>
          <p className="text-xs text-[#64748B] font-medium uppercase tracking-wide mb-0.5">Сума</p>
          <p className="text-2xl font-bold text-[#0F172A]">{total} грн</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAdd}
          className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 active:scale-95 shadow-lg shadow-blue-200 flex items-center justify-center gap-2 btn-ripple"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          В кошик
        </button>

        <button
          onClick={handleAdd}
          className="flex-1 sm:flex-none bg-[#10B981] hover:bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 btn-ripple"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          Швидке замовлення
        </button>
      </div>
    </div>
  )
}
