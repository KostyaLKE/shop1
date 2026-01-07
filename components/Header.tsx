"use client"

import Link from "next/link"
import { useCart } from "@/context/CartContext"

export default function Header() {
  const { cartItems } = useCart()
  const itemCount = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          🔥 ТОП-чехол
        </Link>

        <nav className="hidden md:flex gap-8 font-medium text-sm">
          <Link href="/" className="text-slate-600 hover:text-slate-900 transition">Головна</Link>
          <Link href="/catalog" className="text-slate-600 hover:text-slate-900 transition">Каталог</Link>
          <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">Про нас</Link>
        </nav>

        <Link
          href="/cart"
          className="relative group bg-slate-900 hover:bg-black text-white px-5 py-2 rounded-full transition flex items-center gap-2 font-bold text-sm"
        >
          <span>Кошик</span>
          {itemCount > 0 && (
            <span className="bg-white text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}