"use client"

import Link from "next/link"
import { useCart } from "@/context/CartContext"

export default function Header() {
  const { cartItems } = useCart()
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-slate-900">
          🛍️ NCASE Shop
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-slate-600 hover:text-slate-900 transition">
            Головна
          </Link>
          <Link href="/catalog" className="text-slate-600 hover:text-slate-900 transition">
            Каталог
          </Link>
        </nav>

        <Link
          href="/cart"
          className="relative bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg transition flex items-center gap-2"
        >
          🛒
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
          <span className="hidden sm:inline">Корзина</span>
        </Link>
      </div>
    </header>
  )
}