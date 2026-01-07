"use client"

import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Header() {
  const { cartItems } = useCart()
  const itemCount = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)
  
  const [search, setSearch] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(search)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* 1. Логотип */}
          <Link href="/" className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1 shrink-0">
            🔥 ТОП-чехол
          </Link>

          {/* 2. Поиск (На мобильных переносится вниз) */}
          <form onSubmit={handleSearch} className="order-last md:order-2 w-full md:w-auto md:flex-1 max-w-xl relative">
             <input 
               type="text" 
               placeholder="Пошук товарів (наприклад: iPhone 15)..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full bg-slate-100 border border-transparent focus:bg-white focus:border-slate-300 rounded-full py-2.5 pl-5 pr-12 text-sm outline-none transition shadow-inner"
             />
             <button 
               type="submit" 
               className="absolute right-1 top-1/2 -translate-y-1/2 bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black transition"
             >
               🔍
             </button>
          </form>

          {/* 3. Навигация и Корзина */}
          <div className="order-2 md:order-3 flex items-center gap-4 md:gap-6 shrink-0">
              <nav className="hidden lg:flex gap-6 font-medium text-sm text-slate-600">
                  <Link href="/" className="hover:text-slate-900 transition">Головна</Link>
                  <Link href="/catalog" className="hover:text-slate-900 transition">Каталог</Link>
              </nav>

              <Link
                href="/cart"
                className="relative group bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-full transition flex items-center gap-2 font-bold text-sm"
              >
                <span>Кошик</span>
                {itemCount > 0 && (
                    <span className="bg-white text-slate-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {itemCount}
                    </span>
                )}
              </Link>
          </div>
        </div>
      </div>
    </header>
  )
}