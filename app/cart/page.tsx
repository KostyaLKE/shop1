"use client"

import { useCart } from "@/context/CartContext"
import { useState, FormEvent } from "react"
import Link from "next/link"

export default function Cart() {
  const { cartItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "", city: "", branch: "", email: "" })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const itemsList = cartItems
        .map((item: any) => `• ${item.name} x${item.quantity} — ${(item.price * item.quantity).toFixed(2)} грн`)
        .join("\n")
      const message = `📦 <b>Нове замовлення!</b>\n\n👤 <b>Покупець:</b> ${formData.name}\n📧 <b>Email:</b> ${formData.email}\n📞 <b>Телефон:</b> ${formData.phone}\n🏙️ <b>Місто:</b> ${formData.city}\n📫 <b>Відділення НП:</b> ${formData.branch}\n\n<b>🛒 Товари:</b>\n${itemsList}\n\n💰 <b>Сума: ${totalPrice.toFixed(2)} грн</b>`
      const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
      if (!token || !chatId) {
        setSubmitted(true)
        clearCart()
        return
      }
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
      })
      if (response.ok) {
        setSubmitted(true)
        clearCart()
        setTimeout(() => { window.location.href = "/" }, 3000)
      } else {
        alert("Помилка при відправленні замовлення")
      }
    } catch (error) {
      alert("Помилка: " + String(error))
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Замовлення прийнято!</h1>
          <p className="text-[#64748B] mb-6">Ми зв'яжемося з вами найближчим часом для підтвердження.</p>
          <Link href="/" className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#1D4ED8] font-semibold transition-colors">
            Повернутися на головну
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Кошик порожній</h1>
          <p className="text-[#64748B] mb-6">Додайте товари з каталогу, щоб оформити замовлення.</p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
          >
            Перейти до каталогу
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  const inputClass = "w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 rounded-xl p-3 text-sm outline-none transition-all duration-200 placeholder:text-slate-400"
  const labelClass = "block text-sm font-medium text-[#0F172A] mb-1.5"

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 py-8 md:py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#64748B] mb-8">
          <Link href="/" className="hover:text-[#2563EB] transition-colors">Головна</Link>
          <span>/</span>
          <span className="text-[#0F172A] font-medium">Кошик</span>
        </div>

        <h1 className="text-[28px] md:text-[36px] font-bold text-[#0F172A] mb-8">Ваш кошик</h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            {cartItems.map((item: any) => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-4 flex gap-4 shadow-sm">
                <Link href={`/product/${encodeURIComponent(item.id)}`} className="w-20 h-20 md:w-24 md:h-24 bg-[#F8FAFC] rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                </Link>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#0F172A] text-sm line-clamp-2 mb-1">{item.name}</h3>
                  <p className="text-[#64748B] text-sm mb-3">{item.price.toFixed(2)} грн / шт.</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#64748B] hover:bg-slate-100 transition-all duration-200"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-[#0F172A]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#64748B] hover:bg-slate-100 transition-all duration-200"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#EF4444] hover:text-red-700 text-xs font-medium transition-colors duration-200"
                    >
                      Видалити
                    </button>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-bold text-lg text-[#0F172A]">{(item.price * item.quantity).toFixed(0)} грн</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-[#0F172A] mb-5">Оформлення замовлення</h2>

              {/* Total */}
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 mb-5">
                <p className="text-sm text-[#64748B] mb-1">Сума замовлення</p>
                <p className="text-3xl font-bold text-[#2563EB]">{totalPrice.toFixed(0)} грн</p>
                <p className="text-xs text-[#64748B] mt-1">{cartItems.reduce((s: number, i: any) => s + i.quantity, 0)} товарів</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={labelClass}>Ім'я та прізвище</label>
                  <input required type="text" placeholder="Іван Іванов" className={inputClass}
                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Телефон</label>
                  <input required type="tel" placeholder="+38 (000) 000-00-00" className={inputClass}
                    value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" placeholder="example@mail.com" className={inputClass}
                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Місто</label>
                  <input required type="text" placeholder="Київ, Харків, Одеса..." className={inputClass}
                    value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Відділення Нової Пошти</label>
                  <input required type="text" placeholder="№ відділення або поштомату" className={inputClass}
                    value={formData.branch} onChange={(e) => setFormData({ ...formData, branch: e.target.value })} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#10B981] hover:bg-emerald-600 disabled:bg-slate-300 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-100 btn-ripple flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Обробка...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Підтвердити замовлення
                    </>
                  )}
                </button>

                <p className="text-xs text-[#64748B] text-center leading-relaxed">
                  Ми зв'яжемося з вами для підтвердження деталей замовлення
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
