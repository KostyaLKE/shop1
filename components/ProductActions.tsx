"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import toast from "react-hot-toast"

const PROMO_CODE = "FREE"

export default function ProductActions({ product }: { product: any }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [promoInput, setPromoInput] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState("")

  // При промокоді FREE: оптова ціна + 5%
  const promoPrice = parseFloat((product.wholesalePrice * 1.05).toFixed(2))
  const displayPrice = promoApplied ? promoPrice : product.price
  const total = (displayPrice * quantity).toFixed(0)
  const savings = promoApplied ? (product.price - promoPrice).toFixed(0) : null

  const handleApplyPromo = () => {
    if (promoInput.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true)
      setPromoError("")
      toast.success("Промокод активовано! 🎉")
    } else {
      setPromoApplied(false)
      setPromoError("Невірний промокод")
    }
  }

  const handleRemovePromo = () => {
    setPromoApplied(false)
    setPromoInput("")
    setPromoError("")
  }

  const handleAdd = () => {
    addToCart({ ...product, price: displayPrice }, quantity)
    toast.success(`Додано: ${product.name} (${quantity} шт.)`, { duration: 2000 })
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Promo code */}
      <div>
        {!promoApplied ? (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Промокод"
              value={promoInput}
              onChange={(e) => { setPromoInput(e.target.value); setPromoError("") }}
              onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
              className={`flex-1 bg-[#F8FAFC] border rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 ${
                promoError ? "border-[#EF4444] focus:border-[#EF4444]" : "border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              }`}
            />
            <button
              onClick={handleApplyPromo}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap"
            >
              Застосувати
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-semibold text-emerald-700">Промокод «{PROMO_CODE}» активовано</span>
            </div>
            <button onClick={handleRemovePromo} className="text-slate-400 hover:text-slate-600 transition-colors ml-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {promoError && <p className="text-[#EF4444] text-xs mt-1 ml-1">{promoError}</p>}
      </div>

      {/* Price display */}
      <div className="bg-[#F8FAFC] rounded-xl border border-slate-200 px-4 py-3">
        {promoApplied ? (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-2xl font-bold text-[#10B981]">{displayPrice.toFixed(0)} грн</span>
            <span className="text-base text-slate-400 line-through">{product.price.toFixed(0)} грн</span>
            <span className="bg-[#10B981] text-white text-xs font-bold px-2 py-0.5 rounded-full">-{savings} грн</span>
          </div>
        ) : (
          <span className="text-2xl font-bold text-[#0F172A]">{displayPrice.toFixed(0)} грн</span>
        )}
        <p className="text-xs text-[#64748B] mt-0.5">за 1 шт.</p>
      </div>

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
          <p className="text-xs text-[#64748B] font-medium uppercase tracking-wide mb-0.5">Разом</p>
          <p className={`text-2xl font-bold ${promoApplied ? "text-[#10B981]" : "text-[#0F172A]"}`}>{total} грн</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAdd}
          className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 active:scale-95 shadow-lg shadow-blue-200 flex items-center justify-center gap-2 btn-ripple"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          В кошик
        </button>
        <button
          onClick={handleAdd}
          className="flex-1 sm:flex-none bg-[#10B981] hover:bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 btn-ripple"
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
