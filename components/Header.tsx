"use client"

import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Header() {
  const { cartItems } = useCart()
  const itemCount = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)
  const [search, setSearch] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) router.push(`/catalog?search=${encodeURIComponent(search)}`)
  }

  return (
    <header className={`sticky top-0 z-50 bg-white transition-all duration-200 ${scrolled ? "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)]" : "border-b border-slate-100"}`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 py-3 md:py-3.5">
        <div className="flex items-center gap-3 md:gap-5">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-1">
            <span className="text-xl font-extrabold text-[#2563EB]">ТОП</span>
            <span className="text-xl font-bold text-[#0F172A]">чехол</span>
          </Link>

          {/* Catalog button desktop */}
          <Link
            href="/catalog"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Каталог
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-none md:max-w-[40%] relative">
            <input
              type="text"
              placeholder="Пошук товарів..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 rounded-xl py-2.5 pl-4 pr-11 text-sm outline-none transition-all duration-200 placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-1 ml-auto shrink-0">
            {/* Catalog mobile */}
            <Link href="/catalog" className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-all duration-200">
              <svg className="w-5 h-5 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 rounded-xl hover:bg-slate-100 transition-all duration-200 group">
              <svg className="w-6 h-6 text-[#0F172A] group-hover:text-[#2563EB] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#2563EB] text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-md">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}
